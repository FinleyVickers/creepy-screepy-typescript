// Hauler role

export var roleHauler = {
    // go to dropped resources and pickup, if full then go to spawn and drop off resources. If spawn is full stay at spawn
    run: function(creep: Creep) {
        if(creep.memory.role == 'hauler') {
            // find closest dropped resource
            const droppedResources = creep.room.find(FIND_DROPPED_RESOURCES, {
                filter: resource => resource.resourceType == RESOURCE_ENERGY
            });
            const closestDroppedEnergy= creep.pos.findClosestByRange(droppedResources);
            if (creep.store.getFreeCapacity() > 0 && closestDroppedEnergy) {
                if (creep.pickup(closestDroppedEnergy) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestDroppedEnergy, { visualizePathStyle: { stroke: '#ffaa00' } });
                }
            } else {
                const spawns = creep.room.find(FIND_MY_SPAWNS)

                const closestSpawn = creep.pos.findClosestByRange(spawns)
                if (closestSpawn) {
                    if (creep.transfer(closestSpawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(closestSpawn, { visualizePathStyle: { stroke: '#ffaa00' } });
                    }
                }
            }
        }
    }
};
