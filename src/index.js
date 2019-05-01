import './css/bootstrap.min.css';

import Rectangles from './Rectangles';
import Timer from './Timer';

const btn = document.getElementById( 'btn-timer' );

Rectangles.init();

// начало игры
btn.addEventListener(
  'click', () => {

    Rectangles.start();
    Timer.start();
    btn.disabled = true;

  }, false,
);
