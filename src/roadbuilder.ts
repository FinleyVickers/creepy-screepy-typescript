// Automatically build roads on path to controller and sources, this is not a creep role

import { ErrorMapper } from 'utils/ErrorMapper';


export const roadbuilder = ErrorMapper.wrapLoop(() => {
    for (const name in Game.rooms) {
        const room = Game.rooms[name];
        if (room.controller != undefined) {
            const path = room.findPath(room.controller.pos, room.find(FIND_SOURCES)[0].pos, { ignoreCreeps: true });
            for (const pos of path) {
                const x = pos.x;
                const y = pos.y;
                if (room.getTerrain().get(x, y) == TERRAIN_MASK_WALL) {
                    room.createConstructionSite(x, y, STRUCTURE_ROAD);
                }
            }
        }
    }
});
