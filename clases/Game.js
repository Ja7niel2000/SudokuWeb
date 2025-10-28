import {Sudoku} from "./Sudoku.js";
import {Timer} from "./Timer.js"
import { save, load, clearStorage, check } from "../fun/storage.js";

export class Game {
    constructor(){
        this.sudoku = new Sudoku();
        this.timer = new Timer();
        this.inGame = false;
        this.KEY = "sudoku"
        this.selectedBox = 0;
        this.boxes = [];
        this.mainGrid = 1;
        this.init();
    }
    
    newGame(){
        if(this.inGame){
            if(!confirm("Quieres reiniciar?"))
                return;
            this.timer.stop()
            this.timer = new Timer();
            clearStorage();
        }

        this.clearStyleP();
        this.inGame = true;
        let message = "Ya hay un sudoku en progreso, quieres continuar con el antiguo?"
        if(check(this.KEY) && confirm(message)){
            load(this);
            this.refreshUI(this.sudoku.userInput);
            this.refreshUI(this.sudoku.placeholder, true);
            this.timer.start();
            return false;
        }

        this.sudoku = new Sudoku();
        this.refreshUI(this.sudoku.placeholder, true);
        this.timer.start();
        save(this);
        return true;
    }

    endGame(){
        if(!this.sudoku.verifyUserInput()) return alert("Sudoku incorrecto");
        this.timer.stop();
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

    //UI
    selected(i,e){
        this.boxes[this.selectedBox].classList.remove("selected");
        this.selectedBox = i;
        this.boxes[this.selectedBox].classList.add("selected");
        document.getElementById("hiddenInput").focus();
    }

    refreshUI(ref, bloquear = false){
        let i;
        for(let y=0; y<9; y++)
            for(let x=0; x<9; x++){
                if(ref[y][x]==0)
                    continue;

                i = x + (9 * y);
                this.boxes[i].lastChild.innerText = ref[y][x] ;
                if(bloquear == true)
                    this.boxes[i].classList.add("bloqued");        
            }
    }

    clearStyleP(){
        
        for(let x=0; x<81; x++){
                this.boxes[x].classList.remove("danger");
                this.boxes[x].classList.remove("warning");
                this.boxes[x].classList.remove("bloqued");
                this.boxes[x].lastChild.innerText=" ";
                this.boxes[x].firstChild.classList.add("display-none");

        }
    }

    togglevisible(e, elem, param ){  
        if(elem!=null){
            elem.classList.contains(param)? elem.classList.remove(param) : elem.classList.add(param);
        } 
    }
    
    toggleGrid(){
        if(this.inGame){

            if(this.mainGrid == 1 ){
                this.mainGrid = 0;
                document.querySelector(":root").style.setProperty("--color-selected-grid","#7a3b3b");
            }
            else{
                this.mainGrid = 1;
                document.querySelector(":root").style.setProperty("--color-selected-grid","#3b447a");
            }
        }
        
        }

    //Events
    addEvents(){
        document.getElementById('playB1').addEventListener("click", (e) => this.togglevisible(e,document.getElementById("menuP"),"visible"));
        document.getElementById("controls").addEventListener("click",(e)=>{

            if(e.target.id == "verificar" && this.inGame)
                this.endGame();

            else if(e.target.id == "genera")
                this.newGame();

            else if(e.target.id == "playB2")
                this.togglevisible(e,document.getElementById("menuP"),"visible");

             else if(e.target.id == "changeGrid")
                this.toggleGrid();

        });

        window.addEventListener("keydown",(e) => 
        {
            if(!this.inGame )return;
            
            if( !this.boxes[this.selectedBox].classList.contains('bloqued')){
                if(((e.key == "Backspace" || e.key == 0) || this.boxes[this.selectedBox].lastChild.textContent == e.key) && this.mainGrid == 1 ){
                    this.boxes[this.selectedBox].lastChild.textContent = 0;
                    this.boxes[this.selectedBox].firstChild.classList.remove("display-none")
                    this.sudoku.userInput[Math.floor(this.selectedBox/9)][this.selectedBox%9] = 0;
                    save(this);
                }

                else if (parseInt(e.key) > 0 && parseInt(e.key)<10 ){
                    
                    if(this.mainGrid == 1){
                        this.boxes[this.selectedBox].lastChild.textContent = e.key;
                        if(!this.boxes[this.selectedBox].firstChild.classList.contains("display-none"))
                            this.boxes[this.selectedBox].firstChild.classList.add("display-none");
                        this.sudoku.userInput[Math.floor(this.selectedBox/9)][this.selectedBox%9] = parseInt(e.key);
                        save(this);
                    }
                    else if (this.mainGrid == 0){
                        this.boxes[this.selectedBox].lastChild.textContent = 0;
                        this.boxes[this.selectedBox].firstChild.classList.remove("display-none");
                        let text = this.boxes[this.selectedBox].firstChild.firstChild.children[Math.floor((e.key - 1) / 3)].children[(e.key - 1) % 3].innerText
                        this.boxes[this.selectedBox].firstChild.firstChild.children[Math.floor((e.key - 1) / 3)].children[(e.key - 1) % 3].innerText  = text == "" ? e.key:""
                    }

                }
            }

            if(e.key == "Shift"){
                this.toggleGrid();
            }            

            else if(e.key == "ArrowUp"){
                if(this.selectedBox - 9 < 0)
                    this.selected (81+(this.selectedBox-9),e)  ;  
                else
                    this.selected(Math.abs(this.selectedBox - 9)%81, e);
                }

            else if(e.key=="ArrowDown")
                this.selected((this.selectedBox + 9)%81, e);

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

    //others
    printSudoku(){
        this.refreshUI(this.sudoku.solution);
    }
}

