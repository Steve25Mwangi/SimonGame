// create a new scene
let gameScene = new Phaser.Scene('MainGame');

// some parameters for our scene
gameScene.init = function () {
    this.gWidth = this.game.config.width;
    this.gHeight = this.game.config.height;
    this.s = this.gWidth > 640 ? 2 : 1;
    this.s = 2;

    this.notes = [0];
    this.noteIndex = 0;
    this.currentNote = 0;
    this.lastNote = 1000;
    this.score = 0;
    this.highScore = 0;
    this.onGame = false;
};

gameScene.preload = function () {

    this.load.image('bg', 'assets/images/BgSmall.png');
    this.load.image('bg2', 'assets/images/BgBig.png');
    this.load.image('Armando', 'assets/images/Armando00.png');
    this.load.image('Frank', 'assets/images/Frank00.png');
    this.load.image('Sophia', 'assets/images/Sophia00.png');
    this.load.image('Timmy', 'assets/images/Timmy00.png');
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


    //addBG
    this.createScene();

    //create Text
    this.createText();    

    //createBtns
    this.createBtns();

    //create LEDs
    this.createLeds();    

    // this.initGame();
};

gameScene.createScene = function () {
    let bgImage = this.s > 1 ? 'bg2' : 'bg';
    let spriteScale = this.s > 1 ? 0.92 : 0.45;
    let xLeft = 263;
    let xRight = 376;
    let yTop = 102.5;
    let yBottom = 225;

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
            duration: 250,
            ease: 'Cubic',
            paused: true,
            persist: true
        });

        sprite.twpulses = this.tweens.add({
            targets: sprite,
            alpha: '1',
            yoyo: true,
            duration: 250,
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

}

gameScene.createText = function () {
    let styleDark = { fontFamily: 'cutedino', fontSize: 20 * this.s, color: '#000000', lineSpacing: -10 * this.s };

    this.txtScore = this.add.text(495 * this.s, 175 * this.s, '--', styleDark)
        .setOrigin(0.5, 0.5);
    this.txtHighScore = this.add.text(580 * this.s, 175 * this.s, `${this.highScore}`, styleDark).setColor('#ffffff')
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
    this.btnPlay = this.add.sprite(500 * this.s, 100 * this.s, 'btplay').setInteractive();
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
    t.turnOffLed(this.ledGameOver);
    t.score = -1;
    t.upScore();
    t.onGame = true;
    t.machineTurn();
}

gameScene.endGame = function () {
    let t = this;
    t.onGame = false;
    t.disableButtons();
    t.pulseLed(this.ledGameOver);
    t.notes = [Phaser.Math.RND.integerInRange(0, 3)];
    t.pulseButtons();

    setTimeout(() => {
        t.txtScore.setText('--');
        t.twScore.play();
        if (t.score > t.highScore) {
            t.setHighScore(t.score);
        }
        this.turnOffLed(this.ledCpu);
        this.turnOffLed(this.ledPlayer);
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
    let turnOffLed = this.turnOffLed.bind(this, this.ledCpu);
    let turnOnLed = this.turnOnLed.bind(this, this.ledPlayer);
    let playerTurn = this.playerTurn.bind(this);

    let index = notes[currentNote];

    if (index === undefined) {
                 
        this.sound.play('Reset');
        flashButtons();
        turnOffLed();
        turnOnLed();
        playerTurn();
    } else {
        clicked(index);
    }
}

gameScene.machineTurn = function () {
    this.disableButtons();
    this.currentNote = 0;
    this.notes.push(Phaser.Math.RND.integerInRange(0, 3));
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

    this.lastNote = index;
    this.buttons[index].tween.play();
    if (isMachine) {
        this.sound.play('Pad' + (index + 1));
        setTimeout(() => {
            if (!this.onGame) return;
            
            this.currentNote++;
            this.playNotes();
        }, 600);
    }
    else {
        if (!this.checkNote()) {
            this.sound.play('Wrong');
            this.turnOffLed(this.ledPlayer);
            this.endGame();
            return;
        }
         
        this.sound.play('Pad' + (index + 1));
        this.noteIndex++;
        if (this.noteIndex > this.notes.length - 1) {
            this.disableButtons();
            setTimeout(() => {
                if (!this.onGame) return;
                this.upScore();
                this.sound.play('Correct');
            }, 400);
            setTimeout(() => {
                if (!this.onGame) return;
                this.turnOffLed(this.ledPlayer);
                this.turnOnLed(this.ledCpu);
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
            console.log('flash was playing')
            bt.tween.restart();            
        } else {
            bt.tween.play();
        }
    });
}

gameScene.pulseButtons = function () {    
    this.buttons.forEach(bt => {
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