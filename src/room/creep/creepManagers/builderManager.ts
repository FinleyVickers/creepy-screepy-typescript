/* this code manages the builder */

export function ManageTheBuilder(creep: Creep) {
    var constructionSites: ConstructionSite[] = creep.room.find(FIND_CONSTRUCTION_SITES)

    if (creep.room.memory.chosenBuildID == null && constructionSites.length != 0)
    {
        choseBuildSite(creep)
    }

    if (Memory.chosenBuildEnergy == null && Memory.chosenBuildContainer == null)
    {
        findEnergy()
    }

    function choseBuildSite(creep:Creep) {
        var structureTypesByBuildPriority = [
            STRUCTURE_SPAWN,
            STRUCTURE_EXTENSION,
            STRUCTURE_CONTAINER,
            STRUCTURE_TOWER,
            STRUCTURE_STORAGE,
            STRUCTURE_ROAD,
            STRUCTURE_WALL,
            STRUCTURE_RAMPART,
            STRUCTURE_TERMINAL,
            STRUCTURE_EXTRACTOR,
            STRUCTURE_LINK,
            STRUCTURE_LAB,
            STRUCTURE_FACTORY,
            STRUCTURE_POWER_SPAWN,
            STRUCTURE_NUKER,
            STRUCTURE_OBSERVER,
        ]

        for (var sites in constructionSites) {
            for (var structures in structureTypesByBuildPriority)
            {
                if (constructionSites[sites].structureType = structureTypesByBuildPriority[structures])
                {
                    creep.room.memory.chosenBuildID = constructionSites[sites].id
                    return
                }
            }
        }



    }

    function findEnergy() {
        var droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES, {
            filter: (i) => i.resourceType == RESOURCE_ENERGY
        })

        var goodDroppedEnergy: Resource<ResourceConstant>[] = []

        for (var groundEnergy in droppedEnergy) {
            const range = creep.pos.getRangeTo(droppedEnergy[groundEnergy])
            if (droppedEnergy[groundEnergy].amount > (range / 2)) {
                goodDroppedEnergy.push(droppedEnergy[groundEnergy])
            }
        }

        var containers: StructureContainer[] = creep.room.find(FIND_STRUCTURES, {
            filter: (i) => i.structureType == STRUCTURE_CONTAINER &&
                i.store[RESOURCE_ENERGY] > 0
        })

        const closestContainer = creep.pos.findClosestByRange(containers)

        FindChosenSpot(goodDroppedEnergy, closestContainer, creep)

        function FindChosenSpot(goodDroppedEnergy: Resource<ResourceConstant>[], closestContainer: StructureContainer, creep: Creep) {
            var BestDroppedEnergyValue: number = 0
            let chosenDroppedEn: Resource<ResourceConstant>

            const range = creep.pos.getRangeTo(closestContainer)
            const containerVal = closestContainer.store.energy - range

            for (var energ in goodDroppedEnergy) {
                const range = creep.pos.getRangeTo(goodDroppedEnergy[energ])
                const enAmount = goodDroppedEnergy[energ].amount
                const amountDegeneratingAtick = enAmount / 1000
                const valueOfThis = (enAmount - (range * amountDegeneratingAtick)) + 10

                if (valueOfThis > BestDroppedEnergyValue) {
                    BestDroppedEnergyValue = valueOfThis
                    chosenDroppedEn = goodDroppedEnergy[energ]
                }
            }

            if (BestDroppedEnergyValue > containerVal) {
                Memory.chosenBuildEnergy = chosenDroppedEn.id
            }
            else {
                Memory.chosenBuildContainer = closestContainer.id
            }

    }



    }
}
