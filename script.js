'use strict';

let start = document.getElementById('start');
let btnPlus = document.getElementsByTagName('button');
let incomePlus = btnPlus[0];
let expensesPlus = btnPlus[1];
let depositCheck = document.querySelector('#deposit-check');
let additionalIncomeItem = document.querySelectorAll('.additional_income-item');
let budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
let budgetMonthValue = document.querySelector('.budget_month-value')[0];
let expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
let accumulatedMonthValue =document.getElementsByClassName('accumulated_month-value')[0];
let additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
let additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
let incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
let targetMonthValue = document.getElementsByClassName('target_month-value')[0];
let salaryAmount = document.querySelector('.salary-amount');
let incomeTitle = document.querySelector('.income-title');
let incomeAmount = document.querySelector('.income-amount');
let additionalIncomeItem1 = document.querySelector('.additional_income-item')[0];
let additionalIncomeItem2 = document.querySelector('.additional_income-item')[1];
let expensesTitle = document.querySelector('.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
let depositAmount = document.querySelector('.deposit-amount');
let depositPercent = document.querySelector('.deposit-percent');
let targetAmount = document.querySelector('.target-amount');
let periodSelect = document.querySelector('.period-select');

    let isNumber = function(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    };

    let amount = 0,
        expenses = [];
        

    let appData = {
        income: {},
        addIncome: [],
        expenses: {},
        addExpenses: [],
        deposit: false,
        percentDeposit: 0,
        moneyDeposit: 0,
        mission: 500000,
        period: 3,
        budget: 0,
        budgetDay: 0,
        budgetMonth: 0,
        expensesMonth: 0,
        start: function() {
            // do{
            //     money = prompt('Ваш ежемесячный доход?', 50000);
            // }
            // while (!isNumber(money));
            if(salaryAmount.value === '') {
                alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
                return;
            }
            appData.budget = salaryAmount.value;
            console.log('salaryAmount.value: ', salaryAmount.value);

            appData.getExpenses();
            appData.asking();
            appData.getExpensesMonth();
            appData.getBudget();
            // appData.getTargetMonth();
            // appData.getStatusIncome();
            // appData.resultOutput();
            // appData.getInfoDeposit();
            appData.showResult();
        },
        showResult: function() {
            budgetMonthValue.value = appData.budgetMonth;
            budgetDayValue.value = appData.budgetDay;
            expensesMonthValue.value = appData.expensesMonth;
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
                let itemExpenses =item.querySelector('.expenses-title').value;
                let cashExpenses = item.querySelector('.expenses-amount').value;
                if(itemExpenses !== '' && cashExpenses !== '') {
                    appData.expenses[itemExpenses] = +cashExpenses;
                }
            });
        },
        asking: function() {

            let itemIncome,
                cashIncome;
            if(confirm('Есть ли у вас дополнительный источник заработка?')) {
                do {
                    itemIncome = prompt('Какой у вас дополнительный заработок?', 'Фриланс');
                }
                while (itemIncome === null || itemIncome === '' || +itemIncome);
                do {
                    cashIncome = prompt('Сколько вы на этом зарабатываете?', 10000);
                }
                while (!isNumber(cashIncome));
                appData.income[itemIncome] = cashIncome;
            }
            let addExpenses;
                do {
                    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'кино, театр');
                }
                while (addExpenses === null ||  addExpenses === "" || addExpenses.indexOf(",") === "-1" || addExpenses.indexOf(",") === "0");
                
                    appData.addExpenses = addExpenses.toLowerCase().split(', ');
                    let newArr = [];
                    for (let word of appData.addExpenses) {
                        word = word.trim();
                        word = word[0].toUpperCase() + word.slice(1);
                        newArr.push(word);
                        appData.addExpenses = newArr;
                    }
                    // console.log(appData.addExpenses);


            // function arrEdit (arr) {
            //     for (let i = 0; i < addExpenses.length; i++) { 
            //         addExpenses[i] = addExpenses[i].trim();
            //         addExpenses[i] = addExpenses[i].charAt(0).toUpperCase() + addExpenses[i].slice(1).toLowerCase();
            //     }
            //     return addExpenses;
            // }
            //         console.log(appData.addExpenses);


                    appData.deposit = confirm('Есть ли у вас депозит в банке');
    
            // let question;
            // for (let i = 0; i < 2; i++) {
            //     do {
            //         expenses[i] = prompt('Введите обязательную статью расходов', 'бензин');
            //     }
            //     while (itemIncome === null || itemIncome === '' || +itemIncome);

            //     do {    
            //         question = prompt('Во сколько это обойдется?', 3000);
            //     }
            //     while (!isNumber(question));
            //     appData.expenses[expenses] = +question;
            // }
            
        },

        getExpensesMonth: function() {
        for(let key in appData.expenses) {
            appData.expensesMonth += appData.expenses[key];
        }
            return appData.expensesMonth;
        },

        getBudget: function() {
            appData.budgetMonth = appData.budget - appData.expensesMonth;
            appData.budgetDay =  Math.ceil(appData.budgetMonth / 30);
        },

        getTargetMonth: function() {
            return Math.floor(appData.mission / appData.budgetMonth);
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

        calcSavedMoney: function() {
            return appData.budgetMonth * appData.period;
        }
    };

    start.addEventListener('click', appData.start);

    expensesPlus.addEventListener('click', appData.addExpensesBlock); 

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


