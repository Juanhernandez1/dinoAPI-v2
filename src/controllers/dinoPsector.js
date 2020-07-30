// funciones para realizar CRUD
export default function controlDinoPsectores(DinoPsector) {
  const getDinoPsector = async (req) => {
    const objetos = await DinoPsector.all();
    await req.respond({
      status: 200,
      headers: new Headers({
        "content-type": "application/json",
      }),
      body: JSON.stringify(objetos),
    });
  };

  const getDinoPsectorID = async (req) => {
    const [_, id] = req.match;
    const [ids,idp]=id.split(",");
  const objetos =  await DinoPsector.where({ id_sector: ids, id_dino: idp }).get();
    await req.respond({
      status: 200,
      headers: new Headers({
        "content-type": "application/json",
      }),
      body: JSON.stringify(objetos),
    });
  };

  const ingresarDinoPsector = async (req) => {
    const bodyJson = await req.json();
    console.log(bodyJson);

    await DinoPsector.create(bodyJson);

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

  const eliminarDinoPsectorID = async (req) => {
    const [_, id] = req.match;
    const [ids,idp]=id.split(",");
    try {
      await DinoPsector.where({ id_sector: ids, id_dino: idp }).delete();

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
    getDinoPsector,
    getDinoPsectorID,
    ingresarDinoPsector,
    eliminarDinoPsectorID,
  };
}
