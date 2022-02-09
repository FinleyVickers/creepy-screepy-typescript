import { generalFuncs } from "Global/globalFuncs";

export function spawnManager() {
  let newName;

  let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
  let haulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler');
  let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
  let builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
  let repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
  let constructionSites = generalFuncs.room?.find(FIND_CONSTRUCTION_SITES);
  if (harvesters.length < 4) {
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
  } else if (constructionSites?.length && builders.length < 4) {
    newName = 'Builder' + Game.time;
    Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE], newName, {
      memory: {role: 'builder', building: false}
    });
  } else if (constructionSites?.length && repairers.length < 4) {
    newName = 'Repairer' + Game.time;
    Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE], newName, {
      memory: {role: 'repairer', repairing: false}
    });
  }
}
