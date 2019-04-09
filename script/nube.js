var game_canvas; 
var game_context;

var game_loaded = false;
var game_running = false;

var title = "Jumping";
var myGamePiece;

//Colors
var headerBackColor = "Black";
var bodyBackColor = "lightblue";
var footerBackColor = "#24248f";

var headerTextColor = "white";
var bodyTextColor = "black";


var currentPanel = 0;


function initGame() {
	game_canvas = document.getElementById("gameCanvas");
	game_context = game_canvas.getContext("2d");
    
    if (!game_loaded) {
        
        document.addEventListener('keydown', function(event){
            captureGameInputs (event);
        })
        
		setInterval(updateGame, 10);
		game_loaded = true;
    }
    

    
    console.log("juego cargado");
    
    cloudx = game_canvas.width;
}

function updateGame () {
    
	if (!game_running) {
		game_context.clearRect(0, 0, game_canvas.width, game_canvas.height);

		switch(currentPanel) {
			case 0:
				splashScreen();
				break;
			case 1:
				initScreen();
				break;
			case 2:
				pauseScreen();
				break;
			case 3:
				gameScreen();
				break;
			case 4:
				helpScreen();
				break;
			case 5:
				creditScreen();
				break;
			default:
				//console.log("sin definir");
				break;
		}
	}
}

function captureGameInputs (event) {
     /*if (event.keyCode == 83) {
         if (currentPanel < 2) {
			 currentPanel++
		 } else {
			 currentPanel = 0}
        }*/
    
    switch (currentPanel) {
        case 0:
            splashScreenInputs (event);
            break;
        case 1:
            initScreenInputs (event);
            break;
        case 2:
            pauseScreenInputs (event);
            break;
        case 3:
            gameScreenInputs (event);
            break;
        case 4:
            helpScreenInputs (event);
            break;
        case 5:
            creditScreenInputs (event);
            break;
        default: 
            console.log("sin definir");
            break;
    }
}

function splashScreenInputs (event) {
    //key S: 83
    if (event.keyCode == 83) {
        currentPanel = 1;
    }	 
}

function initScreenInputs (event) {
    //key S: 83; key 1: 49; key 2: 50;
    if (event.keyCode == 49 || event.keyCode == 97) {
        currentPanel = 3;
    } else if (event.keyCode == 50 || event.keyCode == 98){
        currentPanel = 4;
    } else if (event.keyCode == 51 || event.keyCode == 99) {
        currentPanel = 5;
    } else if (event.keyCode == 27){
        currentPanel = 0;
    }
}

function pauseScreenInputs (event) {
    //key R: 82
    if (event.keyCode == 82) {
        currentPanel = 3;
    } else if (event.keyCode == 27) {
        currentPanel = 1;
    }
	game_running = false;
}

function gameScreenInputs (event) {
    //Key 'esc': 27; key P: 80
    if (event.keyCode == 27 || event.keyCode == 80) {
        currentPanel = 2;
    }
}

function helpScreenInputs (event) {
    //Key 'esc': 27
    if (event.keyCode == 27) {
        currentPanel = 1;
    }
}

function creditScreenInputs (event) {
    //Key s: 83
    if (event.keyCode == 83) {
        currentPanel = 1;
    }
}
//------------------------------
//Screens
//------------------------------

function splashScreen() {
    
    drawHeaderComponent();
    drawDescriptionComponent("May's entertainment..");
    drawFooterComponent("Presiona 'S' para empezar :)");
}

function pauseScreen(){
    
    drawHeaderComponent();
    drawDescriptionComponent("Juego PAUSADO.");
    drawText (35,125,"Presiona 'esc' para salir.")
    drawFooterComponent("Presiona 'R' para reanudar");
}

function initScreen(){
    
    drawHeaderComponent();
    drawDescriptionComponent("Inicio:");
    drawText(35,125,"'esc' - Atrás",bodyTextColor);
    drawText(35,150,"1 - Empezar", bodyTextColor);
    drawText(35,175,"2 - Ayuda", bodyTextColor);
    drawText(35,200,"3 - Créditos", bodyTextColor);
    drawFooterComponent("LET'S FUCKING GO!");
}

function helpScreen (){
    drawHeaderComponent();
    drawDescriptionComponent("Ayuda:");
    drawText (35,125,"-Pulsa 'W' para elevarte.")
    drawText (35,150, "-Pulsa 'esc' para empezar de nuevo si chocas.")
    drawText (35,200, "Good luck, have fun, don't die.")
    drawFooterComponent("Presiona 'esc' para volver");
    
}

function creditScreen (){
    drawHeaderComponent();
    drawDescriptionComponent("Autores:");
    drawText (35,125,"Maychiisu (*•̀ᴗ•́*)و", bodyTextColor)
    drawFooterComponent("Presiona 'S' para empezar de nuevo");
}

function gameScreen (){
    //drawHeaderComponent();
    //drawBodyComponent();
	
	game_running = true;
	var game = new flappyBird();
	game.startGame();
    
        
    //drawFooterComponent("Juego ejecutándose ( ･ ᗜ ･ )");
}

