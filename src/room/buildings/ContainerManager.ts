/*
    this coded will check to see if you need to place a container
*/



export function CheckIfContainerIsNeeded(room: Room): boolean {
    const spawnContainer = Game.getObjectById(room.memory.spawnContainerID)
    if (spawnContainer == null) {
        return true
    }

    return false

}

