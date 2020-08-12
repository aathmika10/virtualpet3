class Food {
    constructor(){
       this.foodStock=0,
       this.lastFed;
       this.milkbottleimage=loadImage("Milk.png")
    }
   

   display(){
     var x= 45, y=20;
     imageMode(CENTER);
     //image(this.milkbottleimage,720,220,50,50);
     if(foodS!==0){
      for( var i=0;i<foodS; i++){
      if (i%10==0){
      x=45;
      y=y+50;
       }
      image(this.milkbottleimage,x,y,50,50);
       x=x+30;
        }
       }
     }

     updateFoodStock(x){
      if(x<=0){
        x=0;
      }
      else{
        x=x-1;
      }
      
      database.ref('/').update({
        foodStock:x
      })
   
    }
  
    getFedTime(x){
      fedTime=database.ref('FeedTime');
      fedTime.on("value",function (data){
        lastFed=data.val();
      })
      }

    getFoodStock(){
      database.ref('foodStock').on("value",function(data){
        foodS=data.val();
      })
      }
      
      BedRoom(){
        backGround(bedroomimg,180,300);

      }
      WashRoom(){
        backGround(washroomimg,180,300);
      }
      Garden(){
        backGround(gardenimg,180,300);
      }
}