function flappyBird() {
	var that = this;
	
	this.myGamePiece;
	this.myObstacles = [];
	this.myScore;
	this.myGameArea = {
		canvas : game_canvas,
		start : function() {
			this.context = game_context;
			this.frameNo = 0;
			this.interval = setInterval(that.updateGameArea, 20);
		},
		clear : function() {
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		}
	}
	
	this.component = function (width, height, color, x, y, type) {
		this.type = type;
		this.score = 0;
		this.width = width;
		this.height = height;
		this.speedX = 0;
		this.speedY = 0;    
		this.x = x;
		this.y = y;
		this.gravity = 0;
		this.gravitySpeed = 0;
		this.update = function() {
			ctx = that.myGameArea.context;
			if (this.type == "text") {
				ctx.font = this.width + " " + this.height;
				ctx.fillStyle = color;
				ctx.fillText(this.text, this.x, this.y);
			} else {
				ctx.fillStyle = color;
				ctx.fillRect(this.x, this.y, this.width, this.height);
			}
		}
		this.newPos = function() {
			this.gravitySpeed += this.gravity;
			this.x += this.speedX;
			this.y += this.speedY + this.gravitySpeed;
			this.hitBottom();
		}
		this.hitBottom = function() {
			var rockbottom = that.myGameArea.canvas.height - this.height;
			if (this.y > rockbottom) {
				this.y = rockbottom;
				this.gravitySpeed = 0;
			}
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
			if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
				crash = false;
			}
			return crash;
		}
	}
	
	this.startGame = function () {
		that.myGamePiece = new that.component(30, 30, "#76bdd5", this.myGameArea.canvas.width - 40, 120);
		that.myGamePiece.gravity = 0.05;
		that.myScore = new that.component("30px", "Consolas", "black", 280, 40, "text");
		that.myGameArea.start();
		
		document.addEventListener('keydown', function(event){
            if (event.keyCode == 87) {
				that.accelerate(-0.2);
			}
        });
		
		document.addEventListener('keyup', function(event){
            if (event.keyCode == 87) {
				that.accelerate(0.05);
			}
        });
	}
	
	this.updateGameArea = function () {
		var x, height, gap, minHeight, maxHeight, minGap, maxGap;
		for (i = 0; i < that.myObstacles.length; i += 1) {
			if (that.myGamePiece.crashWith(that.myObstacles[i])) {
				return;
			}
		}
		that.myGameArea.clear();
		that.myGameArea.frameNo += 1;
		if (that.myGameArea.frameNo == 1 || that.everyinterval(150)) {
			x = 0;
			minHeight = 20;
			maxHeight = 200;
			height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
			minGap = 50;
			maxGap = 200;
			gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
			that.myObstacles.push(new that.component(10, height, footerBackColor, x, 0));
			that.myObstacles.push(new that.component(10, that.myGameArea.canvas.width - height - gap, "#1e1449", x, height + gap));
		}
		for (i = 0; i < that.myObstacles.length; i += 1) {
			that.myObstacles[i].x += 1;
			that.myObstacles[i].update();
		}
		that.myScore.text="SCORE: " + that.myGameArea.frameNo;
		that.myScore.update();
		that.myGamePiece.newPos();
		that.myGamePiece.update();
	}
	
	this.everyinterval = function (n) {
		if ((that.myGameArea.frameNo / n) % 1 == 0) {return true;}
		return false;
	}

	this.accelerate = function (n) {
		that.myGamePiece.gravity = n;
	}
}



//------------------------------
//Draw functions
//------------------------------

function drawHeaderComponent(){
    
    drawPanel(5,0,game_canvas.width-10,50, headerBackColor);
    drawText(204,32,title, headerTextColor);
    
}

function drawDescriptionComponent(descripcion){
    
    drawPanel(5,53,game_canvas.width-10,213, bodyBackColor);
    drawText(35,100,descripcion, bodyTextColor);
}

function drawBodyComponent(){
    
    drawPanel(5,53,game_canvas.width-10,213, bodyBackColor);
}

function drawFooterComponent(text) {
    
    drawPanel(5,268,game_canvas.width-10,55, footerBackColor);
    drawText(120,300,text, headerTextColor);
    
}

function drawPanel(posx, posy, width, height, Color) {
    
    game_context.fillStyle = Color;
    game_context.fillRect(posx, posy, width, height);
    
}

function drawText (posx, posy ,text, fontColor) {
    
    game_context.fillStyle = fontColor;
    game_context.font = "20px Arial";
    game_context.fillText(text, posx, posy);
}



/* function updateGame() {
	
	fechaActual = new Date();
	
	var tiempoTranscurrido = fechaActual - lastTime;
	var fpsActuales = Math.round(1000 / tiempoTranscurrido);
	
	game_context.clearRect(0, 0, game_canvas.width, game_canvas.height);

	//game_context.fillStyle = "red"; //Color del "pincel" con el que se pinta.
	//game_context.fillRect(50, 50, 100, 100);
	//(x, y, Ancho, largo)

	game_context.fillStyle = "red";
	game_context.beginPath();
	game_context.arc(100, 100, 50, 0, 2 * Math.PI);
	game_context.fill();

	game_context.fillStyle = "pink";
	cloudx = cloudx - 3;
	game_context.fillRect(cloudx, 50, 100, 100);
    
	game_context.fillStyle = "black";
	game_context.fillRect(game_canvas.width - cloudx, 50, 100, 100);

	game_context.fillStyle = "yellow";
	game_context.fillRect(game_canvas.width - 75, 0, 75, 30);

	game_context.fillStyle = "black";
	game_context.font = "16px Arial";
	game_context.fillText(fpsActuales, game_canvas.width - 75, 15);
	
	
	fechaActual = new Date();
	lastTime = fechaActual.getTime();
}

initGame(); */

