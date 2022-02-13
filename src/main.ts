// These are global type declarations

import { PixelMake } from "international/pixelMarket"
import { roomFuctions } from "room/roomManager"


declare global {
    
    interface Memory {
        chosenBuildEnergy: Id<Resource<ResourceConstant>>
        chosenBuildContainer: Id<StructureContainer>


    }

    interface RoomMemory {
        chosenBuildID: Id<ConstructionSite>
        spawnContainerID: Id<StructureContainer>

        path1: PathStep[]
        path2: PathStep[]

        spawnContainerPosition: RoomPosition

        roomController: StructureController
    }

    interface CreepMemory {
        role: string
        building?: boolean
        hauling?: boolean
        repairing?: boolean
        upgrading?: boolean
        harvesting?: boolean
    }

    // Syntax for adding proprties to `global` (ex "global.log")
    namespace NodeJS {
        interface Global {

        }
    }
}

export const loop = function () {

    roomFuctions()

    PixelMake()

    // This is the main loop
}
