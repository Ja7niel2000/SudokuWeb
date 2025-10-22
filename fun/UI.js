export function refreshUI(ref, bloquear=false){
    let i;
    for(let y=0; y<9; y++)
        for(let x=0; x<9; x++){
            if(ref[y][x]==0)
                continue;

            i = x + (9 * y);
            peses[i].innerText=ref[y][x];
            if(bloquear==true)
                peses[i].classList.add("bloqued");        
        }
}

function resalta(n){
    limpiaEstilosPeses()
    for(let x = 0; x < 81; x++){
            if (peses[x].innerText==n)
                peses[x].classList.add("warning")
        }
}

export function clearStyleP(){
    for(let x=0; x<81; x++){
            peses[x].classList.remove("danger");
            peses[x].classList.remove("warning");
            peses[x].classList.remove("bloqued");
    }
}