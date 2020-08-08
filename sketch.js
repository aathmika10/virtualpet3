//Create variables here
var dog, happyDog;
var database;
var foodS, foodStock;
var fedTime;
var feed, addFoodCount;
var foodObj;
var bedroomimg, washroomimg, gardenimg;
var lazydogimg;
var hungry=0;
var Sleeping=0;
var Playing=0;
var Bathing=0;
var gameState=0;
var currentTime;
var lastFed=hour;
var currentTime=hour;
var hr=hour;

function preload()
{
  //load images here
  dogimg = loadImage("dogImg.png");
  happyDogimg = loadImage("dogImg1.png");
  bedroomimg = loadImage("Bed Room.png")
  washroomimg = loadImage("Wash Room.png")
  gardenimg = loadImage("Garden.png")
  lazydogimg = loadImage("Lazy.png")
  dogkennelimg=loadImage("dogkennel.jpg");
}

function setup() {
  createCanvas(370, 550);

  //refering the database
  database=firebase.database();
    foodStock=database.ref('foodStock');
    foodStock.on("value",readStock);

    readState= database.ref('gameState')
    readState.on('value',function(data){
      gameState=data.val();
    })

  //Creating the foodObj
  foodObj= new Food();

  //creating the dog sprite
  dog=createSprite(200, 435, 10,10);
  dog.addImage(dogimg);
  dog.scale=0.2;
  
  //creating the buttons
    //FEED BUTTON
  feed=createButton("Feed the dog");
  feed.position(80,570);
  feed.mousePressed(feedDog);
    //ADD FOOD
  addFoodCount=createButton("Add Food")
  addFoodCount.position(300,570);
  addFoodCount.mousePressed(addFood);
}

function draw() {  
  background(dogkennelimg);

  //displaying the food object
   foodObj.display();

    //Destroying the buttons and making the dog lazy
   /*if(gameState!=hungry){
    feed.hide();
    addFoodCount.hide();
    dog.addImage(lazydogimg);
    dog.y=460
   }*/

  if (gameState=hungry){
     feed.hide();
    addFoodCount.hide();
    dog.addImage(lazydogimg);
    dog.y=460
  }
 else{
    feed.show();
    addFoodCount.show();
    dog.addImage(lazydogimg)
  }

//changing the gameState, background according to the time
  currentTime= hour();
if(currentTime===(lastFed+1)){
  gameState==Playing
  update("Playing");
  foodObj.Garden();
}
else if(currentTime==(lastFed+2)){
  update("Sleeping")
    foodObj.BedRoom();
}
else if(currentTime>(lastFed+2)&&currentTime<=(lastFed+4)){
  update("Bathing")
  foodObj.WashRoom();
}
else{
  update("hungry")
  foodObj.display();
}

//Displaying the text
    textSize(16);
    textFont("Comic sans MS");
    fill("white");
    text("Food remaining:"+foodS,120,15);
    text("Current hour:" + lastFed, 5, 50);
    console.log(hour);
    hr = hour();
   // text("Current hour:" + hr, 5, 50);
   // text("Last Fed:"+lastFed,150,545);
    
  drawSprites();  
}

//funtion to updatefood stock and last fedtime
  function feedDog(){
    dog.addImage(happyDogimg);
    foodObj.updateFoodStock(foodS);
    database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime: hour()
    })
  }
  
  //function to add food in stock
  function addFood(){
  foodS++;
  database.ref('/').update({
  foodStock:foodS
  })
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function update(state){
  database.ref('/').update({
    gameState:state
  })
}