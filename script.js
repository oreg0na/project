'use strict';

const isNumber = function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
};

function gameBot(counter) {
    let x = Math.ceil(Math.random() * 100);
    function compare() {
        const userNumber = prompt('Угадай число от 1 до 100');

        if (userNumber == null) {
            alert('Спасибо за игру, до свидания :)');
        } else if (counter === 0) {
            if (true === confirm('Попытки закончились, хотите сыграть еще?')) {
                gameBot(9);
            } else { alert('Спасибо за игру, до свидания :)') }
        } else if (!isNumber(userNumber)) {
            counter--;
            alert('Введи число! Осталось попыток: ' + (counter + 1));
            compare();
        } else if (userNumber < x) {
            counter--;
            alert('Загаданное число больше. Осталось попыток: ' + (counter + 1));
            compare();
        } else if (userNumber > x) {
            counter--;
            alert('Загаданное число меньше. Осталось попыток: ' + (counter + 1));
            compare();
        } else if (userNumber == x) {
            if (true == confirm('Поздравляю, Вы угадали!!! Хотели бы сыграть еще?')) {
                gameBot(9);
            } else { alert('Спасибо за игру, до свидания :)') }
        }
    }

    compare();
};

gameBot(9);
