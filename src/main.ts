import { ErrorMapper } from "utils/ErrorMapper";
import { TowerStuff } from "./roles/tower";
import { spawnManager } from "./room/spawnManager";
import { creepRole } from "./roles/creepManager";
import { PixelMake } from "./Global/pixelGen"

declare global {
  interface CreepMemory {
    role: string;
    upgrading?: boolean;
    working?: boolean;
    building?: boolean;
    repairing?: boolean;
  }
}


// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code

export const loop = ErrorMapper.wrapLoop(() => {

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }

  if (Game.time %10 == 0) {
    spawnManager();
  }

  for (let name in Game.creeps) {
    const creep = Game.creeps[name];
    creepRole(creep);
  }

  let room = Game.spawns['Spawn1'].room;
  let towers: StructureTower[] = room.find(FIND_MY_STRUCTURES, {
    filter: (structure) => {
      return (structure.structureType == STRUCTURE_TOWER);
    }
  });

  for (const tower in towers) {
    TowerStuff(room, towers[tower])
  }

  PixelMake()
});
