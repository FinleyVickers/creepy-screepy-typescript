// Tower logic


export class Tower {
    public static defendRoom(tower: StructureTower) {
        var hostiles = Game.rooms['E32N9'].find(FIND_HOSTILE_CREEPS);
        if(hostiles.length > 0) {
            var username = hostiles[0].owner.username;
            Game.notify(`User ${username} spotted in room E32N9`);
            //var towers = Game.rooms['E32N9'].find(
            //    FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
            tower.attack(hostiles[0]);
        }
    }
    public static repair(tower: StructureTower) {
        const target = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: structure => structure.hits < structure.hitsMax
        });
        if (target) {
            tower.repair(target);
        }
    }
}

/*
function defendRoom(towers :StructureTower) {
    var hostiles = Game.rooms['E32N9'].find(FIND_HOSTILE_CREEPS);
    if(hostiles.length > 0) {
        var username = hostiles[0].owner.username;
        Game.notify(`User ${username} spotted in room E32N9`);
        //var towers = Game.rooms['E32N9'].find(
        //    FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
        towers.attack(hostiles[0]);
    }
}
*/
