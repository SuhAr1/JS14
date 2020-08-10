alert('hallo');

let money = +prompt ('Ваш ежемесячный доход?');
let addExpenses = prompt ('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm ('Есть ли у вас депозит в банке');
let expenses1 = prompt ('Введите обязательную статью расходов');
let amount1 = +prompt ('Во сколько это обойдется?');
let expenses2 = prompt ('Введите обязательную статью расходов');
let amount2 = +prompt ('Во сколько это обойдется?');
let income = 'фриланс';
let mission = 5000000;
let budgetMonth = money-amount1-amount2;
let period = 6;
let budgetDay = Math.ceil(budgetMonth/30);

console.log(typeof deposit);
console.log(typeof money);
console.log(typeof income);
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
}
