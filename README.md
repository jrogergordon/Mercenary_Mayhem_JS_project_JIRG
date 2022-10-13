Jacob Irving Roger-Gordon;

Project name: For the King;
Project type: Game;

Intro:
Hello Dear Reader! Thank you for looking at my dear old game. For the King
is a grid based strategy game, that plays a little bit like tag. You, the player,
are in control of two pieces: the King and the King's protector Boyd, both
loacted in the upper right of the map. Petrine, the enemy, is located in the bottom
right and she will seek out the King. Petrine moves 4 spaces on each turn while
the King and Boyd can move 6 on each turn.
If Petrine touches the King she will slay him and you will lose! But if Boyd hits
Petrine twice he will kill her and you will win! Good luck!

Live link: https://jrogergordon.github.io/Mercenary_Mayhem_JS_project_JIRG/


Functionality/Features:

Pieces can be moved across a map:
![Pieces on a Map](/src/assets/Functionality1.png "Pieces on a Map")
![Pieces Move](/src/assets/Functionality2.png "Pieces Move")
For the King's main feature is an interactive gridboard that pieces can be moved across. Two player controlled pieces, the King and Boyd, start the game at the top right of the grid and can be selected and moved across the board with the arrow keys and space bar.
```js script
// execute me
```

Enemy AI knows where the King is and tries to win by killing the king:
![AI starting](/src/assets/FunctionalityAI-1.png "AI Start")
![AI moves in an attempt to reach the king ](/src/assets/FunctionalityAI-2.png "AI moves")
The enemy AI knows where the King piece is and continously tries to move towards him in an effort to kill him and win the game.
```js script
            this.#moveEnemy();
            this.#moveEnemy();
            this.#moveEnemy();
            this.#moveEnemy();
            this.record++;
            if (this.record > this.highScore) this.highScore = this.record;
            if(this.#fightPlayer() === true) {
                this.player.health = 0;
            }
            //this is the eneme 'moving' and checking if it's next to the King. If the AI is    
            //next to the king it kills the King .
```



A Cursor element can move across the screen, giving you information about characters and elements hovered, as well as allowing you to select pieces for movement.
![Cursor hovers water](/src/assets/FunctionalitycursorWater.png "Cursor Hovers Water")
![Cursor hovers columns](/src/assets/FunctionalitycursorColumns.png "Cursor Hovers columns")
![Cursor hovers characters](/src/assets/FunctionalitycursorCharacters.png "Cursor Hovers characters")
```js script
//this is the code for a right arrow key press when the cursor is the main element
        else if (keyCode === 40) {
            if (this.#isValidMove(0, 1, this.currPlayer)) {
                if (this.currPlayer.moves === this.currPlayer.startMoves) {
                    this.matrix[this.currPlayer.y][this.currPlayer.x] = 10;
                }
                if (this.currPlayer === this.cursor) {
                    this.matrix[this.currPlayer.y][this.currPlayer.x] = this.stepOver;
                    this.stepOver = this.matrix[this.currPlayer.y + 1][this.currPlayer.x];
                    this.matrix[this.currPlayer.y + 1][this.currPlayer.x] = this.currPlayer.value;
                    this.currPlayer.y++;
                } else {...}...
```

The Game can be won, lost, and restarted
![Win Screen](/src/assets/FunctionalityWin.png "Win")
![Loss Screen](/src/assets/FunctionalityLoss.png "Loss")
![Restart](/src/assets/FunctionalityRestart.png "Restart")
```js script
// execute me
```

