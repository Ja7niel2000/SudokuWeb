import {Sudoku} from "./Sudoku.js";
import {Timer} from "./Timer.js"
import { save, load, clearStorage, check } from "../fun/storage.js";

export class Game {
    constructor(){
        this.inGame = false;
        this.sudoku = new Sudoku();
        this.timer = new Timer();
        this.KEY = "sudoku"

        //UI
        this.selectedBox = 0;
        this.boxes = [];
        this.mainGrid = 1;

        //init Grid
        this.init();
    }
    
    newGame(){
        if(this.inGame){
            if(!confirm("Quieres reiniciar?"))
                return;
            this.timer.stop();
            this.timer = new Timer();
            clearStorage();
        }

        this.clearStyleP();
        this.inGame = true;
        let message = "Ya hay un sudoku en progreso, quieres continuar con el antiguo?"
        if(check(this.KEY) && confirm(message)){
            load(this);
            this.refreshGrid(this.sudoku.userInput);
            this.refreshGrid(this.sudoku.placeholder, true);
            this.timer.start();
            return false;
        }

        this.sudoku = new Sudoku();
        this.refreshGrid(this.sudoku.placeholder, true);
        this.timer.start();
        save(this);
        return true;
    }

    endGame(){
        if(!this.inGame)return null;
        if(!this.sudoku.verifyUserInput()) return alert("Sudoku incorrecto");
        this.timer.stop();
        this.timer = new Timer();
        this.inGame = false;
        alert(`Juego completado en ${this.timer.time}`);
        clearStorage()
    }

    init(){
        let main = document.getElementById("main");
        for(let y=0;y<9;y++){
            let row = document.createElement("div");
            row.classList.add("rows");
            for(let x=0;x<9;x++){

                let column = document.createElement("div");
                column.classList.add('columns')

                if(y == 2 || y == 5)
                    column.classList.add("border-bottom");

                 if(y == 3 || y == 6)
                    column.classList.add("border-top");

                if(x == 2 || x == 5)
                    column.classList.add("border-right");  

                if(x == 3 || x == 6)
                    column.classList.add("border-left");

                let p = document.createElement("p");
                p.id = `${x},${y}`
                p.classList.add("peses");
                // p.classList.add("display-hidden");

                column.addEventListener("click", (e) => this.selected((y*9) +x,e))
                p.innerText=" ";

                column.appendChild(createTemplate());
                column.appendChild(p);
                row.appendChild(column);
                main.appendChild(row);
                this.boxes.push(column);
            }
        }

        function createTemplate(){
            let mainDiv = document.createElement("div");
            mainDiv.classList.add("placeholder");
            mainDiv.classList.add("display-none");

            let row = document.createElement("div"), column, p;
            row.classList.add("r");
            for(let y = 0; y < 3; y++){
                column = document.createElement("div");
                column.classList.add("c");

                for(let x = 0; x < 3; x++){
                    p = document.createElement('p');
                    p.innerText = " ";
                    column.appendChild(p);
                }
                row.appendChild(column);
            }
            mainDiv.appendChild(row);
            return mainDiv;
        }

        this.addEvents();
    }

    //####UI

    //Uses selectedBox and boxes
    selected(i, e){
        this.boxes[this.selectedBox].classList.remove("selected");
        this.selectedBox = i;
        this.boxes[this.selectedBox].classList.add("selected");
    }

    //Uses boxes
    refreshGrid(ref, bloquear = false){
        let i;
        for(let y = 0; y < 9; y++)
            for(let x = 0; x < 9; x++){
                if(ref[y][x] == 0)
                    continue;

                i = x + (9 * y);
                this.boxes[i].lastChild.innerText = ref[y][x] ;
                if(bloquear == true)
                    this.boxes[i].classList.add("bloqued");        
            }
    }

    //Uses boxes
    clearStyleP(){
        for(let x = 0; x < 81; x++){
            this.boxes[x].classList.remove("danger");
            this.boxes[x].classList.remove("warning");
            this.boxes[x].classList.remove("bloqued");
            this.boxes[x].lastChild.innerText = " ";
            this.boxes[x].firstChild.classList.add("display-none");
        }
    }

