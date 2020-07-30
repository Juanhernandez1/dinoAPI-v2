import { Base64 } from "Base64";
import mensajesError from "../errors/mensajesError.js";
import { createHash } from "denoHash";

// importando modelos para hace busqueda en la base de datos
import { Encargado } from "../model/index.js";

const authBasica = async (req) => {
  // obteniendo cookie para comprobar el estado de auth
  const objetoauth = await req.cookies.get("auth");
  const cook = JSON.parse(
    objetoauth === undefined ? JSON.stringify({ auth: false }) : objetoauth,
  );

  // obteniendo el tipo de autorizacion
  const head = req.headers.get("authorization");
  // validando que se esten enviado los datos de auth
  let code = head !== null ? head : "no auth";

  if (code !== "no auth") {
    // se parando el string codificado
    const data = code.split(" ");
    // verificando el tipo de autorizacion
    if (data[0] === "Basic") {
      // decofigicando para ontener las credendeciales del usuario
      const arr = Base64.fromBase64String(data[1]).toString().split(":");

      // creando un objeto con los datos obtenidos de la decodificasion y encirptando pasword
      // para buscar en la base de datos
      const hash = createHash("sha256");
      hash.update(arr[1]);
      const hashInBase64 = hash.toString("base64");

      // objeto con las credenciales
      let objreq = { username: arr[0], password: hashInBase64 };

      // variabla almacenara el resultado de la consulta
      let obj;

      // buscar en la base de datos si existe un registo con los dato ingresado
      try {
        obj = await Encargado.where(
          { usuario: objreq.username, clave: objreq.password },
        ).first();
      } catch (error) {
        // respuesta del servidor con 500 por algun error al momento de conectar a la base de datos
        await req.respond({
          status: 500,
          headers: new Headers({
            "content-type": "application/json",
          }),
          body: mensajesError.msg500,
        });
      }

      // validando la obtencion del registro
      if (obj === undefined) {
        // respondiendo a la peticion con un error 404 por que no existe un registo en
        // la base de datos con esas credenciales
        await req.respond({
          status: 404,
          headers: new Headers({
            "content-type": "application/json",
          }),
          body: mensajesError.msg404,
        });
      }
      // creando un variable de entorno para poder pasar a login y generar token
      await Deno.env.set("IDAUTH", obj.id_encargado);
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
      // porque no se esta usando la auth basic en el la solicitud
      await req.respond({
        status: 401,
        headers: new Headers({
          "content-type": "application/json",
        }),
        body: mensajesError.msg401,
      });
    }
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
    // porque no se esta usando ningun tipo de autorizacion
    await req.respond({
      status: 401,
      headers: new Headers({
        "content-type": "application/json",
      }),
      body: mensajesError.msg401,
    });
  }
};

// exportando middelware
export default authBasica;
