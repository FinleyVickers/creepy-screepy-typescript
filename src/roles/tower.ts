// Tower logic


export class Tower {
    public static attack(tower: StructureTower) {
        const target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target) {
            tower.attack(target);
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
