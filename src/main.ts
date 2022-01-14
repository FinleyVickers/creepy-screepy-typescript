import { ErrorMapper } from "utils/ErrorMapper";
import { roleHarvester } from "role.harvester";
import { roleUpgrader } from "role.upgrader";
import { roleHauler } from "role.hauler";
import { roleBuilder } from "role.builder";
import { roleRepairer } from "role.repairer";
import { construction } from "constructionManager";

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
  let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
  let haulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler');
  let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
  let builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
  let repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }

  if (harvesters.length < 2) {
    var newName = 'Harvester' + Game.time;
    Game.spawns['Spawn1'].spawnCreep([WORK, WORK, MOVE], newName, {
      memory: {role: 'harvester'}
    });
  } else if (haulers.length < 2) {
    var newName = 'Hauler' + Game.time;
    Game.spawns['Spawn1'].spawnCreep([CARRY, MOVE, CARRY, MOVE], newName, {
      memory: {role: 'hauler'}
    });
  } else if (upgraders.length < 4) {
    var newName = 'Upgrader' + Game.time;
    Game.spawns['Spawn1'].spawnCreep([WORK, MOVE, CARRY, MOVE], newName , {
      memory: {role: 'upgrader', upgrading: false}
    });
  } else if (builders.length < 4) {
    var newName = 'Builder' + Game.time;
    Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE], newName, {
      memory: {role: 'builder', building: false}
    });
  } else if (repairers.length < 2) {
    var newName = 'Repairer' + Game.time;
    Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE], newName, {
      memory: {role: 'repairer', repairing: false}
    });
  }

for (var name in Game.creeps) {

  var creep = Game.creeps[name];

  if (creep.memory.role == 'harvester') {

      roleHarvester.run(creep);
      continue
  }
  if (creep.memory.role == 'upgrader') {

      roleUpgrader.run(creep);
      //construction.findPaths(creep);
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
      continue
  }
}

});
