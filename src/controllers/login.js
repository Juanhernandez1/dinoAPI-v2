import { validateJwt } from "https://deno.land/x/djwt/validate.ts";
import { makeJwt, setExpiration } from "https://deno.land/x/djwt/create.ts";

// importando modelos
import { Encargado } from "../model/index.js";

// funciones para logearse y obtener el token de acceso
const getLoginData = async (req) => {
  // obteniendo datos de autenticasion
  const cook = Deno.env.get("IDAUTH");

  let obj;
  // busacar en la base de datos si existe un registo con los dato ingresado
  try {
    obj = await Encargado.find(cook);
  } catch (error) {
    // Responded request won't be passed to the next middleware
    await req.respond({
      status: 404,
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

  const jwt = await makeJwt({ key, header, payload });
  console.log("JWT:", jwt);

  req.setCookie(
    "auth",
    JSON.stringify({ auth: true, id: obj.id_encargado, token: jwt }),
    {
      path: "/",
      httpOnly: true,
      maxAge: 5 * 60 * 1000, // 30min
    },
  );
  // eliminar variable del entorno
  Deno.env.delete("IDAUTH");

  await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "application/json",
    }),
    body: JSON.stringify({ auth: true, id: obj.id_encargado, token: jwt }),
  });
};

export default getLoginData;
