
class Timer {
    constructor() {
        this.time = null;
        this.canvas = document.getElementById('time');
        this.ctx = this.canvas.getContext('2d');
        this.minutes = 0;
        this.seconds = 0;
        this.milliseconds = 0;
    }

    start() {
        this.time = setInterval( () => this.drawClock(), 5);
    }
    drawClock(){
        
        this.milliseconds += 5;
        // set seconds
        if (this.milliseconds > 999) {
            this.milliseconds = 0;
            this.seconds += 1;
        }
        // set minutes
        if(this.seconds > 59) {
            this.milliseconds = 0;
            this.seconds = 0;
            this.minutes += 1;
        }
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.font = "20px Arial";
        this.ctx.fillText(this.getTime(), 10, 20);

    }
    getTime(){
        return `${this.minutes}:${this.seconds}.${this.milliseconds}`;
    }
    reset() {
        clearInterval(this.time);
        this.time = null;
        this.minutes = 0;
        this.seconds = 0;
        this.milliseconds = 0;
       
    }
}

export default new Timer();
