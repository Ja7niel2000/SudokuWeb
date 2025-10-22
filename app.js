function init(){
    generaCassillas();
    definePeses();
    // generaNuevoSudoku();
    // generaPlaceholder(50);
    // actualizaValoresUI(placeholder);
}

function generaCassillas(){
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
            p.classList.add("peses");
            p.innerText=0;

            column.appendChild(p);
            row.appendChild(column);
            main.appendChild(row);
        }
    }
}

function compara(){
    for(let y=0; y<9; y++){
        for(let x=0; x<9; x++){
            if(!(sudoku[y][x]==userInput[y][x]))
                return false
        }
    } 
    return true;
}

function verifica(){
    actualizaValoresPlaceHolder();
    if(placeholderCorrecto())
        alert("Felicidades");
    else{
        alert("Malo")
    }
}

init();