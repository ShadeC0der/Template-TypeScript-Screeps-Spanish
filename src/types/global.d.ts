// Extensiones de tipos globales de Screeps
// Agrega aquí tus propiedades personalizadas para Memory, Creeps, etc.

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Memory {
    // Ejemplo: stats?: GameStats;
  }

  interface CreepMemory {
    role: string;
    // Ejemplo: working?: boolean;
  }

  // Puedes extender otras interfaces según necesites:
  // interface RoomMemory {}
  // interface SpawnMemory {}
}

// Necesario para que TypeScript trate este archivo como un módulo
export {};
