import controllers from "../controllers/index.js";

const {
  getDinosaurios,
  getDinosauriosID,
  insertDino,
  actualizardino,
  eliminarDinoID,
} = controllers.ControlDinosaurios;

// creando rutas
export default function DinoRouter(createRouter, contentTypeFilter) {
  const router = createRouter();

  router.get("/todos", getDinosaurios);

  router.get(new RegExp("^/buscar/(.+)"), getDinosauriosID);

  router.post(
    "/ingresar",
    contentTypeFilter("application/json"),
    insertDino,
  );

  router.put(
    "/actualizar",
    contentTypeFilter("application/json"),
    actualizardino,
  );

  router.delete(new RegExp("^/eliminar/(.+)"), eliminarDinoID);

  return router;
}
