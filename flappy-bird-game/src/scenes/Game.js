import { Scene } from 'phaser';

export class Game extends Scene
{
    constructor()
    {
        super("Game");
    }

    create()
    {
        this.cameras.main.setBackgroundColor(0x00ff00);
        this.add.image(512, 384, 'background').setAlpha(.5);

        this.add.text(512, 384, "Make something fun!\nand share it with us:\ngouravgupta@raisehand.io", {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center',
        }).setOrigin(.5);

        this.input.addListener('pointerdown', () => {
            this.scene.start("GameOver");
        });
    }
}