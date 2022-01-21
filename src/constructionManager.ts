// Construction manager. Build roads on paths to sources and controller

export var construction = {
  // Build roads on the cheapest path to the controller
  buildRoad: function(room: Room, path: PathStep[]): boolean {
    if (path.length == 0) return false;
    let start = path[0];
    let end = path[path.length - 1];
    let startPos = new RoomPosition(start.x, start.y, room.name);
    let endPos = new RoomPosition(end.x, end.y, room.name);
    let road = room.createConstructionSite(startPos, STRUCTURE_ROAD);
    if (road == OK) {
      let path = room.findPath(startPos, endPos, { ignoreCreeps: true });
      for (let i = 0; i < path.length; i++) {
        let pos = new RoomPosition(path[i].x, path[i].y, room.name);
        if (pos.isNearTo(endPos)) {
          room.createConstructionSite(pos, STRUCTURE_ROAD);
        }
      }
      return true;
    }
    return false;
  }
}
