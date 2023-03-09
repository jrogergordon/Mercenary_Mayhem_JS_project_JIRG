import dungeon from "./assets/dungeon_floor.png"
import column from "./assets/column.png"
import water from "./assets/water.png"
import waterCursor from "./assets/cursorWater.png"
import floorCursor from "./assets/dungeonFloorCursor.png"
import topColumn from "./assets/topColumn.png"
import topColumnCursor from "./assets/topColumnCursor.png"
import bottomColumnCursor from "./assets/bottonColumnCursor.png"
import knight from "./assets/knight1.png"
import knightCursor from "./assets/knightCursor.png";
import enemy from "./assets/enemy.png";
import enemyCursor from "./assets/cursorEnemy.png";
import endWall from "./assets/endWall.png";
import king from "./assets/king.png";
import kingCursor from "./assets/kingCursor.png";
let combatNoise = document.getElementsByClassName('audio-fight');
let gameWon = document.getElementsByClassName('audio-win');
let gameLost = document.getElementsByClassName('audio-lose');
// let combatNoise = combatNoises[0];
// console.log(combatNoise);

// let combatNoise = new Audio('./assets/audio/sworClang.mp3');
// let gameWon = new Audio('./assets/audio/victory.mp3');
// let gameLost = new Audio('./assets/audio/defeat.mp3');
// combatNoise.volume = 0.5;
// gameWon.volume = 0.5;
// gameLost.volume = 0.5;
class GridSystem {
    constructor(matrix) {
        this.highScore = 0;
        this.record = 0
        this.matrix = matrix;
        this.uiContext = this.#getContext(1000, 580, "#00000");
        this.outlineContext = this.#getContext(0, 0, "#444");
        // this.topContext = this.#getContext(0, 0, "#111", true);
        this.cellSize = 25;
        this.padding = 1;
        this.turnCounter = 10;
        this.gameOver = false;
        this.moves = [[1, 0], [-1, 0], [0, 1], [0, -1]];
        // this.combatNoise = new Audio(fightSound);
        // this.gameWon = new Audio(winSound);
        // this.gameLost = new Audio(loseSound);
        // this.combatNoise.volume = 0.5;
        // this.gameWon.volume = 0.5;
        // this.gameLost.volume = 0.5;

        this.player2 = {y: 4, x: 2, color: "#338642", value: 1, health: 20,
            atk: 20, spd: 5, moves: 6, startMoves: 6, name: "Jeff, the tepid", sayings: []}
        this.matrix[this.player2.x][this.player2.y] = 5;
        this.player2.sayings = [
            ["I am Jeff, the Tepid", 640],
            ["Hi there", 830],
            ["Scary place", 780],
            ["I prefer my coffee tepid", 570],
            ["No iced tea for me", 680],
            ["Battle isn't quite tepid", 590],
            ["Tepid: 'only slightly warm'", 550],
            ["Some like it tepid", 680],
            ["I'm not fond of the heat", 570],
            ["I'm not fond of the cold", 570],
            ["How did I get this job", 600],
            ["Not really a fighter", 640]
        ]
        this.player2.saidSayings = [];

        this.player3 = { y: 2, x: 4, color: "#338642", value: 5, health: 20,
            atk: 20, spd: 0, moves: 6, startMoves: 6, name: "Boyd, Stalwart Protector"}
        this.matrix[this.player3.x][this.player3.y] = 1;
        this.player3.sayings = [
            ["I am Boyd, hello", 700],
            ["For the King!", 760],
            ["I shall protect his Majesty!", 520],
            ["It is my greatest honor", 600],
            ["I shall protect", 710],
            ["Just as my father before me!", 520],
            ["To protect is holy", 680],
            ["With this shield", 700],
            ["With my sword", 740],
            ["I shall strike you!", 670],
            ["Do not approach!", 700],  
            ["Get behind me!", 740]
        ]
        this.player3.saidSayings = [];

        this.player = {y: 3, x: 3, color: "#3D7EC7", value: 2, health: 5, 
            atk: 1, spd: 2, moves: 6, startMoves: 6, name: "The King"}
        this.matrix[this.player.x][this.player.y] = 2;
        this.player.sayings = [
            ["Does anyone have grapes?", 570],
            ["I'm rather hungry", 690],
            ["I suppose there's danger", 570],
            ["Not even a litle scared", 570],
            ["If only I had a gun", 650],
            ["Is that a chair?", 690]
        ]
        this.player.saidSayings = [];


        this.enemy = {x :23, y :11, color: "red", value: 4, health: 40,
             atk: 4, spd: 3, moves: 4, name: "Petrine, the Firebrand", atk: 5, spd: 4}
        this.matrix[this.enemy.y][this.enemy.x] = 4;
        this.enemy.sayings = [
            ["Ready to Rumble", 720],
            ["I'm coming for you", 650],
            ["Fierce is the Fire", 650],
            ["Watch for the flames", 600],
            ["Is it hot or just me?", 590],
            ["Be careful, you'll burn", 570],
        ]
        this.enemy.saidSayings = [];

        this.cursor = { y: 2, x: 2, color: "white", value: 10 }
        this.matrix[this.cursor.x][this.cursor.y] = 10
        this.currPlayer = this.cursor;
        this.stepOver = 1;

        this.allPlayers = [2, 5, 6]
        this.allEnemies = [4]

        document.addEventListener("keydown", this.#movePlayer)
        document.addEventListener("keydown", this.#selectPlayer)
        document.addEventListener("keydown", this.#restart)
  

        this.water = {};
        this.water.sayings = [
            ["Be careful, you'll drown", 570],
            ["This tile is water", 650],
            ["Are you thirsty?", 710],
            ["It's just water", 720],
            ["Splish splash", 730],
            ["Water is for winners", 620],
            ["You cannot drink this", 600],
            ["Thirst quenching", 700],
            ["Water, it looks funny", 610],
            ["Don't look at the water!", 570],
            ["Do NOT drink", 730],
            ["Your reflection is pretty!", 550],
            ["You like Jazz?", 740],
            ["So reflective", 740],
            ["Like the sea but not", 600],
            ["Don't bathe here", 720],
            ["Forget the Water, fight", 570],
            ["You could Drown a man here", 550],
            ["Water-reminds me of liquid", 550],
            ["Water, spelled 'W-a-t-e-r'", 550],
            ["We all float down here", 610],
            ["Smooth like stone", 700],
            ["Go ahead, drink", 700],
            ["I never liked water", 660],
            ["Is this an easter egg?", 610]
        ]
        this.water.saidSayings = [];

        this.stone = {};
        this.stone.sayings = [
            ["This tile is stone", 650],
            ["Be wary: stone pillar here", 550],
            ["Looks Grecian", 730],
            ["Stone, almost crumbling", 570],
            ["Stone pillar, looks mighty", 550],
            ["Stone pillar, looks gaudy", 550],
            ["Big stone", 830],
            ["Stone pillar: danger", 630],
            ["Don't touch the Stone", 630],
            ["Do NOT eat", 830]
            ["You like Jazz?", 800],
            ["Smooth like tile", 630],
            ["Small stone", 830],
            ["Stones are out of shape", 550],
            ["Stones", 880],
            ["Is this an easter egg?", 550]
        ]
        this.stone.saidSayings = [];
        this.tile = {};
        this.tile.sayings = [
            ["TILES ROCK MY WORLD", 630],
            ["I LOVE TILES A LOT!", 630],
            ["INTERIOR DESIGN!!!", 635],
            ["TILE TILE TILE TILE", 635],
            ["Just like HGTV- tileee!", 610],
            ["Tiles are so cool!", 635],
            ["I wish I was a tile", 635],
            ["If only I were a tile", 620],
            ["All I know is tile", 635],
            ["Good place to sleep", 635],
            ["You like Jazz?", 750],
            ["NOT a restroom", 750],
            ["Tile, not Textile", 650],
            ["Tile, yellow in color", 620],
            ["Smooth like water", 650],
            ["Ooh! A pebble!", 750],
            ["What a boring line", 650],
            ["I like game design", 650],
            ["A cracked tile", 750],
            ["Is this an easter egg?", 620]
        ];
        this.tile.saidSayings = [];
        this.render();
    }

    #selectPlayer = ( { keyCode } ) => {
        if (keyCode === 32 && this.allPlayers.includes(this.stepOver) &&
         this.player.health > 0 && this.enemy.health > 0) {
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
        if (keyCode === 37 &&
            this.player.health > 0 && this.enemy.health > 0) {
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
        } else if (keyCode === 39 &&
            this.player.health > 0 && this.enemy.health > 0) {
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
        } else if (keyCode === 38 &&
            this.player.health > 0 && this.enemy.health > 0) {
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
        } else if (keyCode === 40 &&
            this.player.health > 0 && this.enemy.health > 0) {
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
                this.enemy.health -= this.currPlayer.atk;
                combatNoise[0].play();
                if(this.enemy.health < 1) {
                    gameWon[0].play();
                }
            }
            let holder = this.currPlayer
            this.currPlayer = this.enemy;
            if(this.enemy.health > 0) {
                setTimeout(() => { this.#moveEnemy(); }, 5000);
                this.#moveEnemy();
                this.#moveEnemy();
                this.#moveEnemy();
                this.record++;
            }
            if (this.record > this.highScore) this.highScore = this.record;
            if(this.#fightPlayer() === true) {
                gameLost[0].play();
            }
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
        for(let i = 0; i < this.moves.length; i++) {
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
        return fight
    }

    #fightPlayer() {
        let fight = false;
        if ((this.enemy.x === this.player.x && this.enemy.y === this.player.y + 1) ||
            (this.enemy.x === this.player.x && this.enemy.y === this.player.y - 1) ||
            (this.enemy.x === this.player.x + 1 && this.enemy.y === this.player.y) ||
            (this.enemy.x === this.player.x - 1 && this.enemy.y === this.player.y)) {
            fight = true
            this.player.health = 0;
        }
        return fight
    }

    #getCenter(w, h) {
        return {
            x: window.innerWidth / 2 - w / 2 + "px",
            y: window.innerHeight / 2 - h / 2 + "px"
        };
    }

    #getContext(w, h, color = "#111", isTransparent = false) {
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
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

    #pause = async (x) => {
        await sleep(x)
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

        // this.topContext.canvas.style.marginLeft = center.x;
        // this.topContext.canvas.style.marginTop = center.y;
        for(let row = 0; row < this.matrix.length; row++){
            for (let col = 0; col < this.matrix[row].length; col++){
                let currentNode = [row, col];
                const image = new Image();
                image.src = dungeon;
                switch(this.matrix[row][col]) {
                    case 10:
                       let img;
                    //    console.log(this.stepOver);
                        switch(this.stepOver) {
                            case 3:
                                img = waterCursor
                                break;
                            case 1: 
                                img = floorCursor
                                break;
                            case 8:
                                img = topColumnCursor
                                break;
                            case 7:
                                img = bottomColumnCursor
                                break;
                            case 5:
                                // console.log(knightCursor);
                                // console.log(img);
                                img = knightCursor
                                break;
                            case 4:
                                img = enemyCursor
                                break;
                            case 2:
                                img = kingCursor
                                break;
                            default:
                                img = floorCursor
                                break;
                        }
                        image.src = img
                        // console.log(image); img and image.src and image work
                        // console.log(image.src);
                        break;
                    case 0:
                        image.src = endWall
                        break;
                    case 5:
                        image.src = knight
                        break;
                    // case 6:
                    //     break;
                    case 3:
                        image.src = water
                        break;
                    case 2: 
                        image.src = king
                        break;
                    case 4:
                        image.src = enemy
                        break;
                    case 7:
                        image.src = column
                        break;
                    case 8:
                        image.src = topColumn
                        break;
                    case 1:
                        image.src = dungeon
                        break;
                    default: 
                        image.src = dungeon
                        break;
                }
                    // if (this.stepOver === 3) {
                    //     image.src = waterCursor;
                    // } else if (this.stepOver === 1){
                    //     image.src = floorCursor;
                    // } else if (this.stepOver === 8) {
                    //     image.src = topColumnCursor;
                    // } else if (this.stepOver === 7) {
                    //     image.src = bottomColumnCursor;
                    // } else if (this.stepOver === 5) {
                    //     image.src = knightCursor;
                    // } else if (this.stepOver === 4) {
                    //     image.src = enemyCursor;
                    // } else if (this.stepOver === 2) {
                    //     image.src = kingCursor;
                    // }
                // } else if (this.matrix[row][col] === 0){
                //     image.src = endWall;
                // } else if(this.matrix[row][col] === 5) {
                //     image.src = knight;
                // } else if (this.matrix[row][col] === 6) {
            
                // } else if (row < 9 && row > 5 && col < 17 && col > 9) {
                //     image.src = water;
                //     this.matrix[row][col] = 3; 
                // } else if (wallCheck(currentNode)) {
                //     image.src = column;
                //     if (topWallCheck(currentNode)){
                //         image.src = topColumn;
                //         this.matrix[row][col] = 8; 
                //     } else{
                //         this.matrix[row][col] = 7; 
                //     }
                // } else if(this.matrix[row][col] === 2) {
                //     image.src = king;
                // } else if(this.matrix[row][col] === 4) {
                //     image.src = enemy;
                // }
                // this.outlineContext.fillStyle = color;
                // this.outlineContext.fillRect(col * (this.cellSize + this.padding),
                // row * (this.cellSize + this.padding),
                // this.cellSize, this.cellSize);
                // console.log(image);
                // console.log(image.src);
                // console.log(row); row and col work
                // console.log(col);
                console.log(this.cellSize);
                console.log(this.padding);
                this.outlineContext.drawImage(image, col * (this.cellSize + this.padding), row * (this.cellSize + this.padding));
            }
        }
        this.uiContext.clearRect(0, 0, 50000, 50000)
        this.uiContext.fillStyle = "white";
        this.uiContext.font = "italic 20pt Courier"
        this.uiContext.fillText("For the King!", 380, 70);
        this.uiContext.fillText("High Score: " + this.highScore, 730, 60);
        if (this.enemy.health <= 0 && this.player.health <= 0) {
            this.uiContext.fillText("The King is Dead", 50, 550);
            this.uiContext.fillText("Press R to Restart", 50, 60);
            this.uiContext.fillText("Petrine is Dead", 670, 550);
        } else if (this.enemy.health <= 0) {
            this.uiContext.fillText("Petrine is Slain", 50, 550);
            this.uiContext.fillText("Press R to Restart", 50, 60);
            this.uiContext.fillText("You Win", 670, 550);
        } else if (this.player.health <= 0 ) {
            this.uiContext.fillText("The King is Dead", 50, 550);
            this.uiContext.fillText("Press R to Restart", 50, 60);
            this.uiContext.fillText("You Lose", 670, 550);
        } else if (this.#whichPlayer(this.stepOver)) {
            let showPlayer = this.#whichPlayer(this.stepOver);
            let n = this.#newSaying(showPlayer.sayings, showPlayer.saidSayings);
            this.uiContext.fillText(showPlayer.name, 50, 550);
            this.uiContext.fillText("Movements Left: " + showPlayer.moves, 50, 60);
            this.uiContext.fillText(showPlayer.sayings[n][0], showPlayer.sayings[n][1], 550);
        } else if (this.allEnemies.includes(this.stepOver)) {
            let showEnemy = this.#whichEnemy(this.stepOver)
            let n = this.#newSaying(this.enemy.sayings, this.enemy.saidSayings);
            this.uiContext.fillText(showEnemy.name, 50, 550);
            this.uiContext.fillText("MV: " + showEnemy.moves, 50, 60);
            this.uiContext.fillText(showEnemy.sayings[n][0], showEnemy.sayings[n][1], 550);
        } else if(this.stepOver === 3) {
            let n = this.#newSaying(this.water.sayings, this.water.saidSayings);
        // this.uiContext.clearRect(0, 0, this.width, this.height)
        this.uiContext.fillText("Players Cannot be Moved Here", 50, 550);
        this.uiContext.fillText("A Water Tile", 50, 60);
        this.uiContext.fillText(this.water.sayings[n][0], this.water.sayings[n][1], 550);
        } else if (this.stepOver === 7 || this.stepOver === 8) {
            let n = this.#newSaying(this.stone.sayings, this.stone.saidSayings);
        // this.uiContext.clearRect(0, 0, this.width, this.height)
        this.uiContext.fillText("Players Cannot be Moved Here", 50, 550);
            this.uiContext.fillText("A Stone Column", 50, 60);
        this.uiContext.fillText(this.stone.sayings[n][0], this.stone.sayings[n][1], 550);
        } else if (this.stepOver === 1) {
            let n = this.#newSaying(this.tile.sayings, this.tile.saidSayings);
            // this.uiContext.clearRect(0, 0, this.width, this.height)
            this.uiContext.fillText("Players move along these", 50, 550);
            this.uiContext.fillText("A Tile", 50, 60);
            this.uiContext.fillText(this.tile.sayings[n][0], this.tile.sayings[n][1], 550);
        }

        // function topWallCheck(node) {
        //     const topWall = [[4, 8], [9, 18], [4, 18], [9, 8]];
        //     for (let i = 0; i < topWall.length; i++) {
        //         if (topWall[i][0] === node[0] && topWall[i][1] === node[1]) {
        //             return true;
        //         }
        //     }
        //     return false;
        // }
        // function wallCheck(node) {
        //     const cols = [[10, 8], [9, 8], [10, 9], 
        //     [4, 9], [5, 8], [4, 8], 
        //     [10, 18], [10, 17], [9, 18],
        //     [4, 18], [4, 17], [5, 18]]
        //     for(let i = 0; i < cols.length; i++){
        //         if(cols[i][0] === node[0] && cols[i][1] === node[1]){
        //             return true;
        //         } 
        //     }
        //     return false;
        // }
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
            this.record = 0;
      
        this.matrix[this.player2.y][this.player2.x] = 1;
        this.player2 = {
            y: 4, x: 2, color: "#338642", value: 6, health: 20,
            atk: 3, spd: 5, moves: 6, startMoves: 6, name: "Jeff, the tepid",
            sayings: this.player2.sayings
        }
        this.matrix[this.player2.y][this.player2.x] = 1;
            
        this.matrix[this.player3.y][this.player3.x] = 1;
        this.player3.x = 4;
        this.player3.y = 2;
        this.matrix[this.player3.y][this.player3.x] = 5;

        this.matrix[this.player.y][this.player.x] = 1;
        this.player.x = 3;
        this.player.y = 3;
        this.player.health = 4;
        this.matrix[this.player.x][this.player.y] = 2;

        this.matrix[this.enemy.y][this.enemy.x] = 1;
        this.enemy.x = 23;
        this.enemy.y = 11;
        this.enemy.health = 40;
        this.matrix[this.enemy.y][this.enemy.x] = 4;


        this.matrix[this.cursor.y][this.cursor.x] = 1;
            this.cursor = { y: 2, x: 2, color: "white", value: 10 }
        this.matrix[this.cursor.y][this.cursor.x] = 10

        this.currPlayer = this.cursor;
        this.stepOver = 1;
    }
    }

    #wait(n) {
        for(let i = 0; i < n; i++) {
            this.render();
        }
    }


    #newSaying(lines, said) {
        let n = Math.floor(Math.random() * lines.length);
        while (said.includes(n)) {
            n = Math.floor(Math.random() * lines.length);
        }
        if (said > 5) {
            said.push(n);
            said.shift;
        }
        return n;
    }
}


// function createMatrix(x, y) { 
//     let arr2d = new Array(x)
//     for(i = 0; i < x; i++) {
//         arr2d[i] = new Array(y);
//         for(j = 0; j < y; j++) {
//             if(i === 0 || j === 0 || i === x - 1 || j === y - 1) {
//                 arr2d[i][j] = 0
//             } else{ 
//                 arr2d[i][j] = 1
//             }
//         }
//     }
//     return arr2d;
// }
// const matrix = createMatrix(15, 27);
// const grid = new GridSystem(matrix);    

// grid.render();
//grid.render

export default GridSystem;