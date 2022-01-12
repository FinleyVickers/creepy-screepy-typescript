// Builder logic. Automatically build structures.


import { ErrorMapper } from 'utils/ErrorMapper';


export const builder = ErrorMapper.wrapLoop(() => {
    // if working = true then go to nearest source and harvest it, if not then go to nearest controller and upgrade it
    for (const name in Game.creeps) {
        const creep = Game.creeps[name];
        if (creep.memory.role == "builder") {
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
                const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if (targets.length) {
                    if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0]);
                    }
                }
                else {
                    creep.memory.working = false;
                }
            }
        }
    }
});
