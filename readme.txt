pacman readme

Why is your project worth 100 points?

Our project is worth 100 points because it utilizes seamlessly uses features of the standard Java Script library
and of thr Velocity.js library to create a version of the game Pac-Man.
Broadly speaking, there's a non-zero degree of complexity to creating a grid / maze exploration
algorithm, and our code has a few elements which help that complexity shine.
To begin with, the use of rather simple JS elements such as the array grid which comprises
the board, along with careful indexing and checks to ensure the game doesn't break on loading
or during play, more or less makes up the entirety of game code, along with the ghost and player 
class interactions. We argue this demonstrates a clear application of the broader possibilities 
of JS in a way which builds upon their use in a fun and visual way. Furthermore, we used the Velocity.js library to
create interesting visual effects upon loading the game. This library adds a level of fun to the game. 
Our project also includes other aspects of complexity from the standard JS: the random map generation,
the Math .random and .floor functions both demonstrates randomness which is accounted for such that the maps 
it generates is generally unique and shouldn't be bugged upon load. The ghosts also display
random unpredictable movement that utilizes the setInterval function of the window 
to repeatedly make random movements in order to catch the pac-man. This, in the context 
of the game, adds some fun replayability; and, within the code, demonstrates further complexity.
Finally, despite the building blocks of the project being relatively simple to understand and
use JS elements, we felt that adding a degree of polish to the code to avoid bugs wherever possible
and generally making the game look good and comprehensible to a degree could do wonders to
compensate for the simplicity of the mechanics. Which, hopefully, would work alongside the
random generation to really help our project shine.

Did you use any cool JavaScript libraries?

We used velocity.js to add some cool effects to the title and level number.
The title fades is then the level number fades in upon the document loading. When the level changes 
the new level number is faded in. The code looks like:
Velocity(document.getElementById("pacman"), "fadeIn", { duration: 1500 });

What nifty features of your program were a bear to implement?

Initial issues included board generation, which initially had a few errors which led to
the board never loading; the issue seemed to stem from i, j indexing errors and was
solved by adjusting these values, after messing around with a few buttons to help loading.
Said button ended up being implemented as the start game button in the final project.
Getting the ghost AI to move correctly was a challenge, especially working out an algorithm
that checks for overlapping ghosts and walls; outside of these parameters, movement for AI
is otherwise random and based on navigating a grid (array) of "square" div objects. Player
movement was otherwise based on a similar algorithm insofar as updating the position in
the squares array, only checking for key pressed events to update the position. Implementing 
a second level by introducing a second ghost was also a fairly simple implementation, with 
the pacmanAndGhost function checking the level number and updating the ghosts array, to then 
update the squares array, finally updating the board. This, in turn, made the addition of 
"level 2" content a simple affair, in terms of adding to existing code.