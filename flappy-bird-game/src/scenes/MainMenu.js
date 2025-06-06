import { Scene } from "phaser";

export class MainMenu extends Scene
{
    constructor()
    {
        super("MainMenu");
    }

    create() {
        this.add.image(512, 384, 'background');

        this.add.image(512, 300, 'logo');

        this.add.text(512, 460, 'Black Rubber', {
            fontFamily: 'Arial Blank', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(.5);

        this.input.once('pointerdown', () => {
            this.scene.start('Game');
        });
    }
}