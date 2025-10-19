// No Borrar ya que se encarga de mapear los errores correctamente
import { ErrorMapper } from "utils/ErrorMapper";

// Loop principal - Se ejecuta cada tick del juego
export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Tick: ${Game.time}`);
});
