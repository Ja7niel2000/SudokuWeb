import { Game } from "./clases/Game.js";
let game = new Game();

//Main buttons
document.getElementById('playB1').addEventListener("click", (e) => game.togglevisible(e,document.getElementById("menuP"),"visible"));
document.getElementById("controls").addEventListener("click", (e) => {

    if(e.target.id == "verificar")
        game.endGame();

    else if(e.target.id == "genera")
        game.newGame();

    else if(e.target.id == "playB2")
        game.togglevisible(e,document.getElementById("menuP"),"visible");

        else if(e.target.id == "changeGrid")
        game.toggleGrid();

});
