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
                const extensions = creep.room.find(FIND_MY_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                            || structure.structureType == STRUCTURE_TOWER && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                            || structure.structureType == STRUCTURE_STORAGE && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                const closestExtension = creep.pos.findClosestByRange(extensions);
                if (closestExtension) {
                    if (creep.transfer(closestExtension, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(closestExtension, { visualizePathStyle: { stroke: '#ffaa00' } });
                    }
                }
            }
        }
    }
};
