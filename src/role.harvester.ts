// Harvester logic, if working = true then go to nearest source and harvest it, if not then go to nearest controller and upgrade it

import { ErrorMapper } from 'utils/ErrorMapper';


export const harvester = ErrorMapper.wrapLoop(() => {
    // if working = true then go to nearest source and harvest it, if not then go to nearest controller and upgrade it
    for (const name in Game.creeps) {
        const creep = Game.creeps[name];
        if (creep.memory.role == "harvester") {
            if (creep.memory.working == false) {
                const sources = creep.room.find(FIND_SOURCES);
                if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    // Set memory working to true
                    creep.memory.working = true;
                    creep.moveTo(sources[0]);
                }
                else {
                    // harvest energy
                    creep.harvest(sources[0]);

                }
            }
        }
    }
});
