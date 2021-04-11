/*
var grid = [
	[1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
	[1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1],
	[1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
	[1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1],
	[1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1],
	[1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1],
	[1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1],
	[1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
	[1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

var path = finder.findPath(5, 0, 1, 10, grid);
*/

var grid;
let start = []
let end = []
let interval;
let blockS = 27.3;
var gameS = new Audio("https://komelt.github.io/gameBoyMaze/sound/nintendo_games.mp3");

var c = document.getElementById('maze');
var ctx = c.getContext('2d');
ctx.beginPath();

//generateMaze();

Swal.fire({
	title: "Welcome in a Game Boy maze!",
	text: "After your Game boy turns on, on the left side will two buttons appear with which you control the Game boy. Also, don't forget to turn on your speakers so you could enjoy original Game boy music. ",
	icon: 'info',
	confirmButtonText: 'I understand'
}).then(() => { welcomeScreen() })

function welcomeScreen() {
	var audio = new Audio("https://komelt.github.io/gameBoyMaze/sound/gameboy_startup.mp3");
	var img = new Image();
	img.src = "https://komelt.github.io/gameBoyMaze/img/nintendo.svg";
	img.onload = function () {
		let width = 550 * 0.9;
		let offset = 550 - (550 * 0.9)
		console.log(c.clientWidth)
		let height = (width * 134) / 838

		let i = 0;
		let wsInterval = setInterval(() => {
			ctx.clearRect(0, 0, 550, 550);
			ctx.drawImage(img, offset / 2, i, width, height);
			if (i >= 200 + height / 2) {
				clearInterval(wsInterval)
				setTimeout(() => {
					generateMaze();
					document.getElementById("d2").style.display = "flex"
				}, 1000)
			}
			if (i > (200 + height / 2) - 15 && i < (200 + height / 2))
				audio.play();
			i++
		}, 14)
	}
}

function theEnd() {
	var theEnd = new Audio("https://komelt.github.io/gameBoyMaze/sound/the_end.mp3");
	theEnd.play();
	ctx.clearRect(0, 0, 550, 550);

	var img = new Image();
	img.src = "https://komelt.github.io/gameBoyMaze/img/the_end.svg";
	img.onload = function () {
		let width = 550 * 0.9;
		let offset = 550 - (550 * 0.9)
		console.log(c.clientWidth)
		let height = (width * 134) / 838

		let i = 0;
		let wsInterval = setInterval(() => {
			theEnd.play();
			ctx.clearRect(0, 0, 550, 550);
			ctx.drawImage(img, offset / 2, i, width, height);
			if (i >= 200 + height / 2) {
				clearInterval(wsInterval)
			}

			i++
		}, 14)
	}


}

function play() {
	clearInterval(interval)
	gameS.pause()
	gameS.currentTime = 0;
	drawMaze()

	document.getElementById('play').style.display = 'none';
	document.getElementById('redo').style.display = 'flex';

	var grid1 = new PF.Grid(grid);
	var finder = new PF.AStarFinder();

	var path = []

	console.log("Start Array length " + start.length)

	for (i = 0; i < start.length; i++) {
		console.log("Start Coordinates, " + start)
		console.log("End Coordinates, " + end)
		path = finder.findPath(start[i][0], start[i][1], end[0][0], end[0][1], grid1);
		console.log(path)
		if (path.length != 0)
			break;
	}

	if (path.length == 0) {
		Swal.fire({
			title: 'Error!',
			text: "This maze doesn't have solution!",
			icon: 'error',
			confirmButtonText: 'Generate new maze'
		}).then(() => {
			generateMaze();
		})
		return;
	}

	ctx.beginPath();
	let x = 0;
	gameS.play();
	interval = setInterval(() => {

		if (x == path.length - 1) {
			clearInterval(interval)
			gameS.pause()
			gameS.currentTime = 0;
		}

		try {
			let j = path[x][0];
			let i = path[x][1];
			ctx.rect(j * blockS, i * blockS, blockS, blockS);
			ctx.fillStyle = '#b9b5b2';
			ctx.fill();
			ctx.stroke();
			x++;

			console.log([i, j])
			if (i == 19) {
				console.log("end")
				gameS.pause()
				gameS.currentTime = 0;
				theEnd()
			}
		} catch (err) {
			console.log("ERROR in interval")
			console.log(err)
			clearInterval(interval)
			gameS.pause()
			gameS.currentTime = 0;
		}
	}, 500);
}

