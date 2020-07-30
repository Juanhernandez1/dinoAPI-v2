import { validateJwt } from "vdjwt";
import { makeJwt, setExpiration } from "cdjwt";
// importando mesajes de error
import mensajesError from "../errors/mensajesError.js";

// importando modelos para hace busqueda en la base de datos
import { Encargado } from "../model/index.js";

const authToken = async (req) => {
  // se puede validar de 2 formas
  // 1 - obteniendo datos de autenticasion desde cookie
  const objetoauth = await req.cookies.get("auth");
  const cook = JSON.parse(
    objetoauth === undefined ? JSON.stringify({ auth: false }) : objetoauth,
  );

  // 2 - pasando el token y las credenciales auth en cada solicitud
  const headtoken = req.headers.get("auth_token");
  // usando la variable de entorno creada en el midelware de authBasica por eso se enviaran siempre los datos 
  // procesados en ese middelware y poder cronsultar con el token obtenido de la cabecera
  const idauth = Deno.env.get("IDAUTH");

  // velidando la ruta para que pase sin comprobacion de token
  if (req.path.toString() !== "/login") {
    // comprobado estado de autenticacion en la cookie
    // comprobaro que se reciba el token y la variable de entorno 
    if (cook.auth === true || headtoken !== null && idauth !== undefined) {

      // variable que almacena el objeto obtenido de la consulta con el id obtenido desde la cookie
      // o la valiabre de entorno
      let obj;
      // busacar en la base de datos si existe un registo con el id 
      // par usar los datos que se usaron para generar el token y validar 
      try {
        // almacenar registro en la variable obj
        obj = await Encargado.find(cook.id === undefined ? idauth : cook.id);
      } catch (error) {
        // repuesta de error al consultar a la base
        await req.respond({
          status: 500,
          headers: new Headers({
            "content-type": "application/json",
          }),
          body: mensajesError.msg500,
        });
      }

      // clave secretar obtenida desde env
      const key = Deno.env.get("SECRETKEY");
      // carga de datos para cifrado
      const payload = {
        iss: obj.nombre,
        jti: obj.id_encargado,
        exp: setExpiration(24 * 60 * 60 * 1000),
      };
      // encabezado de para el cifrado
      const header = {
        typ: "JWT",
        alg: "HS256",
      };

      // comparando tokens
      let token;
      if (headtoken !== null) {
        token = headtoken;
      } else if (cook.token !== undefined) {
        token = cook.token;
      } else {
        token = "no";
      }
      // objeto que almacenara los parametos para decodiicar y validar el token
      // almacenara el resultado del metodo de validacion de bjwt

      const objvalidacion = {
        jwt: token,
        key,
        algorithm: ["HS256", "HS512"],
      };

      const validatedJwt = await validateJwt(objvalidacion);
      // comporbando el token
      if (validatedJwt.isValid === false) {
        // remplazando cooke en auth false
        await req.setCookie(
          "auth",
          JSON.stringify({ auth: false }),
          {
            path: "/",
            httpOnly: true,
            maxAge: 5 * 60 * 1000,
          },
        );
        // respondiendo a la peticion con un error 401
        // porque no cumplio con la validacion del token
        await req.respond({
          status: 401,
          headers: new Headers({
            "content-type": "application/json",
          }),
          body: mensajesError.msg401,
        });
      }

      // pasar al siguiente middleware
    } else {
      // remplazando cooke en auth false
      await req.setCookie(
        "auth",
        JSON.stringify({ auth: false }),
        {
          path: "/",
          httpOnly: true,
          maxAge: 5 * 60 * 1000,
        },
      );
      // respondiendo a la peticion con un error 401
      // porque no se esta resiviendo token
      await req.respond({
        status: 401,
        headers: new Headers({
          "content-type": "application/json",
        }),
        body: mensajesError.msg401,
      });
    }
  }
};

export default authToken;
