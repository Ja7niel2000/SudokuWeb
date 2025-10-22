function load(){
    items = JSON.parse(localStorage.getItem(KEY));
    sudoku = items[0];
    placeholder = items[1];
    userInput = items[2];
    timer.seconds=items[3]["seconds"];
    timer.minutes=items[3]["minutes"];
    timer.hours=items[3]["hours"];
};

function save(){
    localStorage.setItem(KEY,JSON.stringify([sudoku,placeholder,userInput,timer]))
}

function clearStorage(){
    localStorage.clear();
}