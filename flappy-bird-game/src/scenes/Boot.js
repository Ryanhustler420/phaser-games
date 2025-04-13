import { Scene } from "phaser";

export class Boot extends Scene
{
    constructor() 
    {
        super('Boot');
    }

    preload()
    {
        this.load.image('background', 'https://images.unsplash.com/photo-1557683316-973673baf926?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29sb3IlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww')
    }

    create()
    {
        this.scene.start('Preloader');
    } 
}