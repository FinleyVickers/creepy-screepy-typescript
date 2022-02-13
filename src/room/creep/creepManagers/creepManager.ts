import { roleHarvester } from "../harvester";
import { roleHauler } from "room/creep/hauler"
import { roleRepairer } from "room/creep/repairer"
import { SpawnInCreep } from "room/creep/spawning/spawningRequest"
import { roleUpgrader } from "room/creep/upgrader"
import { roleBuilder } from "../builder";

/*
    To run all creep related functions
*/
export function creepRun(room: Room, spawn: StructureSpawn)
{
    // displaying what type of creep is spawning
    if (Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            { align: 'left', opacity: 0.8 });
    }

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if (creep.memory.role == 'hauler') {
            roleHauler.run(creep);
        }
        if (creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
    }

    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name]
            console.log('Clearing non-existing creep memory:', name)
        }
    }

    SpawnInCreep(room, spawn)
}
