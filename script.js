alert('hallo');

// @ts-ignore
let money = +prompt ('Ваш ежемесячный доход?', 200000);
let addExpenses = prompt ('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm ('Есть ли у вас депозит в банке');
let expenses1 = prompt ('Введите обязательную статью расходов');
// @ts-ignore
let amount1 = +prompt ('Во сколько это обойдется?', 2000);
let expenses2 = prompt ('Введите обязательную статью расходов');
// @ts-ignore
let amount2 = +prompt ('Во сколько это обойдется?', 1000);
let income = 'фриланс';
let mission = 5000000;
let budgetMonth = money-amount1-amount2;
let period = 6;
let budgetDay = Math.ceil(budgetMonth/30);

console.log(addExpenses.length);
console.log('Период равен', period, 'месяцев');
console.log('Цель будет достигнута за ' + Math.floor(mission/budgetMonth) + ' месяцев');
console.log('Цель заработать', mission, 'рублей');
console.log(addExpenses.toLowerCase().split(', '));
console.log('Бюджет на месяц: ', budgetMonth);
console.log('Бюджет на день: ', budgetDay);

if (budgetDay > 1200) {
    console.log('У вас высокий уровень дохода');
} else if (600 < budgetDay && budgetDay < 1200) {
    console.log('У вас средний уровень дохода');
} else if (budgetDay < 600) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
} else if (budgetDay < 0) {
    console.log('Что то пошло не так');
};

let showTypeOf = function(data) {
    console.log(data, typeof(data));
};
showTypeOf(deposit);
showTypeOf(money);
showTypeOf(income);

let getStatusIncome = function() {
    if (budgetDay > 1200) {
        return('У вас высокий уровень дохода');
    } else if (600 < budgetDay && budgetDay < 1200) {
        return('У вас средний уровень дохода');
    } else if (budgetDay < 600) {
        return('К сожалению у вас уровень дохода ниже среднего');
    } else if (budgetDay < 0) {
        return('Что то пошло не так');
    };
};
console.log(getStatusIncome());

let getExpensesMonth = function(amount1, amount2) {
    return amount1 + amount2;
};
getExpensesMonth(amount1, amount2);
console.log('Бюджет на месяц ', getExpensesMonth);          //  сумма всех расходов

let getAccumulatedMonth = function(budgetMonth) {
    return budgetMonth;
};
getAccumulatedMonth(budgetMonth);                           // доходы - расходы

let accumulatedMonth = getAccumulatedMonth(budgetMonth);    // присвоили результат сверху (НАКОПЛЕНИЯ)

let getTargetMonth = function(accumulatedMonth, mission) {
    return mission/accumulatedMonth;
};
getTargetMonth(accumulatedMonth, mission);                  // за какой период будет достигнута цель

let budgetDay = function(accumulatedMonth) {
    accumulatedMonth/30
};
budgetDay(accumulatedMonth);