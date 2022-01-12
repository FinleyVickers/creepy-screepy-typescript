// Spawn in creeps for each room (ex. harvester)


import { ErrorMapper } from 'utils/ErrorMapper';

export const spawner = ErrorMapper.wrapLoop(() => {
    /* Spawn in a creep depending on controller level and amount of creeps for each room, spawn in upgraders if there is no upgraders,
    and spawn in harvesters if there are no harvesters. Base body parts on amount of energy avalible. */
    for (const roomName in Game.rooms) {
        const room = Game.rooms[roomName];
        if (room.controller) {
            if (room.controller.my) {
                const controllerLevel = room.controller.level;
                const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == "harvester" && creep.memory.room == roomName);
                const upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == "upgrader" && creep.memory.room == roomName);
                const builders = _.filter(Game.creeps, (creep) => creep.memory.role == "builder" && creep.memory.room == roomName);
                const haulers = _.filter(Game.creeps, (creep) => creep.memory.role == "hauler" && creep.memory.room == roomName);
                if (upgraders.length < 1 && room.energyAvailable >= 300) {
                    const newName = `Upgrader${Game.time}`;
                    console.log("Spawning new upgrader: " + newName);
                    Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE], newName,
                        { memory: { role: "upgrader", room: roomName, working: false } });
                }
                else if (harvesters.length < controllerLevel && room.energyAvailable >= 300) {
                    const newName = `Harvester${Game.time}`;
                    console.log("Spawning new harvester: " + newName);
                    Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE], newName,
                        { memory: { role: "harvester", room: roomName, working: false } });
                }
                // Spawn in builders if there is construction sites
                else if (builders.length < 1 && room.energyAvailable >= 300) {
                    const newName = `Builder${Game.time}`;
                    console.log("Spawning new builder: " + newName);
                    Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE], newName,
                        { memory: { role: "builder", room: roomName, working: false } });
                }
                else if (haulers.length < 1 && room.energyAvailable >= 300) {
                    const newName = `Hauler${Game.time}`;
                    console.log("Spawning new hauler: " + newName);
                    Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE], newName,
                        { memory: { role: "hauler", room: roomName, working: false } });
                }
            }
        }
    }
});
