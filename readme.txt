pacman readme

Include a README.txt file to justify why your project is worth 100 points.

Did you use any cool JavaScript libraries?

N/A, pure JS code used.

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