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
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    incomeItems = document.querySelectorAll('.income-items'),
    cancel = document.getElementById('cancel'),
    // checkBox = document.querySelector('#deposit-check input[type=checkbox]'),
    inputs = document.querySelectorAll('.data input[type = text]'),
    resultInputs = document.querySelectorAll('.result input[type = text]');
    // console.log('inputs: ', inputs);
    
    const isNumber = function(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    };

    let appData = {
        budget: 0,
        budgetDay: 0,
        budgetMonth: 0,
        income: {},
        incomeMonth: 0,
        addIncome: [],
        expenses: {},
        expensesMonth: 0,
        addExpenses: [],
        deposit: false,
        percentDeposit: 0,
        moneyDeposit: 0,
        start: function() {
            this.budget = +salaryAmount.value;
        
            this.getExpenses();
            this.getIncome();
            this.getExpensesMonth();
            this.getAddExpenses();
            this.getAddIncome();
            this.calcPeriod();

            this.showResult();

            periodSelect.addEventListener('input', function() {
                incomePeriodValue.value = appData.calcPeriod();
            });
            // inputs.forEach(function(item) {
            //     item.disabled = true;
        
            //     document.querySelectorAll('.btn_plus').forEach(function(item) {
            //         item.disabled = true;
            //     });
            //     // checkBox.checked = true;
            //     start.style.display = 'none';
            //     cancel.style.display = 'block';
            // });
        },
        // reset: function() {
        //     inputs.forEach(function(item) {
        //         item.disabled = false;
        
        //         document.querySelectorAll('.btn_plus').forEach(function(item) {
        //             item.disabled = false;
        //             item.value = null;
        //         });
        //         start.style.display = 'block';
        //         cancel.style.display = 'none';
        //     });
        //     // checkBox.checked = false;
        //     periodSelect.value = 1;
        // },
        showResult: function() {
            budgetMonthValue.value = this.budgetMonth;
            budgetDayValue.value = this.budgetDay;
            expensesMonthValue.value = this.expensesMonth;
            additionalExpensesValue.value = this.addExpenses.join(', ');
            additionalIncomeValue.value = this.addIncome.join(', ');
            targetMonthValue.value = this.getTargetMonth();
            incomePeriodValue.value = this.calcPeriod();
            console.log(this);
        },
        addExpensesBlock: function() {
            let cloneExpensesItem = expensesItems[0].cloneNode(true);
            expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
            expensesItems = document.querySelectorAll('.expenses-items');
            if(expensesItems.length === 3) {
                expensesPlus.style.display = 'none';
            }
        },
        getExpenses: function() {
            expensesItems.forEach(function(item) {
                let itemExpenses = item.querySelector('.expenses-title').value;
                let cashExpenses = item.querySelector('.expenses-amount').value;
                if(itemExpenses !== '' && cashExpenses !== '') {
                    this.expenses[itemExpenses] = +cashExpenses;
                }
            }, this);
        },
        addIncomeBlock: function() {
            let cloneIncomeItem = incomeItems[0].cloneNode(true);
            incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
            incomeItems = document.querySelectorAll('.income-items');
            if(incomeItems.length === 3) {
                incomePlus.style.display = 'none';
            }
        },
        getIncome: function() {
            incomeItems.forEach(function(item) {
                let itemIncome = item.querySelector('.income-title').value;
                let cashIncome = item.querySelector('.income-amount').value;
                if(itemIncome !== '' && cashIncome !== '') {
                    this.income[itemIncome] = +cashIncome;
                }
                for (let key in this.income) {
                    this.incomeMonth += +this.income[key];
            }
            }, this);
        },
        getAddExpenses: function() {
            let addExpenses = additionalExpensesItem.value.split(',');
            addExpenses.forEach(function(item) {
                item = item.trim();
                if (item !== '') {
                    this.addExpenses.push(item);
                }
            });
        },
        getAddIncome: function() {
            additionalIncomeItem.forEach(function(item) {
                let itemValue = item.value.trim();
                if (itemValue !== '') {
                    this.addIncome.push(itemValue);
                }
            });
        },
        getExpensesMonth: function() {
        for(let key in this.expenses) {
            this.expensesMonth += this.expenses[key];
        }
            return this.expensesMonth;
        },
        getBudget: function() {
            this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
            this.budgetDay =  Math.ceil(this.budgetMonth / 30);
        },
        getTargetMonth: function() {
            return Math.ceil(targetAmount.value / this.budgetMonth);
        },
        getStatusIncome: function() {
            if (this.budgetDay > 1200) {
                return('У вас высокий уровень дохода');
            } else if (600 < this.budgetDay && this.budgetDay < 1200) {
                return('У вас средний уровень дохода');
            } else if (this.budgetDay < 600 && this.budgetDay > 0) {
                return('К сожалению у вас уровень дохода ниже среднего');
            } else if (this.budgetDay < 0) {
                return('Что то пошло не так');
            }
        },
        resultOutput: function() {
            if (this.getTargetMonth() > 0) {
                console.log('Цель будет достигнута за ' + this.getTargetMonth() + ' месяцев');
            } else if (this.getTargetMonth() < 0) {
                console.log('Цель не будет достигнута');
            }
            return this.getTargetMonth;
        },
        getInfoDeposit: function() {
            this.deposit = confirm('Есть ли у вас депозит в банке');
            if(this.deposit) {
                do {
                    this.percentDeposit = prompt('Какой годовой процент?', 10);
                }
                while (!isNumber(this.percentDeposit));
                do {
                    this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
                }
                while (!isNumber(this.moneyDeposit));
            }
        },
        calcPeriod: function() {
            return this.budgetMonth * periodSelect.value;
        }
    };

// appData.calcPeriodNum = appData.calcPeriod();

salaryAmount.addEventListener('input', function() {
    if(salaryAmount.value !== '') {
        start.removeAttribute('disabled');
    } else {
        start.setAttribute('disabled', '');
    }
});
periodSelect.addEventListener('input', function() {
    periodAmount.textContent = periodSelect.value;
});

start.addEventListener('click', appData.start.bind(appData));
cancel.addEventListener('click', appData.reset);

expensesPlus.addEventListener('click', appData.addExpensesBlock.bind(appData));
incomePlus.addEventListener('click', appData.addIncomeBlock.bind(appData));
    // appData.getTargetMonth();
    // appData.getStatusIncome();
    // appData.resultOutput();
    // appData.getInfoDeposit();