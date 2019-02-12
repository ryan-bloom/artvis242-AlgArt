/*Base functions - setup runs once, draw is continuous*/
let num_dots = 25;
let center_size = 200;
let myCenter;
let myDots = []; // array to hold dot objects

function preload(){

}

function setup(){
    createCanvas(windowWidth, windowHeight);
    
    myCenter = new Center(windowWidth/2-50, windowHeight/2-50, center_size, 255, ellipse);
    for(let i=0; i<num_dots; i++){
        myDots[i] = new Dot(myCenter.x, myCenter.y, random(-5, 5), random(-5, 5), 20, 255, ellipse);
    }
}

function draw(){
    background(0);
   
    for(let i=0; i<myDots.length; i++){
        myDots[i].display();
        myDots[i].move();
        if(myDots[i].intersects(myCenter)){
            myDots[i].color = myCenter.color;
            myDots[i].size = random(15, 70);
        }
        for(let j=0; j<myDots.length; j++){
            if(j != i){
                if(myDots[i].intersects(myDots[j])){
                    myDots[i].color = color(random(255), random(255), random(255));
                    myDots[j].color = color(random(255), random(255), random(255));
                }
            }
        }
    }

    myCenter.display();
    if(mouseIsPressed){
        myCenter.colorChange();
        myCenter.pulse();
    }


}

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

    display(){
        ellipseMode(CENTER);
        noStroke();
        fill(this.color);
        this.shape(this.x, this.y, this.size, this.size);

        for(var i=0; i<this.history.length; i++){
            var pos = this.history[i];
            //stroke(200);
            //line(pos.x, pos.y);
            ellipse(pos.x, pos.y, 8, 8);
        }
    }

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
        if(this.history.length > 200){
            this.history.splice(0,1);
        }
    }

    intersects(arg){
        return(collideCircleCircle(this.x, this.y, this.size, arg.x, arg.y, arg.size));
    }

    setVelo(){
        this.vx = random(-5, 5);
        this.vy = random(-5, 5);
    }
}

class Center{
    constructor(tempX, tempY, tempSize, tempColor, tempShape){
        this.x = tempX;
        this.y = tempY;
        this.size = tempSize;
        this.color = tempColor; 
        this.shape = tempShape;
    }
    display(){
        ellipseMode(CENTER);
        noStroke();
        fill(this.color);
        this.shape(this.x, this.y, this.size, this.size);
    }

    colorChange(){
        this.color = color(random(0,255), random(0,255), random(0,255));
        this.display();
    }

    pulse(){
        this.size += 2;
    }
}

function keyPressed(){
    if(keyCode === ENTER){
        myCenter.color = 255;
        for(var i=0; i<myDots.length; i++){
            myDots[i].color = (255);
        }
    }
    if(keyCode === 32){
        myCenter.color = 255;
    }
    if(keyCode === SHIFT){
        for(var i=0; i<myDots.length; i++){
            myDots[i].color = (255);
        }
    }
    return false;
}

function mouseReleased(){
    while(myCenter.size > center_size){
        myCenter.size -= 1;
    }
}
