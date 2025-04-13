import { Game } from "./scenes/Game";
import { Boot } from "./scenes/Boot";
import { Sample } from "./scenes/Sample";
import { GameOver } from "./scenes/GameOver";
import { MainMenu } from "./scenes/MainMenu";
import { Preloader } from "./scenes/Preloader";

const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#000000',
    physics: {
        default: 'arcade',
        arcade: {
            // gravity: { y: 400 },
            debug: true
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [
        Sample,
        // Boot,
        // Preloader,
        // MainMenu,
        // Game,
        // GameOver,
    ]
}

export default new Phaser.Game(config);