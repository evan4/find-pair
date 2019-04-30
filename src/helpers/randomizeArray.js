export default function randomizeArray(arr) {
     // перемешивание массива алгоритм Фишера-Йетса
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