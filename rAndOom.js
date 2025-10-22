function suma(n) {
    for(let y=0;y<9;y++){
        for(let x=0;x<9;x++){
            
            sudoku[y][x]=(((sudoku[y][x]) + n) % 9);
        }
    }
    actualizaValoresUI();

}

//Cambio de fila solo sirve dentro de bandas
function cambiaFila(uno,dos){
    let tempUno=sudoku[uno];
    sudoku[uno]=sudoku[dos];
    sudoku[dos]=tempUno;
    actualizaValoresUI();
    limpiaEstilosPeses()
}

function cambiaColumna(uno,dos){
    let colTemp=[]
    for(y=0;y<9;y++){
        colTemp=sudoku[y][uno];
        sudoku[y][uno]=sudoku[y][dos];
        sudoku[y][dos]=colTemp;
    }

    actualizaValoresUI();
    limpiaEstilosPeses()
}

function cambiaSimbxSimb(unoX,unoY,dosX,dosY){
    let temp=sudoku[unoY][unoX];
    sudoku[unoY][unoX]=sudoku[dosY][dosX]
    sudoku[dosY][dosX]=temp;

}

function cambiaNumeros(n1,n2){
    for(let y=0;y<9;y++){
        for(let x=0;x<9;x++){

            if(sudoku[y][x]==n1){
                sudoku[y][x]=n2;
                continue;
            }

            if(sudoku[y][x]==n2)
                sudoku[y][x]=n1
        }
    }
    actualizaValoresUI()
}