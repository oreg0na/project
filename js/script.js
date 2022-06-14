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
const cmsOpen = document.getElementById('cms-open');
const hiddenCmsVariants = document.querySelector('.hidden-cms-variants');
const selectCms = document.getElementById('cms-select');
const cmsOtherInput = document.getElementById('cms-other-input');
const cmsBlockInput = hiddenCmsVariants.querySelector('.main-controls__input');
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
  serviceCms: 0,
  allServicePrices: 0,
  fullPrice: 0,
  rollback: 0,
  check: true,
  servicePercentPrice: 0,
  init: function () {
    this.addTitle();
    startBtn.addEventListener('click', this.start.bind(this));
    btnAdd.addEventListener('click', this.addScreenBlock.bind(this));
    inputRollback.addEventListener('input', this.addRollBack.bind(this));
    btnReset.addEventListener('click', this.reset.bind(this));
    cmsOpen.addEventListener('click', this.cmsCheck.bind(this));
    selectCms.addEventListener('change', this.selectedCms.bind(this));
  },
  start: function (e) {
    this.testNull();

    if (this.check) {
      this.addScreens();
      this.addServices();
      this.addPrices();
      this.showResult(e);
      this.disabled(e);
    }
  },
  reset: function (e) {
    this.disabled(e);
    this.addRollBack(e);
    this.showResult(e);
    this.cmsCheck(e);
  },
  disabled: function (e) {
    if (e.target === startBtn) {
      startBtn.style.display = 'none';
      btnReset.style.display = 'block';
      btnAdd.disabled = true;

      inputRollback.disabled = true;
      cmsOpen.disabled = true;
      selectCms.disabled = true;
      cmsOtherInput.disabled = true;

      blockScreen.forEach(item => {
        const select = item.querySelector('select');
        const input = item.querySelector('input');

        select.disabled = true;
        input.disabled = true;
      });

      otherItemsPercent.forEach((item) => {
        const check = item.querySelector('input[type=checkbox]');

        check.disabled = true;
      });

      otherItemsNumber.forEach((item) => {
        const check = item.querySelector('input[type=checkbox]');

        check.disabled = true;
      });
    }
    if (e.target === btnReset) {
      startBtn.style.display = 'inline-block';
      btnReset.style.display = 'none';
      btnAdd.disabled = false;

      this.screens.length = 0;
      this.count.length = 0;
      this.servicesNumber.length = 0;
      this.servicesPercent.length = 0;

      blockScreen.forEach(item => {
        const select = item.querySelector('select');
        const input = item.querySelector('input');

        if (blockScreen[0] === item) {
          select.disabled = false;
          input.disabled = false;
          select.selectedIndex = 0;
          input.value = "";
        } else {
          item.remove();
        }
      });

      otherItemsPercent.forEach((item) => {
        const check = item.querySelector('input[type=checkbox]');

        check.disabled = false;
        check.checked = false;
      });

      otherItemsNumber.forEach((item) => {
        const check = item.querySelector('input[type=checkbox]');

        check.disabled = false;
        check.checked = false;
      });
    }
  },
  testNull: function () {
    blockScreen = document.querySelectorAll('.screen');
    this.check = true;

    blockScreen.forEach((item) => {
      const price = item.querySelector('select');
      const count = item.querySelector('input');

      if (price[price.selectedIndex].textContent === 'Тип экранов' || this.isNullTrim(count.value) === '' || !this.isNumber(count.value)) {
        this.check = false;
      }
    });

    if (cmsOpen.checked) {
      if (!selectCms.selectedIndex) {
        this.check = false;
      }
      if (selectCms.selectedIndex === 2 && (this.isNullTrim(cmsOtherInput.value) === '' || !this.isNumber(cmsOtherInput.value))) {
        this.check = false;
      }
    }
  },
  showResult: function (e) {
    if (e.target === startBtn) {
      inputTotal.value = this.screenPrice;
      inputTotalCount.value = this.countScreens;
      inputTotalCountOther.value = this.allServicePrices;
      inputTotalFullCount.value = this.fullPrice;
      inputTotalCountRollback.value = this.servicePercentPrice;
    }
    if (e.target === btnReset) {
      inputTotal.value = 0;
      inputTotalCount.value = 0;
      inputTotalCountOther.value = 0;
      inputTotalFullCount.value = 0;
      inputTotalCountRollback.value = 0;
    }

  },
  addTitle: function () {
    document.title = title.textContent;
  },
  addScreens: function () {
    blockScreen = document.querySelectorAll('.screen');

    blockScreen.forEach((item, index) => {
      const price = item.querySelector('select');
      const count = item.querySelector('input');
      this.count.push(+count.value);

      this.screens.push({ id: index, name: price[price.selectedIndex].textContent, price: price.value * count.value });
    });
  },
  addScreenBlock: function () {
    blockScreen = document.querySelectorAll('.screen');
    const cloneScreenBlock = blockScreen[0].cloneNode(true);
    cloneScreenBlock.querySelector('input').value = '';
    blockScreen[blockScreen.length - 1].after(cloneScreenBlock);
  },
  addServices: function () {

    Object.keys(this.servicesPercent).forEach(key => delete this.servicesPercent[key]);

    otherItemsPercent.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        this.servicesPercent[label.textContent] = +input.value;
      }
    });

    Object.keys(this.servicesNumber).forEach(key => delete this.servicesNumber[key]);

    otherItemsNumber.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value;
      }
    });
  },
  addPrices: function () {
    this.screenPrice = this.screens.reduce((sum, item) => {
      return sum + item.price;
    }, 0);

    const sumNumber = Object.values(this.servicesNumber).reduce((sum, item) => {
      return sum + item;
    }, 0);

    const sumPercent = Object.values(this.servicesPercent).reduce((sum, item) => {
      return sum + (this.screenPrice * (item / 100));
    }, 0);

    this.allServicePrices = +sumNumber + sumPercent;
    this.fullPrice = this.screenPrice + this.allServicePrices;
    this.allServicePrices += this.fullPrice * this.serviceCms;
    this.fullPrice += this.fullPrice * this.serviceCms;
    this.servicePercentPrice = +Math.ceil(this.fullPrice - (this.fullPrice * (this.rollback / 100)).toFixed(2));

    this.countScreens = this.count.reduce((sum, item) => {
      return sum + item;
    }, 0);
  },
  addRollBack: function (e) {
    if (e.target === inputRollback) {
      spanRollback.innerText = `${e.target.value}%`;
      this.rollback = spanRollback.textContent.slice(0, -1);
    }
    if (e.target === btnReset) {
      inputRollback.disabled = false;
      spanRollback.innerText = '0%';
      inputRollback.value = 0;
      this.rollback = 0;
    }
  },
  cmsCheck: function (e) {
    if (e.target === cmsOpen) {
      if (cmsOpen.checked) {
        hiddenCmsVariants.style.display = 'flex';
      } else {
        hiddenCmsVariants.style.display = 'none';
      }
    }
    if (e.target === btnReset) {
      cmsOpen.disabled = false;
      cmsOpen.checked = false;
      selectCms.disabled = false;
      selectCms.selectedIndex = 0;
      cmsOtherInput.disabled = false;
      cmsOtherInput.value = "";
      cmsBlockInput.style.display = 'none';
      hiddenCmsVariants.style.display = 'none';
    }
  },
  selectedCms: function () {
    switch (selectCms.options.selectedIndex) {
      case 1:
        cmsOtherInput.value = "";
        cmsBlockInput.style.display = 'none';
        this.serviceCms = selectCms[selectCms.options.selectedIndex].value / 100;
        break;
      case 2:
        this.serviceCms = 0;
        cmsBlockInput.style.display = 'flex';
        cmsOtherInput.addEventListener('input', () => {
          this.serviceCms = +cmsOtherInput.value / 100;
        });
        break;
      default:
        cmsOtherInput.value = "";
        cmsBlockInput.style.display = 'none';
        this.serviceCms = 0;
        break;
    }
  },
  isNumber: function (num) {
    num = this.isNullTrim(num);
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
