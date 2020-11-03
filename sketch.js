var gameState = 1
function preload(){
  TowerImage = loadImage("tower.png")
  DoorImage = loadImage("door.png")
  ClimberImage = loadImage("climber.png")
  GhostImage = loadImage("ghost-standing.png")
  soundd = loadSound("spooky.wav")
  
}

function setup(){
  createCanvas(600,600)
  soundd.loop()
  tower = createSprite(300,300,600,600)
  tower.addImage(TowerImage)
  tower.velocityY = 1
  doorGroup = new Group()
  climberGroup = new Group()
  ghost = createSprite(400,0)
  ghost.addImage(GhostImage)
  ghost.setCollider("rectangle",30,30,210,230)
  ghost.debug = true
  ghost.scale = 0.5
  
}

function draw(){
  background("white")
  if (gameState===1){
    
  
  if (tower.y>400){
    tower.y = 300
    
  }
  if (keyDown("space")){
    ghost.velocityY = -5
   
  }
  ghost.velocityY = ghost.velocityY+0.4
  if (keyDown(LEFT_ARROW)){
    ghost.x = ghost.x-3
  }
  if (keyDown(RIGHT_ARROW)){
    ghost.x = ghost.x+3
  }
  if (ghost.y>600||(ghost.isTouching(climberGroup))){
    gameState = 0
  }
  spawnDoors()
  }
  drawSprites()
  if (gameState===0){
    ghost.velocityY = 0
    tower.velocityY = 0
    doorGroup.setVelocityYEach(0)
    climberGroup.setVelocityYEach(0)
    doorGroup.setLifetimeEach(-1)
    climberGroup.setLifetimeEach(-1)
    soundd.stop()
    textSize(70)
    fill("red")
    textFont("chiller")
    text("Gameover", 200,200)
    
  }
  
}

function spawnDoors(){
  if (frameCount%300===0){
    var door = createSprite(200,0)
    door.addImage(DoorImage)
    door.velocityY = 1
    door.x = random(100,500)
    door.lifetime = 600
    doorGroup.add(door)
    var climber = createSprite(200,0)
    climber.addImage(ClimberImage)
    climber.x = door.x
    climber.velocityY = 1
    climberGroup.add(climber)
   
  }
}