    //Auxiliar
    togglevisible(e, elem, param ){  
        if(elem!=null)
            elem.classList.contains(param)? elem.classList.remove(param) : elem.classList.add(param);
        
    }
    
    //Uses mainGrid
    toggleGrid(){
        if(this.mainGrid == 1 ){
            this.mainGrid = 0;
            document.querySelector(":root").style.setProperty("--color-selected-grid","#7a3b3b");
        }
        else{
            this.mainGrid = 1;
            document.querySelector(":root").style.setProperty("--color-selected-grid","#3b447a");
        }  
    }

    //Events
    addEvents(){
        //Virtual keyboard listener
        let keyboardContainer = document.getElementById("keyboardContainer");
        keyboardContainer.addEventListener("click", (e) => {
            if(e.target.id == "keyboardButton" ){
                this.togglevisible(e, keyboardContainer, "keyboard-visible")
            }

            if(e.target.classList.contains("keyboardColumn")){
                if(e.target.innerText == 0)
                    this.checkAndUpdateBox("toggleGrid");
                else
                    this.checkAndUpdateBox(e.target.innerText);
            }
                
        });

        //physical keyboard listener
        window.addEventListener("keydown", (e) => 
        {
            this.checkAndUpdateBox(e.key);

            if(e.key == "Shift")
                this.toggleGrid();

            else if(e.key == "ArrowUp"){
                e.preventDefault();
                if(this.selectedBox - 9 < 0)
                    this.selected (81+(this.selectedBox-9),e)  ;  
                else
                    this.selected(Math.abs(this.selectedBox - 9)%81, e);
                }

            else if(e.key=="ArrowDown"){
                e.preventDefault();
                this.selected((this.selectedBox + 9)%81, e);
            }

            else if(e.key=="ArrowLeft"){
                if(this.selectedBox==0)
                    this.selected(80,e);
                else
                    this.selected((this.selectedBox - 1)%81, e);
            }

            else if(e.key=="ArrowRight")
                this.selected((this.selectedBox + 1)%81, e);
        });
    }

    //Depends on userInput, boxes, mainGrid
    checkAndUpdateBox(param){
        if(!this.inGame )return;
        if(param == "toggleGrid") return this.toggleGrid();
        if(!this.boxes[this.selectedBox].classList.contains('bloqued')){
            if(((param == "Backspace" || param == 0) || this.boxes[this.selectedBox].lastChild.textContent == param) && this.mainGrid == 1 ){
                this.boxes[this.selectedBox].lastChild.textContent = 0;
                this.boxes[this.selectedBox].firstChild.classList.remove("display-none")
                
                this.sudoku.userInput[Math.floor(this.selectedBox/9)][this.selectedBox%9] = 0;
                save(this);
            }

            else if (parseInt(param) > 0 && parseInt(param)<10 ){
                if(this.mainGrid == 1){
                    this.boxes[this.selectedBox].lastChild.textContent = param;
                    if(!this.boxes[this.selectedBox].firstChild.classList.contains("display-none"))
                        this.boxes[this.selectedBox].firstChild.classList.add("display-none");
                    
                    this.sudoku.userInput[Math.floor(this.selectedBox/9)][this.selectedBox%9] = parseInt(param);
                    save(this);
                }
                else if (this.mainGrid == 0){
                    this.boxes[this.selectedBox].lastChild.textContent = 0;
                    this.boxes[this.selectedBox].firstChild.classList.remove("display-none");
                    let text = this.boxes[this.selectedBox].firstChild.firstChild.children[Math.floor((param - 1) / 3)].children[(param - 1) % 3].innerText
                    this.boxes[this.selectedBox].firstChild.firstChild.children[Math.floor((param - 1) / 3)].children[(param - 1) % 3].innerText  = text == "" ? param:""
                }

            }
        }
    }

    //others
    printSudoku(){
        this.refreshGrid(this.sudoku.solution);
    }
}

