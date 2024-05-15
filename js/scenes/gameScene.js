// create a new scene
let gameScene = new Phaser.Scene('MainGame');

// some parameters for our scene
gameScene.init = function (data) {

    this.data = data.level;

    this.gWidth = this.game.config.width;
    this.gHeight = this.game.config.height;
    this.s = this.gWidth > 640 ? 2 : 1;
    // console.log(this.gWidth, this.gHeight, this.s)
    // if (this.sys.game.device.os.desktop) {
    //     console.log("desktop")
    //     this.s = 2;
    // }
    // else {
    //     console.log("mobile")
    //     this.s = 1;
    // }

    this.notes = [0];
    this.noteIndex = 0;
    this.currentNote = 0;
    this.lastNote = 1000;
    this.score = 0;
    this.highScore = 0;
    this.onGame = false;

    this.initialGameSpeed = 600;
    this.initialTweenSpeed = 250;
    this.gameSpeed = 600;
    this.tweenSpeed = 250;

    this.buttonsLength = 12;

    this.levelType = ['easy', 'medium', 'hard'];

    this.levelLength = 5;

    //this.reverseMode = true;
};

gameScene.preload = function () {

    this.load.image('bg', 'assets/images/BgSmall.png');
    this.load.image('bg2', 'assets/images/BgBig.png');
    this.load.image('bgLvl2', 'assets/images/BgSmallLvl02.png');
    this.load.image('bgLvl2Big', 'assets/images/BgBigLvl02.png');
    this.load.image('bgLvl3', 'assets/images/BgSmallLvl03.png');
    this.load.image('bgLvl3Big', 'assets/images/BgBigLvl03.png');
    this.load.image('Armando', 'assets/images/Armando00.png');
    this.load.image('Frank', 'assets/images/Frank00.png');
    this.load.image('Sophia', 'assets/images/Sophia00.png');
    this.load.image('Timmy', 'assets/images/Timmy00.png');
    this.load.image('Armando1', 'assets/images/Armando01.png');
    this.load.image('Frank1', 'assets/images/Frank01.png');
    this.load.image('Sophia1', 'assets/images/Sophia01.png');
    this.load.image('Timmy1', 'assets/images/Timmy01.png');
    this.load.image('btplay', 'assets/images/Forward.png');
    this.load.image('btreset', 'assets/images/Retry.png');
    this.load.image('ledGreen', 'assets/images/ledGreen.png');
    this.load.image('ledRed', 'assets/images/ledRed.png');

    //load sound files
    this.load.audio('Pad1', 'assets/sound/Pad_1.wav');
    this.load.audio('Pad2', 'assets/sound/Pad_2.wav');
    this.load.audio('Pad3', 'assets/sound/Pad_3.wav');
    this.load.audio('Pad4', 'assets/sound/Pad_4.wav');
    this.load.audio('Correct', 'assets/sound/Correct_Ans_Sfx.wav');
    this.load.audio('Wrong', 'assets/sound/Wrong_Ans_Sfx.wav');
    this.load.audio('Play', 'assets/sound/Play_Button_Sfx.wav');
    this.load.audio('Reset', 'assets/sound/Reset_Button_Sfx.wav');
};

gameScene.create = function () {
    console.log(this.data);
    switch (this.data) {
        case null:
            this.createScene();
            break;
        case 'medium':
            this.createLevel03();
            break;
        case 'hard':
            this.createLevel02();
            break;
        default:
            //console.log('Problemas');
            this.createScene();
            break;
    }
    //create Text
    this.createText();

    //createBtns
    this.createBtns();

    //create LEDs
    //this.createLeds();

    // this.initGame();
};

