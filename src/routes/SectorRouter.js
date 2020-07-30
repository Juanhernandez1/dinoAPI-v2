import controllers from "../controllers/index.js";

const {
  getSector,
  getSectorID,
  ingresarSector,
  actualizarSector,
  eliminarSectorID,
} = controllers.ControlSectores;

// creando rutas
export default function SectorRouter(createRouter, contentTypeFilter) {
  const router = createRouter();

  router.get("/todos", getSector);

  router.get(new RegExp("^/buscar/(.+),(.+)"), getSectorID);

  router.post(
    "/ingresar",
    contentTypeFilter("application/json"),
    ingresarSector,
  );

  router.put(
    "/actualizar",
    contentTypeFilter("application/json"),
    actualizarSector,
  );

  router.delete(new RegExp("^/eliminar/(.+),(.+)"), eliminarSectorID);

  return router;
}
