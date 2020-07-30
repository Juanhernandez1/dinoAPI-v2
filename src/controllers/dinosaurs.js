// funciones para realizar CRUD
export default function controlDinosaurios(Dinosaurios) {
  const getDinosaurios = async (req) => {
    const objetos = await Dinosaurios.all();
    await req.respond({
      status: 200,
      headers: new Headers({
        "content-type": "application/json",
      }),
      body: JSON.stringify(objetos),
    });
  };

  const getDinosauriosID = async (req) => {
    const [_, id] = req.match;
    const objetos = await Dinosaurios.find(id);
    await req.respond({
      status: 200,
      headers: new Headers({
        "content-type": "application/json",
      }),
      body: JSON.stringify(objetos),
    });
  };

  const insertDino = async (req) => {
    console.log(req);
    const bodyJson = await req.json();
    console.log(bodyJson);

    await Dinosaurios.create(bodyJson);

    await req.respond({
      status: 200,
      headers: new Headers({
        "content-type": "application/json",
      }),
      body: JSON.stringify(
        {
          mensaje: "los datos an sido ingresados",
          datos: bodyJson,
        },
      ),
    });
  };

  const actualizardino = async (req) => {
    const bodyJson = await req.json();
    console.log(bodyJson);

    const dato = {
      nombre: bodyJson.nombre,
      altura: bodyJson.altura,
      id_abitad: bodyJson.id_abitad,
      alimento: bodyJson.alimento,
    };
    console.log(dato);

    await Dinosaurios.where("id_dino", bodyJson.id_dino).update(dato);

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

  const eliminarDinoID = async (req) => {
    const [_, id] = req.match;

    await Dinosaurios.where("id_dino", id).delete();

    await req.respond({
      status: 200,
      headers: new Headers({
        "content-type": "application/json",
      }),
      body: JSON.stringify({ mensaje: "dinosaurio a sido eliminado" }),
    });
  };

  return {
    getDinosaurios,
    getDinosauriosID,
    insertDino,
    actualizardino,
    eliminarDinoID,
  };
}