gameScene.createScene = function () {

    this.buttonsLength = 4;
    let bgImage = this.s > 1 ? 'bg2' : 'bg';
    let spriteScale = this.s > 1 ? 1.125 : 0.5625;
    let xLeft = 131;
    let xRight = 270;
    let yTop = 106;
    let yBottom = 257;

    let bg = this.add.image(0, 0, bgImage).setOrigin(0);
    let spriteImages = ['Timmy', 'Sophia', 'Frank', 'Armando'];
    let spritePositions = [[xLeft * this.s, yTop * this.s], [xRight * this.s, yTop * this.s], [xLeft * this.s, yBottom * this.s], [xRight * this.s, yBottom * this.s]];
    this.buttons = spriteImages.map((spriteName, index) => {
        let sprite = this.add.sprite(spritePositions[index][0], spritePositions[index][1], spriteName)
            .setOrigin(0.5).setScale(spriteScale).setAlpha(0.1);

        sprite.tween = this.tweens.add({
            targets: sprite,
            alpha: '1',
            yoyo: true,
            duration: this.tweenSpeed,
            ease: 'Cubic',
            paused: true,
            persist: true
        });

        sprite.twpulses = this.tweens.add({
            targets: sprite,
            alpha: '1',
            yoyo: true,
            duration: this.tweenSpeed,
            repeat: 3,
            ease: 'Cubic',
            paused: true,
            persist: true
        })

        sprite.setInteractive().on('pointerdown', () => {
            this.clicked(false, index);
        });

        return sprite;
    });

    this.disableButtons();
    //fade in camera
    this.cameras.main.fadeIn(500, 0, 0, 0);

    this.cameras.main.on('camerafadeincomplete', function () {
        // Remove the effect after the fade-in is complete
        this.cameras.main.fadeEffect.reset();
    }, this);
}

gameScene.createLevel02 = function () {

    this.buttonsLength = 12;
    let bgImage = this.s > 1 ? 'bgLvl2Big' : 'bgLvl2';
    let spriteScale = this.s > 1 ? 0.6 : 0.3;
    let xLeft = 163;
    let xRight = 236;
    let yTop = 132;
    let yBottom = 210;


    let xLeftLvl2 = 100;
    let xRightLvl2 = 299;
    let yTopLvl2 = 83;
    let yBottomLvl2 = 259;

    let xMidLvl3 = 199;
    let yTopLvl3 = 53;
    let yMidLvl3 = 170;
    let yBottomLvl3 = 295;


    let bg = this.add.image(0, 0, bgImage).setOrigin(0);
    let spriteImages = ['Timmy', 'Sophia', 'Frank', 'Armando', 'Timmy1', 'Sophia1', 'Frank1', 'Armando1'];
    let spritePositions = [[xLeft * this.s, yTop * this.s], [xRight * this.s, yTop * this.s], [xLeft * this.s, yBottom * this.s], [xRight * this.s, yBottom * this.s],
    [xLeftLvl2 * this.s, yTopLvl2 * this.s], [xRightLvl2 * this.s, yTopLvl2 * this.s], [xLeftLvl2 * this.s, yBottomLvl2 * this.s], [xRightLvl2 * this.s, yBottomLvl2 * this.s],
    [xLeftLvl2 * this.s, yMidLvl3 * this.s], [xMidLvl3 * this.s, yTopLvl3 * this.s], [xMidLvl3 * this.s, yBottomLvl3 * this.s], [xRightLvl2 * this.s, yMidLvl3 * this.s]];

    spritePositions = this.shuffleArray(spritePositions);

    this.buttons = [];
    for (let i = 0; i < this.buttonsLength; i++) {
        let sprite = this.add.sprite(spritePositions[i][0], spritePositions[i][1], spriteImages[i % spriteImages.length])
            .setOrigin(0.5).setScale(spriteScale).setAlpha(0.1);

        sprite.tween = this.tweens.add({
            targets: sprite,
            alpha: '1',
            yoyo: true,
            duration: this.tweenSpeed,
            ease: 'Cubic',
            paused: true,
            persist: true
        });

        sprite.twpulses = this.tweens.add({
            targets: sprite,
            alpha: '1',
            yoyo: true,
            duration: this.tweenSpeed,
            repeat: 3,
            ease: 'Cubic',
            paused: true,
            persist: true
        })

        sprite.setInteractive().on('pointerdown', () => {
            this.clicked(false, i);
        });

        this.buttons.push(sprite);
    }

    this.disableButtons();
}

