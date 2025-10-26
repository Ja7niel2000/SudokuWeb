export class Timer{

    constructor(elementId="timer", seconds=0, minutes=0, hours=0){
        this.time = "00:00:00";

        this.seconds = seconds;
        this.minutes = minutes;
        this.hours = hours;

        this.element = document.getElementById(elementId);
        this.interval = null;
        this.active = false;
    }
   
    start(){
        if(this.active || this.element==null) return;
        this.active=true;
        this.interval = setInterval(()=>{
            this.setTime();
            this.element.innerText=this.time;
        },1000);
    }

    stop(){
        if(!this.active) return;
        this.active = false;
        clearInterval(this.interval);
    }

    setTime(){
        if(++this.seconds >= 60){
            this.seconds = 0;
            if(++this.minutes >= 60){
                this.minutes = 0;
                this.hours++;
            }
        }
        this.join();
    }

    join(){
        this.time =`${this.hours>9 ? this.hours:"0"+this.hours}:${this.minutes > 9 ? this.minutes : "0" + this.minutes }:${this.seconds > 9 ? this.seconds : "0" + this.seconds }`
    }
}