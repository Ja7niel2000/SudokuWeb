class Game{
    constructor(){
        
        

    }
}

const KEY="sudoku"
let sudoku=[
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0]
]

let placeholder=[
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0]
]

let userInput=[
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0]
]

function limpiaSudokus(ref){
    for(let i=0;i<9;i++)
        ref[i]=ref[i].map(x => x=0 )
}
let timer = new Cronometro("timer");

function generaNuevoJuego(){
    if(enJuego){
        if(!confirm("Quieres reiniciar?"))
            return
        clearStorage();
    }


    limpiaEstilosPeses();
    enJuego=true;
    let message="Ya hay un sudoku en progreso, quieres continuar con el antiguo?"
    if(localStorage.getItem(KEY)!=null && confirm(message)){
        load();
        actualizaValoresUI(userInput);
        actualizaValoresUI(placeholder,true);
        timer.start();

        return false;
    }
    
    limpiaSudokus(sudoku);
    limpiaSudokus(userInput);
    limpiaSudokus(placeholder);
    
    sudoku = generaSudoku();
    generaPlaceholder(50);
    actualizaValoresUI(placeholder, false);
    timer.start();

    save();
    return true;
}



//Genera el sudoku usando backtracking
//#####################
function generaSudoku(num=0,y=0,columnas=[[]],cuadros=[[[]]],otros=[[[]]],sudokuNuevo=sudoku){
    
    if(num >= 9)
        return sudokuNuevo;

    if(y >= 9){
        num++;
        cuadros.push([[]]);
        otros.push([[]]);
        columnas.push([]);
        return generaSudoku(num,0,columnas,cuadros,otros,sudokuNuevo);
    }

    if(columnas[num][y]!=undefined){
        let equis=columnas[num].pop();
        sudokuNuevo[y][equis]=0;
        otros[num][y].push(equis);
    }

    let columnasD=columnasDisp(y,[...columnas[num]], [...cuadros[num][y]], otros[num][y]);
    if(columnasD.length==0){
        if(y==0){
            cuadros.pop();
            otros.pop();
            columnas.pop();
            num--;
            cuadros[num].pop();
            otros[num].pop();
            return generaSudoku(num, 8, columnas,cuadros,otros,sudokuNuevo)
        }
        cuadros[num].pop();
        otros[num].pop();
        return generaSudoku(num, y-1, columnas, cuadros, otros, sudokuNuevo);
    }

    let random=generaRandom(columnasD);

    //Calcula cuales de las columnas de los cuadros se va a ignorar
    cuadros[num].push([]);
    if (y!=2 && y<5){
        let square=Math.floor(random/3)*3;
        for(let s=square;s<square+3;s++){
            if(s==random)
                continue;
            cuadros[num][y+1].push(s);
        }
        if(y==1 || y==4 || y==7)
            cuadros[num][y+1].push(...cuadros[num][y].filter(x =>!cuadros[num][y+1].includes(x)));
        
    }

    sudokuNuevo[y][random]=num+1
    otros[num].push([]);
    columnas[num].push(random);
    return generaSudoku(num, y+1, columnas, cuadros, otros, sudokuNuevo);
}

function columnasDisp(y,columnas,cuadro,otros){

    if(columnas.length>=9)
        return [];

    let list=[];
    for(let i=0;i<9;i++){
            
        if(columnas.includes(i) || cuadro.includes(i) || sudoku[y][i]!=0 || otros.includes(i) )
            continue;
        list.push(i);
    }

    return list;    
}

function generaRandom(columnasDisp){
    if(columnasDisp.length<1)
        return null
    return columnasDisp[Math.floor(Math.random()*columnasDisp.length)];
}

//Genera el placeholder
//#####################
function generaPlaceholder(n){
    let list = [];
    let x,y;
    if(n>60)
        return false;
    let random=0;

    while(list.length<n){
        random=Math.floor(Math.random()*81);
        if(list.includes(random))
            continue;
        list.push(random);
        y=Math.floor(random/9);
        x=random%9;
        peses[random].classList.add("bloqued");
        placeholder[y][x]=sudoku[y][x];
        
    }
};

function revisa(x,y){
    let number = sudoku[y][x];
    let value = true;
    let s1,s2;

    for(let i=0;i<9;i++){
        s1=`${i},${y}`;
        s2=`${x},${i}`;

        if(x!=i && sudoku[y][i]==number){
            let div=document.getElementById(s1);
            div.classList.add("danger");
            value = false
        }
        
        if(y!=i && sudoku[i][x]==number){
            let div=document.getElementById(s2);
            div.classList.add("danger");
            value =false;
        }
    }

    let Cx=(Math.floor(x/3))*3;
    let Cy=Math.floor(y/3)*3;

    for(let y2 = Cy; y2 < Cy + 3; y2++){
        for(let x2 = Cx; x2 < Cx + 3; x2++){
            if((x!=x2 || y!=y2) && sudoku[y2][x2]==number ){
                let div=document.getElementById(`${x2},${y2}`);
                div.classList.add("danger");
                value =false
            }
        }
    }
    return value;
} 

function sudokuCorrecto(){
    limpiaEstilosPeses();
    let value=true;
    for(let y=0;y<9;y++){
        for(let x=0;x<9;x++){
            value = value && revisa(x,y);
        }
    }
    return value;
}
