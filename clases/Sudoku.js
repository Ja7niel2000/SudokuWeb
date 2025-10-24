import { Matrix } from "./Matrix.js";

export class Sudoku{
    constructor(){
        this.solution = new Matrix()
        this.placeholder = new Matrix();
        this.userInput = new Matrix();
    }
    
    verifyUserInput(){
        let value=true;

        for(let y=0; y<9; y++){
            for(let x=0; x<9; x++){
                
                if(this.placeholder.data[y][x] != 0)
                    continue;
                value = value && (this.userInput.data[y][x]==this.solution.data[y][x]);
            }
        }
        console.log(value);
        return value;
    }

    generateSudoku(){
        this.solution.restart();
        this.placeholder.restart();
        this.userInput.restart();

        this.generateSolution();
        this.generaPlaceholder(60);
    }

    //Metódo que crea la solución.
    generateSolution(num=0,y=0,columnas=[[]],cuadros=[[[]]],otros=[[[]]],sudokuNuevo=this.solution.data){
        
        if(num >= 9)
            return sudokuNuevo;

        if(y >= 9){
            num++;
            cuadros.push([[]]);
            otros.push([[]]);
            columnas.push([]);
            return this.generateSolution(num,0,columnas,cuadros,otros,sudokuNuevo);
        }

        if(columnas[num][y]!=undefined){
            let equis=columnas[num].pop();
            sudokuNuevo[y][equis]=0;
            otros[num][y].push(equis);
        }

        let columnasD = this.AvalaibleColumns(y,[...columnas[num]], [...cuadros[num][y]], otros[num][y],sudokuNuevo);
        if(columnasD.length==0){
            if(y==0){
                cuadros.pop();
                otros.pop();
                columnas.pop();
                num--;
                cuadros[num].pop();
                otros[num].pop();
                return this.generateSolution(num, 8, columnas,cuadros,otros,sudokuNuevo)
            }

            cuadros[num].pop();
            otros[num].pop();
            return this.generateSolution(num, y-1, columnas, cuadros, otros, sudokuNuevo);
        }

        let random = this.generateRandomNum(columnasD);

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
        return this.generateSolution(num, y+1, columnas, cuadros, otros, sudokuNuevo);
    }

    //Auxiliar method for "generateSolution".
    AvalaibleColumns(y,columnas,cuadro,otros,sudokuNuevo){

        if(columnas.length>=9)
            return [];

        let list=[];
        for(let i=0;i<9;i++){
                
            if(columnas.includes(i) || cuadro.includes(i) || sudokuNuevo[y][i]!=0 || otros.includes(i) )
                continue;
            list.push(i);
        }

        return list;    
    }

    //Auxiliar method for "generateSolution". 
    generateRandomNum(AvalaibleColumns){
        if(AvalaibleColumns.length<1)
            return null
        return AvalaibleColumns[Math.floor(Math.random()*AvalaibleColumns.length)];
    }

    //Genera un placeholder
    //#####################
    generaPlaceholder(n){
        let list = [];
        let x, y;
        if(n > 60)
            return false;
        let random = 0;

        while(list.length<n){
            random=Math.floor(Math.random()*81);
            if(list.includes(random))
                continue;
            list.push(random);
            x=random%9
            y=Math.floor(random/9);
            this.placeholder.data[y][x]=this.solution.data[y][x];
        }
        return list;
    };

    checkRowCol(x, y, correctNum, value){
        for(let i=0;i<9;i++){    
            if((x != i) && (correctNum == this.solution.data[y][i]))
                value = false
              
            if((y != i) && (correctNum == this.solution.data[i][x]))
                value =false;
        }
        return value;
    } 

    checkSquare(xStart, yStart, correctNum, value){
        
        for(let y = yStart; y < yStart  + 3; y++)
            for(let x = xStart; x < xStart + 3; x++)
                if((xStart != x || yStart != y) && this.solution.data[y][x] == correctNum )
                    value = false;
        return value;
    }

    check(x, y, num=this.solution.data[y][x], value=true){
        let xStartS = (Math.floor(x/3))*3;
        let yStartS = (Math.floor(y/3))*3;

        return (this.checkRowCol(x,y,num,value) && this.checkSquare(xStartS,yStartS,num,value));
    }

    checkSudoku(){
         let value=true;

        for(let y=0; y<9; y++)
            for(let x=0; x<9; x++)
                value = value && (this.check(x, y));
    
        return value;

    }

}