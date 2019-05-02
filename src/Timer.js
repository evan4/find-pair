class Timer {

  constructor() {

    this.time = null;
    this.canvas = document.getElementById( 'time' );
    this.ctx = this.canvas.getContext( '2d' );
    this.minutes = 0;
    this.seconds = 0;
    this.milliseconds = 0;

  }

  start() {

    this.time = setInterval( () => this.drawClock(), 5 );
    return this;

  }

  drawClock() {

    // По стандарту минимальная задержка – 4 мс
    this.milliseconds += 5;

    // Вычислить секунды
    if ( this.milliseconds > 999 ) {

      this.milliseconds = 0;
      this.seconds += 1;

    }

    // Вычислить минуты
    if ( this.seconds > 59 ) {

      this.milliseconds = 0;
      this.seconds = 0;
      this.minutes += 1;

    }

    // очистка холста
    this.ctx.clearRect(
      0, 0, this.canvas.width, this.canvas.height,
    );

    // отрисовка времени
    this.ctx.font = '20px Arial';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(
      this.getTime(), 10, 20,
    );
    return this;

  }

  // Возвращает прошедшее с начала игры время
  getTime() {

    return `${this.minutes}:${this.seconds}.${this.milliseconds}`;

  }

  // сброс таймера
  reset() {

    clearInterval( this.time );
    this.time = null;
    this.minutes = 0;
    this.seconds = 0;
    this.milliseconds = 0;
    this.ctx.clearRect(
      0, 0, this.canvas.width, this.canvas.height,
    );
    return this;

  }

}

export default new Timer();
