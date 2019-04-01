var game_canvas; 
var game_context;

var cloudx;

var startTime;
var currentTime;

var fps = 60;

var fechaActual = new Date();
var lastTime = fechaActual.getTime();

function initGame() {
	game_canvas = document.getElementById("gameCanvas");
	game_context = game_canvas.getContext("2d");

	cloudx = game_canvas.width;
}

function updateGame() {
	
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

initGame();

setInterval(updateGame, 1000 / fps);