function generateMaze() {
	clearInterval(interval)
	gameS.pause()
	gameS.currentTime = 0;
	/*start = [];
	end = [];
	grid = []*/
	let size = 20;
	let path = ""

	/*while (start.length == 0) {
	start = [];
	end = [];
	grid = []
	generate(size, 1, 1);

	for (i = 0; i < size; i++) {
		if (grid[0][i] == "") {
			start.push([i, 0]);
		}

		if (grid[size - 1][i] == "g") {
			end.push([i, size - 1]);
			grid[size - 1][i] = 0;
		}
	}
	}

	console.log("start " + start)
	console.log("end " + end + " ")*/

	while (path.length == 0) {
		start = [];
		end = [];
		grid = []

		generate(size, 1, 1);

		for (i = 0; i < size; i++) {
			if (grid[0][i] == "") {
				start.push([i, 0]);
			}

			if (grid[size - 1][i] == "g") {
				end.push([i, size - 1]);
				grid[size - 1][i] = 0;
			}
		}

		for (i = 0; i < grid.length; i++) {
			for (j = 0; j < grid[i].length; j++) {
				if (grid[i][j] == "" || grid[i][j] == "g")
					grid[i][j] = 0
				else if (grid[i][j] == "w")
					grid[i][j] = 1;
			}
		}

		var grid1 = new PF.Grid(grid);
		var finder = new PF.AStarFinder();

		for (i = 0; i < start.length; i++) {
			console.log("Start Coordinates, " + start)
			console.log("End Coordinates, " + end)
			path = finder.findPath(start[i][0], start[i][1], end[0][0], end[0][1], grid1);
			console.log(path)
			if (path.length != 0)
				break;
		}

		console.log(path.length)


	}

	console.log(path.length)

	console.log("generated")

	drawMaze();

	document.getElementById('play').style.display = 'flex';
	document.getElementById('redo').style.display = 'none';
}

function drawMaze() {
	ctx.clearRect(0, 0, 550, 550);
	ctx.beginPath();
	ctx.fillStyle = '#000000';
	ctx.fill();

	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			if (grid[i][j] == 1) {
				ctx.rect(j * blockS, i * blockS, blockS, blockS);
				ctx.fill();
				ctx.stroke();
			}
		}
	}
}

function generate(dimensions, numDoors) {
	grid = new Array();
	for (var i = 0; i < dimensions; i++) {
		grid[i] = new Array();

		for (var j = 0; j < dimensions; j++) {
			grid[i][j] = '';
		}
	}

	addOuterWalls();
	var ent = addEntrance();
	addInnerWalls(true, 1, grid.length - 2, 1, grid.length - 2, ent);
}

function addOuterWalls() {
	for (var i = 0; i < grid.length; i++) {
		if (i == 0 || i == grid.length - 1) {
			for (var j = 0; j < grid.length; j++) {
				grid[i][j] = 'w';
			}
		} else {
			grid[i][0] = 'w';
			grid[i][grid.length - 1] = 'w';
		}
	}
}

function addEntrance() {
	var x = randomNumber(1, grid.length - 1);
	grid[grid.length - 1][x] = 'g';
	return x;
}

function addInnerWalls(h, minX, maxX, minY, maxY, gate) {
	if (h) {
		if (maxX - minX < 2) {
			return;
		}

		var y = Math.floor(randomNumber(minY, maxY) / 2) * 2;
		addHWall(minX, maxX, y);

		addInnerWalls(!h, minX, maxX, minY, y - 1, gate);
		addInnerWalls(!h, minX, maxX, y + 1, maxY, gate);
	} else {
		if (maxY - minY < 2) {
			return;
		}

		var x = Math.floor(randomNumber(minX, maxX) / 2) * 2;
		addVWall(minY, maxY, x);

		addInnerWalls(!h, minX, x - 1, minY, maxY, gate);
		addInnerWalls(!h, x + 1, maxX, minY, maxY, gate);
	}
}

function addHWall(minX, maxX, y) {
	var hole = Math.floor(randomNumber(minX, maxX) / 2) * 2 + 1;

	for (var i = minX; i <= maxX; i++) {
		if (i == hole) grid[y][i] = '';
		else grid[y][i] = 'w';
	}
}

function addVWall(minY, maxY, x) {
	var hole = Math.floor(randomNumber(minY, maxY) / 2) * 2 + 1;

	for (var i = minY; i <= maxY; i++) {
		if (i == hole) grid[i][x] = '';
		else grid[i][x] = 'w';
	}
}

function randomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function noneSolutionMaze() {
	document.getElementById("error").style.display = "none"
	generateMaze();
}