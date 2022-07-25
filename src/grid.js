class GridSystem {
    constructor(matrix, player) {
        this.matrix = matrix;
        this.uiContext = this.#getContext(1000, 580, "gray");
        this.outlineContext = this.#getContext(0, 0, "#444");
        this.topContext = this.#getContext(0, 0, "#111", true);
        this.cellSize = 30;
        this.padding = 1;

        this.player = { y: player[1], x: player[0], color: "green"}
        this.matrix[this.player.x][this.player.y] = 2;
        this.enemy = {x :11, y :13, color: "red"}
        this.matrix[this.enemy.x][this.enemy.y] = 4;

        document.addEventListener("keydown", this.#movePlayer)
    }

    #isValidMove(x, y) {
        if (this.matrix[this.player.y + y][this.player.x + x] === 1) {
            return true;
        }
        return false;
    }

    #movePlayer = ( { keyCode } ) => {
        if(keyCode === 37) {
            if (this.#isValidMove(-1, 0)) {
                this.matrix[this.player.y][this.player.x] = 1;
                this.matrix[this.player.y][this.player.x - 1] = 2;
                this.player.x--;
            }
            this.#moveEnemy();
        } else if(keyCode === 39) {
            if (this.#isValidMove(1, 0)) {
                this.matrix[this.player.y][this.player.x] = 1;
                this.matrix[this.player.y][this.player.x + 1] = 2;
                this.player.x++;
            }
            this.#moveEnemy();
        } else if (keyCode === 38) {
            if (this.#isValidMove(0, -1)) {
                this.matrix[this.player.y][this.player.x] = 1;
                this.matrix[this.player.y - 1][this.player.x] = 2;
                this.player.y--;
            }
            this.#moveEnemy();
        } else if (keyCode === 40) {
            if (this.#isValidMove(0, +1)) {
                this.matrix[this.player.y][this.player.x] = 1;
                this.matrix[this.player.y + 1][this.player.x] = 2;
                this.player.y++;
            }
            this.#moveEnemy();
        }
        this.render();
    }

    #moveEnemy = () => {
        const moves = [[1, 0], [0, 1], [-1, 0], [0, -1]];
        let y = this.enemy.y;
        let x = this.enemy.x;
        let playerX = this.player.x;
        let playerY = this.player.y;
        let reach = 0;
        let currReach = 500;
        let newX = moves[1][0];
        let newY = moves[1][1];

        for(i = 0; i < moves.length; i++) {
            let currentX = x + moves[i][0];
            let currentY = y + moves[i][1];
            let diffX = Math.abs(currentX - playerX);
            let diffY = Math.abs(currentY - playerY);
            let currReach = diffX + diffY

            if(currReach > reach) {
                currReach = reach;
                let newX = moves[i][0];
                let newY = moves[i][1];
            }
        }

        this.matrix[this.enemy.x][this.enemy.y] = 1;
        this.matrix[this.enemy.x + newX][this.enemy.y + newY] = 4;
        this.enemy.x += newX;
        this.enemy.y += newY;
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
                let color = "orange";
                if (this.matrix[row][col] === 0){
                    color = "black";
                } else if (row < 9 && row > 5 && col < 17 && col > 9) {
                    color = "blue";
                    this.matrix[row][col] = 3; 
                } else if (wallCheck(currentNode)) {
                    color = "gray";
                    this.matrix[row][col] = 3; 
                } else if(this.matrix[row][col] === 2) {
                    color = this.player.color;
                } else if(this.matrix[row][col] === 4) {
                    color = this.enemy.color
                }
                this.outlineContext.fillStyle = color;
                this.outlineContext.fillRect(col * (this.cellSize + this.padding),
                row * (this.cellSize + this.padding),
                this.cellSize, this.cellSize);

            }
        }
        this.uiContext.font = "20px Courier";
        this.uiContext.fillStyle = "white";
        this.uiContext.fillText("Mercenary Mayhem", 730, 30)
        this.uiContext.fillText("Mercenary Mayhem", 50, 550)
        this.uiContext.fillText("Mercenary Mayhem", 50, 30)
        this.uiContext.fillText("Mercenary Mayhem", 730, 550)

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
}


function createMatrix(x, y) { 
    let arr2d = new Array(x)
    for(i = 0; i < x; i++) {
        arr2d[i] = new Array(y);
        for(j = 0; j < y; j++) {
            if(i === 0 || j === 0 || i === 14 || j === 26) {
                arr2d[i][j] = 0
            } else{ 
                arr2d[i][j] = 1
            }
        }
    }
    return arr2d;
}
const player1 = [3, 3]
const matrix = createMatrix(15, 27);
const grid = new GridSystem(matrix, player1);    

grid.render();