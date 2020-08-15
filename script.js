'use strict';

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    addExpenses = prompt ('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm ('Есть ли у вас депозит в банке'),
    income = 'фриланс',
    mission = 5000000,
    period = 6,
    budgetDay = 0,
    amount = 0,
    expenses1, expenses2;

let start = function() {
    money = prompt ('Ваш ежемесячный доход?');

    while (!isNumber(money)) {
        money = prompt ('Ваш ежемесячный доход?');
    }
};
start();

let getExpensesMonth = function() {
    let sum = 0;

    for (let i = 0; i < 2; i++) {

        if (i === 0) {
            expenses1 = prompt ('Введите обязательную статью расходов', 'Бензин');
        } else if (i === 1) {
            expenses2 = prompt ('Введите обязательную статью расходов', 'Еда');
        }

        sum += +prompt('Во сколько это обойдется?');
    }
    console.log(expenses1, expenses2);
    return sum;
};

let expensesAmount = getExpensesMonth();

console.log('Расходы на месяц ', + expensesAmount);

let getAccumulatedMonth = function() {
    return money - expensesAmount;
};

let accumulatedMonth = getAccumulatedMonth();
budgetDay = Math.ceil(accumulatedMonth / 30);

let getTargetMonth = function() {
    return Math.floor(mission / accumulatedMonth);
};

let getStatusIncome = function() {
    if (budgetDay > 1200) {
        return('У вас высокий уровень дохода');
    } else if (600 < budgetDay && budgetDay < 1200) {
        return('У вас средний уровень дохода');
    } else if (budgetDay < 600 && budgetDay > 0) {
        return('К сожалению у вас уровень дохода ниже среднего');
    } else if (budgetDay < 0) {
        return('Что то пошло не так');
    };
};

console.log(addExpenses.length);
console.log('Период равен', period, 'месяцев');
console.log('Цель заработать', mission, 'рублей');
console.log('Цель будет достигнута за ' + getTargetMonth() + ' месяцев');
console.log(addExpenses.toLowerCase().split(', '));
console.log('Бюджет на месяц: ', accumulatedMonth);
console.log('Бюджет на день: ', budgetDay);

let showTypeOf = function(data) {
    console.log(data, typeof(data));
};
showTypeOf(deposit);
showTypeOf(money);
showTypeOf(income);

