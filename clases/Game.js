import {Sudoku} from "./Sudoku.js";
import {Timer} from "./Timer.js"
import { save, load, clearStorage, check } from "../fun/storage.js";

export class Game {
    constructor(){
        this.sudoku = new Sudoku();
        this.timer = new Timer();
        this.inGame = false;
        this.KEY="sudoku"
        this.selectedBox = 0;
        this.boxes = [];
    }
    
    newGame(){
        if(this.inGame){
            if(!confirm("Quieres reiniciar?"))
                return;
            clearStorage();
        }

        this.clearStyleP();
        this.inGame = true;
        let message="Ya hay un sudoku en progreso, quieres continuar con el antiguo?"
        if(check(this.KEY) && confirm(message)){
            load(this);
            this.refreshUI(this.sudoku.userInput.data);
            this.refreshUI(this.sudoku.placeholder.data, true);
            this.timer.start();
            return false;
        }

        this.sudoku = new Sudoku();
        this.sudoku.generateSudoku();
        this.refreshUI(this.sudoku.placeholder.data, true);
        this.timer.start();
        save(this);
        return true;
    }

    endGame(){
        if(!this.sudoku.verifyUserInput()) return alert("Sudoku incorrecto");
        this.timer.stop();
        alert(`Juego completado en ${this.timer.time}`);
        clearStorage()
    }

    init(){
        let main = document.getElementById("main");
        let lol = DocumentFragment;
        for(let y=0;y<9;y++){
            let row = document.createElement("div");
            row.classList.add("rows");
            for(let x=0;x<9;x++){

                let column = document.createElement("div");
                column.classList.add('columns')
                if(y==2 || y==5)
                    column.classList.add("border-bottom");
                if(x ==2 || x==5)
                    column.classList.add("border-rigth");

                let p = document.createElement("p");
                p.id = `${x},${y}`
                p.classList.add("peses")
                p.addEventListener("click", (e) => this.selected((y*9) +x,e))
                p.innerText=0;

                column.appendChild(p);
                row.appendChild(column);
                main.appendChild(row);
                this.boxes.push(p);
            }
        }
        this.addEvents();
    }

    selected(i,e){
        this.boxes[this.selectedBox].classList.remove("selected");
        this.selectedBox=i;
        this.boxes[this.selectedBox].classList.add("selected");
        document.getElementById("hiddenInput").focus();
    }

    refreshUI(ref, bloquear=false){
        let i;
        for(let y=0; y<9; y++)
            for(let x=0; x<9; x++){
                if(ref[y][x]==0)
                    continue;

                i = x + (9 * y);
                this.boxes[i].innerText=ref[y][x];
                if(bloquear==true)
                    this.boxes[i].classList.add("bloqued");        
            }
    }

    clearStyleP(){
        for(let x=0; x<81; x++){
                this.boxes[x].classList.remove("danger");
                this.boxes[x].classList.remove("warning");
                this.boxes[x].classList.remove("bloqued");
        }
    }

    addEvents(){
        document.getElementById('playB1').addEventListener("click", (e) => this.togglevisible(e,document.getElementById("menuP"),"visible"));
        document.getElementById("controls").addEventListener("click",(e)=>{

            if(e.target.id=="verificar" && this.inGame)
                this.endGame();

            else if(e.target.id=="genera")
                this.newGame();

            else if(e.target.id=="playB2")
                this.togglevisible(e,document.getElementById("menuP"),"visible");
            
        })

        window.addEventListener("keydown",(e) => 
        {

            if ((e.key == "Backspace" ||(parseInt(e.key)>=0 && parseInt(e.key)<10)) && !this.boxes[this.selectedBox].classList.contains('bloqued')){
                this.boxes[this.selectedBox].textContent = e.key=="Backspace" ? 0 : parseInt(e.key);
                if(this.inGame){
                    this.sudoku.userInput.data[Math.floor(this.selectedBox/9)][this.selectedBox%9] = parseInt(e.key);
                    save(this);
                }
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

    togglevisible(e, elem, param ){  
        if(elem!=null){
            elem.classList.contains(param)? elem.classList.remove(param) : elem.classList.add(param);
        } 
    }

    printSudoku(){
        this.refreshUI(this.sudoku.solution.data);
    }
}

