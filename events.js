let menuP=document.getElementById("menuP");
let peses;
let selectedBox=0;
let enJuego=false;

function togglevisible(e){
    if(menuP.classList.contains("visible"))
        menuP.classList.remove("visible");
    else
        menuP.classList.add("visible");
}

function focusKeyboar() {
    document.getElementById("hiddenInput").focus();
}

function selected(i,e){
   
        peses[selectedBox].classList.remove("selected");
        selectedBox=i;
        peses[selectedBox].classList.add("selected");
        focusKeyboar();
}

function definePeses(){
    peses = document.getElementsByClassName("peses");
    for(let i=0;i<peses.length;i++)
        peses[i].addEventListener("click",(e)=>selected(i,e));
}

document.getElementById('playB1').addEventListener("click", (e) => togglevisible());
document.getElementById('playB2').addEventListener("click", (e) => togglevisible());

document.getElementById("controls").addEventListener("click",(e)=>{
    console.log(e.target.id);
    if(e.target.id=="verificar")
        console.log(verifica())
    else if(e.target.id=="genera")
        generaNuevoJuego();

})

window.addEventListener("keydown",(e) => {
    if (parseInt(e.key)>=0 && parseInt(e.key)<10 && !peses[selectedBox].classList.contains('bloqued')){
        peses[selectedBox].textContent=e.key;
        if(enJuego){
            userInput[Math.floor(selectedBox/9)][selectedBox%9]= parseInt(e.key);
            save();
        }
    }
    
    else if(e.key=="ArrowUp"){
        if(selectedBox - 9 < 0)
            selected (81+(selectedBox-9),e)  ;  
        else
            selected(Math.abs(selectedBox - 9)%81, e);
    }
    else if(e.key=="ArrowDown")
        selected((selectedBox + 9)%81, e);

    else if(e.key=="ArrowLeft"){
        if(selectedBox==0)
            selected(80,e);
        else
            selected((selectedBox - 1)%81, e);
    }
    else if(e.key=="ArrowRight")
        selected((selectedBox + 1)%81, e);
});
