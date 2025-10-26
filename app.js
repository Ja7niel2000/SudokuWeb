import { Game } from "./clases/Game.js";
import { Matrix } from "./clases/Matrix.js";

function init(){
    let game = new Game();
    let matrix = new Matrix()
    game.init();
    game.sudoku.solution.data = game.sudoku.generateSolution();
    game.printSudoku()
    game.sudoku.checkSudoku();

}

init();