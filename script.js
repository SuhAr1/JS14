'use strict';

let start = document.getElementById('start'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    budgetMonthValue = document.querySelector('.budget_month-value'),
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    accumulatedMonthValue =document.getElementsByClassName('accumulated_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    additionalIncomeItem1 = document.querySelector('.additional_income-item')[0],
    additionalIncomeItem2 = document.querySelector('.additional_income-item')[1],
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    depositBank = document.querySelector('.deposit-bank'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    incomeItems = document.querySelectorAll('.income-items'),
    cancel = document.getElementById('cancel'),
    checkBox = document.querySelector('input[type="checkbox"]'),
    inputs = document.querySelectorAll('.data input[type = "text"]'),
    resultInputs = document.querySelectorAll('.result input[type = "text"]');

    const isNumber = function(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    };

class AppData {
    constructor() {
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.expensesMonth = 0;
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    }
    start() {
        salaryAmount.value = salaryAmount.value.trim();
        if(!isNumber(salaryAmount.value)) {
            alert('Введите сумму месячного дохода');
            return;
        }
        this.budget = +salaryAmount.value;
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getInfoDeposit();
        this.getBudget();
        this.calcPeriod();
        this.checkNumber(depositAmount);
        this.checkNumberPercent(depositPercent);
        // this.getStatusIncome();

        // this.getTargetMonth();
        // this.resultOutput();

        this.showResult();

        
        inputs.forEach((item) => {
            item.disabled = true;

            document.querySelectorAll('.btn_plus').forEach((item) => {
                item.disabled = true;
            });
            start.style.display = 'none';
            cancel.style.display = 'block';
        });
    }
    reset() {
        const appData2 = new AppData();
        inputs.forEach((item) => {
            item.disabled = false;

            document.querySelectorAll('.btn_plus').forEach(function(item) {
                item.disabled = false;
            });
            start.style.display = 'block';
            cancel.style.display = 'none';
        });
        checkBox.checked = false;
        periodSelect.value = '0';
        periodAmount.textContent = 1;
        inputs.forEach((item) => {
            item.value = '';
        });
        for (let i = 1; i < incomeItems.length; i++) {
            incomeItems[i].parentNode.removeChild(incomeItems[i]);
        }
        resultInputs.forEach((item) => {
            item.value = '';
        });
        for (let i = 1; i < expensesItems.length; i++) {
            expensesItems[i].parentNode.removeChild(expensesItems[i]);
        }
        if(salaryAmount.value !== '') {
            start.removeAttribute('disabled');
        } else {
            start.setAttribute('disabled', '');
        }
        incomePlus.style.display = 'block';
        expensesPlus.style.display = 'block';

        depositBank.style.display = 'none';
        depositAmount.style.display = 'none';
        depositPercent.style.display = 'none';
        depositBank.value = "";
        depositAmount.value = '';
        depositPercent.value = '';

    
        Object.assign(this, appData2);
    }
    showResult() {
        const _this = this;
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener('input', function() {
            incomePeriodValue.value = _this.calcPeriod();
        });
    }
    addExpensesBlock() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    }
    getExpenses() {
        expensesItems.forEach((item) => {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== '') {
                this.expenses[itemExpenses] = +cashExpenses;
            }
        }, this);
    }
    addIncomeBlock() {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    }
    getIncome() {
        incomeItems.forEach((item) => {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== '') {
                this.income[itemIncome] = +cashIncome;
            }
            for (let key in this.income) {
                this.incomeMonth += +this.income[key];
        }
        }, this);
    }
    getAddExpenses() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        }, this);
    }
    getAddIncome() {
        additionalIncomeItem.forEach((item) => {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        }, this);
    }
    getExpensesMonth() {
    for(let key in this.expenses) {
        this.expensesMonth += this.expenses[key];
    }
        return this.expensesMonth;
    }
    getBudget() {
        const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
        if(this.budgetMonth >= 0) {
            this.budgetDay = Math.ceil(this.budgetMonth / 30);
        } else {
            alert('Ошибка! Бюджет на месяц отрицательный!');
            return;
        }
    }
    getTargetMonth() {
        return Math.ceil(targetAmount.value / this.budgetMonth);
    }
    getStatusIncome() {
        if (this.budgetDay > 1200) {
            return(`У вас высокий уровень дохода`);
        } else if (600 < this.budgetDay && this.budgetDay < 1200) {
            return(`У вас средний уровень дохода`);
        } else if (this.budgetDay < 600 && this.budgetDay > 0) {
            return(`К сожалению у вас уровень дохода ниже среднего`);
        } else if (this.budgetDay < 0) {
            return(`Что то пошло не так`);
        }
    }
    resultOutput() {
        if (this.getTargetMonth() > 0) {
            console.log(`Цель будет достигнута за  ${this.getTargetMonth()}  месяцев`);
        } else if (this.getTargetMonth() < 0) {
            console.log(`Цель не будет достигнута`);
        }
        return this.getTargetMonth;
    }
    getInfoDeposit() {
        if(this.deposit) {
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    }
    calcPeriod() {
        return this.budgetMonth * periodSelect.value;
    }
    changePercent(val) {
        const valueSelect = val;
        if(valueSelect === 'other') {
            depositPercent.style.display = 'inline-block';
            depositPercent.value = '';
        } else {
            depositPercent.value = valueSelect;
            depositPercent.style.display = 'none';
        }

    }
    depositHandler() {
        if(depositCheck.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            start.setAttribute('disabled', '');
            depositBank.addEventListener('change', () => {
                this.changePercent(depositBank.value);
                this.checkDeposit();
            });

        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositPercent.style.display = 'none';
            depositBank.value = '';
            depositAmount.value = '';
            depositPercent.value = '';
            this.deposit = false;
            depositBank.removeEventListener('change', () => {
                this.changePercent(depositBank.value);
                this.checkDeposit();
            });
            start.removeAttribute('disabled');
        }
    }
    checkDeposit() {
        if(depositAmount.value !== '' && depositPercent.value !== '' && salaryAmount.value !== '') {
            start.removeAttribute('disabled');
        } else {
            start.setAttribute('disabled', '');
        }
    }
    eventListeners() {
        salaryAmount.addEventListener('input', () => {
        if(salaryAmount.value !== '') {
            start.removeAttribute('disabled');
        } else {
            start.setAttribute('disabled', '');
        }
        });

        checkBox.addEventListener('change', () => {

        });

        periodSelect.addEventListener('input', () => {
            periodAmount.textContent = periodSelect.value;
        });

        start.addEventListener('click', this.start.bind(this));
        cancel.addEventListener('click', this.reset.bind(this));

        expensesPlus.addEventListener('click', this.addExpensesBlock.bind(this));
        incomePlus.addEventListener('click', this.addIncomeBlock.bind(this));

        depositCheck.addEventListener('change', this.depositHandler.bind(this));
        depositPercent.addEventListener('input', this.checkDeposit.bind(this));
        depositAmount.addEventListener('input', this.checkDeposit.bind(this));
    }
    checkNumber (x) {
        x.addEventListener('input', () => {
            x.value = x.value.replace(/[^0-9]/,'');
            return x.value;
        }); 
    }
    checkNumberPercent (x) {
        x.addEventListener('input', () => {
            x.value = x.value.replace(/[^0-9]/,'');
            if(x.value > 99 || x.value < 1) {
                alert("Введите корректный процент");
                x.value = '';
            }
        });
    }
}

const appData = new AppData();

appData.eventListeners();
