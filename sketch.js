var diver,diverImg
var score = 0;
var SERVE=0;
var PLAY=1;
var END=2;
var gameState=SERVE;

var obstacle1Img, goldbar, obstacle2Img, jewelnecklace, jewelring, obstacle3Img
var diamond, obstacle4Img, treasurechest, obstacle5Img, shark, sharkImg, bomb, bombImg
var gameOverImg, backdrop, backdropImg, gameOver, collectsound, gameovertone
var goldbarG, jewelnecklaceG, jewelringG, diamondG, treasurechestG, sharkG,bombG
var playbutton, playbuttonImg
var resetbutton, resetbuttonImg

function preload(){
    obstacle1Img=loadImage("gold.png");
    obstacle2Img=loadImage("jewelnecklace.png");
    obstacle3Img=loadImage("jewelring.png");
    obstacle4Img=loadImage("diamond.png");
    obstacle5Img=loadImage("treasurechest.png");
    diverImg = loadAnimation("diver1.png","diver2.png", "diver3.png");
    sharkImg=loadImage("shark.png");
    bombImg=loadImage("bomb.png");
    gameOverImg=loadImage("gameOver.png");
    backdropImg=loadImage("backdrop.png");
    playbuttonImg=loadImage("playbton.png");
    resetbuttonImg=loadImage("reset.png");
    collectsound=loadSound("collectingsound.mp3");
    gameovertone=loadSound("gameoversound.mp3");
}

function setup() {
   createCanvas(400,600);
   
    backdrop=createSprite(200,300,400,600);
    backdrop.addImage("water",backdropImg);
    backdrop.velocityY = 2;

    playbutton=createSprite(200,300,40,60);
    playbutton.addImage("playButton",playbuttonImg);
    playbutton.scale=0.4;

    // create running //
    diver = createSprite(70,480,20,20);
    diver.addAnimation("swimming",diverImg);
    diver.scale=0.12;      
        
    gameOver=createSprite(215,250)
    gameOver.addImage("gameover",gameOverImg);
    gameOver.scale=0.3;    

    resetbutton=createSprite(200,350)
    resetbutton.addImage("restart",resetbuttonImg);
    resetbutton.scale=0.08;    

    goldbarG=new Group();
    jewelnecklaceG=new Group();
    jewelringG=new Group();
    diamondG=new Group();
    treasurechestG=new Group();
    sharkG=new Group();
    bombG=new Group();
}

function draw() {

    if (gameState===SERVE){
        gameOver.visible=false;
        resetbutton.visible=false;

        if (mousePressedOver(playbutton)){
            playbutton.destroy();
            gameState=PLAY;
        } 

    }

    //console.log(backdrop.y)
    drawSprites();
    
    //code to reset background//
    if(backdrop.y > 368){
        backdrop.y = height/2;
    }

    if(gameState===PLAY){
        createObstacle1();
        createObstacle2();
        createObstacle3();
        createObstacle4();
        createObstacle5();
        createshark();
        createbomb();
         
        
        diver.x = World.mouseX;
        edges= createEdgeSprites();
        diver.collide(edges);


        if (goldbarG.isTouching(diver)) {
            goldbarG.destroyEach();
            collectsound.play();
            score=score+50;
        }

        if (jewelnecklaceG.isTouching(diver)) {
            jewelnecklaceG.destroyEach();
            collectsound.play();
            score=score+100;
        }

        if (jewelringG.isTouching(diver)) {
            jewelringG.destroyEach();
            collectsound.play();
            score=score+150;
        }
        
        if (diamondG.isTouching(diver)) {
            diamondG.destroyEach();
            collectsound.play();
            score=score+50;
        }
        
        if (treasurechestG.isTouching(diver)) {
            treasurechestG.destroyEach();
            collectsound.play();
            score=score+200;
        }

        if (sharkG.isTouching(diver)||bombG.isTouching(diver)) {
            gameState=END
            gameovertone.play();
                
        }
    }

    else if(gameState === END){
        gameOver.visible=true;
        resetbutton.visible=true;

        sharkG.destroyEach();
        bombG.destroyEach();
        goldbarG.destroyEach();
        jewelnecklaceG.destroyEach();
        jewelringG.destroyEach();
        diamondG.destroyEach();
        treasurechestG.destroyEach();

    }

    if(mousePressedOver(resetbutton)){
        reset();  
    }
    

    textSize(20);
    fill(255);
    text("Score: "+ score,10,30);
}



function reset(){
    gameState=PLAY;
    resetbutton.visible=false;
    gameOver.visible=false;
    score=0;
        
}

function createObstacle1(){
    if (World.frameCount % 180 == 0) {
        var goldbar = createSprite(Math.round(random(50, 350),40, 10, 10));
        goldbar.addImage(obstacle1Img);
        goldbar.scale=0.08;
        goldbar.velocityY = 3+score/300;
        goldbar.lifetime = 200;
        goldbarG.add(goldbar);
    }
}

function createObstacle2() {
    if (World.frameCount % 375 == 0) {
        var jewelnecklace = createSprite(Math.round(random(50, 350),40, 10, 10));
        jewelnecklace.addImage(obstacle2Img);
        jewelnecklace.scale=0.12;
        jewelnecklace.velocityY = 3+score/300;
        jewelnecklace.lifetime = 200;
        jewelnecklaceG.add(jewelnecklace);
    }
}
    
function createObstacle3() {
    if (World.frameCount % 423 == 0) {
        var jewelring = createSprite(Math.round(random(50, 350),40, 10, 10));
        jewelring.addImage(obstacle3Img);
        jewelring.scale=0.2;
        jewelring.velocityY = 3+score/300;
        jewelring.lifetime = 200;
        jewelringG.add(jewelring);
    }
}
    
function createObstacle4() {
    if (World.frameCount % 530 == 0) {
        var diamond = createSprite(Math.round(random(50, 350),40, 10, 10));
        diamond.addImage(obstacle4Img);
        diamond.scale=0.18;
        diamond.velocityY = 3+score/300;
        diamond.lifetime = 200;
        diamondG.add(diamond);
    }
}
    
function createObstacle5() {
    if (World.frameCount % 650 == 0) {
        var treasurechest = createSprite(Math.round(random(50, 350),40, 10, 10));
        treasurechest.addImage(obstacle5Img);
        treasurechest.scale=0.12;
        treasurechest.velocityY = 3+score/300;
        treasurechest.lifetime = 200;
        treasurechestG.add(treasurechest);
    }
}
    
function createshark() {
    if (World.frameCount % 470 == 0) {
        var shark = createSprite(Math.round(random(50, 350),40, 10, 10));
        shark.addImage(sharkImg);
        shark.scale=0.05;
        shark.velocityY = 3+score/200;
        shark.lifetime = 200;
        sharkG.add(shark);
    }
}
    
function createbomb() {
    if (World.frameCount % 280 == 0) {
        var bomb = createSprite(Math.round(random(50, 350),40, 10, 10));
        bomb.addImage(bombImg);
        bomb.scale=0.14;
        bomb.velocityY = 3+score/200;
        bomb.lifetime = 200;
        bombG.add(bomb);
    }
}
    