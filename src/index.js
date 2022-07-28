import GridSystem from "./grid.js";

document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("audioBackground").volume = 0.01;

    window.addEventListener("keydown", function (e) {
        if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
    }, false);


    function createMatrix(x, y) {
        let arr2d = new Array(x)
        for (let i = 0; i < x; i++) {
            arr2d[i] = new Array(y);
            for (let j = 0; j < y; j++) {
                if (i === 0 || j === 0 || i === x - 1 || j === y - 1) {
                    arr2d[i][j] = 0
                } else {
                    arr2d[i][j] = 1
                }
            }
        }
        return arr2d;
    }
    const matrix = createMatrix(15, 27);
    const grid = new GridSystem(matrix);

    grid.render();
})
