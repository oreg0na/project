'use strict';

const title = document.getElementsByTagName('h1')[0];
const startBtn = document.getElementsByClassName('handler_btn')[0];
const btnReset = document.getElementsByClassName('handler_btn')[1];
const btnAdd = document.querySelector('.screen-btn');
const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');
const inputRollback = document.querySelector('.rollback input[type="range"]');
const spanRollback = document.querySelector('.rollback .range-value');
const inputTotal = document.getElementsByClassName('total-input')[0];
const inputTotalCount = document.getElementsByClassName('total-input')[1];
const inputTotalCountOther = document.getElementsByClassName('total-input')[2];
const inputTotalFullCount = document.getElementsByClassName('total-input')[3];
const inputTotalCountRollback = document.getElementsByClassName('total-input')[4];
let blockScreen = document.querySelectorAll('.screen');


const appData = {
  title: '',
  screens: [],
  screenPrice: 0,
  count: [],
  countScreens: 0,
  adaptive: true,
  servicesNumber: {},
  servicesPercent: {},
  allServicePrices: 0,
  fullPrice: 0,
  rollback: 0,
  check: true,
  servicePercentPrice: 0,
  init: function () {
    appData.addTitle();
    startBtn.addEventListener('click', appData.start);
    btnAdd.addEventListener('click', appData.addScreenBlock);
    inputRollback.addEventListener('input', appData.addRollBack);
  },
  start: function () {
    appData.testNull();

    if (appData.check) {
      appData.addScreens();
      appData.addServices();
      appData.addPrices();
      appData.showResult();
    }
  },
  testNull: function () {
    blockScreen = document.querySelectorAll('.screen');
    appData.check = true;

    blockScreen.forEach((item) => {
      let price = item.querySelector('select');
      let count = item.querySelector('input');

      if (price[price.selectedIndex].textContent === 'Тип экранов' || appData.isNullTrim(count.value) === '' || !appData.isNumber(count.value)) {
        appData.check = false;
      }
    });
  },
  showResult: function () {
    inputTotal.value = appData.screenPrice;
    inputTotalCount.value = appData.countScreens;
    inputTotalCountOther.value = appData.allServicePrices;
    inputTotalFullCount.value = appData.fullPrice;
    inputTotalCountRollback.value = appData.servicePercentPrice;
  },
  addTitle: function () {
    document.title = title.textContent;
  },
  addScreens: function () {
    blockScreen = document.querySelectorAll('.screen');
    appData.screens.length = 0;
    appData.count.length = 0;

    blockScreen.forEach((item, index) => {
      const price = item.querySelector('select');
      const count = item.querySelector('input');
      appData.count.push(+count.value);

      appData.screens.push({ id: index, name: price[price.selectedIndex].textContent, price: price.value * count.value });
    });
  },
  addScreenBlock: function () {
    blockScreen = document.querySelectorAll('.screen');
    const cloneScreenBlock = blockScreen[0].cloneNode(true);
    cloneScreenBlock.querySelector('input').value = '';
    blockScreen[blockScreen.length - 1].after(cloneScreenBlock);
  },
  addServices: function () {
    Object.keys(appData.servicesPercent).forEach(key => delete appData.servicesPercent[key]);

    otherItemsPercent.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });

    Object.keys(appData.servicesNumber).forEach(key => delete appData.servicesNumber[key]);

    otherItemsNumber.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
  },
  addPrices: function () {
    appData.screenPrice = appData.screens.reduce(function (sum, item) {
      return sum + item.price;
    }, 0);

    const sumNumber = Object.values(appData.servicesNumber).reduce(function (sum, item) {
      return sum + item;
    }, 0);

    const sumPercent = Object.values(appData.servicesPercent).reduce(function (sum, item) {
      return sum + (appData.screenPrice * (item / 100));
    }, 0);

    appData.allServicePrices = +sumNumber + sumPercent;
    appData.fullPrice = appData.screenPrice + appData.allServicePrices;
    appData.servicePercentPrice = +Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollback / 100)).toFixed(2));

    appData.countScreens = appData.count.reduce(function (sum, item) {
      return sum + item;
    }, 0);
  },
  addRollBack: function (e) {
    spanRollback.innerText = `${e.target.value}%`;
    appData.rollback = spanRollback.textContent.slice(0, -1);
  },
  isNumber: function (num) {
    num = appData.isNullTrim(num);
    return !isNaN(parseFloat(num)) && isFinite(num);
  },
  isNullTrim: function (arg) {
    if (arg !== null) {
      return arg.trim();
    } else {
      return arg;
    }
  },
};

appData.init();
