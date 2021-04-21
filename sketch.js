var backImage,backgr;
var player, player_running;
var ground,ground_img;
var banana, bananaImg;
var obstacleImg, gameOver, overImg;

var END = 0;
var PLAY = 1;
var gameState = PLAY;
var score = 0;
var n = 0;

function preload(){
  backImage=loadImage("jungle.jpg");
  bananaImg = loadImage("banana.png");
  obstacleImg = loadImage("stone.png");
  overImg = loadImage("gameOver.png");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  gameOver = createSprite(500,200,20,20);
  gameOver.addImage(overImg);
  gameOver.visible = false;

  obstaclesGroup = createGroup();
  foodGroup = createGroup();
}

function draw() { 
  background("white");

  if(gameState===PLAY){
    if(backgr.x<100){
      backgr.x=backgr.width/2;
    }

    if(keyDown("space") && player.y > 314 - n) {
      player.velocityY = -15;
   }

   player.velocityY = player.velocityY + 0.6;
   player.collide(ground);

    if(obstaclesGroup.isTouching(player)){
      gameState = END;
   }

   if(keyDown("c")){
    console.log(player.y);
   }

   if(keyDown("x")){
    console.log(n);
   }

   if(foodGroup.isTouching(player)){
      score = score + 10;
      player.scale = player.scale + 0.1/10;
      n = n + 3;
      foodGroup.destroyEach();
   }

   spawnFood();
   spawnObstacles()

 } else

 if(gameState === END){
   ground.velocityX = 0;
   player.velocityY = 0
   backgr.velocityX=0;
  
   obstaclesGroup.setLifetimeEach(-1);
   foodGroup.setLifetimeEach(-1);
 
   obstaclesGroup.setVelocityXEach(0);
   foodGroup.setVelocityXEach(0);

   gameOver.visible = true;
   player.visible = false;
 }
  drawSprites();

  textSize(25);
  fill("black");
  text("Score: " + score,670,40);
}

function spawnFood(){
  if(frameCount % 60 === 0){
    banana = createSprite(800,Math.round(random(200,315)),20,20);
    banana.addImage(bananaImg);
    banana.velocityX = -5;
    banana.scale = 0.1/2;

    banana.lifetime = 170;
  
    foodGroup.add(banana);
  }
}


function spawnObstacles(){
  if(frameCount % 60 === 0){
    var obstacle = createSprite(600,Math.round(random(200,315)),10,40);
    obstacle.addImage(obstacleImg);
    obstacle.velocityX = -(6 + score/100)
             
     obstacle.scale = 0.1;
     obstacle.lifetime = 170;
  
     obstaclesGroup.add(obstacle);
  }
 }