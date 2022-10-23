import GridSystem from "./grid.js";

document.addEventListener("DOMContentLoaded", () => {

    // document.getElementById("audioBackground").volume = 0.01;

    window.addEventListener("keydown", function (e) {
        if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
    }, false);


    function createMatrix(x, y) {
         function topWallCheck(node) {
            const topWall = [[4, 8], [9, 18], [4, 18], [9, 8]];
            for (let i = 0; i < topWall.length; i++) {
                if (topWall[i][0] === node[0] && topWall[i][1] === node[1]) {
                    return true;
                }
            }
            return false;
        }
        function wallCheck(node) {
            const cols = [[10, 8], [9, 8], [10, 9],
            [4, 9], [5, 8], [4, 8],
            [10, 18], [10, 17], [9, 18],
            [4, 18], [4, 17], [5, 18]]
            for(let i = 0; i < cols.length; i++){
                if(cols[i][0] === node[0] && cols[i][1] === node[1]){
                    return true;
                }
            }
            return false;
        }
        let topColumn = [[4, 8], [9, 18], [4, 18], [9, 8]];
        let bottomColumn = [[10, 8], [10, 9],[4, 9], [5, 8],
                        [10, 18], [10, 17], [4, 17], [5, 18]]
        let arr2d = new Array(x)
        for (let i = 0; i < x; i++) {
            arr2d[i] = new Array(y);
            for (let j = 0; j < y; j++) {
                if (i === 0 || j === 0 || i === x - 1 || j === y - 1) {
                    arr2d[i][j] = 0
                } else if (i < 9 && i > 5 && j < 17 && j > 9) {
                    arr2d[i][j] = 3
                } else if (topWallCheck([i, j])) {
                    arr2d[i][j] = 8
                } else if (wallCheck([i, j])) {
                    arr2d[i][j] = 7
                } else {
                    arr2d[i][j] = 1
                }
                // if (wallCheck([i, j])) {
                //     arr2d[row][col] = 6;
                // }
                // if (topWallCheck([i, j])) {
                //     arr2d[row][col] = 7;
                // }
            }
        }
        return arr2d;
    }

    const matrix = createMatrix(15, 27);
    const grid = new GridSystem(matrix);

    let instructions = document.querySelector('.instructions');
    let close_instructions = document.querySelector('.close-button');
    let constInst = document.querySelector('.in-game-inst')
    let music = document.querySelector('.audio-example')

    close_instructions.addEventListener('click', () => {
        instructions.classList.add('invis');
        constInst.classList.add('present');
        music.volume = 0.07;
        music.play();
        let playingMusic = true;
    });


    
    grid.render();
})
