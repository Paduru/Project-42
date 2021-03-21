var backImage, backgr;
var player, player_running;
var ground, ground_img;

var END = 0;
var PLAY = 1;
var gameState = PLAY;
var gameOver, gameOverImg;

var score;
var fruitGroup, bananaImage;
var obstacleGroup, stoneImage;

function preload() {
  backImage = loadImage("jungle.jpg");
  player_running = loadAnimation(
    "Monkey_01.png",
    "Monkey_02.png",
    "Monkey_03.png",
    "Monkey_04.png",
    "Monkey_05.png",
    "Monkey_06.png",
    "Monkey_07.png",
    "Monkey_08.png",
    "Monkey_09.png",
    "Monkey_10.png"
  );

  bananaImage = loadImage("banana.png");
  stoneImage = loadImage("stone.png");

  gameOverImg = loadImage("gameOver.png");
}

function setup() {
  createCanvas(800, 400);

  score = 0;

  fruitGroup = createGroup();
  obstacleGroup = createGroup();

  gameOver = createSprite(400, 200);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;

  backgr = createSprite(0, 0, 800, 400);
  backgr.addImage(backImage);
  backgr.scale = 1.5;
  backgr.x = backgr.width / 2;
  backgr.velocityX = -4;

  player = createSprite(100, 340, 20, 50);
  player.addAnimation("Running", player_running);
  player.scale = 0.1;

  ground = createSprite(400, 350, 800, 10);
  ground.x = ground.width / 2;
  ground.visible = false;
}

function draw() {
  background(0);

  if (gameState === PLAY) {
    player.visible = true;
    gameOver.visible = false;

    if (backgr.x < 100) {
      backgr.x = backgr.width / 2;
      backgr.depth -= 10;
    }

    if (keyDown("space") && player.y >= 315 - player.scale * 325) {
      player.velocityY = -15;
    }
    player.velocityY = player.velocityY + 0.8;

    player.collide(ground);

    spawnFruit();
    spawnStone();

    if (fruitGroup.isTouching(player)) {
      fruitGroup.destroyEach();
      score += 2;
      player.scale += 0.1;
    }

    if (obstacleGroup.isTouching(player)) {
      gameState = END;
    }
  }
  if (gameState === END) {
    backgr.velocityX = 0;
    player.visible = false;

    fruitGroup.destroyEach();
    obstacleGroup.destroyEach();

    gameOver.visible = true;
  }

  drawSprites();
  fill("white");
  textSize(32);
  text("Score: " + score, 25, 50);
}

function spawnFruit() {
  if (frameCount % 150 === 0) {
    var banana = createSprite(1000, 200);
    fruitGroup.add(banana);
    banana.y = Math.round(random(200, 250));
    banana.addImage(bananaImage);
    banana.velocityX = -4;
    banana.scale = 0.05;
    banana.life = 255;
    player.depth = banana.depth + 1;
  }
}

function spawnStone() {
  if (frameCount % 120 === 0) {
    var stone = createSprite(1000, 340);
    obstacleGroup.add(stone);
    stone.addImage(stoneImage);
    stone.velocityX = -4;
    stone.scale = 0.2;
    stone.life = 260;
  }
}
