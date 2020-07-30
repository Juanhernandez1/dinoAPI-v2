import { createHash } from "https://deno.land/std/hash/mod.ts";
// importando modelos
import {
  DinoPsector,
  Habitad,
  Dinosaurios,
  Encargado,
  Sector,
} from "../model/index.js";
// importando los diferente controladores 
import controlDinosaurios from "./dinosaurs.js";
import controlEncargados from "./encargado.js";
import controlSectores from "./sectores.js"
import controlHabitades from "./habitad.js"
import controlDinoPsectores from "./dinoPsector.js"

// objeto con todos los controladores 
const controllers = {
  ControlDinosaurios: controlDinosaurios(Dinosaurios),
  ControlEncargados: controlEncargados(Encargado, createHash),
  ControlSectores: controlSectores(Sector),
  ControlHabitades: controlHabitades(Habitad),
  ControlDinoPsectores: controlDinoPsectores(DinoPsector)
};
// exportando objeto con los controladores 
export default controllers;
