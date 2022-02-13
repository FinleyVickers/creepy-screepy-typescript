/*
    This code does the stuff for the builder
*/

import { generalFuncs } from "international/generalFuncs"


export var roleBuilder = {

    run: function (creep: Creep) {

        if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false
            creep.say('🔄 Gib Energy')
        }
        if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true
            creep.say('🚧 build')
        }


        const constructionSite: ConstructionSite | null = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES)

        if (creep.memory.building) {
            if (constructionSite != null) {
                if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(constructionSite, { visualizePathStyle: { stroke: '#ffffff' } })
                }
            }
        }
        else {
            generalFuncs.findEnergy(creep)
        }
    }
}




