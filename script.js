// @ts-ignore
let money = +prompt ('Ваш ежемесячный доход?', 200000);
let addExpenses = prompt ('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm ('Есть ли у вас депозит в банке');
let expenses1 = prompt ('Введите обязательную статью расходов', 'Бензин');
// @ts-ignore
let amount1 = +prompt ('Во сколько это обойдется?', 2000);
let expenses2 = prompt ('Введите обязательную статью расходов', 'Еда');
// @ts-ignore
let amount2 = +prompt ('Во сколько это обойдется?', 1000);
let income = 'фриланс';
let mission = 5000000;
let period = 6;
let budgetDay = 0;

let getExpensesMonth = function(arg1, arg2) {
    return +arg1 + +arg2;
};

console.log('Бюджет на месяц ', getExpensesMonth(amount1, amount2));

let getAccumulatedMonth = function() {
    return money - getExpensesMonth(amount1, amount2);
};

let accumulatedMonth = getAccumulatedMonth();
budgetDay = Math.ceil(accumulatedMonth / 30);

let getTargetMonth = function() {
    return Math.floor(mission/accumulatedMonth);
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

console.log(getStatusIncome());



