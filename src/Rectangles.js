class Rectangles {

    constructor() {
        // получить объект холста, получить двумерный контекст рисования getContext('2d')
        this.canvas = document.getElementById('canvas');
        this.elemLeft = canvas.offsetLeft,
        this.elemTop = canvas.offsetTop,
        this.ctx = canvas.getContext('2d');
        // размеры квадрата
        this.sideЫquare = 100;
        // массив возможных цветов
        this.colors = ['red', 'blue', 'orange', 'forestGreen', 'gray', 'purple', 'sienna ', 'moccasin'];
        // массив квадратов
        this.squares = [];
        // начальная инициализация массива цветов квадратов и его заполнение дефолтным знацением
        this.colorsRectangles = new Array(10).fill('white');

    }
    // отрисовка всех квадратов
    init() {
        for (let y = 0; y < 4; y++) {
            let top = y * this.sideЫquare;
            for (let x = 0; x < 4; x++) {
                this.squares.push({
                    x: x * this.sideЫquare,
                    y: top,
                    color: 'white'
                });
            }
        }
        this.drawRectangles();
    }
    drawRectangles(){
        for (let index = 0; index < this.squares.length; index++) {
            this.ctx.lineWidth = 1;
            this.ctx.fillStyle = this.colorsRectangles[index];
            this.ctx.fillRect(this.squares[index].x, this.squares[index].y, this.sideЫquare, this.sideЫquare);
            this.ctx.strokeStyle = "rgb(108,117,125)";
            this.ctx.strokeRect(this.squares[index].x, this.squares[index].y, this.sideЫquare, this.sideЫquare);
        }
    }
    start(){
        this.fillRectangles();
        this.canvas.addEventListener('click', (e) => {
            const pos = {
                x: e.clientX,
                y: e.clientY
              };
            
        });
    }
    end(){
        this.canvas.removeEventListener('click', () => {
            this.colorsRectangles.fill('white');
        });
    }
    // присваивание цвета массиву  увадратов цветов
    fillRectangles() {
        this.colorsRectangles = [];

        for (let index = 0; index < 8; index++) {
            this.colorsRectangles.push(this.getRandomColor());
        }
        this.colorsRectangles = [...this.colorsRectangles, ...this.colorsRectangles];
        this.colorsRectangles = this.randomizeArray(this.colorsRectangles);

    }
    // получение случайного цвета из массива colors
    getRandomColor() {
        let color = this.colors[Math.floor((Math.random() * 8))];
        // если цвет уже существует в массве, рекурсивно вызвать эту функцию вновь
        if (this.colorsRectangles.indexOf(color) > -1) {
            return this.getRandomColor();
        } else {
            return color;
        }
    }
    // перемешивание массива 
    randomizeArray(arr) {
        const len = arr.length;
        let tempArr = [];

        for (let i = 0; i < len - 1; i++) {
            /* 
                Удалает 1 случайный елемент массива 
                и добавляет во временный массив empArr
            */
            tempArr.push(arr.splice(Math.floor(Math.random() * len), 1)[0]);
        }

        // Push the remaining item onto tempArr 
        tempArr.push(arr[0]);
        return tempArr;
    }

}

export default new Rectangles();