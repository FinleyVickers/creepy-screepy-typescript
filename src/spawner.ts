// Spawn in creeps

export var spawner = {
    // Spawn a creep
    spawnCreep: function(spawn: StructureSpawn, creepName: string, creepBody: BodyPartConstant[], creepMemory: CreepMemory) {
        // Check if the spawn is ready
        if (spawn.spawning) {
            return ERR_BUSY;
        }
        // Spawn the creep
        const result = spawn.spawnCreep(creepBody, creepName, {memory: creepMemory});
        // Return the result
        return result;
    }
};