gameScene.createLevel03 = function () {
    this.buttonsLength = 8;
    let bgImage = this.s > 1 ? 'bgLvl3Big' : 'bgLvl3';
    let spriteScale = this.s > 1 ? 0.6 : 0.3;
    let xLeft = 163;
    let xRight = 236;
    let yTop = 132;
    let yBottom = 210;


    let xLeftLvl2 = 100;
    let xRightLvl2 = 299;
    let yTopLvl2 = 83;
    let yBottomLvl2 = 259;

    let xMidLvl3 = 199;
    let yTopLvl3 = 53;
    let yMidLvl3 = 170;
    let yBottomLvl3 = 295;


    let bg = this.add.image(0, 0, bgImage).setOrigin(0);
    let spriteImages = ['Timmy', 'Sophia', 'Frank', 'Armando', 'Timmy1', 'Sophia1', 'Frank1', 'Armando1'];
    let spritePositions = [[xLeft * this.s, yTop * this.s], [xRight * this.s, yTop * this.s], [xLeft * this.s, yBottom * this.s], [xRight * this.s, yBottom * this.s],
    [xLeftLvl2 * this.s, yMidLvl3 * this.s], [xMidLvl3 * this.s, yTopLvl3 * this.s], [xMidLvl3 * this.s, yBottomLvl3 * this.s], [xRightLvl2 * this.s, yMidLvl3 * this.s]];
    //[xLeftLvl2 * this.s, yMidLvl3 * this.s], [xMidLvl3 * this.s, yTopLvl3 * this.s], [xMidLvl3 * this.s, yBottomLvl3 * this.s], [xRightLvl2 * this.s, yMidLvl3 * this.s]];

    spritePositions = this.shuffleArray(spritePositions);

    this.buttons = [];
    for (let i = 0; i < this.buttonsLength; i++) {
        let sprite = this.add.sprite(spritePositions[i][0], spritePositions[i][1], spriteImages[i % spriteImages.length])
            .setOrigin(0.5).setScale(spriteScale).setAlpha(0.1);

        sprite.tween = this.tweens.add({
            targets: sprite,
            alpha: '1',
            yoyo: true,
            duration: this.tweenSpeed,
            ease: 'Cubic',
            paused: true,
            persist: true
        });

        sprite.twpulses = this.tweens.add({
            targets: sprite,
            alpha: '1',
            yoyo: true,
            duration: this.tweenSpeed,
            repeat: 3,
            ease: 'Cubic',
            paused: true,
            persist: true
        })

        sprite.setInteractive().on('pointerdown', () => {
            this.clicked(false, i);
        });

        this.buttons.push(sprite);
    }

    this.disableButtons();
}

