'use strict';

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    amount = 0,
    expenses = [];

let start = function() {
    do{
        money = prompt('Ваш ежемесячный доход?', 50000);
    }
    while (!isNumber(money));
};
start();

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
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
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
            for (let word of appData.addExpenses) {
                word = word.trim();
                word = word[0].toUpperCase() + word.slice(1);
                
            }
                // function arrEdit (addExpenses) {
                //     for (let i = 0; i < addExpenses.length; i++) {
                //         addExpenses[i] = addExpenses[i].trim();
                //         addExpenses[i] = addExpenses[i].charAt(0).toUpperCase() + addExpenses[i].slice(1).toLowerCase();
                //     }
                //     return addExpenses;
                // }
                console.log(appData.addExpenses);
                appData.deposit = confirm('Есть ли у вас депозит в банке');
  
        let question;
        for (let i = 0; i < 2; i++) {
            do {
                expenses[i] = prompt('Введите обязательную статью расходов', 'бензин');
            }
            while (itemIncome === null || itemIncome === '' || +itemIncome);

            do {    
                question = prompt('Во сколько это обойдется?', 3000);
            }
            while (!isNumber(question));
            appData.expenses[expenses] = +question;
        }
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

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();
appData.resultOutput();
console.log('Расходы на месяц ', appData.expensesMonth);
console.log(appData.getStatusIncome());
console.log(appData.addExpenses.length);
console.log('Период равен', appData.period, 'месяцев');
console.log('Цель заработать', appData.mission, 'рублей');
console.log('Бюджет на месяц: ', appData.budgetMonth);
console.log('Бюджет на день: ', appData.budgetDay);

for(let keys in appData) {
    console.log('Свойство: ' + keys + ' значение: ' + appData[keys]);
}

console.log('addExpenses: ', appData.addExpenses);
appData.getInfoDeposit();
console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSavedMoney());