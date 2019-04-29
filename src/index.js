import './css/bootstrap.min.css';
import './css/style.css';

import Rectangles from './Rectangles';
import Timer from './Timer';


Rectangles.init();


const btn = document.getElementById('btn-timer');

// начало игры
btn.addEventListener('click', () => {
    Rectangles.start();
    Timer.start();
}, false);
