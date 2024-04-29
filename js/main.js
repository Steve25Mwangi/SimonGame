function runGame(width, height) {
  var config = {
    type: Phaser.AUTO,
    backgroundColor: 0x343434,
    scale: {
      parent: 'game',
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: width,
      height: height,
      orientation: Phaser.Scale.LANDSCAPE
  },
    scene: gameScene,
    debug: true
  };

  new Phaser.Game(config);
}

window.onload = function () {
  let clientHeight = document.getElementById('container').clientHeight;
  let width = 640;
  let height = 360;  
  if(clientHeight > 700){
    width = 1280;
    height = 720;
  }
  runGame(width, height);
};
