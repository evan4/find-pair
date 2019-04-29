import Timer from './Timer';

class Rectangles {
    constructor() {
        // получить объект холста, получить двумерный контекст рисования getContext('2d')
        this.canvas = document.getElementById('canvas');
        this.elemLeft = this.canvas.offsetLeft;
        this.elemTop = this.canvas.offsetTop;
        this.ctx = this.canvas.getContext('2d');
        // размеры квадрата
        this.sideSquare = 100;
        // массив возможных цветов
        this.colors = ['red', 'blue', 'orange', 'forestGreen', 'gray', 'purple', 'sienna', 'moccasin'];
        // массив квадратов
        this.squares = [];
        // начальная инициализация массива цветов квадратов и его заполнение дефолтным знацением
        this.colorsRectangles = new Array(16).fill('white');

        this.pair = '';
    }

    // отрисовка всех квадратов
    init() {
        for (let y = 0; y < 4; y += 1) {
            const top = y * this.sideSquare;
            for (let x = 0; x < 4; x += 1) {
                this.squares.push({
                    x: x * this.sideSquare,
                    y: top,
                    color: 'white',
                });
            }
        }
        this.drawRectangles();
    }

    drawRectangles() {
        for (let index = 0, len = this.squares.length; index < len; index += 1) {
            this.ctx.lineWidth = 1;
            this.ctx.fillStyle = this.squares[index].color;
            this.ctx.fillRect(this.squares[index].x, this.squares[index].y,
                this.sideSquare, this.sideSquare);
            this.ctx.strokeStyle = 'rgb(108,117,125)';
            this.ctx.strokeRect(this.squares[index].x, this.squares[index].y,
                this.sideSquare, this.sideSquare);
        }
    }

    start() {
        this.fillRectangles();
        this.canvas.addEventListener('click', (e) => {
            const endOfGame = !this.squares.some(item => item.color === 'white');
            if(endOfGame){
                this.endOfGame();
            }
            // вычисление позиции курсора
            const x = e.pageX - this.canvas.offsetLeft;
            const y = e.pageY - this.canvas.offsetTop;

            for (let index = 0, len = this.squares.length; index < len; index += 1) {
                if (y > this.squares[index].y && y < this.squares[index].y + this.sideSquare
                    && x > this.squares[index].x && x < this.squares[index].x + this.sideSquare) {
                    if (this.squares[index].color === 'white') {
                        this.squares[index].color = this.colorsRectangles[index];
                        this.drawRectangles();
                        if(!this.pair){
                           this.pair = this.squares[index].color 
                        }else if(this.pair === this.squares[index].color ){
                            this.pair = '';
                        }else{
                            this.squares[index].color = 'white';
                            const i = this.squares.findIndex(item => item.color === this.pair);
                            this.squares[i].color = 'white';
                            this.pair = '';
                            setTimeout(() => {
                                this.drawRectangles();
                            }, 500);
                        }
                    }
                    break;
                }
            }
        });
    }

    endOfGame() {
        this.canvas.removeEventListener('click', () => {
            this.colorsRectangles.fill('white');
        });
        Timer.reset();
        alert('Вы выиграли! Затраченное время: ');
    }

    // присваивание цветов массиву квадратов
    fillRectangles() {
        this.colorsRectangles = [];
        const colorsUnique = new Set();

        while (colorsUnique.size < 8) {
            const color = this.colors[Math.floor((Math.random() * 8))];
            colorsUnique.add(color);
        }
        // увеличение длины массиваа в 2 раза
        this.colorsRectangles = [...colorsUnique, ...colorsUnique];

        this.colorsRectangles = this.randomizeArray([...colorsUnique, ...colorsUnique]);
    }

    // перемешивание массива алгоритм Фишера-Йетса
    randomizeArray(arr) {
        let j; let
            temp;
        for (let i = arr.length - 1; i > 0; i -= 1) {
            j = Math.floor(Math.random() * (i + 1));
            temp = arr[j];
            arr[j] = arr[i];
            arr[i] = temp;
        }
        return arr;
    }
}

export default new Rectangles();
