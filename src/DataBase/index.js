// importando orm
import { Database } from "denodb";
// importando modelos
import {
  DinoPsector,
  Habitad,
  Dinosaurios,
  Encargado,
  Sector,
} from "../model/index.js";

// gestor de base de datos
const ADMINDB = Deno.env.get("DB");

// objeto de configuracion para acceder poder conectarse a la base de datos
const config = {
  username: Deno.env.get("USER"),
  database: Deno.env.get("DBNAME"),
  host: Deno.env.get("HOST"),
  password: Deno.env.get("PASS"),
  port: Number(Deno.env.get("PORTDB")),
};

// instanciado conecion a la base de datos
const db = new Database(ADMINDB, config);

// comprobando la conecion
db.ping().then((val) => {
  if (val) {
    db.link([
      DinoPsector,
      Encargado,
      Habitad,
      Dinosaurios,
      Sector,
    ]);
  }
}).catch((err) => {
  console.log("no se puede conectar a la base de datos");
});

// exportando conecion
export default db;
