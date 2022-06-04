' use strict';

let title = '"Project1" - обязательное поле* ';

let getAllServicePrices = function (service1, service2) {
    return service1 + service2;
};
let allServicePrices = getAllServicePrices(1000, 3000);

let fullPrice;

function getFullPrice(screenPrice, allServicePrices) {
    return screenPrice + allServicePrices;

}
let fullPrice = getFullPrice(1000, 2000);

const getTitle = function (title) {
    let firstCharBig;

    do {
        title = title.trim();
    } while (title.indexOf(' ') === 0);

    title = title.toLowerCase();
    firstCharBig = title[0].toUpperCase();
    title = title.replace(title[0], firstCharBig);
    return title;
};

function getServicePercentPrices(fullPrice, rollback) {
    return fullPrice - rollback;
}
let servicePercentPrice = getFullPrice(fullPrice / 100 * 10);
console.log(servicePercentPrice);

console.log(allServicePrices);
console.log(fullPrice);
console.log(getTitle);
console.log(servicePercentPrice);
