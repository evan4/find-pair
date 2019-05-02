import Timer from './Timer';
import randomizeArray from './helpers/randomizeArray';

class Rectangles {

  constructor() {

    // получить объект холста, получить двумерный контекст рисования getContext('2d')
    this.canvas = document.getElementById( 'canvas' );
    this.ctx = this.canvas.getContext( '2d' );

    // размеры квадрата
    this.sideSquare = 100;

    // массив возможных цветов
    this.colors = [
      'red',
      'blue',
      'orange',
      'forestGreen',
      'gray',
      'purple',
      'sienna',
      'moccasin',
    ];

    this.defaultColor = 'white';

    // массив квадратов
    this.squares = [];

    // начальная инициализация массива цветов квадратов и его заполнение дефолтным знацением
    this.colorsRectangles = Array.from( { length: 16 }, () => this.defaultColor );

    this.pair = '';

    // Активность игры
    this.play = false;

  }

  // Задание значений для всех квадратов
  init() {

    this.squares = [];
    [ 1, 2, 3, 4 ].forEach( ( item, y ) => {

      const top = y * this.sideSquare;
      [ 1, 2, 3, 4 ].forEach( ( items, x ) => {

        this.squares.push( {
          x: x * this.sideSquare,
          y: top,
          color: this.defaultColor,
        } );

      } );

    } );
    this.drawRectangles();
    return this;

  }

  // отрисовка всех квадратов
  drawRectangles() {

    // очистка холста
    this.ctx.clearRect(
      0, 0, this.canvas.width, this.canvas.height,
    );
    this.squares.forEach( ( item ) => {

      this.ctx.lineWidth = 1;
      this.ctx.fillStyle = item.color;
      this.ctx.fillRect(
        item.x, item.y, this.sideSquare, this.sideSquare,
      );
      this.ctx.strokeStyle = 'rgb(108,117,125)';
      this.ctx.strokeRect(
        item.x, item.y, this.sideSquare, this.sideSquare,
      );

    } );
    return this;

  }

  start() {

    this.play = true;
    this.fillRectangles();

    this.canvas.addEventListener(
      'click', e => this.game( e ), false,
    );
    return this;

  }

  game( e ) {

    if ( !this.play ) return;

    // вычисление позиции курсора
    const x = e.pageX - this.canvas.offsetLeft;
    const y = e.pageY - this.canvas.offsetTop;

    this.squares.some( ( item, index ) => {

      if ( y > item.y && y < item.y + this.sideSquare
                && x > item.x && x < item.x + this.sideSquare ) {

        if ( item.color === this.defaultColor ) {

          // открытие цвета
          this.squares[index].color = this.colorsRectangles[index];
          this.drawRectangles();

          // проверка если следующий цвет совпадает с открытым
          if ( this.pair === '' ) {

            this.pair = item.color;

          } else if ( this.pair === item.color ) {

            this.pair = '';

          } else {

            // если же не совпадает, отгда вернуть одои квадарам белый цвет
            this.squares[index].color = this.defaultColor;
            const i = this.squares.findIndex( items => items.color === this.pair );
            this.squares[i].color = this.defaultColor;
            this.pair = '';
            setTimeout( () => {

              this.drawRectangles();

            }, 500 );

          }

        } else {

          return true;

        }

      }
      return false;

    } );

    const endOfGame = this.squares.some( item => item.color === this.defaultColor );

    if ( !endOfGame ) {

      setTimeout( () => {

        this.endOfGame();

      }, 500 );

    }

  }

  endOfGame() {

    if ( this.play ) this.play = false;

    if ( Timer.getTime() === '0:0.0' ) return;

    alert( `Вы выиграли! Затраченное время: ${Timer.getTime()}` );
    this.canvas.removeEventListener(
      'click', e => this.game( e ), false,
    );
    this.colorsRectangles.fill( this.defaultColor );
    this.pair = '';
    this.init();
    Timer.reset();
    document.getElementById( 'btn-timer' ).disabled = false;

  }

  // присваивание цветов массиву квадратов
  fillRectangles() {

    this.colorsRectangles = [];
    const colorsUnique = new Set();

    while ( colorsUnique.size < 8 ) {

      const color = this.colors[Math.floor( ( Math.random() * 8 ) )];
      colorsUnique.add( color );

    }

    // увеличение длины массиваа в 2 раза для создания парного цвета
    this.colorsRectangles = randomizeArray( [ ...colorsUnique, ...colorsUnique ] );
    return this;

  }

}

export default new Rectangles();
