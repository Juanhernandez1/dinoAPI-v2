// funciones para realizar CRUD
export default function controlSectores(Sector) {
  const getSector = async (req) => {
    const objetos = await Sector.all();
    await req.respond({
      status: 200,
      headers: new Headers({
        "content-type": "application/json",
      }),
      body: JSON.stringify(objetos),
    });
  };

  const getSectorID = async (req) => {
    const [_, id] = req.match;
    const objetos = await Sector.find(id);
    await req.respond({
      status: 200,
      headers: new Headers({
        "content-type": "application/json",
      }),
      body: JSON.stringify(objetos),
    });
  };

  const ingresarSector = async (req) => {
    const bodyJson = await req.json();
    console.log(bodyJson);

    await Sector.create(bodyJson);

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

  const actualizarSector = async (req) => {
    const bodyJson = await req.json();
    console.log(bodyJson);

    const dato = {
      nombre: bodyJson.nombre,
      id_encargado: bodyJson.id_encargado
    };
    console.log(dato);

    await Sector.where("id_sector", bodyJson.id_sector).update(dato);

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

  const eliminarSectorID = async (req) => {
    const [_, id] = req.match;
    console.log(id);
    try {
      await Sector.where("id_sector", id).delete();

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
    getSector,
    getSectorID,
    ingresarSector,
    actualizarSector,
    eliminarSectorID,
  };
}
