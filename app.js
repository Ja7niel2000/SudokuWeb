import { Game } from "./clases/Game.js";

function init(){
    let game = new Game();
    game.init();
    game.sudoku.generateSolution()
    game.printSudoku()
    game.sudoku.checkSudoku();

}

init();