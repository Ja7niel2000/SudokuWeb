import { Sudoku } from "../clases/Sudoku.js";

test("Test the generation of one Sudoku",()=>{
    let sudoku = new Sudoku();
    sudoku.generateSolution();
    expect(sudoku.checkSudoku()).toBe(true);
});

test("Test 15 sudokus",()=>{
    let value = true;
    for(let i=0;i<15;i++){
        let sudoku = new Sudoku();
        sudoku.generateSolution();
        value = value && sudoku.checkSudoku();
    }
    expect(value).toBe(true);
});

test(`Test 100 sudokus`,()=>{
    let n=100;
    let value = true;
    for(let i=0;i<n;i++){
        let sudoku = new Sudoku();
        sudoku.generateSolution();
        value = value && sudoku.checkSudoku();
    }
    expect(value).toBe(true);
});

test(`Test 1000 sudokus`,()=>{
    let n =1000;
    let value = true;
    for(let i=0;i<n;i++){
        let sudoku = new Sudoku();
        sudoku.generateSolution();
        value = value && sudoku.checkSudoku();
    }
    expect(value).toBe(true);
});
test(`Test 10000 sudokus`,()=>{
    let n =10000;
    let value = true;
    for(let i=0;i<n;i++){
        let sudoku = new Sudoku();
        sudoku.generateSolution();
        value = value && sudoku.checkSudoku();
    }
    expect(value).toBe(true);
});
test(`Test 100000 sudokus`,()=>{
    let n =100000;
    let value = true;
    for(let i=0;i<n;i++){
        let sudoku = new Sudoku();
        sudoku.generateSolution();
        value = value && sudoku.checkSudoku();
    }
    expect(value).toBe(true);
});
