import controllers from "../controllers/index.js";

const {
  getDinoPsector,
  getDinoPsectorID,
  ingresarDinoPsector,
  eliminarDinoPsectorID,
} = controllers.ControlDinoPsectores;

// creando rutas
export default function DinoPsectorRouter(createRouter, contentTypeFilter) {
  const router = createRouter();

  router.get("/todos", getDinoPsector);

  router.get(new RegExp("^/buscar/(.+)"), getDinoPsectorID);

  router.post(
    "/ingresar",
    contentTypeFilter("application/json"),
    ingresarDinoPsector,
  );

  router.delete(new RegExp("^/eliminar/(.+)"), eliminarDinoPsectorID);

  return router;
}
