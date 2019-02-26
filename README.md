# This is my Algorithm Design README
------

### Art Piece
![Ryan Bloom](images/alg_design_img1.JPG?raw=true "Ryan Bloom")
![Ryan Bloom](images/alg_design_img2.JPG?raw=true "Ryan Bloom")

For my algorithm design sketch, I wanted the create a largely randomized piece that is more abstract than some of my previous works.  I created a center object class where all of the original dots are emitted from, with random velocity and direction.  From there, I give a lot of the controll over to the user.  There are several control buttons and panels at the top right of the screen that impact the piece in different ways.  Checking on and off the check box turns collision detections between the moving dots on and off.  When collision detection is turned on, every time a dot collides with another dot, its color (and its trail's color) changes.  The next control panel allows the user to select a specific color, which turns all of the objects on the screen into this selected color.  The "Shape Shift" button turns all of the ellipses into rectangles, and the center ellipse into a rotating rectangle.  The speed and direction of this rotating rectangle can be toggled using the left and right arrow keys as well as by using the "Reverse It" button at the top left. 

Additionally, I added several keypress controls for the user to explore.  Pressing the "ENTER" key will turn the center object back to white from whatever color it currently is, the "SHIFT" key does the same to all of the moving objects, and the "SPACE BAR" turns all objects back to white.  Clicking the mouse will randomize the center object's color, and whenever a moving dot intersects the center object, it's size is randomized and its color is changed to that of the center object.  Finally, clicking the down arrow key removes one of the moving dot objects from the image, while the up arrow key adds a new moving dot object, originating from the current location of the mouse.  I tried to create a very abstract piece that gives the users a lot of hidden interactive capabilities through this project.  

[Here's a link to the piece](https://ryanab702.github.io/AlgArt/)