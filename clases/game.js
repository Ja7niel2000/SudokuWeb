import { generaSudoku,generaPlaceholder,sudokuCorrecto } from "../fun/generador";
import { refreshUI,clearStyleP } from "../fun/UI";
export class Game{
    constructor(){
        this.sudoku = new board();
        this.placeholder = new board();
        this.userInput = new board();
        this.timer = new Timer();
        this.inGame = false;
        this.KEY="sudoku"
    }

    newGame(){
        clearStyleP();
        this.inGame = true;
        let message="Ya hay un sudoku en progreso, quieres continuar con el antiguo?"
        if(localStorage.getItem(KEY)!=null && confirm(message)){
            load();
            actualizaValoresUI(userInput);
            actualizaValoresUI(placeholder,true);
            this.timer.start();
            return false;
        }
        
        this.sudoku.restart();
        this.userInput.restart();
        this.placeholder.restart();
        
        this.sudoku = generaSudoku(0, 0, [[]], [[[]]], [[[]]], this.sudoku);
        this.placeholder = generaPlaceholder(50);
        actualizaValoresUI(this.placeholder, false);
        this.timer.start();
        save();
        return true;
    }
}

