// Repairer role

export var roleRepairer = {
    // repair damaged structures
    run: function(creep: Creep) {
        if (creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.repairing = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.repairing && creep.store.getFreeCapacity() == 0){
            creep.memory.repairing = true;
            creep.say('🛠️ repairing')
        }

        if (creep.memory.repairing) {
            // find closest damaged structure
            const damagedStructures = creep.room.find(FIND_STRUCTURES, {
                // filter: (structure) => structure.hits < structure.hitsMax
                filter: (structure) => structure.hits < structure.hitsMax * 0.8
            });
            const closestDamagedStructure = creep.pos.findClosestByRange(damagedStructures);
            if (closestDamagedStructure) {
                if (creep.repair(closestDamagedStructure) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestDamagedStructure);
                }
            }
        } else {
            // harvest energy from source
            const sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
    }
};
