// Harvester logic, if working = true then go to nearest source and harvest it, if not then go to nearest controller and upgrade it

import { ErrorMapper } from 'utils/ErrorMapper';


export const harvester = ErrorMapper.wrapLoop(() => {
    // if working = true then go to nearest source and harvest it, if not then go to nearest controller and upgrade it
    for (const name in Game.creeps) {
        const creep = Game.creeps[name];
        if (creep.memory.role == "harvester") {
            const sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.memory.working = false;
                creep.moveTo(sources[0]);
            }
            else {
                creep.memory.working = true;
                // harvest energy
                creep.harvest(sources[0]);
                // if full go to nearest container and transfer energy
                if (creep.carry.energy == creep.carryCapacity) {
                    const containers = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_CONTAINER) &&
                                structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
                        }
                    });
                    if (containers.length > 0) {
                        if (creep.transfer(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(containers[0]);
                        }
                    }
                }
            }
        }
    }
});
