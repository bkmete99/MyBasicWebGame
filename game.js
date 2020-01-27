<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<style>
canvas {
    border:1px solid #d3d3d3;
    background-color: #f1f1f1;
}
</style>
</head>
<body onload="startGame()">
<script>

var myGamePiece;
var myObstacle;
let frame=0;
let Onum=0;
var OBS;
function startGame() {
  myGamePiece = new component(30, 30, "red", 10, 120);
  OBS[0] = new component(10, 200, "green", 300, 120);
  myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.canvas.style.cursor = "none"; //hide the original cursor
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('mousemove', function (e) {
            myGameArea.x = e.pageX;
            myGameArea.y = e.pageY;
        })
    }, 
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        if(this.x<0){this.x=480}
        if(this.x>480){this.x=0}
        if(this.y<0){this.y=270}
        if(this.y>270){this.y=0}
    }
      this.crashWith = function(otherobj) {
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (otherobj.width);
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + (otherobj.height);
    var crash = true;
    if ((mybottom < othertop) ||
    (mytop > otherbottom) ||
    (myright < otherleft) ||
    (myleft > otherright)) {
      crash = false;
    }
    return crash;
  }
}


function updateGameArea() {
   
     if (myGamePiece.crashWith(myObstacle)) {
    myGameArea.stop();
  } else {myGameArea.clear();
    frame++;
if(frame%3==0){document.getElementById("score").innerHTML=frame/3;} 
if(frame%100==0){
document.getElementById("on").innerHTML="OBS NUM IS"+Onum;
Onum++
  OBS[Onum] = new component(10, 200, "green", 290+Onum, 120);
  
} 

for(let i=0;i<Onum;i++){
OBS[i].update();
  OBS[i].x--;
  OBS[i].y--;
  }
    if (myGameArea.x && myGameArea.y) {
        myGamePiece.x = myGameArea.x;
        myGamePiece.y = myGameArea.y;        
    }
    myGamePiece.update();
}
}
</script>
<p id="score">Move the cursor inside the canvas to move the red square.</p>
<p id="on">Move the cursor inside the canvas to move the red square.</p>

</body>
</html>
