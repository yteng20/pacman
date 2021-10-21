document.addEventListener('DOMContentLoaded', () => {
	const grid = document.querySelector('.grid');
	level = 1;
	
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
		map[5][6]=2;
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
		constructor(className, currentIndex, speed) {
			this.className = className;
			this.speed = speed;
			this.currentIndex = currentIndex;
		}
		move(){
			squares[this.currentIndex].classList.add('pac-dot');
			squares[this.currentIndex].classList.remove('ghost');
			//moves left until it cant
			if(this.currentIndex % 13 !== 0 && squares[this.currentIndex -1].classList.contains('pac-dot')){
				this.currentIndex -= 1;
			}
			//else moves up			
			else if(this.currentIndex - 13 >= 0 && squares[this.currentIndex -13].classList.contains('pac-dot')){
				this.currentIndex -= 13;
			}
			//else mvoes right
			else if(this.currentIndex % 13 < 13 - 1 && squares[this.currentIndex +1].classList.contains('pac-dot')){
				this.currentIndex += 1;
			}
			//else moves down
			else if (this.currentIndex + 13 < 13 * 13 && squares[this.currentIndex +13].classList.contains('pac-dot')){
				this.currentIndex += 13;
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

		if(level == 1 && level != 2)
		{
			ghosts = [new ghost("first", 71, 250)];
		}
		else
		{
			//ghosts = [new ghost("first", 71, 300), new ghost("second", 58, 400)];
			ghosts = [new ghost("first", 34, 300), new ghost("second", 58, 400)];
		}
	
		for (var i = 0; i < ghosts.length; i++) {
			squares[ghosts[i].currentIndex].classList.remove('pac-dot');
			squares[ghosts[i].currentIndex].classList.add('ghost');
		}
	}
	
	pacmanAndGhost()
	
	
	//movement
	function movePacman(e) {
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
	
	const startbutton = document.querySelector("#start");
	const nextbutton = document.querySelector("#button");

	/* Event listener */
	startbutton.addEventListener("click", startButton, false);
	nextbutton.addEventListener("click", nextButton, false);

	function startButton(){
		document.addEventListener('keyup', movePacman);
		window.setInterval(moveGhosts, 5000);
	}

	function nextButton(){
		pacmanAndGhost();
	}
	
	function check() {
		if(squares[pacmanIndex].classList.contains('ghost') )
		{
			alert("You loose");

		}
		if(squares[pacmanIndex].classList.contains('treasure'))
		{
			squares[pacmanIndex].classList.remove('pac-man');

			if(level == 1)
			{
				document.getElementById("button").style.visibility="visible";
				alert("Click the button for the next level");
				level = 2;
			}
			else{
				alert("All levels cleared");
			}		
		}
	}

	function moveGhosts() {
		for (var i = 0; i < ghosts.length; i++) {
			ghosts[i].move();
		}
	}	
});
