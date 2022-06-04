"use strict";

let title;
let screens;
let screenPrice;
let adaptive;
let service1;
let service2;

const rollback = 10;
let allServicePrices;
let fullPrice;
let servicePercentPrice;


const isNumber = function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
};

const asking = function () {

    title = prompt("Как называется Ваш проект?", "Калькулятор сайта");
    while (title === '' || title === null) {
        title = prompt("Как называется Ваш проект?", "Калькулятор сайта");
    }

    screens = prompt("Какие типы экранов нужно разработать?", "Простые, Cложные");

    do {
        screenPrice = prompt("Сколько будет стоить данная работа?");
    } while (!isNumber(screenPrice));
    screenPrice = Number(screenPrice);

    adaptive = confirm("Нужен ли адаптив на сайте?");
};

const showTypeOf = function (variable) {
    console.log(variable, typeof variable);
};

const getAllServicePrice = function () {
    let sum = 0;
    let answerPrice = 0;

    for (let i = 0; i < 2; i++) {

        if (i === 0) {
            service1 = prompt("Какой дополнительный тип услуги 1 нужен?", "простой");
        } else if (i === 1) {
            service2 = prompt("Какой дополнительный тип услуги 2 нужен?", "сложный");
        }


        do {
            answerPrice = prompt("Сколько это будет стоить?");
        } while (!isNumber(answerPrice));
        answerPrice = Number(answerPrice);
        sum += answerPrice;

    }

    return sum;
};

const getFullPrice = function () {
    return screenPrice + allServicePrices;
};

const getTitle = function () {
    return title.trim()[0].toUpperCase() + title.trim().substr(1).toLowerCase();
};

const getServicePercentPrices = function () {
    return fullPrice - (fullPrice * (rollback / 100));
};

const getRollBackMesssage = function (price) {
    switch (true) {
        case price >= 30000:
            return "Даем скидку в 10%";
        case price >= 15000 && price < 30000:
            return "Даем скидку в 5%";
        case price >= 0 && price < 15000:
            return "Скидка не предусмотрена";
        case price < 0:
            return "Что то пошло не так";
    }
};

asking();
allServicePrices = getAllServicePrice();
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrices();
title = getTitle();


showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(allServicePrices);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log(screens);
console.log("allServicePrices", allServicePrices);
console.log("screenPrice", screenPrice);
console.log("fullPrice", fullPrice);
console.log(getRollBackMesssage(fullPrice));
console.log("Cтоимость за вычетом процента отката посреднику " + servicePercentPrice + " рублей/ долларов/гривен/юани");
