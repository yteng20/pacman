document.addEventListener('DOMContentLoaded', () => {
	const grid = document.querySelector('.grid');
	level = 1;
	let end = false;

	//generate random map(still need to be fix)
	// 0 - path
	// 1 - wall
	// 2 - ghost-lair
	// 3 - treasure
 
  	const map = Array.from({ length: 10 }, () => Array.from({ length: 13 }, () => 1));

	function createMap()
	{
		for(let i = 0; i < 10; i++){
			for(let j = 0; j < 13; j++){
				if(i > 0 && i < 9 && j > 0 && j < 12){
					map[i][j] = Math.floor(Math.random() *2);
				}
				else{
					map[i][j] = 1;
				}
			}
		}

		count = 0;
		for(let i = 0; i < 10; i++){
			for(let j = 0; j < 13; j++){
				if(i > 0 && i < 9 && j > 0 && j < 12){
					if(map[i-1][j] == 1){
						count = count + 1;
					}			
					if(map[i+1][j] == 1){
						count = count + 1;
					}			
					if(map[i][j-1] == 1){
						count = count + 1;
					}			
					if(map[i][j+1] == 1){
						count = count + 1;
					}	
		    
					if(count != 1){
						map[i][j] = 0;
					}
					count = 0;
				}
			}		
		}
		//map[5][6]=2;
		//map[4][6]=2;
		map[6][6]=0;
		
		count = 0;
		var adj = new Boolean(false);
		while(adj != true) {
			i = Math.floor(Math.random() *8) + 1;
			j = Math.floor(Math.random() *11) + 1;
			if(map[i-1][j] == 0){
				count = count + 1;
			}		
			if(map[i+1][j] == 0){
				count = count + 1;
			}				
			if(map[i][j-1] == 0){
				count = count + 1;
			}			
			if(map[i][j+1] == 0){
				count = count + 1;
			}		
		    
			if(count >= 2 && map[i][j] == 0){
				map[i][j] = 3;
				adj = true;
			}
			count = 0;
		}
	}

	createMap();
		
	map2 = [].concat.apply([], map);
	const squares = [];

	//create your board
	function createBoard() {
		for (let i = 0; i < map2.length; i++) {
			const square = document.createElement('div');
			grid.appendChild(square);
			squares.push(square);

			//add map to the board
			if(map2[i] === 0) {
				squares[i].classList.add('pac-dot');
			} else if (map2[i] === 1) {
				squares[i].classList.add('wall');
			} else if (map2[i] === 2) {
				squares[i].classList.add('ghost');
			} else if (map2[i] === 3) {
				squares[i].classList.add('treasure');
			}
		}
	}
	createBoard();

	//pacman
	let pacmanIndex=0;

	class ghost {
		constructor(className, starterindex, speed) {
			this.className = className;
			this.speed = speed;
			this.starterindex = starterindex;
			this.currentIndex = starterindex;
		}
		move(){
			squares[this.currentIndex].classList.add('pac-dot');
			squares[this.currentIndex].classList.remove('ghost');
			
			let i = Math.floor(Math.random() * 4);
			switch(i) {
				case 0:
				//moves left until it cant
					if(this.currentIndex % 13 !== 0 && !squares[this.currentIndex -1].classList.contains('ghost')  && !squares[this.currentIndex -1].classList.contains('wall') && !squares[this.currentIndex -1].classList.contains('treasure')){
						this.currentIndex -= 1;
					}
					break;
				//else moves up		
				case 1:
					if(this.currentIndex - 13 >= 0 && !squares[this.currentIndex -13].classList.contains('ghost') && !squares[this.currentIndex -13].classList.contains('wall') && !squares[this.currentIndex -13].classList.contains('treasure')){
						this.currentIndex -= 13;
					}
					break;
					//else mvoes right
				case 2:
					if(this.currentIndex % 13 < 13 - 1 && !squares[this.currentIndex +1].classList.contains('ghost') && !squares[this.currentIndex +1].classList.contains('wall') && !squares[this.currentIndex +1].classList.contains('treasure')){
						this.currentIndex += 1;
					}
					break;
				//else moves down
				case 3:
					if (this.currentIndex + 13 < 13 * 13 && !squares[this.currentIndex+13].classList.contains('ghost') && !squares[this.currentIndex +13].classList.contains('wall') && !squares[this.currentIndex +13].classList.contains('treasure')){
						this.currentIndex += 13;
					}
					break;
			}
			squares[this.currentIndex].classList.add('ghost');
		}
	}

	ghosts = [];
	
	function pacmanAndGhost() {
		if(squares[84] === 3) {
			pacmanIndex=45;
		}	
		else
		{
			pacmanIndex=84;
		}
		
		squares[pacmanIndex].classList.add('pac-man');

		for (var i = 0; i < ghosts.length; i++) {
			squares[ghosts[i].currentIndex].classList.add('pac-dot');
			squares[ghosts[i].currentIndex].classList.remove('ghost');
		}

		if(level == 1)
		{
			ghosts = [new ghost("first", 68, 250), new ghost("second", 23, 250), new ghost("third", 47, 250)];
		}
		else
		{
			//ghosts = [new ghost("first", 71, 300), new ghost("second", 58, 400)];
			ghosts = [new ghost("first", 68, 250), new ghost("second", 23, 250), new ghost("third", 47, 250), new ghost("fourth", 75, 500)];
		}
	
		for (var i = 0; i < ghosts.length; i++) {
			squares[ghosts[i].currentIndex].classList.remove('pac-dot');
			squares[ghosts[i].currentIndex].classList.add('ghost');
		}
	}
	
	pacmanAndGhost()
	
	
	//movement
	function movePacman(e) {
		if(end == false)
		{
			squares[pacmanIndex].classList.remove('pac-man');
		
			switch(e.keyCode) {
				case 37:
					if(pacmanIndex % 13 !== 0 && (squares[pacmanIndex -1].classList.contains('pac-dot') || squares[pacmanIndex -1].classList.contains('treasure'))) {
						pacmanIndex -= 1;			
					}
					break;
				case 38:
					if(pacmanIndex - 13 >= 0 && (squares[pacmanIndex -13].classList.contains('pac-dot') || squares[pacmanIndex -13].classList.contains('treasure'))) {
						pacmanIndex -= 13;
					}
					break;
				case 39:
					if(pacmanIndex % 13 < 13 - 1 && (squares[pacmanIndex +1].classList.contains('pac-dot') || squares[pacmanIndex +1].classList.contains('treasure'))) {
						pacmanIndex += 1;
					}
					break;
				case 40:
					if (pacmanIndex + 13 < 13 * 13 && (squares[pacmanIndex +13].classList.contains('pac-dot') || squares[pacmanIndex +13].classList.contains('treasure'))) {
						pacmanIndex += 13;
					}
					break;
			}
			squares[pacmanIndex].classList.add('pac-man');
			check()
		}
		
	}
	
	const startbutton = document.querySelector("#start");
	const nextbutton = document.querySelector("#button");

	/* Event listener */
	startbutton.addEventListener("click", startButton, false);
	nextbutton.addEventListener("click", nextButton, false);

	function startButton(){
		document.addEventListener('keyup', movePacman);
		end = false;		
		window.setInterval(moveGhosts, 500);
	}

	function nextButton(){
		window.setInterval(moveGhosts, 250);
		pacmanAndGhost();
	}
	
	function check() {
		if(squares[pacmanIndex].classList.contains('ghost') )
		{	
			for (var i = 0; i < ghosts.length; i++) {
				squares[ghosts[i].currentIndex].classList.remove('ghost');
				squares[pacmanIndex].classList.remove('ghost');
				squares[ghosts[i].starterindex].classList.add('ghost');
				ghosts[i].currentIndex = ghosts[i].starterindex;
				end = true;
			}
			alert("You lose.");			
		}
		if(squares[pacmanIndex].classList.contains('treasure'))
		{
			squares[pacmanIndex].classList.remove('pac-man');

			if(level == 1)
			{
				document.getElementById("button").style.visibility="visible";
				alert("First level cleared. Click 'Next Level' to move on.");
				level = 2;
			}
			else{
				alert("You win! All levels cleared.");
			}
			end = true;			
		}
	}

	function moveGhosts() {
		if(end == false)
		{
			for (var i = 0; i < ghosts.length; i++) {
				ghosts[i].move();
				check();
			}
		}
	}	
});
