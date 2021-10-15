import map from 'map.js';

alert("pacman.js working");
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const tilesize = 30;
const tilemap = new map(tilesize);

function gameLoop()
{	
	alert("gameloop working");
}

tilemap.setCanvasSize(canvas);
