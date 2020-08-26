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
    incomeItems = document.querySelectorAll('.income-items');
    
    const isNumber = function(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    };

    // let amount = 0,
    //     expenses = [];
        

    let appData = {
        budget: 0,
        budgetPeriod: 0,
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
            appData.budget = +salaryAmount.value;
        
            appData.getExpenses();
            appData.getIncome();
            appData.getExpensesMonth();
            appData.getAddExpenses();
            appData.getAddIncome();
            appData.getBudget();

            appData.showResult();

            periodSelect.addEventListener('input', function() {
                incomePeriodValue.value = appData.calcPeriod();
            });
        },
        showResult: function() {
            budgetMonthValue.value = appData.budgetMonth;
            budgetDayValue.value = appData.budgetDay;
            expensesMonthValue.value = appData.expensesMonth;
            additionalExpensesValue.value = appData.addExpenses.join(', ');
            additionalIncomeValue.value = appData.addIncome.join(', ');
            targetMonthValue.value = appData.getTargetMonth();
            incomePeriodValue.value = appData.budgetPeriod;
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
                    appData.expenses[itemExpenses] = +cashExpenses;
                }
            });
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
                    appData.income[itemIncome] = +cashIncome;
                }
                for (let key in appData.income) {
                appData.incomeMonth += +appData.income[key];
            }
            });
        },
        getAddExpenses: function() {
            let addExpenses = additionalExpensesItem.value.split(',');
            addExpenses.forEach(function(item) {
                item = item.trim();
                if (item !== '') {
                    appData.addExpenses.push(item);
                }
            });
        },
        getAddIncome: function() {
            additionalIncomeItem.forEach(function(item) {
                let itemValue = item.value.trim();
                if (itemValue !== '') {
                    appData.addIncome.push(itemValue);
                }
            });
        },
        getExpensesMonth: function() {
        for(let key in appData.expenses) {
            appData.expensesMonth += appData.expenses[key];
        }
            return appData.expensesMonth;
        },
        getBudget: function() {
            appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
            appData.budgetDay =  Math.ceil(appData.budgetMonth / 30);
        },
        getTargetMonth: function() {
            return Math.ceil(targetAmount.value / appData.budgetMonth);
        },
        getStatusIncome: function() {
            if (appData.budgetDay > 1200) {
                return('У вас высокий уровень дохода');
            } else if (600 < appData.budgetDay && appData.budgetDay < 1200) {
                return('У вас средний уровень дохода');
            } else if (appData.budgetDay < 600 && appData.budgetDay > 0) {
                return('К сожалению у вас уровень дохода ниже среднего');
            } else if (appData.budgetDay < 0) {
                return('Что то пошло не так');
            }
        },
        resultOutput: function() {
            if (appData.getTargetMonth() > 0) {
                console.log('Цель будет достигнута за ' + appData.getTargetMonth() + ' месяцев');
            } else if (appData.getTargetMonth() < 0) {
                console.log('Цель не будет достигнута');
            }
            return appData.getTargetMonth;
        },
        getInfoDeposit: function() {
            appData.deposit = confirm('Есть ли у вас депозит в банке');
            if(appData.deposit) {
                do {
                    appData.percentDeposit = prompt('Какой годовой процент?', 10);
                }
                while (!isNumber(appData.percentDeposit));
                do {
                    appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
                }
                while (!isNumber(appData.moneyDeposit));
            }
        },
        calcPeriod: function() {
            appData.budgetPeriod = appData.budgetMonth * periodSelect.value;
        }
        
    };
// appData.start();

appData.calcPeriodNum = appData.calcPeriod();
// if(!isNumber(appData.calcPeriodNum)){
// }    

periodSelect.addEventListener('input', function() {
    periodAmount.textContent = periodSelect.value;
});
start.addEventListener('click', appData.start);
salaryAmount.addEventListener('input', function() {
    if(salaryAmount.value !== '' && salaryAmount.value !== String) {
        start.removeAttribute('disabled');
    } else {
        start.setAttribute('disabled', '');
    }
});

expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);

    // appData.getTargetMonth();
    // appData.getStatusIncome();
    // appData.resultOutput();
    // appData.getInfoDeposit();

// console.log('Расходы на месяц ', appData.expensesMonth);
// console.log(appData.getStatusIncome());
// console.log(appData.addExpenses.length);
// console.log('Период равен', appData.period, 'месяцев');
// console.log('Цель заработать', appData.mission, 'рублей');
// console.log('Бюджет на месяц: ', appData.budgetMonth);
// console.log('Бюджет на день: ', appData.budgetDay);
// console.log('addExpenses: ', appData.addExpenses);
// console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSavedMoney());
// for(let keys in appData) {
//     console.log('Свойство: ' + keys + ' значение: ' + appData[keys]);
// }