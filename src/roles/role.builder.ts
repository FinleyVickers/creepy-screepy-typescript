// Builder role

export var roleBuilder = {
    // build construction sites
    run: function(creep: Creep) {
        if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }

        if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('🛠️ build')
        }

        if (creep.memory.building) {
            // find construction sites
            const constructionSites = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (constructionSites.length) {
                if (creep.build(constructionSites[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(constructionSites[0], {reusePath: 20});
                }
            }
        } else {
            // harvest dropped energy
            const droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES, {
                filter: resource => resource.resourceType == RESOURCE_ENERGY
            })
            // find closest dropped energy
            const closestDroppedEnergy = creep.pos.findClosestByRange(droppedEnergy)
            if (closestDroppedEnergy) {
                if (creep.pickup(closestDroppedEnergy) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestDroppedEnergy, { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 20, ignoreCreeps: true });
                }
            }
        }
    }
};
