// Construction manager. Build roads on paths to sources and controller


export var construction = {
    // Find paths to sources
    findPaths: function(creep: Creep) {
        // Find sources
        const sources = creep.room.find(FIND_SOURCES_ACTIVE);
        // Find controller
        const controller = creep.room.controller;
        // Find paths to sources
        const paths = creep.room.findPath(creep.pos, sources[0].pos, { ignoreCreeps: true });
        // Find paths to controller
        if (controller) {
            const pathsToController = creep.room.findPath(creep.pos, controller.pos, { ignoreCreeps: true });
            for (let i = 0; i < paths.length; i++) {
                const path = paths[i];
                const pathToController = pathsToController[i];
                if (path.x == pathToController.x && path.y == pathToController.y) {
                    continue;
                }
                const pos = new RoomPosition(path.x, path.y, creep.room.name);
                if (pos.isNearTo(creep)) {
                    creep.room.createConstructionSite(pos, STRUCTURE_ROAD);
                }
            }
        }
    },/*
    // Build roads on paths
    buildRoads: function(creep: Creep, paths: PathStep[], pathsToController: PathStep[]) {
        // Build roads on paths
        for (let i = 0; i < paths.length; i++) {
            const path = paths[i];
            const pathToController = pathsToController[i];
            if (path.x == pathToController.x && path.y == pathToController.y) {
                continue;
            }
            const pos = new RoomPosition(path.x, path.y, creep.room.name);
            if (pos.isNearTo(creep)) {
                creep.room.createConstructionSite(pos, STRUCTURE_ROAD);
            }
        }
    }  // End buildRoads */
};
