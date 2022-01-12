// Hauler role logic. Move energy from harvesters and builders to containers.

import { ErrorMapper } from 'utils/ErrorMapper';


export const hauler = ErrorMapper.wrapLoop(() => {
    // if working = true then go to nearest builder/harvester and harvest it, if not then go to nearest container and transfer energy
    for (const name in Game.creeps) {
        const creep = Game.creeps[name];
        if (creep.memory.role == "hauler") {
            if (creep.memory.working == false) {
                const sources = creep.room.find(FIND_SOURCES);
                if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);
                }
                else {
                    // harvest energy
                    creep.harvest(sources[0]);
                    creep.memory.working = true;
                }
            }
            else {
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
                else {
                    creep.memory.working = false;
                }
            }
        }
    }
});
