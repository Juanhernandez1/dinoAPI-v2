// funciones para realizar CRUD
export default function controlHabitades(Habitad) {
  const getHabitad = async (req) => {
    const objetos = await Habitad.all();
    await req.respond({
      status: 200,
      headers: new Headers({
        "content-type": "application/json",
      }),
      body: JSON.stringify(objetos),
    });
  };

  const getHabitadID = async (req) => {
    const [_, id] = req.match;
    const objetos = await Habitad.find(id);
    await req.respond({
      status: 200,
      headers: new Headers({
        "content-type": "application/json",
      }),
      body: JSON.stringify(objetos),
    });
  };

  const ingresarHabitad = async (req) => {
    const bodyJson = await req.json();
    console.log(bodyJson);

    await Habitad.create(bodyJson);

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

  const actualizarHabitad = async (req) => {
    const bodyJson = await req.json();
    console.log(bodyJson);

    const dato = {
      nombre: bodyJson.nombre,
      descripcion : bodyJson.descripcion 
    };
    console.log(dato);

    await Habitad.where("id_abitad", bodyJson.id_abitad).update(dato);

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

  const eliminarHabitadID = async (req) => {
    const [_, id] = req.match;
    console.log(id);
    try {
      await Habitad.where("id_abitad", id).delete();

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
    getHabitad,
    getHabitadID,
    ingresarHabitad,
    actualizarHabitad,
    eliminarHabitadID,
  };
}
