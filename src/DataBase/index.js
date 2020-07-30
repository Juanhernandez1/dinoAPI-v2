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
// const ADMINDB = Deno.env.get("DB");

// objeto de configuracion para acceder poder conectarse a la base de datos
const config = {
  username: "oqcgvltkjnstvv",
  database: "d7p33dt3nmmk1o",
  host: "ec2-3-208-50-226.compute-1.amazonaws.com",
  password: "cdad51ce494d7d4660e0eeb7bd8c2653dd379994c7ce38c62b76e615933a23e8",
  port: "5432",
};

// instanciado conecion a la base de datos
const db = new Database("postgres", {
  uri:
    "postgres://oqcgvltkjnstvv:cdad51ce494d7d4660e0eeb7bd8c2653dd379994c7ce38c62b76e615933a23e8@ec2-3-208-50-226.compute-1.amazonaws.com:5432/d7p33dt3nmmk1o",
  username: "oqcgvltkjnstvv",
  database: "d7p33dt3nmmk1o",
  host: "ec2-3-208-50-226.compute-1.amazonaws.com",
  password: "cdad51ce494d7d4660e0eeb7bd8c2653dd379994c7ce38c62b76e615933a23e8",
});

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
