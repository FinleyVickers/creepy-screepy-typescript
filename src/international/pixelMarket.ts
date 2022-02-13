/*
This script is here to make some passive income from market
*/

export function PixelMake()
{
    if (Game.shard.name == "shard2") {

        // If bucket is full generate a pixel

        if (Game.cpu.bucket == 10000) Game.cpu.generatePixel()


    }
}
