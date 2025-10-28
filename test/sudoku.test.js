import { Sudoku } from "../clases/Sudoku.js";
console.log("Test iniciados en la fecha",new Date)
//Test correctnes
// test("Test 1 Sudoku    ", () => {createAndTest(1)});
// test("Test 10 Sudokus  ", () => {createAndTest(10)});
// test("Test 100 Sudokus ", () => {createAndTest(100)});
// test("Test 1000 Sudokus", () => {createAndTest(1000)});
// test("Test 10000 Sudokus  ", () => {createAndTest(10000)});
// test("Test 100000 Sudokus ", () => {createAndTest(100000)});
// test("Test 1000000 Sudokus", () => {createAndTest(1000000)});


//test randomness of the generator
test("Randomnes of 10000 sudokus", () => {testSolutionsRandomness(1000000)});

// test("Chec", ()={
//})
function createGrid9x9x9(){}

// function testBoxesRandomness(){

// }

function testSolutionsRandomness(n){
    let hash = new Set();
    for(let i = 0; i < n; i++){
        let sudoku = new Sudoku();
        hash.add(sudoku.solution.toString());
    }

    console.log(`${n} sudokus and only ${n - hash.size} repetitions`)
    expect(hash.size > n/2).toBe(true);
}

function createAndTest(n, value = true){
    for(let i = 0; i < n; i++){
        let sudoku = new Sudoku();
        value = value && sudoku.checkSudoku();
    }
    expect(value).toBe(true);
}



