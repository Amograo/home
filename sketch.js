var alienimg1,aliening2,alien,alienGrp;
var space ,bgimage;
var astroidimg,astroid,astroidGrp;
var astronaut,astronautimg;
var gameState  = "play";
var gameOver,reset,gameoverimg,resetimg;
var laser;
var score = 0;

var flag;

function preload(){

    bgimage = loadImage("images/spacebg.png");
    alienimg1 = loadImage("images/alienship1.png");
    alienimg2 = loadImage("images/alienship2.png");
    astroidimg = loadImage("images/astroid.png");
    astronautimg = loadImage("images/rocket.png");
    gameoverimg = loadImage("images/gameOver.png");
    resetimg = loadImage("images/restart.png");

}

function setup() {
    createCanvas(400, 600);
    space = createSprite(200,200);
    space.addImage(bgimage);
    space.velocityY = 1;
    space.scale = 2.5;

    gameOver = createSprite(200,300);
    gameOver.addImage(gameoverimg);
    gameOver.scale = 0.5;

    reset =  createSprite(200,400);
    reset.addImage(resetimg);
    reset.scale = 0.5;


   astronaut = createSprite(200,500,10,10);
    astronaut.addImage(astronautimg);
    astronaut.scale = 0.5;

    
    alienGrp= new Group();
    astroidGrp = new Group();

    gameOver.visible = false;
    reset.visible = false;
}

function draw(){
    background("black")
    fill("red")
    text("Score: "+ score, 600,50);
    
    if(space.y > 400){
        space.y = 200;
    }


    if(gameState === "play"){


        if(keyDown("RIGHT_ARROW")){
            astronaut.x = astronaut.x +10
           // astronaut.y = 200
    
        }
    
        if(keyDown("LEFT_ARROW")){
            astronaut.x = astronaut.x -10
           // astronaut.y = 200
    
        }

        if(keyDown("space")){
            laser = createSprite(astronaut.x,astronaut.y-50,10,30)
            laser.shapeColor = 'red'
            laser.velocityY = -3;

            

        }
            spawnAlien();
            spawnAstroid();
            
            if(astroidGrp.isTouching(laser)){
                 // astroidGrp.destroyEach();
                  console.log(2)
                    
                  }
      
                  if(alienGrp.isTouching(laser)){
               //   alienGrp.destroyEach();
                    console.log(3)
                  }

        if(astroidGrp.isTouching(astronaut) || alienGrp.isTouching(astronaut)){
            gameState = "end";
        }

    }
    else if(gameState === "end"){
        space.velocityY = 0;
        alienGrp.setVelocityYEach(0);
        astroidGrp.setVelocityYEach(0);
        
        astroidGrp.setLifetimeEach(-1);
        alienGrp.setLifetimeEach(-1); 

        gameOver.visible = true;
        reset.visible = true;

        if(mousePressedOver(reset)){
            console.log(1)
            restart();
        }
    }
    

    drawSprites();
}

function spawnAlien(){
    if(frameCount % 120 === 0){
        alien = createSprite(Math.round(random(0,400)),0,10,40);

        alien.velocityY = 2;

        var rand = Math.round(random(1,2));
        switch(rand) {
        case 1: alien.addImage(alienimg1);
              break;
        case 2: alien.addImage(alienimg2);
              break;
            }

            //alien.depth = gameOver.depth;
            //gameOver.depth = gameOver.depth + 1;

           // alien.depth = reset.depth;
           // reset.depth = reset.depth + 1;

                alien.scale = 0.4;
                alien.lifetime = 300;
                alienGrp.add(alien)
    }
}

function spawnAstroid(){
    if(frameCount % 100 === 0){
        astroid = createSprite(Math.round(random(0,400)),0,10,40);
        astroid.addImage(astroidimg);
        astroid.velocityY = 2;
        astroid.scale = 0.2;
        astroid.lifetime = 300;
        astroidGrp.add(astroid)

        //astroid.depth = gameOver.depth;
       // gameOver.depth = gameOver.depth + 1;

       // astroid.depth = reset.depth;
       // reset.depth = reset.depth + 1;
    }
    
}

function restart(){
    gameState = "play";
    gameOver.visible = false;
    reset.visible = false;

    alienGrp.destroyEach();
    astroidGrp.destroyEach();
}