gameScene.shuffleArray = function (array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

gameScene.createText = function () {
    let styleDark = { fontFamily: 'cutedino', fontSize: 20 * this.s, color: '#000000', lineSpacing: -10 * this.s };

    this.txtScore = this.add.text(440 * this.s, 265 * this.s, '--', styleDark)
        .setOrigin(0.5, 0.5);
    this.txtHighScore = this.add.text(540 * this.s, 265 * this.s, `${this.highScore}`, styleDark).setColor('#ffffff')
        .setOrigin(0.5, 0.5)
        .setAlpha(0.5);

    //text Tweens
    this.twScore = this.tweens.add({
        targets: this.txtScore,
        alpha: '0.5',
        yoyo: true,
        duration: 200,
        ease: 'Cubic',
        paused: true,
        persist: true
    });

    this.twHighScore = this.tweens.add({
        targets: this.txtHighScore,
        scale: '1.3',
        yoyo: true,
        duration: 300,
        ease: 'Cubic',
        paused: true,
        persist: true
    });
}

gameScene.createBtns = function () {
    this.btnPlay = this.add.sprite(490 * this.s, 190 * this.s, 'btplay').setInteractive();
    this.btnPlay.setScale(0.08 * this.s);
    this.btnPlay.on('pointerdown', () => {
        if (!this.onGame) {
            this.initGame();
            //play start audio
            this.sound.play('Play');
        }
        else {
            this.endGame();
        }
    });


    this.hintBtn = this.add.sprite(450 * this.s, 340 * this.s, 'btplay').setInteractive();
    this.hintBtn.setScale(0.08 * this.s);
    this.hintBtn.on('pointerdown', () => {
        this.currentNote = 0;
        this.playNotes();
    });

    // this.btnReset = this.add.sprite(281 * this.s, 565 * this.s, 'btreset').setInteractive();
    // this.btnReset.setScale(0.08 * this.s);
    // this.btnReset.on('pointerdown', () => {
    //     this.setHighScore(0);
    // });
}

gameScene.createLeds = function () {

    let xPos = 69 * this.s;
    this.ledPlayer = this.add.image(xPos, 158 * this.s, 'ledGreen')
        .setScale(0.3 * this.s)
        .setAlpha(0);
    this.ledCpu = this.add.image(xPos, 186 * this.s, 'ledGreen')
        .setScale(0.3 * this.s)
        .setAlpha(0);
    this.ledGameOver = this.add.image(xPos, 209 * this.s, 'ledRed')
        .setScale(0.3 * this.s)
        .setAlpha(0);

    //led tweens
    const ledTargets = [this.ledPlayer, this.ledCpu, this.ledGameOver];

    ledTargets.forEach(led => {
        led.twLedOn = this.tweens.add({
            targets: led,
            alpha: '1',
            duration: 500,
            ease: 'Cubic',
            paused: true,
            persist: true
        });

        led.twLedOff = this.tweens.add({
            targets: led,
            alpha: '0',
            duration: 500,
            ease: 'Cubic',
            paused: true,
            persist: true
        });

        led.twLedPulses = this.tweens.add({
            targets: led,
            alpha: '1',
            yoyo: true,
            duration: 500,
            repeat: 3,
            ease: 'Cubic',
            paused: true,
            persist: true
        });
    });
}


gameScene.initGame = function () {
    let t = this;
    //t.turnOffLed(this.ledGameOver);
    t.score = -1;
    t.upScore();
    t.onGame = true;
    t.machineTurn();
}

gameScene.endGame = function () {

    this.gameSpeed = this.initialGameSpeed;
    this.tweenSpeed = this.initialTweenSpeed;

    let t = this;
    t.onGame = false;
    t.disableButtons();
    //t.pulseLed(this.ledGameOver);
    t.notes = [Phaser.Math.RND.integerInRange(0, this.buttonsLength - 1)];
    t.pulseButtons();

    setTimeout(() => {
        t.txtScore.setText('--');
        t.twScore.play();
        if (t.score > t.highScore) {
            t.setHighScore(t.score);
        }
        //this.turnOffLed(this.ledCpu);
        //this.turnOffLed(this.ledPlayer);
        t.score = 0;
        // if (t.btPlay.alpha == 1) {
        //     t.btPlay.toggle();
        // }
    }, 2000);

}

gameScene.playNotes = function () {
    let notes = this.notes;
    let currentNote = this.currentNote;
    let clicked = this.clicked.bind(this, true);
    let flashButtons = this.flashButtons.bind(this);
    //let turnOffLed = this.turnOffLed.bind(this, this.ledCpu);
    //let turnOnLed = this.turnOnLed.bind(this, this.ledPlayer);
    let playerTurn = this.playerTurn.bind(this);

    let index = notes[currentNote];

    if (index === undefined) {

        this.sound.play('Reset');
        flashButtons();
        // turnOffLed();
        //turnOnLed();
        playerTurn();
    } else {
        clicked(index);
    }
}

gameScene.machineTurn = function () {
    this.disableButtons();


    // speed manipulation
    const baseGameSpeedReduction = 75;
    const baseTweenSpeedReduction = 15;

    this.gameSpeed -= baseGameSpeedReduction;
    this.tweenSpeed -= baseTweenSpeedReduction;

    console.log(this.notes.length, this.gameSpeed)

    if (this.notes.length > this.levelLength) {

        switch (this.data) {
            case 'easy':
                //fade camera to black
                this.cameras.main.fadeOut(500);
                //change scene after fade out
                this.cameras.main.on('camerafadeoutcomplete', function (camera, effect) {
                    
                    this.scene.start('MainGame', { level: "medium" });
                }, this);
                break;
            case 'medium':
                //fade camera to black
                this.cameras.main.fadeOut(500);
                //change scene after fade out
                this.cameras.main.on('camerafadeoutcomplete', function (camera, effect) {
                    
                    this.scene.start('MainGame', { level: "hard" });
                }, this);
                break;
            case 'hard':
                //fade camera to black
                this.cameras.main.fadeOut(500);
                //change scene after fade out
                this.cameras.main.on('camerafadeoutcomplete', function (camera, effect) {
                    
                    this.scene.start('MainGame', { level: "easy" });
                }, this);
                break;
            default:
                //fade camera to black
                this.cameras.main.fadeOut(500);
                //change scene after fade out
                this.cameras.main.on('camerafadeoutcomplete', function (camera, effect) {
                    
                    this.scene.start('MainGame', { level: "medium" });
                }, this);
                break;
        }
        return;
    }
    this.currentNote = 0;
    this.notes.push(Phaser.Math.RND.integerInRange(0, this.buttonsLength - 1));
    setTimeout(() => {
        this.playNotes();
    }, 1000);

};

gameScene.playerTurn = function () {
    this.noteIndex = 0;
    this.enableButtons();
};

gameScene.enableButtons = function () {
    this.buttons.forEach(bt => {
        bt.setInteractive();
    });
};

gameScene.disableButtons = function () {
    this.buttons.forEach(bt => {
        bt.removeInteractive();
    });
};

gameScene.clicked = function (isMachine, index) {
    console.log(index);
    this.lastNote = index;
    if (this.buttons[index].tween.isPlaying()) {
        this.buttons[index].tween.restart();
    } else {
        this.buttons[index].tween.play();
    }
    if (isMachine) {
        let soundIndex = ((index + 1) % 4) === 0 ? 4 : ((index + 1) % 4);
        this.sound.play('Pad' + soundIndex);
        setTimeout(() => {
            if (!this.onGame) return;

            this.currentNote++;
            this.playNotes();
        }, this.gameSpeed);
    }
    else {
        if (!this.checkNote()) {
            this.sound.play('Wrong');
            // this.turnOffLed(this.ledPlayer);
            this.endGame();
            return;
        }
        let soundIndex = ((index + 1) % 4) === 0 ? 4 : ((index + 1) % 4);
        this.sound.play('Pad' + soundIndex);
        //console.log(this.reverseMode)
        if (this.reverseMode) {
            this.noteIndex--; // Decrement noteIndex for reverse mode
        } else {
            this.noteIndex++; // Increment noteIndex for normal mode
        }
        console.log(this.noteIndex + '_' + this.notes.length)
        if (this.noteIndex > this.notes.length - 1) {
            this.disableButtons();
            setTimeout(() => {
                if (!this.onGame) return;
                this.upScore();
                this.sound.play('Correct');
            }, 400);
            setTimeout(() => {
                if (!this.onGame) return;
                // this.turnOffLed(this.ledPlayer);
                //this.turnOnLed(this.ledCpu);
                this.machineTurn();
            }, 600);
        }
    }
};

gameScene.checkNote = function () {
    let t = this;
    let success = (t.notes[t.noteIndex] == t.lastNote);
    return success;
}

gameScene.upScore = function () {
    this.score++;
    this.txtScore.setText(this.score);
    this.twScore.play();
}

gameScene.setHighScore = function (score) {
    let t = this;
    t.highScore = score;
    t.txtHighScore.setText(`${t.highScore}`);
    t.twHighScore.play();
}

gameScene.flashButtons = function () {
    this.buttons.forEach(bt => {
        if (bt.tween.isPlaying()) {
            // console.log('flash was playing')
            bt.tween.restart();
        } else {
            bt.tween.play();
        }
    });
}

gameScene.pulseButtons = function () {
    this.buttons.forEach(bt => {
        if (bt.tween.isPlaying()) {
            bt.tween.pause();
            bt.alpha = 0.1;
        }
        if (bt.twpulses.isPlaying()) {
            console.log('pulses was playing')
            bt.twpulses.restart();
        }
        else {
            bt.twpulses.play();
        }
    });
}

gameScene.turnOnLed = function (led) {
    led.twLedOn.play();
}

gameScene.turnOffLed = function (led) {
    led.twLedOff.play();
}

gameScene.pulseLed = function (led) {
    led.twLedPulses.play();
}