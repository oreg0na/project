'use strict';

let title = "Авто из Японии";
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = 3000;
let rollback = 10;
let fullPrice = 50000;
let adaptive = true;

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(screens.length);

console.log("Стоимость верстки экранов " + screenPrice + " рублей.");
console.log("Стоимость разработки сайта " + fullPrice + " рублей.");

console.log(screens.toLowerCase().split(", "));
console.log(fullPrice * rollback / 100);



const title = prompt("Как называется ваш проект?");
console.log(title); 

const screens = prompt('Какие типы экранов нужно разработать?', "Простые, Сложные, Интерактивные");
console.log(screens);

const screenPrice = +prompt("Сколько будет стоить данная работа?");
console.log(screenPrice);

const adaptive = +prompt("Нужен ли адаптив на сайте?");
// console.log(adaptive);

let service1 = +prompt("Нужно ли перевести сайт на английский язык?");
console.log(service1);

let servicePrice1 = +prompt("Введите сколько будет стоить перевод на английский язык?");
console.log(servicePrice1);

let service2 = +prompt("Нужно ли перевести сайт на арабский язык?");
console.log(service2);

let servicePrice2 = +prompt("Введите сколько будет стоить перевод на арабскский язык?");
console.log(servicePrice2);

const fullPrice = screenPrice + servicePrice1 + servicePrice2;

let servicePercentPrice = Math.ceil(fullPrice - fullPrice * rollback / 100);
console.log(servicePercentPrice);

if (fullPrice > 30000) {
    console.log("Даем скидку в 10%");
}
if (fullPrice <= 30000 && fullPrice > 15000) {
    console.log("Даем скидку в 5%");
}
if (fullPrice <= 15000 && fullPrice > 0) {
    console.log("Скидка не предусмотрена");
}
if (fullPrice <= 0) {
    console.log("Что то пошло не так");
}
        break;
}
