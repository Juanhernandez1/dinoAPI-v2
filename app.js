import {
  createApp,
  RoutingError,
  createRouter,
  contentTypeFilter,
  basicAuth,
} from "servest";

// Importando Manejador de Errores
import ErrorControl from "./src/errors/index.js";

// Importando middelware para untenticasion
import authBasica from "./src/middleware/authBasica.js";

// Importando middelware para siguiente paso de autenticasion
import authToken from "./src/middleware/authToken.js";

// Importando Middelware para Uatenticasion
import getLoginData from "./src/controllers/login.js";

// Importando Rutas
import rutas from "./src/routes/routes.js";
const { DinoRouter, EncargadoRouter } = rutas;

// Importando Conexión a la Base de Datos se Ejecución al Arranque del Servidor
import db from "./src/DataBase/index.js";

// Creando Aplicación
const app = createApp();

// Definir controlador de errores global para la Aplicación
app.catch(ErrorControl(RoutingError));

// Definir Middleware's Global para uso de Basic Auth en la Aplicación
// El Cual Sera Llamado en tododas las peticiones
app.use(authBasica);

// Definir Middleware's Global para uso de Web Token en la Aplicación
// El Cual Sera Llamado en tododas las peticiones
// Realice la autenticación antes de manejar la solicitud en rutas
// al realizar login risivira el token de acceso puede copiar y enviarlo
// cabecera > auth_token = token
// o se leera de una cookie
app.use(authToken);

// Ruta de login
app.route("/login", getLoginData);

// Rutas
app.route("/Encargados", EncargadoRouter(createRouter, contentTypeFilter));
app.route("/Dinosaurios", DinoRouter(createRouter, contentTypeFilter));

// Puerto de escucha
const port = Number(Deno.env.get("PORT"));

// servidor en ejecucion
app.listen({ port });
