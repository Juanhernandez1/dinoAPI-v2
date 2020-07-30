// funciones para realizar CRUD
export default function controlEncargados(Encargado, createHash) {
  const getEncargado = async (req) => {
    const objetos = await Encargado.all();

    await req.respond({
      status: 200,
      headers: new Headers({
        "content-type": "application/json",
      }),
      body: JSON.stringify(objetos),
    });
  };

  const getEncargadoID = async (req) => {
    const [_, id] = req.match;
    const objetos = await Encargado.find(id);
    await req.respond({
      status: 200,
      headers: new Headers({
        "content-type": "application/json",
      }),
      body: JSON.stringify(objetos),
    });
  };

  const ingresarEncargado = async (req) => {
    const bodyJson = await req.json();
    console.log(bodyJson);

    const hash = await createHash("sha256");
    await hash.update(bodyJson.clave);
    const hashInBase64 = hash.toString("base64");
    console.log(hashInBase64);

    bodyJson.clave = hashInBase64;
    console.log(bodyJson);

    await Encargado.create(bodyJson);

    await req.respond({
      status: 200,
      headers: new Headers({
        "content-type": "application/json",
      }),
      body: JSON.stringify(
        {
          mensaje: "los datos se an ingresados",
          datos: bodyJson,
        },
      ),
    });
  };

  const actualizarEncargado = async (req) => {
    const bodyJson = await req.json();
    console.log(bodyJson);

    const hash = await createHash("sha256");
    await hash.update(bodyJson.clave);
    const hashInBase64 = hash.toString("base64");
    console.log(hashInBase64);

    bodyJson.calve = hashInBase64;

    const dato = {
      nombre: bodyJson.nombre,
      usuario: bodyJson.usuario,
      clave: bodyJson.calve,
    };
    console.log(dato);

    await Encargado.where("id_encargado", bodyJson.id_encargado).update(dato);

    await req.respond({
      status: 200,
      headers: new Headers({
        "content-type": "application/json",
      }),
      body: JSON.stringify(
        {
          mensaje: "los datos an sido Actualizados",
          datos: bodyJson,
        },
      ),
    });
  };

  const eliminarEncargadoID = async (req) => {
    const [_, id] = req.match;
    console.log(id);
    try {
      await Encargado.where("id_encargado", id).delete();

      await req.respond({
        status: 200,
        headers: new Headers({
          "content-type": "application/json",
        }),
        body: JSON.stringify({ mensaje: "El registo a sido eliminado" }),
      });
    } catch (error) {
      await req.respond({
        status: 200,
        headers: new Headers({
          "content-type": "application/json",
        }),
        body: JSON.stringify(
          {
            mensaje:
              "a ocurrido un error el puede estar siendo usado en otras tablas",
          },
        ),
      });
    }
  };

  return {
    getEncargado,
    getEncargadoID,
    ingresarEncargado,
    actualizarEncargado,
    eliminarEncargadoID,
  };
}
