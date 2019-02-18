/*Base functions - setup runs once, draw is continuous*/
let num_dots = 10;
let center_size = 150;
let myCenter;
let myDots = []; // array to hold dot objects
let rand;

//Create 1 center object and fill myDots array
function setup(){
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    ellipseMode(CENTER);
    rand = false;
    
    myCenter = new Center(windowWidth/2, windowHeight/2, center_size, 255, ellipse);
    for(let i=0; i<num_dots; i++){
        myDots[i] = new Dot(myCenter.x, myCenter.y, random(-10, 10), random(-10, 10), 20, 255, ellipse);
    }
}

//Move dots in myDots checking for collisions each iteration 
function draw(){
    background(0);
   
    for(let i=0; i<myDots.length; i++){
        myDots[i].display();
        myDots[i].move();
        //Check if intersect center to reset color and size;
        if(myDots[i].intersects(myCenter)){
            myDots[i].color = myCenter.color;
            myDots[i].size = random(10, 50);
        }
        //Check if intersect other dot to reset colors
        if(rand === true){
            for(let j=0; j<myDots.length; j++){
                if(j != i){
                    if(myDots[i].intersects(myDots[j])){
                        myDots[i].color = color(random(255), random(255), random(255));
                        myDots[j].color = color(random(255), random(255), random(255));
                    }
                }
            }
        }
    }
    //Display myCenter and interact with mouse 
    myCenter.display();
    if(mouseIsPressed){
        myCenter.colorChange();
        myCenter.pulse();
    }

}

//Dot class
class Dot{
    constructor(tempX, tempY, tempVX, tempVY, tempSize, tempColor, tempShape){
        this.x = tempX;
        this.y = tempY;
        this.vx = tempVX;
        this.vy = tempVY;
        this.size = tempSize;
        this.color = tempColor;
        this.shape = tempShape;
        this.history = [];
    }

    //Keep track of prior locations in history to draw tail behind dots 
    display(){
        noStroke();
        fill(this.color);
        this.shape(this.x, this.y, this.size, this.size);
        for(var i=0; i<this.history.length; i++){
            var pos = this.history[i];
            this.shape(pos.x, pos.y, 8, 8);
        }
    }

    //Move the dot based on velocities (check for bouncing off walls)
    move(){
        this.x = this.x+this.vx;
        this.y = this.y+this.vy;
        if(this.x > width || this.x < 0){
            this.vx *= -1;
        }
        if(this.y>height || this.y<0){
            this.vy *= -1;
        }
        var v = createVector(this.x, this.y);
        this.history.push(v);
        //Only trace 200 positions prior 
        if(this.history.length > 200){
            this.history.splice(0,1);
        }
    }

    //Turn all into squares
    rectShift(){
        this.shape = rect;
    }
    //Turn all into ellipses
    ellipseShift(){
        this.shape = ellipse;
    }
    //Check for collisions
    intersects(arg){
        return(collideCircleCircle(this.x, this.y, this.size, arg.x, arg.y, arg.size));
    }
    //Potentially reset velocities 
    setVelo(){
        this.vx = random(-5, 5);
        this.vy = random(-5, 5);
    }
}

//myCenter object class
class Center{
    constructor(tempX, tempY, tempSize, tempColor, tempShape){
        this.x = tempX;
        this.y = tempY;
        this.size = tempSize;
        this.color = tempColor; 
        this.shape = tempShape;
    }
    //Display the object (just one)
    display(){
        noStroke();
        fill(this.color);
        this.shape(this.x, this.y, this.size, this.size);
    }
    //Called on mouseClick
    colorChange(){
        this.color = color(random(0,255), random(0,255), random(0,255));
        this.display();
    }
    //Change shape to square
    rectShift(){
        this.shape = rect;
    }
    //Change shape to ellipse
    ellipseShift(){
        this.shape = ellipse;
    }
    //Grows when mouse is pressed
    pulse(){
        this.size += 2;
    }
}


//Handles all keyPressed instances 
function keyPressed(){
    //"SPACE" all objects to white
    if(keyCode === 32){
        myCenter.color = 255;
        for(var i=0; i<myDots.length; i++){
            myDots[i].color = (255);
        }
    }
    //"ENTER" center object to white
    if(keyCode === ENTER){
        myCenter.color = 255;
    }
    //"SHIFT" dot objects to white
    if(keyCode === SHIFT){
        for(var i=0; i<myDots.length; i++){
            myDots[i].color = (255);
        }
    }


    //"s" switch to squares
    if(keyCode === 83){
        for(var i=0; i<myDots.length; i++){
            myDots[i].rectShift();
        }
        myCenter.rectShift();
    }
    //"e" switch to ellipses
    if(keyCode === 69){
        for(var i=0; i<myDots.length; i++){
            myDots[i].ellipseShift();
        }
        myCenter.ellipseShift();
    }


    //"c" toggle random color generation 
    if(keyCode === 67){
        if(rand === false){rand = true;}
        else{rand = false;}
    }
    //"b" all to blue
    if(keyCode === 66){
        myCenter.color = color(0, 0, 255);
        for(var i=0; i<myDots.length; i++){
            myDots[i].color = color(0, 0, 255);
        }
    }
    //"g" all to green
    if(keyCode === 71){
        myCenter.color = color(0, 255, 0);
        for(var i=0; i<myDots.length; i++){
            myDots[i].color = color(0, 255, 0);
        }
    }
    //"r" all to red
    if(keyCode === 82){
        myCenter.color = color(255, 0, 0);
        for(var i=0; i<myDots.length; i++){
            myDots[i].color = color(255, 0, 0);
        }
    }
    //"y" all to yellow
    if(keyCode === 89){
        myCenter.color = color(255, 255, 0);
        for(var i=0; i<myDots.length; i++){
            myDots[i].color = color(255, 255, 0);
        }
    }
    //"p" all to pink
    if(keyCode === 80){
        myCenter.color = color(255,20,147);
        for(var i=0; i<myDots.length; i++){
            myDots[i].color = color(255,20,147);
        }
    }

    
    //"up" add more dots
    if(keyCode === UP_ARROW){
        var temp = myCenter.shape;
        myDots.push(new Dot(myCenter.x, myCenter.y, random(-10, 10), random(-10, 10), 20, 255, temp));
    }
    //"down" remove dots 
    if(keyCode === DOWN_ARROW){
        myDots.splice(0,1);
    }
    return false;
}

//Returns center size to original 
function mouseReleased(){
    while(myCenter.size > center_size){
        myCenter.size -= 1;
    }
}


