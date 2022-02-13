/*
 This script handles the code for the harvester class
*/

import { all, filter } from "lodash";


export var roleHarvester = {

    run: function (creep: Creep) {

        var sources = creep.room.find(FIND_SOURCES)

        const closestSource = creep.pos.findClosestByRange(sources)

        if (creep.harvest(closestSource) == ERR_NOT_IN_RANGE)
        creep.moveTo(closestSource, { visualizePathStyle: { stroke: '#ffaa00' } })
/*
        var containers : StructureContainer[] = creep.room.find(FIND_STRUCTURES, {
            filter: { structureType: STRUCTURE_CONTAINER }
        })

        const closestContainer: StructureContainer = creep.pos.findClosestByPath(containers)*/

/*        if (!closestContainer) {
            if (creep.harvest(closestSource) == ERR_NOT_IN_RANGE)
                creep.moveTo(closestSource, { visualizePathStyle: { stroke: '#ffaa00' } })
            return
        }

        if (creep.pos.getRangeTo(closestContainer.pos) == 0) {
            creep.harvest(closestSource)
            return
        }

        creep.moveTo(closestContainer, { visualizePathStyle: { stroke: '#ffaa00' } })*/

    }
};


