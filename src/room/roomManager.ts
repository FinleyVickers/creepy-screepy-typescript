import { FindEmptySites } from "room/buildings/construction/RoadManager"
import { PlaceContainersByController } from "room/buildings/construction/spawnContainerManager"
import { CheckIfContainerIsNeeded } from "room/buildings/ContainerManager"
import { TowerStuff } from "room/buildings/towerManager"
import { creepRun } from "room/creep/creepManagers/creepManager"

/*
    calls are functions in the room
*/

export function roomFuctions()
{
    const room = Game.spawns.Spawn1.room

    //getting the spawn
    const spawn: StructureSpawn = Game.spawns.Spawn1

    var controller : StructureController | undefined = room.controller

    //getting the tower
    let towers: StructureTower[] = room.find(FIND_MY_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_TOWER);
        }
    });

    for (var tower in towers) {
        TowerStuff(room, towers[tower])
    }

    //how often FindEmptySites runs

    const waitTime = 50

    // If the remainder of dividing the current game time by some value is 0, then its been some amount of ticks

    if (Game.time % waitTime == 0) {
        FindEmptySites(room, spawn)
    }

    const wt = 15
    if (controller != undefined)
    {
        if (Game.time % wt == 0) {
            if (CheckIfContainerIsNeeded(room)) {

                PlaceContainersByController(controller, room, spawn)
            }
        }
    }

    creepRun(room, spawn)
}
