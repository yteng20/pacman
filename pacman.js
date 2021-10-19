document.addEventListener('DOMContentLoaded', () => {
	const grid = document.querySelector('.grid');
	
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
		
		//map[5][5]=2;
		map[5][6]=2;
		//map[5][7]=2;
		//map[4][5]=2;
		map[4][6]=2;
		//map[4][7]=2;
		
		count = 0;
		i = Math.floor(Math.random() *8) + 1;
		j = Math.floor(Math.random() *11) + 1;
		var adj = new Boolean(false);
		while(adj != true) {
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
		    
			if(count >= 2 && map[i][j] != 2 && i != 6 && j != 6){
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
				squares[i].classList.add('ghost-lair');
			} else if (map2[i] === 3) {
				squares[i].classList.add('treasure');
			}
		}
	}
	createBoard();

	//pacman
	let pacmanIndex=84;
	squares[pacmanIndex].classList.add('pac-man');
});