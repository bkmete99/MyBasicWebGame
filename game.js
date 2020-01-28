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
var myObstacles = [];
var myScore;
var pressenter;
var required;
function startGame() {
    myGamePiece = new component(30, 30, "red", 10, 120);
    myScore = new component("30px", "Consolas", "black", 280, 40, "text");
    
     required=150;
    myGameArea.start();
   
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 580;
        this.canvas.height = 470;
          this.canvas.style.cursor = "none"; //hide the original cursor
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        
      window.addEventListener('mousemove', function (e) {
      myGameArea.x = e.pageX;
      myGameArea.y = e.pageY;
    })
  },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
         finish = new component("30px", "Consolas", "black", 180, 140, "text");
         pressenter = new component("30px", "Consolas", "black", 140, 240, "text");
      finish.text="Game Over";
      pressenter.text=" Press enter to try again";
      pressenter.update();
      finish.update();
      window.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      // code for enter
      document.location.href="";
             
    }
        
});
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
            if (this.type == "obs") {
            if(this.x<0){this.x=580;}
            if(this.y<0){this.y=470;}
            
            if(this.x>580){this.x=0;}
            if(this.y>470){this.y=0;}
        }
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
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
        var crash = false;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            myGameArea.stop();
            return;
        } 
    }
    myGameArea.clear();
  if (myGameArea.x && myGameArea.y) {
    myGamePiece.x = myGameArea.x;
    myGamePiece.y = myGameArea.y;
  }
 
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(required)) { //new obstacle
      required=required*5/4;
      required=parseInt(required);
      document.getElementById("httx").innerHTML=required;
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles.push(new component(30, 30, "black", 100, 100,"obs"));
        
    }
    
    
    for (i = 0,j=0,k=0; i < myObstacles.length; i += 1,j+=5,k+=7){
    if((k%10)-5==0){k=1;}
    if((j%10)-5==0){j=1;}
    
        myObstacles[i].speedX = (k%10)-5;
        myObstacles[i].speedY = (j%10)-5;
     
        myObstacles[i].newPos();
        myObstacles[i].update();
    }
    myScore.text="SCORE: " + myGameArea.frameNo;
    myScore.update();
    myGamePiece.newPos();    
    myGamePiece.update();
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}


function clearmove() {
    myGamePiece.speedX = 0; 
    myGamePiece.speedY = 0; 
}
</script>

<p id="httx">The score will count one point for each frame you manage to "stay alive".</p>
</body>
</html>
