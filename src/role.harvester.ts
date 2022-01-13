// Harvester

export var roleHarvester = {
    // go to source and harvest
    run: function(creep: Creep) {
        if(creep.memory.role == 'harvester') {
            // find closest source
            const sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
    }
};
