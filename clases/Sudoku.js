export class Sudoku{
    constructor(){
        this.solution = this.generateSolution();
        this.placeholder = this.generaPlaceholder();
        this.userInput = this.createGrid(); 
    }

    createGrid(){
        let grid = [];
        for(let y = 0; y < 9; y++){
            grid.push([]);
            for(let x = 0 ; x < 9; x++){
                grid[y].push(0);
            }
        }
        return grid;

    }

    verifyUserInput(){
        let value=true;

        for(let y=0; y<9; y++){
            for(let x=0; x<9; x++){
                
                if(this.placeholder[y][x] != 0)
                    continue;
                value = value && (this.userInput[y][x]==this.solution[y][x]);
            }
        }
        console.log(value);
        return value;
    }

    //Method that creates a solution.
    //This method must not receive nothing in the params
    //Returns a 9x9 grid
    generateSolution(newSudoku = this.createGrid(), num = 0, y = 0, columns = [[]], bloquedColumns = [[[]]]){
        //base case
        if(num >= 9)
            return newSudoku;

        //base case
        if(y >= 9){
            bloquedColumns.push([[]]);
            columns.push([]);
            return this.generateSolution(newSudoku, num + 1, 0, columns, bloquedColumns);
        }

        if(columns[num][y] != undefined){
            let ex = columns[num].pop();
            newSudoku[y][ex] = 0;
            bloquedColumns[num][y].push(ex);
        }

        let AvColumns = this.AvalaibleColumns(newSudoku, y, columns[num], bloquedColumns[num][y]);
        if(AvColumns.length == 0){
            if(y == 0){
                bloquedColumns.pop();
                columns.pop();
                return this.generateSolution(newSudoku, num - 1, 8, columns, bloquedColumns)
            }

            bloquedColumns[num].pop();
            return this.generateSolution(newSudoku, num, y - 1, columns, bloquedColumns);
        }

        let random = AvColumns[Math.floor(Math.random() * AvColumns.length)];
        bloquedColumns[num].push([]);
        this.addBloquedSquares(y, bloquedColumns[num], random);

        newSudoku[y][random] = num + 1;
        columns[num].push(random);
        return this.generateSolution(newSudoku, num, y + 1, columns, bloquedColumns);
    }

    //Auxiliar method for "generateSolution".
    AvalaibleColumns(newSudoku, y, columns, bloquedColumns){

        if(columns.length >= 9)
            return [];

        let list = [];
        for(let i = 0; i < 9; i++){
            if(columns.includes(i) || bloquedColumns.includes(i) || newSudoku[y][i] != 0)
                continue;
            list.push(i);
        }

        return list;    
    }

    //Auxiliar method for "generateSolution"
    addBloquedSquares(y, bloquedColumns, random){   
        if (y != 2 && y < 5){
            let square = Math.floor(random / 3) * 3;
            for(let s = square; s < square + 3; s++){
                if(s == random)
                    continue;
                bloquedColumns[y+1].push(s);
            }
            if(y == 1 || y == 4)
                bloquedColumns[y+1].push(...bloquedColumns[y].filter(x =>! bloquedColumns[y+1].includes(x)));
        }
    }

    //Genera un placeholder
    generaPlaceholder(n = 60, placeholder = this.createGrid()){
        let list = [];
        let x, y;
        if(n > 60)
            return false;

        let random = 0;

        while(list.length<n){
            random = Math.floor(Math.random() * 81);
            if(list.includes(random))
                continue;
            list.push(random);
            x = random % 9
            y = Math.floor(random / 9);
            placeholder[y][x] = this.solution[y][x];
        }
        return placeholder;
    };

    //Methods for testing the sudokus
    checkSudoku(){
        let value=true;

        for(let y = 0; y < 9; y++){
            for(let x=0; x < 9; x++){
                value = value && (this.check(x, y, this.solution[y][x], true));
            }
        }
    
        return value;

    }

    check(x, y, num, value){
        return (this.checkRowCol(x, y, num, value) && this.checkSquare(x, y,num,value));
    }

    checkRowCol(x, y, num, value){
        for(let i=0;i<9;i++){    
            if((x != i) && (num == this.solution[y][i]))
                value = false
              
            if((y != i) && (num == this.solution[i][x]))
                value = false;
        }
        return value;
    } 

    checkSquare(xStart, yStart, num, value){
        let xStartS = (Math.floor(xStart/3)) * 3;
        let yStartS = (Math.floor(yStart/3)) * 3;

        for(let y = yStartS; y < yStartS + 3; y++){
            for(let x = xStartS; x < xStartS + 3; x++){
                if((xStart != x || yStart != y) && this.solution[y][x] == num ){
                    value = false;
                }
            }
        }
        return value;
    }
}