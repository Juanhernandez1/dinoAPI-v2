import { Model, DataTypes, Relationships } from "denodb";
import habitad from "./habitad.js";
import dinosaurios from "./dinosaurios.js";
import encargado from "./encargado.js";
import sector from "./sector.js";
import dinoPsector from "./dinoPsector.js";

const Habitad = habitad(Model, DataTypes);
const Dinosaurios = dinosaurios(Model, DataTypes, Relationships, Habitad);
const Encargado = encargado(Model, DataTypes);
const Sector = sector(Model, DataTypes, Relationships, Encargado);
const DinoPsector = dinoPsector(
  Model,
  DataTypes,
  Relationships,
  Sector,
  Encargado,
);

export {
  DinoPsector,
  Habitad,
  Dinosaurios,
  Encargado,
  Sector,
};
