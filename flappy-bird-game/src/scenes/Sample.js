import { Scene } from "phaser";

export class Sample extends Scene
{

    constructor()
    {
        super("Sample");
        this.VELOCITY = 250;
        this.PIPES_TO_RENDER = 40;

        this.pipeHorizontalDistanceRange = [500, 550];
        this.pipeVerticalDistanceRange = [150, 250];

        this.bird = null;
        this.sky = null;
        this.totalDelta = null;
        this.flapVelocity = 200;
        this.initialBirdPosition = { x: 1024/2, y: 768/2 };
        this.pipe_width = 60;
        this.pipe_height = 1000;

        this.pipes = null;
    }

    init() 
    {
        
    }

    preload() 
    {
        this.load.image('sky', 'https://plus.unsplash.com/premium_photo-1686050878751-89499d28d153?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3RhciUyMGdhemluZ3xlbnwwfHwwfHx8MA%3D%3D')
        this.load.image('bird', 'https://static.vecteezy.com/system/resources/thumbnails/048/880/982/small_2x/happy-cute-bird-image-cartoon-style-png.png');
        this.load.image('pipe', `https://placehold.co/${this.pipe_width}x${this.pipe_height}`);
    }

    create()
    {
        this.pipes = this.physics.add.group();

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

        this.paint();

        this.input.on('pointerdown', this.flap.bind(this));
        this.input.keyboard.on('keydown-SPACE', this.flap.bind(this));
    }
    
    update(time, deltaTime) 
    {
        if (this.bird.body.y < 0 - this.bird.body.height || this.bird.body.y > 768) {
            this.restartBirdPosition();
            this.resetBirdGravity();
        }
        this.movePipe();
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

    paint()
    {
        for (let i = 0; i < this.PIPES_TO_RENDER; i++)
        {
            const pipeVerticalDistance = Phaser.Math.Between(...this.pipeVerticalDistanceRange);
            const pipeHorizontalDistance = Phaser.Math.Between(...this.pipeHorizontalDistanceRange);
            const pipeVerticalPosition = Phaser.Math.Between(0 + 20, 768 - 20 - pipeVerticalDistance);

            const rightMostX = this.getRightMostPipe();
            const upper_pipe = this.renderUpperPipe(rightMostX + pipeHorizontalDistance, pipeVerticalPosition);
            const lower_pipe = this.renderLowerPipe(rightMostX + pipeHorizontalDistance, upper_pipe.y + pipeVerticalDistance);
        }
    }

    getRightMostPipe() 
    {
        let rightMostX = 0;
        this.pipes.getChildren().forEach(function (pipe) {
            rightMostX = Math.max(pipe.x, rightMostX);
        });

        return rightMostX;
    }

    renderUpperPipe(x, pipeVerticalPosition)
    {
        const upper_pipe_x = x;
        const upper_pipe_y = pipeVerticalPosition;
        const upper_pipe_deg = 0; // -.2;

        const upper_pipe = this.pipes.create(upper_pipe_x, upper_pipe_y, 'pipe');
        upper_pipe.rotation += upper_pipe_deg;
        upper_pipe.setOrigin(0, 1);

        return upper_pipe;
    }

    renderLowerPipe(x, pipeVerticalDistance)
    {
        const lower_pipe_x = x;
        const lower_pipe_y = pipeVerticalDistance;
        const lower_pipe_deg = 0; // -.5;

        const lower_pipe = this.pipes.create(lower_pipe_x, lower_pipe_y, 'pipe');
        lower_pipe.rotation += lower_pipe_deg;
        lower_pipe.setOrigin(0);

        return lower_pipe;
    }

    movePipe() 
    {
        const speed = -200;
        this.pipes.setVelocityX(speed);
    }
}