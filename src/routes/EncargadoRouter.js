import controllers from "../controllers/index.js";

const {
  getEncargado,
  getEncargadoID,
  ingresarEncargado,
  actualizarEncargado,
  eliminarEncargadoID,
} = controllers.ControlEncargados;

// creando rutas
export default function EncargadoRouter(createRouter, contentTypeFilter) {
  const router = createRouter();

  router.get("/todos", getEncargado);

  router.get(new RegExp("^/buscar/(.+)"), getEncargadoID);

  router.post(
    "/ingresar",
    contentTypeFilter("application/json"),
    ingresarEncargado,
  );

  router.put(
    "/actualizar",
    contentTypeFilter("application/json"),
    actualizarEncargado,
  );

  router.delete(new RegExp("^/eliminar/(.+)"), eliminarEncargadoID);

  return router;
}
