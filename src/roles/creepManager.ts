import {roleHarvester} from "./role.harvester";
import {roleUpgrader} from "./role.upgrader";
import {roleHauler} from "./role.hauler";
import {roleBuilder} from "./role.builder";
import {roleRepairer} from "./role.repairer";

export function creepRole (creep :Creep) {
  if (creep.memory.role == 'harvester') {
    roleHarvester.run(creep);
  }
  else if (creep.memory.role == 'upgrader') {
    roleUpgrader.run(creep);
  }
  else if (creep.memory.role == 'hauler') {
    roleHauler.run(creep);
  }
  else if (creep.memory.role == 'builder') {
    roleBuilder.run(creep);
  }
  else if (creep.memory.role == 'repairer') {
    roleRepairer.run(creep);
  }
}
