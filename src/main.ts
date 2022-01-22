import { ErrorMapper } from "utils/ErrorMapper";
import { roleHarvester } from "roles/role.harvester";
import { roleUpgrader } from "roles/role.upgrader";
import { roleHauler } from "roles/role.hauler";
import { roleBuilder } from "roles/role.builder";
import { roleRepairer } from "roles/role.repairer";
import { TowerStuff } from "./roles/tower";

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
  let newName;
  let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
  let haulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler');
  let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
  let builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
  let repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
  //let towers = _.filter(Game.structures, (structure) => structure.structureType == STRUCTURE_TOWER);
  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }



  if (harvesters.length < 6) {
    newName = 'Harvester' + Game.time;
    Game.spawns['Spawn1'].spawnCreep([WORK, WORK, MOVE], newName, {
      memory: {role: 'harvester'}
    });
  } else if (haulers.length < 4) {
    newName = 'Hauler' + Game.time;
    Game.spawns['Spawn1'].spawnCreep([CARRY, MOVE, CARRY, MOVE], newName, {
      memory: {role: 'hauler'}
    });
  } else if (upgraders.length < 4) {
    newName = 'Upgrader' + Game.time;
    Game.spawns['Spawn1'].spawnCreep([WORK, MOVE, CARRY, MOVE], newName , {
      memory: {role: 'upgrader', upgrading: false}
    });
  } else if (builders.length < 5) {
    newName = 'Builder' + Game.time;
    Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE], newName, {
      memory: {role: 'builder', building: false}
    });
  } else if (repairers.length < 2) {
    newName = 'Repairer' + Game.time;
    Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE], newName, {
      memory: {role: 'repairer', repairing: false}
    });
  }

  for (let name in Game.creeps) {
    const creep = Game.creeps[name];

    if (creep.memory.role == 'harvester') {
      roleHarvester.run(creep);
      continue
    }
    if (creep.memory.role == 'upgrader') {

      roleUpgrader.run(creep);
      /*let controllers = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType == STRUCTURE_CONTROLLER)
        }
      });
      const path = creep.pos.findPathTo(controllers[0]);
      construction.buildRoad(Game.spawns['Spawn1'].room, path);*/
      continue
    }
    if (creep.memory.role == 'hauler') {

      roleHauler.run(creep);
      continue
    }
    if (creep.memory.role == 'builder') {

      roleBuilder.run(creep);
      continue
    }
    if (creep.memory.role == 'repairer') {

      roleRepairer.run(creep);
      //continue
    }
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

/*
  var hostiles = Game.rooms['E32N9'].find(FIND_HOSTILE_CREEPS);
  if (hostiles.length > 0) {
    Tower.defendRoom(towers);
  } else {
    Tower.repair
  }*/
});
