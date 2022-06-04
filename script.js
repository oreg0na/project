'use strict';

console.log(isNaN(parseFloat('enterNumber')));

const hiddenNumber = function (myNumber) {
    let startGame;
    let gameOver;

    startGame = confirm("Угадай число от 1 до 100?");

    if (startGame) {

        takeNumber(myNumber);

    } else {
        gameOver = alert("Игра окончена");
    }
};

const takeNumber = function (unknowNum) {
    let enterNumber;

    enterNumber = prompt("Введите число от 1 до 100");

    if (enterNumber === null) {
        return alert("Игра окончена");
    }

    while (enterNumber.trim() == '' || !isFinite(enterNumber)) {
        alert("Введите число!");
        enterNumber = prompt("Введите число от 1 до 100");
    }

    enterNumber = Number(enterNumber);

    if (enterNumber < unknowNum) {
        numLessAlert();
    }

    if (enterNumber > unknowNum) {
        numMoreAlert();
    }

    if (enterNumber === unknowNum) {
        return hiddenNumber == alert("Поздравляю, Вы угадали!!!");
    }

    takeNumber(unknowNum);
};

const numLessAlert = function () {

    alert("Загаданное число больше. Попробуйте еще...");
};

const numMoreAlert = function () {

    alert("Загаданное число меньше.Попробуйте еще...");
};

hiddenNumber(55);
