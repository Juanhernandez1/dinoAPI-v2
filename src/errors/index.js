import mensajesError from "./mensajesError.js";

// Funciopn para maejo de errores
// recibe como parametro RoutingError un metodo se servest para detectar los errores en las rutas
function ErrorControl(RoutingError) {
  return async (e, req) => {
    // Todos los errores no detectados y los rechazos de las rutas estarán aquí.
    if (e instanceof RoutingError && e.status === 404) {
      // RoutingError es lanzado por el enrutador.
      // Normalmente, cuando ningún middleware respondió a la solicitud.
      // la siguiente linea es por si se mistrar una pagina para indicar el error
      //  y esta comentada por que una API solo se mostrar el error en un json
      //  const errorPage = await Deno.open("./public/error.html");

      try {
        await req.respond({
          status: 404,
          headers: new Headers({
            "content-type": "application/json",
          }),
          body: mensajesError.msg404,
        });
      } catch (e) {
        console.log(e);
      }
      //finally {
      //  errorPage.close();
      //}
    } else {
      await req.respond({
        status: 500,
        headers: new Headers({
          "content-type": "application/json",
        }),
        body: mensajesError.msg500,
      });
    }
  };
}

// exportando funcion para manejo de errores
export default ErrorControl;
