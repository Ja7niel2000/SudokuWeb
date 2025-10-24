export function load(game){
    let prevGame = JSON.parse(localStorage.getItem(game.KEY));
    console.log(prevGame.sudoku);
    game.sudoku.solution = prevGame["sudoku"]["solution"];
    game.sudoku.placeholder = prevGame["sudoku"]["placeholder"];
    game.sudoku.userInput = prevGame["sudoku"]["userInput"];

    
    game.timer.seconds = prevGame["timer"]["seconds"];
    game.timer.minutes = prevGame["timer"]["minutes"];
    game.timer.hours = prevGame["timer"]["hours"];
    return game;
}

export function check(KEY){
    return localStorage.getItem(KEY)!=null
}

export function save(game){
    localStorage.setItem(game.KEY, JSON.stringify(game))
}

export function clearStorage(){
    localStorage.clear();
}