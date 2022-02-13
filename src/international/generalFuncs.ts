

interface GeneralFuncs {
    findEnergy(creep: Creep): void
}


export const generalFuncs: Partial<GeneralFuncs> = {}

// this function will find the closest energy in the area in either a container or dropped energy

generalFuncs.findEnergy = function findEnergy(creep) {
    const droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES, {
        filter: resource => resource.resourceType == RESOURCE_ENERGY
    })

    var containers = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => { structure.structureType == STRUCTURE_CONTAINER && structure.id != creep.room.memory.spawnContainerID }
    })

    if (droppedEnergy.length == 0 && containers.length == 0) {
        for (var name in Game.creeps) {
            var creep = Game.creeps[name];
            if (creep.memory.role == 'harvester') {
                return
            }
        }

        var sources = creep.room.find(FIND_SOURCES)

        const closestSource = creep.pos.findClosestByRange(sources)

        if (creep.harvest(closestSource) == ERR_NOT_IN_RANGE)
        creep.moveTo(closestSource, { visualizePathStyle: { stroke: '#ffaa00' } })
     }


    const closestdroppedEnergy = creep.pos.findClosestByRange(droppedEnergy)

    const closestContainer = creep.pos.findClosestByRange(containers)

    if (closestdroppedEnergy == null && closestContainer != null)
    {
        if (creep.withdraw(closestContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(closestContainer)
        }
        return
    }

    if (closestContainer == null && closestdroppedEnergy != null)
    {
        if (creep.pickup(closestdroppedEnergy) == ERR_NOT_IN_RANGE) {
            creep.moveTo(closestdroppedEnergy)
        }

        return
    }

    if (closestContainer != null && closestdroppedEnergy != null)
    {

        const path1 = creep.pos.findPathTo(closestdroppedEnergy.pos);
        const path2 = creep.pos.findPathTo(closestContainer.pos);



        if (path1.length > path2.length) {
            if (creep.pickup(closestdroppedEnergy) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closestdroppedEnergy)
            }
        }
        else {
            if (creep.withdraw(closestContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closestContainer)
            }
        }
    }


}
