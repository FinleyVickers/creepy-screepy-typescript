// Upgrader role

export var roleUpgrader = {
    // upgrade controller
    run: function(creep: Creep) {
        if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }

        if (creep.memory.upgrading) {
            const controller = creep.room.controller;
            if (controller){
                if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(controller, { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        } else {
            const droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES, {
                filter: resource => resource.resourceType == RESOURCE_ENERGY
            })

            const closestDroppedEnergy = creep.pos.findClosestByRange(droppedEnergy)
            if (closestDroppedEnergy) {
                if (creep.pickup(closestDroppedEnergy) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestDroppedEnergy, { visualizePathStyle: { stroke: '#ffaa00' } });
                }
            }
        }
    }
};
