// Upgrader logic, go to nearest source and collect energy, then upgrade controller

import { ErrorMapper } from 'utils/ErrorMapper';


export const upgrader = ErrorMapper.wrapLoop(() => {
    // Harvest energy. If working = true then go to nearest controller and upgrade it
    for (const name in Game.creeps) {
        const creep = Game.creeps[name];
        if (creep.memory.role == "upgrader") {
            if (creep.memory.working == false) {
                const sources = creep.room.find(FIND_SOURCES);
                if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);
                }
                else {
                    // harvest energy
                    creep.harvest(sources[0]);
                    // if full go to nearest controller and upgrade it
                    if (creep.carry.energy == creep.carryCapacity) {
                        creep.memory.working = true;
                    }
                }
            }
            else {
                const controller = creep.room.controller;
                if (controller != undefined) {
                    if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(controller);
                    }
                    else {
                        // upgrade controller
                        creep.upgradeController(controller);
                        // if empty go to nearest source and harvest it
                        if (creep.carry.energy == 0) {
                            creep.memory.working = false;
                        }
                    }
                }
            }
        }
    }
});
