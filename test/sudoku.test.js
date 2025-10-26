import { Sudoku } from "../clases/Sudoku.js";

function createAndTest(n, value = true){
    for(let i = 0; i < n; i++){
        let sudoku = new Sudoku();
        value = value && sudoku.checkSudoku();
    }
    expect(value).toBe(true);
}

test("Test 1 Sudoku    ", () => {createAndTest(1)});
test("Test 10 Sudokus  ", () => {createAndTest(10)});
test("Test 100 Sudokus ", () => {createAndTest(100)});
test("Test 1000 Sudokus", () => {createAndTest(1000)});
test("Test 10000 Sudokus  ", () => {createAndTest(10000)});
test("Test 100000 Sudokus ", () => {createAndTest(100000)});
test("Test 1000000 Sudokus", () => {createAndTest(1000000)});






