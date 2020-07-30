// lista los mesajes personalizados segun el tipo de error mas comun
let mensajesError = {
  msg401: JSON.stringify(
    {
      error: "401",
      mensaje: "No Esta Autorizado Debe logear antes de realziar una solicitud",
    },
  ),
  msg404: JSON.stringify(
    {
      error: "404",
      mensaje: "no existe el recurso que ha sido pedido",
      otros: "no se a podido acceder a la base de datos",
    },
  ),
  msg500: JSON.stringify(
    {
      status: 500,
      body: "Error Interno del Servidor Intente Mas Tarde",
    },
  ),
};

// exportando lista de mensajes
export default mensajesError;
