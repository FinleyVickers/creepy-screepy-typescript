// Harvester

export var roleHarvester = {
    // go to source and harvest
    run: function(creep: Creep) {
        if(creep.memory.role == 'harvester') {
            // find closest source
            const sources = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE)
            if (sources) {
                if (creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources, { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 50 });
                }
            }
        }
    }
};
