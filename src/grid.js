class GridSystem {
    constructor(matrix, player) {
        this.matrix = matrix;
        this.uiContext = this.#getContext(1000, 580, "purple");
        this.outlineContext = this.#getContext(0, 0, "#444");
        this.topContext = this.#getContext(0, 0, "#111", true);
        this.cellSize = 25;
        this.padding = 1;
        this.turnCounter = 10;
        this.gameOver = false;
        this.moves = [[1, 0], [-1, 0], [0, 1], [0, -1]];

        this.player2 = {y: 4, x: 2, color: "#338642", value: 6, health: 20,
            atk: 3, spd: 5, moves: 6, startMoves: 6, name: "Jeff, the tepid"}
        this.matrix[this.player2.x][this.player2.y] = 5;
        this.player2.sayings = [
            "I am Jeff, the Tepid",
            "Hi there",
            "Scary place",
            "I prefer my coffee tepid",
            "No iced tea for me",
            "Battle isn't quite tepid",
            "Tepid: 'only slightly warm'",
            "Some like it tepid",
            "I'm not fond of the heat",
            "I'm not fond of the cold",
            "How did I get this job",
            "Not really a fighter"
        ]

        this.player3 = { y: 2, x: 4, color: "#338642", value: 5, health: 20,
            atk: 3, spd: 0, moves: 6, startMoves: 6, name: "Boyd, Stalwart Protector"}
        this.matrix[this.player3.x][this.player3.y] = 6;
        this.player3.sayings = [
            "I am Boyd, hello",
            "For the King!",
            "I shall protect his Majesty!",
            "It is my greatest honor",
            "I shall protect",
            "Just as my father before me!",
            "To protect is holy",
            "With this shield",
            "With my sword",
            "I shall strike you!",
            "Do not approach!",
            "Get behind me!"
        ]

        this.player = {y: 3, x: 3, color: "#3D7EC7", value: 2, health: 5, 
            atk: 1, spd: 2, moves: 6, startMoves: 6, name: "The King"}
        this.matrix[this.player.x][this.player.y] = 2;
        this.player.sayings = [
            "Does anyone have grapes?",
            "I'm rather hungry",
            "I suppose there's danger",
            "Not even a litle scared",
            "If only I had a gun",
            "Is that a chair?"
        ]


        this.enemy = {x :23, y :11, color: "red", value: 4, health: 40,
             atk: 4, spd: 3, moves: 4, name: "Petrine, the Firebrand", atk: 5, spd: 4}
        this.matrix[this.enemy.y][this.enemy.x] = 4;
        this.enemy.sayings = [
            "Ready to Rumble",
            "I'm coming for you",
            "Fierce is the Fire",
            "Watch for the flames",
            "Is it hot or just me?",
            "Be careful, you'll burn",
            ""
        ]

        this.cursor = { y: 2, x: 2, color: "white", value: 10 }
        this.matrix[this.cursor.x][this.cursor.y] = 10
        this.currPlayer = this.cursor;
        this.stepOver = 1;

        this.allPlayers = [2, 5, 6]
        this.allEnemies = [4]

        document.addEventListener("keydown", this.#movePlayer)
        document.addEventListener("keydown", this.#selectPlayer)
        document.addEventListener("keydown", this.#restart)
  

        this.water = [
            "This tile is water",
            "Are you thirsty?",
            "It's just water",
            "Splish splash",
            "Water is for winners",
            "You cannot drink this",
            "Thirst quenching",
            "Water, it looks funny",
            "Don't look at the water!",
            "Do NOT drink",
            "Your reflection is pretty!",
            "You like Jazz?",
            "So reflective",
            "Like the sea but not",
            "Don't bathe here",
            "Forget the Water, fight",
            "You could Drown a man here",
            "Water-reminds me of liquid",
            "Water, spelled 'W-a-t-e-r'",
            "We all float down here",
            "Smooth like water",
            "Go ahead, drink",
            "I never liked water",
            "Is this an easter egg?"
        ]
        this.stone = [
            "This tile is stone",
            "Be wary: stone pillar here",
            "Looks Grecian",
            "Stone, almost crumbling",
            "Stone pillar, looks mighty",
            "Stone pillar, looks gaudy",
            "Big stone",
            "Stone pillar: danger",
            "Don't touch the Stone",
            "Do NOT eat",
            "You like Jazz?",
            "Smooth like water",
            "Small stone",
            "Stones are out of shape",
            "Stones",
            "Is this an easter egg?"
        ]
        this.tile = [
            "TILES ROCK MY WORLD",
            "I LOVE TILES A LOT!",
            "INTERIOR DESIGN!!!",
            "TILE TILE TILE TILE",
            "Just like HGTV- tileee!",
            "Tiles are so cool!",
            "I wish I was a tile",
            "If only I were a tile",
            "All I know is tile",
            "Good place to sleep",
            "You like Jazz?",
            "NOT a restroom",
            "Tile, not Textile",
            "Tile, yellow in color",
            "Smooth like water",
            "Ooh! A pebble!",
            "What a boring line",
            "I like game design",
            "A cracked tile",
            "Is this an easter egg?"
        ]
    }

    #selectPlayer = ( { keyCode } ) => {
        if (keyCode === 32 && this.allPlayers.includes(this.stepOver)) {
            this.matrix[this.currPlayer.y][this.currPlayer.x] = 10;
            this.currPlayer = this.#whichPlayer(this.stepOver)
            this.stepOver = this.currPlayer.value;
        }
    }

    #isValidMove = (x, y, player) => {
        if (this.currPlayer === this.cursor && this.matrix[this.currPlayer.y + y][this.currPlayer.x + x] !== 0){
            return true;
        } else if (this.matrix[this.currPlayer.y + y][this.currPlayer.x + x] === 1 || 
            this.matrix[this.currPlayer.y + y][this.currPlayer.x + x] === 10) {
            return true;
        }
        return false;
    }

    #movePlayer = ( { keyCode } ) => {
        if(keyCode === 37) {
            if (this.#isValidMove(-1, 0, this.currPlayer)) {
                if (this.currPlayer.moves === this.currPlayer.startMoves) {
                    this.matrix[this.currPlayer.y][this.currPlayer.x] = 10;
                }
                if(this.currPlayer === this.cursor) {
                    this.matrix[this.currPlayer.y][this.currPlayer.x] = this.stepOver;
                    this.stepOver = this.matrix[this.currPlayer.y][this.currPlayer.x - 1];
                    this.matrix[this.currPlayer.y][this.currPlayer.x - 1] = this.currPlayer.value;
                    this.currPlayer.x--;
                } else {
                    // if(this.matrix[this.currPlayer.y][this.currPlayer.x] !== 10){
                        this.matrix[this.currPlayer.y][this.currPlayer.x] = 1;
                    // }
                    this.matrix[this.currPlayer.y][this.currPlayer.x - 1] = this.currPlayer.value;
                    this.currPlayer.x--;
                    this.currPlayer.moves--;
                }
                if (this.#fightEnemy(this.currPlayer) === true && this.currPlayer != this.cursor) {
                    this.currPlayer.moves = 0;
                }
            }
        } else if(keyCode === 39) {
            if (this.#isValidMove(1, 0, this.currPlayer)) {
                if (this.currPlayer.moves === this.currPlayer.startMoves) {
                    this.matrix[this.currPlayer.y][this.currPlayer.x] = 10;
                }
                if (this.currPlayer === this.cursor) {
                    this.matrix[this.currPlayer.y][this.currPlayer.x] = this.stepOver;
                    this.stepOver = this.matrix[this.currPlayer.y][this.currPlayer.x + 1];
                    this.matrix[this.currPlayer.y][this.currPlayer.x + 1] = this.currPlayer.value;
                    this.currPlayer.x++;
                } else {
                    // if (this.matrix[this.currPlayer.y][this.currPlayer.x] !== 10) {
                        this.matrix[this.currPlayer.y][this.currPlayer.x] = 1;
                    // }
                    this.matrix[this.currPlayer.y][this.currPlayer.x + 1] = this.currPlayer.value;
                    this.currPlayer.x++;
                    this.currPlayer.moves--;
                }
                if (this.#fightEnemy(this.currPlayer) === true && this.currPlayer != this.cursor) {
                    this.currPlayer.moves = 0;
                }
            }
        } else if (keyCode === 38) {
            if (this.#isValidMove(0, -1, this.currPlayer)) {
                if (this.currPlayer.moves === this.currPlayer.startMoves) {
                    this.matrix[this.currPlayer.y][this.currPlayer.x] = 10;
                }
                if (this.currPlayer === this.cursor) {
                    this.matrix[this.currPlayer.y][this.currPlayer.x] = this.stepOver;
                    this.stepOver = this.matrix[this.currPlayer.y - 1][this.currPlayer.x];
                    this.matrix[this.currPlayer.y - 1][this.currPlayer.x] = this.currPlayer.value;
                    this.currPlayer.y--;
                } else {
                    // if (this.matrix[this.currPlayer.y][this.currPlayer.x] !== 10) {
                        this.matrix[this.currPlayer.y][this.currPlayer.x] = 1;
                    // }
                    this.matrix[this.currPlayer.y - 1][this.currPlayer.x] = this.currPlayer.value;
                    this.currPlayer.y--;
                    this.currPlayer.moves--;
                }
                if (this.#fightEnemy(this.currPlayer) === true && this.currPlayer != this.cursor) {
                    this.currPlayer.moves = 0;
                }
            }
        } else if (keyCode === 40) {
            if (this.#isValidMove(0, 1, this.currPlayer)) {
                if (this.currPlayer.moves === this.currPlayer.startMoves) {
                    this.matrix[this.currPlayer.y][this.currPlayer.x] = 10;
                }
                if (this.currPlayer === this.cursor) {
                    this.matrix[this.currPlayer.y][this.currPlayer.x] = this.stepOver;
                    this.stepOver = this.matrix[this.currPlayer.y + 1][this.currPlayer.x];
                    this.matrix[this.currPlayer.y + 1][this.currPlayer.x] = this.currPlayer.value;
                    this.currPlayer.y++;
                } else {
                    // if (this.matrix[this.currPlayer.y][this.currPlayer.x] !== 10) {
                        this.matrix[this.currPlayer.y][this.currPlayer.x] = 1;
                    // }
                    this.matrix[this.currPlayer.y + 1][this.currPlayer.x] = this.currPlayer.value;
                    this.currPlayer.y++;
                    this.currPlayer.moves--;
                }
                if (this.#fightEnemy(this.currPlayer) === true && this.currPlayer != this.cursor) {
                    this.currPlayer.moves = 0;
                }
            }
        }
        if(this.currPlayer.moves === 0){
            if(this.#fightEnemy(this.currPlayer)){
                this.currPlayer.health -= this.enemy.atk;
                this.enemy.health -= this.currPlayer.atk;
            }
            let holder = this.currPlayer
            this.currPlayer = this.enemy;
            this.#moveEnemy();
            this.#moveEnemy();
            this.#moveEnemy();
            this.#moveEnemy();
            holder.moves = holder.startMoves;
            this.currPlayer = this.cursor;
            this.stepOver = 1;
        }
        this.render();
    }

    #moveEnemy = () => {
        let x = 0;
        let y = 0;
        let reach = 50;
        let findX = this.player.x; 
        let myX = this.enemy.x;
        let specialX = -2;
        let specialY = -2;

        let findY = this.player.y;
        let myY = this.enemy.y;
        for(i = 0; i < this.moves.length; i++) {
            let currX = myX + this.moves[i][0];
            let currY = myY + this.moves[i][1];

            let thisReach = Math.abs(currX - findX) + Math.abs(currY - findY);
            if(thisReach < reach && this.#isValidMove(this.moves[i][0], this.moves[i][1], this.enemy)) {
                    reach = thisReach;
                x = this.moves[i][0];
                y = this.moves[i][1];
            }
        }   
        if((this.player.x === this.enemy.x && this.player.y === this.enemy.y + 1) ||
            (this.player.x === this.enemy.x && this.player.y === this.enemy.y - 1) ||
            (this.player.x === this.enemy.x + 1 && this.player.y === this.enemy.y) ||
            (this.player.x === this.enemy.x - 1 && this.player.y === this.enemy.y)) {
                x = 0;
                y = 0;
            }

        if(this.#isValidMove(x, y, this.enemy)){
            this.matrix[this.enemy.y][this.enemy.x] = 1;
            this.matrix[this.enemy.y + y][this.enemy.x + x] = 4;
            this.enemy.y += y;
            this.enemy.x += x;
        }
        this.moved = true;
        this.render();
    }

    #fightEnemy(player) {
        let fight = false;
        if ((player.x === this.enemy.x && player.y === this.enemy.y + 1) ||
            (player.x === this.enemy.x && player.y === this.enemy.y - 1) ||
            (player.x === this.enemy.x + 1 && player.y === this.enemy.y) ||
            (player.x === this.enemy.x - 1 && player.y === this.enemy.y)) {
                fight = true
            }
        if(fight === true){ 
            return true;
        }
    }

    #getCenter(w, h) {
        return {
            x: window.innerWidth / 2 - w / 2 + "px",
            y: window.innerHeight / 2 - h / 2 + "px"
        };
    }

    #getContext(w, h, color = "#111", isTransparent = false) {
        this.canvas = document.createElement("canvas")
        this.context = this.canvas.getContext("2d")
        this.width = this.canvas.width = w;
        this.height = this.canvas.height = h;
        this.canvas.style.position = "absolute";
        this.canvas.style.background = color;
        if(isTransparent) {
            this.canvas.style.backgroundColor = "transparent";
        }

        const center = this.#getCenter(w, h);
        this.canvas.style.marginLeft = center.x;
        this.canvas.style.marginTop = center.y;
        document.body.appendChild(this.canvas);
        return this.context;
    }

    render() {
        this.clearScreen();
        const w = ((this.cellSize + this.padding) * this.matrix[0].length - (this.padding))
        const h = ((this.cellSize + this.padding) * this.matrix.length - (this.padding))

        this.outlineContext.canvas.width = w;
        this.outlineContext.canvas.height = h;

        const center = this.#getCenter(w, h);
        this.outlineContext.canvas.style.marginLeft = center.x;
        this.outlineContext.canvas.style.marginTop = center.y;

        this.topContext.canvas.style.marginLeft = center.x;
        this.topContext.canvas.style.marginTop = center.y;
        for(let row = 0; row < this.matrix.length; row++){
            for (let col = 0; col < this.matrix[row].length; col++){
                let currentNode = [row, col];
                let color = "#F27D52";
                if (this.matrix[row][col] === 10) {
                color = this.cursor.color;
                } else if (this.matrix[row][col] === 0){
                    color = "#023E73";
                } else if(this.matrix[row][col] === 5) {
                    color = this.player2.color;
                } else if (this.matrix[row][col] === 6) {
                    color = this.player3.color;
                } else if (row < 9 && row > 5 && col < 17 && col > 9) {
                    color = "blue";
                    this.matrix[row][col] = 3; 
                } else if (wallCheck(currentNode)) {
                    color = "gray";
                    this.matrix[row][col] = 7; 
                } else if(this.matrix[row][col] === 2) {
                    color = this.player.color;
                } else if(this.matrix[row][col] === 4) {
                    color = this.enemy.color;
                }
                this.outlineContext.fillStyle = color;
                this.outlineContext.fillRect(col * (this.cellSize + this.padding),
                row * (this.cellSize + this.padding),
                this.cellSize, this.cellSize);

            }
        }
        this.uiContext.clearRect(0, 0, 50000, 50000)
        this.uiContext.font = "20px Courier";
        this.uiContext.fillStyle = "white";
        if (this.enemy.health <= 0 && this.player.health <= 0) {
            this.uiContext.fillText("A Tie", 730, 30)
            this.uiContext.fillText("The King is Dead", 50, 550)
            this.uiContext.fillText("Press R to Restart", 50, 30)
            this.uiContext.fillText("FIX FONTPetrine is Dead", 670, 550)
        } else if (this.enemy.health <= 0) {
            this.uiContext.fillText("FIX FONTYou Win", 730, 30)
            this.uiContext.fillText("Petrine is Slain", 50, 550)
            this.uiContext.fillText("Press R to Restart", 50, 30)
            this.uiContext.fillText("You Win", 670, 550)
        } else if (this.player.health <= 0 ) {
            this.uiContext.fillText("You Lose", 730, 30)
            this.uiContext.fillText("The King is Dead", 50, 550)
            this.uiContext.fillText("Press R to Restart", 50, 30)
            this.uiContext.fillText("FIX FONTYou Lose", 670, 550)
        } else if (this.#whichPlayer(this.stepOver)) {
            let showPlayer = this.#whichPlayer(this.stepOver)
            this.uiContext.fillText("FIX FONTHealth: " + showPlayer.health + ", Attack: " + showPlayer.atk, 730, 30)
            this.uiContext.fillText(showPlayer.name, 50, 550)
            this.uiContext.fillText("Movements Left: " + showPlayer.moves, 50, 30)
            this.uiContext.fillText(showPlayer.sayings[Math.floor(Math.random() * showPlayer.sayings.length)], 670, 550)
        } else if (this.allEnemies.includes(this.stepOver)) {
            let showEnemy = this.#whichEnemy(this.stepOver)
            this.uiContext.fillText("HP: " + showEnemy.health + ", Attack " + showEnemy.atk, 730, 30)
            this.uiContext.fillText(showEnemy.name, 50, 550)
            this.uiContext.fillText("MV: " + showEnemy.moves, 50, 30)
            this.uiContext.fillText(showEnemy.sayings[Math.floor(Math.random() * showEnemy.sayings.length)], 670, 550)
        } else if(this.stepOver === 3) {
        // this.uiContext.clearRect(0, 0, this.width, this.height)
        this.uiContext.fillText("A Water Tile", 730, 30)
        this.uiContext.fillText("Players Cannot be Moved Here", 50, 550)
        this.uiContext.fillText("A Water Tile", 50, 30)
        this.uiContext.fillText(this.water[Math.floor(Math.random() * this.water.length)], 670, 550)
        } else if(this.stepOver === 7) {
        // this.uiContext.clearRect(0, 0, this.width, this.height)
        this.uiContext.fillText("A Stone Column", 730, 30)
        this.uiContext.fillText("Players Cannot be Moved Here", 50, 550)
        this.uiContext.fillText("A Stone Column", 50, 30)
        this.uiContext.fillText(this.stone[Math.floor(Math.random() * this.stone.length)], 670, 550)
        } else if (this.stepOver === 1) {
            // this.uiContext.clearRect(0, 0, this.width, this.height)
            this.uiContext.fillText("A Tile", 730, 30)
            this.uiContext.fillText("Players move along these", 50, 550)
            this.uiContext.fillText("A Tile", 50, 30)
            this.uiContext.fillText(this.tile[Math.floor(Math.random() * this.tile.length)], 670, 550)
        }


        function wallCheck(node) {
            const river = [[10, 8], [9, 8], [10, 9], 
            [4, 9], [5, 8], [4, 8], 
            [10, 18], [10, 17], [9, 18],
            [4, 18], [4, 17], [5, 18]]
            for(i = 0; i < river.length; i++) {
                if (node[0] === river[i][0] && node[1] === river[i][1]) return true;
            }
            return false;
        }
    }
    clearScreen() {
        this.uiContext.fillStyle = "black";
        this.uiContext.fillRect(0,0, this.canvas.width, this.canvas.height);
    }

    #whichPlayer(n) {
        if (n === 2) {
            return this.player;
        } else if (n === 5) {
            return this.player3;
        } else if (n === 6) {
            return this.player2;
        }
        return false;
    }
    #whichEnemy(n) {
        if (n === 4) {
            return this.enemy;
        }
    }

    #restart = ({ keyCode }) => {
        if(keyCode === 82){
        this.matrix[this.player2.y][this.player2.x] = 1;
        this.player2 = {
            y: 4, x: 2, color: "#338642", value: 6, health: 20,
            atk: 3, spd: 5, moves: 6, startMoves: 6, name: "Jeff, the tepid"
        }
        this.matrix[this.player2.y][this.player2.x] = 6;
        this.player2.sayings = [
            "I am Jeff, the Tepid",
            "Hi there",
            "Scary place",
            "I prefer my coffee tepid",
            "No iced tea for me",
            "Battle isn't quite tepid",
            "Tepid: 'only slightly warm'",
            "Some like it tepid",
            "I'm not fond of the heat",
            "I'm not fond of the cold",
            "How did I get this job",
            "Not really a fighter"
        ]
        this.matrix[this.player2.y][this.player2.x] = 1;
        this.player3 = {
            y: 2, x: 4, color: "#338642", value: 5, health: 20,
            atk: 3, spd: 0, moves: 6, startMoves: 6, name: "Boyd, Stalwart Protector"
        }
        this.matrix[this.player3.y][this.player3.x] = 6;
        this.player3.sayings = [
            "I am Boyd, hello",
            "For the King!",
            "I shall protect his Majesty!",
            "It is my greatest honor",
            "I shall protect",
            "Just as my father before me!",
            "To protect is holy",
            "With this shield",
            "With my sword",
            "I shall strike you!",
            "Do not approach!",
            "Get behind me!"
        ]
        this.matrix[this.player.y][this.player.x] = 1;
        this.player = {
            y: 3, x: 3, color: "#3D7EC7", value: 2, health: 5,
            atk: 1, spd: 2, moves: 6, startMoves: 6, name: "The King"
        }
        this.matrix[this.player.x][this.player.y] = 2;
        this.player.sayings = [
            "Does anyone have grapes?",
            "I'm rather hungry",
            "I suppose there's danger",
            "Not even a litle scared",
            "If only I had a gun",
            "Is that a chair?"
        ]

        this.matrix[this.enemy.y][this.enemy.x] = 1;
        this.enemy = {
            x: 23, y: 11, color: "red", value: 4, health: 40,
            atk: 4, spd: 3, moves: 4, name: "Petrine, the Firebrand", atk: 5, spd: 4
        }
        this.matrix[this.enemy.y][this.enemy.x] = 4;
        this.enemy.sayings = [
            "Ready to Rumble",
            "I'm coming for you",
            "Fierce is the Fire",
            "Watch for the flames",
            "Is it hot or just me?",
            "Be careful, you'll burn",
            "The fiery kiss of death"
        ]
        this.matrix[this.cursor.y][this.cursor.x] = 1;
        this.cursor = { y: 2, x: 2, color: "white", value: 10 }
        this.matrix[this.cursor.y][this.cursor.x] = 10
        this.currPlayer = this.cursor;
        this.stepOver = 1;

        this.allPlayers = [2, 5, 6]
        this.allEnemies = [4]

        document.addEventListener("keydown", this.#movePlayer)
        document.addEventListener("keydown", this.#selectPlayer)
        document.addEventListener("keydown", this.#restart)


        this.water = [
            "This tile is water",
            "Are you thirsty?",
            "It's just water",
            "Splish splash",
            "Water is for winners",
            "You cannot drink this",
            "Thirst quenching",
            "Water, it looks funny",
            "Don't look at the water!",
            "Do NOT drink",
            "Your reflection is pretty!",
            "You like Jazz?",
            "So reflective",
            "Like the sea but not",
            "Don't bathe here",
            "Forget the Water, fight",
            "You could Drown a man here",
            "Water-reminds me of liquid",
            "Water, spelled 'W-a-t-e-r'",
            "We all float down here",
            "Smooth like water",
            "Go ahead, drink",
            "I never liked water",
            "Is this an easter egg?"
        ]
        this.stone = [
            "This tile is stone",
            "Be wary: stone pillar here",
            "Looks Grecian",
            "Stone, almost crumbling",
            "Stone pillar, looks mighty",
            "Stone pillar, looks gaudy",
            "Big stone",
            "Stone pillar: danger",
            "Don't touch the Stone",
            "Do NOT eat",
            "You like Jazz?",
            "Smooth like water",
            "Small stone",
            "Stones are out of shape",
            "Stones",
            "Is this an easter egg?"
        ]
        this.tile = [
            "TILES ROCK MY WORLD",
            "I LOVE TILES A LOT!",
            "INTERIOR DESIGN!!!",
            "TILE TILE TILE TILE",
            "Just like HGTV- tileee!",
            "Tiles are so cool!",
            "I wish I was a tile",
            "If only I were a tile",
            "All I know is tile",
            "Good place to sleep",
            "You like Jazz?",
            "NOT a restroom",
            "Tile, not Textile",
            "Tile, yellow in color",
            "Smooth like water",
            "Ooh! A pebble!",
            "What a boring line",
            "I like game design",
            "A cracked tile",
            "Is this an easter egg?"
        ]
    }
    }

    #wait(n) {
        for(let i = 0; i < n; i++) {
            this.render();
        }
    }
}


function createMatrix(x, y) { 
    let arr2d = new Array(x)
    for(i = 0; i < x; i++) {
        arr2d[i] = new Array(y);
        for(j = 0; j < y; j++) {
            if(i === 0 || j === 0 || i === x - 1 || j === y - 1) {
                arr2d[i][j] = 0
            } else{ 
                arr2d[i][j] = 1
            }
        }
    }
    return arr2d;
}
const matrix = createMatrix(15, 27);
const grid = new GridSystem(matrix);    

grid.render();