import controllers from "../controllers/index.js";

const {
  getHabitad,
  getHabitadID,
  ingresarHabitad,
  actualizarHabitad,
  eliminarHabitadID,
} = controllers.ControlHabitades;

// creando rutas
export default function HabitadRouter(createRouter, contentTypeFilter) {
  const router = createRouter();

  router.get("/todos", getHabitad);

  router.get(new RegExp("^/buscar/(.+)"), getHabitadID);

  router.post(
    "/ingresar",
    contentTypeFilter("application/json"),
    ingresarHabitad,
  );

  router.put(
    "/actualizar",
    contentTypeFilter("application/json"),
    actualizarHabitad,
  );

  router.delete(new RegExp("^/eliminar/(.+)"), eliminarHabitadID);

  return router;
}
