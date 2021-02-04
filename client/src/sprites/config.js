export class animation_config
{
    constructor(src,w,h,f,fps,is_y)
    {
        this.width = w;
        this.height = h;
        this.frames = f;
        this.fps = fps;
        this.is_y = is_y;
        this.src = src;
    }
}

const config = {
    'ball & chain': new animation_config('/assets/ball_&_chain_bot/icon.png',126,195,5,1,true),
    'merch-1.2.0':           new animation_config('/assets/merchant/icon.png',256,64,4,1,false),
    'mud guard':          new animation_config('/assets/mud_guard/icon.png',82,115,5,1,true),
    'shield droid':       new animation_config('/assets/shield_droid/icon.png',90,31,1,1,true),
    'spirit boxer':       new animation_config('/assets/spirit_boxer/icon.png',136,176,4,1,true),
    'stormhead':          new animation_config('/assets/stormhead/icon.png',119,1116,9,true),
}

export default config;