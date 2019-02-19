/*Base functions - setup runs once, draw is continuous*/
let num_dots = 10;
let center_size = 150;
let myCenter;
let myDots = []; // array to hold dot objects
let rand;
let col;
let rotation;
let rotFactor;

//Create 1 center object and fill myDots array
function setup(){
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    ellipseMode(CENTER);
    rand = false;
    rotation = 0;
    rotFactor = 0.06;
    col = document.getElementById("color_picker");
    
    myCenter = new Center(windowWidth/2, windowHeight/2, center_size, 255, ellipse);
    for(let i=0; i<num_dots; i++){
        myDots[i] = new Dot(myCenter.x, myCenter.y, random(-10, 10), random(-10, 10), 20, 255, ellipse);
    }
}

//Move dots in myDots checking for collisions each iteration 
function draw(){
    background(0);
    col = document.getElementById("color_picker");
   
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
    if(mouseIsPressed && mouseY > 4){
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
    //Check for collisions
    intersects(arg){
        return(collideCircleCircle(this.x, this.y, this.size, arg.x, arg.y, arg.size));
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
        if(this.shape === rect){
            rotation += rotFactor;
            translate(windowWidth/2, windowHeight/2);
            rotate(rotation);
            this.shape(0, 0, this.size, this.size);
        }
        else{this.shape(this.x, this.y, this.size, this.size);}
    }
    //Called on mouseClick
    colorChange(){
        this.color = color(random(0,255), random(0,255), random(0,255));
        this.display();
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
        col.value = "#ffffff";
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
        col.value = "#ffffff";
        for(var i=0; i<myDots.length; i++){
            myDots[i].color = (255);
        }
    }
    //"up" add more dots
    if(keyCode === UP_ARROW){
        var temp = myCenter.shape;
        //myDots.push(new Dot(myCenter.x, myCenter.y, random(-10, 10), random(-10, 10), 20, 255, temp));
        myDots.push(new Dot(mouseX, mouseY, random(-10, 10), random(-10, 10), 20, col.value, temp));
    }
    //"down" remove dots 
    if(keyCode === DOWN_ARROW){
        myDots.splice(0,1);
    }

    //"left" subtract from rotation factor
    if(keyCode === LEFT_ARROW){
        rotFactor -= 0.01;
    }
    //"right" add to rotation factor
    if(keyCode === RIGHT_ARROW){
        rotFactor += 0.01;
    }
    return false;
}

//Returns center size to original 
function mouseReleased(){
    while(myCenter.size > center_size){
        myCenter.size -= 1;
    }
}

//Called when check box is clicked -- turn collision detection on and off
function toggleCollisions(){
    if(rand === false){rand = true;}
    else{rand = false;}
}

//Called when color selctor is changed -- turn all elements selected color
function colorSwap(){
    myCenter.color = col.value;
    for(var i=0; i<myDots.length; i++){
        myDots[i].color = col.value;
    }
}

//Called when shape shift button clicked -- turns to other shape
function shapeShift(){
    if(myCenter.shape === rect){
        myCenter.shape = ellipse;
        for(var i=0; i<myDots.length; i++){
            myDots[i].shape = ellipse;
        }
    }
    else{
        myCenter.shape = rect;
        for(var i=0; i<myDots.length; i++){
            myDots[i].shape = rect;
        }
    }
}

//Changes direction of rotation of center square
function rotateSwap(){
    rotFactor *= -1;
}


