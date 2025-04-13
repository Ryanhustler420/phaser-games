import { Scene } from "phaser";

export class Sample extends Scene
{

    constructor()
    {
        super("Sample");
        this.VELOCITY = 200;

        this.upper_pipe = null;
        this.upper_pipe_border = null;

        this.lower_pipe = null;
        this.lower_pipe_border = null;

        this.pipeVerticalDistanceRange = [150, 250];
        this.pipeVerticalDistance = Phaser.Math.Between(...this.pipeVerticalDistanceRange);
        this.pipeVerticalPosition = Phaser.Math.Between(0 + 20, 768 - 20 - this.pipeVerticalDistance);

        this.bird = null;
        this.sky = null;
        this.totalDelta = null;
        this.flapVelocity = 300;
        this.initialBirdPosition = { x: 1024/2, y: 768/2 };
    }

    init() 
    {
        
    }

    preload() 
    {
        this.load.image('sky', 'https://media.istockphoto.com/id/182493016/photo/sky-and-grass-backround.jpg?s=612x612&w=0&k=20&c=u9Hk93MPbXqjOTTEFNGMq7JJJ46HDBlnqiG7dvrbu9w=')
        this.load.image('bird', 'https://static.vecteezy.com/system/resources/thumbnails/048/880/982/small_2x/happy-cute-bird-image-cartoon-style-png.png');
        this.load.image('pipe', 'https://placehold.co/60x480')
    }

    create()
    {
        this.sky = this.add.image(this.initialBirdPosition.x, this.initialBirdPosition.y, 'sky');
        let scaleX = this.cameras.main.width / this.sky.width
        let scaleY = this.cameras.main.height / this.sky.height
        let scale = Math.max(scaleX, scaleY)
        this.sky.setScale(scale).setScrollFactor(0);
        this.sky.setOrigin(.5);

        this.bird = this.physics.add.sprite(this.initialBirdPosition.x / 2, this.initialBirdPosition.y, 'bird');
        this.bird.setScale(.2).setScrollFactor(0);
        this.bird.setOrigin(.5);
        this.bird.body.gravity.y = 400;
        
        // code here...

        this.input.on('pointerdown', this.flap.bind(this));
        this.input.keyboard.on('keydown-SPACE', this.flap.bind(this));
    }
    
    update(time, deltaTime) 
    {
        if (this.bird.body.y < 0 - this.bird.body.height || this.bird.body.y > 768) {
            this.restartBirdPosition();
            this.resetBirdGravity();
        }
    }

    resetBirdGravity()
    {
        this.bird.body.velocity.y = 0;
    }

    restartBirdPosition()
    {
        this.bird.x = this.initialBirdPosition.x / 2;
        this.bird.y = this.initialBirdPosition.y;
    }

    flap () 
    {
        this.bird.body.velocity.y = -this.flapVelocity;
    }

    renderUpperPipe()
    {
        const upper_pipe_x = this.initialBirdPosition.x;
        const upper_pipe_y = -this.initialBirdPosition.y + this.pipeVerticalDistance;
        const upper_pipe_deg = -.2;

        this.upper_pipe = this.add.sprite(upper_pipe_x, upper_pipe_y, 'pipe');
        this.upper_pipe.rotation += upper_pipe_deg;
        this.upper_pipe.setOrigin(0);

        this.upper_pipe_border = this.add.rectangle(upper_pipe_x, upper_pipe_y, 60, 480);
        this.upper_pipe_border.setOrigin(0);
        this.upper_pipe_border.setStrokeStyle(5, 0x000000);
        this.upper_pipe_border.setRotation(upper_pipe_deg);
    }

    renderLowerPipe()
    {
        const lower_pipe_x = this.initialBirdPosition.x;
        const lower_pipe_y = this.initialBirdPosition.y + this.pipeVerticalDistance;
        const lower_pipe_deg = -.5;

        this.lower_pipe = this.add.sprite(lower_pipe_x, lower_pipe_y, 'pipe');
        this.lower_pipe.rotation += lower_pipe_deg;
        this.lower_pipe.setOrigin(0);

        this.lower_pipe_border = this.add.rectangle(lower_pipe_x, lower_pipe_y, 60, 480);
        this.lower_pipe_border.setOrigin(0);
        this.lower_pipe_border.setStrokeStyle(5, 0x000000)
        this.lower_pipe_border.setRotation(lower_pipe_deg);
    }

    movePipe() 
    {
        const speed = -3;

        this.lower_pipe.x += speed;
        this.lower_pipe_border.x += speed;
        
        this.upper_pipe.x += speed;
        this.upper_pipe_border.x += speed;
    }
}