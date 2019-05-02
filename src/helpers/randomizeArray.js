const randomizeArray = ( arr ) => {

  // перемешивание массива алгоритм Фишера-Йетса
  let j;
  let temp;

  arr.forEach( ( item, i ) => {

    j = Math.floor( Math.random() * ( i + 1 ) );
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;

  } );
  return arr;

};

export default randomizeArray;
