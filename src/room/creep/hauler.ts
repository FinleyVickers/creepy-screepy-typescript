/*
This is the code for the hauler
*/

import { generalFuncs } from "international/generalFuncs";

export var roleHauler = {

    run: function (creep: Creep) {

        // If the hauler isn't full

        if (creep.store.getFreeCapacity() > 0) {

            generalFuncs.findEnergy(creep)

        } else {

            if (creep.room.memory.spawnContainerID != null) {
                const upgraderContainer = Game.getObjectById(creep.room.memory.spawnContainerID)

                if (upgraderContainer.store.getUsedCapacity() <= 150) {
                    if (creep.transfer(upgraderContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(upgraderContainer, { visualizePathStyle: { stroke: '#ffaa00' } });
                    }
                }
                else {
                    var targets = creep.room.find(FIND_MY_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                        }
                    });

                    const towers: StructureTower[] = creep.room.find(FIND_MY_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_TOWER) &&
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                        }
                    })

                    var lowEnergyTowers: StructureTower

                    for (var tower in towers) {
                        if (towers[tower].store.energy <= 75) {
                            lowEnergyTowers = towers[tower]
                        }
                    }

                    if (lowEnergyTowers != null) {
                        if (creep.transfer(lowEnergyTowers, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(lowEnergyTowers, { visualizePathStyle: { stroke: '#ffaa00' } });
                        }
                    }

                    if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {

                        // Move to it

                        creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffaa00' } });
                    }
                }


            }
            else{
                var targets = creep.room.find(FIND_MY_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });

                const towers: StructureTower[] = creep.room.find(FIND_MY_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TOWER) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                })

                var lowEnergyTowers: StructureTower

                for (var tower in towers) {
                    if (towers[tower].store.energy <= 75) {
                        lowEnergyTowers = towers[tower]
                    }
                }

                if (lowEnergyTowers != null) {
                    if (creep.transfer(lowEnergyTowers, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(lowEnergyTowers, { visualizePathStyle: { stroke: '#ffaa00' } });
                    }
                    return
                }
                

                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {

                    // Move to it

                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffaa00' } });
                }
            }




        }
    }
};
