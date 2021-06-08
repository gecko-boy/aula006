export default class Snake {
    constructor(scene) {
        this.scene = scene;

        this.timeLastMove = 0;
        this.moveInterval = 150;

        this.tileSize = 16;
        
        this.body = [];

        //criar noção de direção
        this.direction = Phaser.Math.Vector2.RIGHT;

        //criar a maçã
        this.apple = this.scene.add.rectangle(32, 32, this.tileSize, this.tileSize, 0x00ff00).setOrigin(0);

        //criar a cobra
        this.body.push(
            this.box = this.scene.add.rectangle(this.scene.game.config.width / 2, this.scene.game.config.height / 2, this.tileSize, this.tileSize, 0xff0000).setOrigin(0)
        );

        this.placeApple();
        
        //como acrescentar eventos de teclado
        this.scene.input.keyboard.on("keydown", e => {
            this.keydown(e)
        });

    }

    checkApplePosition(x, y) {
        if (this.apple.x === x && this.apple.y === y) {
            this.placeApple();
            this.body.push(
                this.scene.add.rectangle(0, 0, this.tileSize, this.tileSize, 0xff0000).setOrigin(0)
            );
            this.moveInterval -= 15;
        }
    }

    placeApple() {
        this.apple.x = Math.floor(Math.random() * this.scene.game.config.width / this.tileSize) * this.tileSize;
        this.apple.y = Math.floor(Math.random() * this.scene.game.config.height / this.tileSize) * this.tileSize;
    }

    checkDeath(x, y) {
        if (x < 0 || x >= this.scene.game.config.width || y < 0 || y >= this.scene.game.config.height) {
            this.scene.scene.restart();
        }

        var tail = this.body.slice(1);
        if (tail.some(segment => {return segment.x === x && segment.y === y;}))
        {
            this.scene.scene.restart(); 
        }
    }

    keydown(event) {
        switch(event.keyCode) {
            case 37:
                //L
                if (this.direction !== Phaser.Math.Vector2.RIGHT) {
                this.direction = Phaser.Math.Vector2.LEFT;}
                break;
            case 38:
                //U
                if(this.direction !== Phaser.Math.Vector2.DOWN){
                this.direction = Phaser.Math.Vector2.UP;}
                break;
            case 39:
                //R
                if(this.direction !== Phaser.Math.Vector2.LEFT){
                this.direction = Phaser.Math.Vector2.RIGHT;}
                break;
            case 40:
                //D
                if(this.direction !== Phaser.Math.Vector2.UP) {
                this.direction = Phaser.Math.Vector2.DOWN;}
                break;
        }


        // if(event.keyCode == 37) {
        //     //Left
        // }
        // else if(event.keyCode == 38) {
        //     //Up
        // }
        // else if(event.keyCode == 39) {
        //     //Right
        // }
        // else if(event.keyCode == 40) {
        //     //Down
        // }
    }

    update(time) {
        if(time >= this.timeLastMove + this.moveInterval) {
            this.timeLastMove = time;
            this.move();
        }
    }

    move() {
        // this.body[1].x = this.body[0].x;
        // this.body[1].y = this.body[0].y;

        let x = this.body[0].x + this.direction.x * this.tileSize;
        let y = this.body[0].y + this.direction.y * this.tileSize; 

        this.checkApplePosition(x, y);
        this.checkDeath(x, y);

        //stopping the apple from spawning underneath the snake
        for(let i = this.body.length; i > 0; i--) {
            if(i.x === this.apple.x && i.y === this.apple.y) {
                this.placeApple();
            }
        }

        for(let i = this.body.length - 1; i > 0; i--) {
            this.body[i].x = this.body[i-1].x;
            this.body[i].y = this.body[i-1].y;
        };

        this.body[0].x += this.direction.x * this.tileSize;
        this.body[0].y += this.direction.y * this.tileSize;
    }
}