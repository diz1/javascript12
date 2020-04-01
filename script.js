/*
1) Переписать функцию start циклом do while

2) Добавить проверку что введённые данные являются числом, которые мы получаем на вопрос 'Во сколько это обойдется?’
 в функции  getExpensesMonth

3) Если getTargetMonth возвращает нам отрицательное значение, то вместо “Цель будет достигнута” необходимо выводить
 “Цель не будет достигнута”

4) Проверить, чтобы все работало и не было ошибок в консоли

5) Добавить папку с уроком в свой репозиторий на GitHub
*/
let isNumber = n => {
	return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
	income = 'премия',
	addExperienses = 'интернет, проезд, сигареты',
	deposit = true,
	mission = 1000000,
	period = 12;

let start = () => {
	do {
		money = prompt('Ваш месячный доход?');
	} while (!isNumber(money));
};

start();

const showTypeOf = arg => {
	return typeof(arg);
};

console.log('typeof money: ', showTypeOf(money));
console.log('typeof income: ', showTypeOf(income));
console.log('typeof deposit: ', showTypeOf(deposit));
console.log('addExperienses.length: ', addExperienses.length);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей`);

addExperienses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
const validateExpenses = (exp) => {
	if (exp !== null) {
		exp = exp.split(', ');
		return exp;
	}
};
deposit = confirm('Есть ли у вас депозит в банке?');

let expenses = [];

const getExpensesMonth = () => {
	let sum = 0;
	for (let i = 0; i < 2; i++) {
		expenses[i] = prompt(`Введите обязательную статью расходов ${i+1}?`);

		// sum += prompt('Во сколько это обойдется?');
		let msg;
		do {
			msg = prompt('Во сколько это обойдется?');
		} while (!isNumber(msg));
		sum += parseFloat(msg);
	}
	return sum;
};
const expensesAmount = getExpensesMonth();
const getAccumulatedMonth = m => {
	return m - expensesAmount;
};


const accumulatedMonth = getAccumulatedMonth(money),
	getTargetMonth = (mi, am) => {
		return Math.round(mi / am);
	};

let budgetDay = Math.floor(accumulatedMonth / 31);

const getStatusIncome = (budget) => {
	if (budget >= 1200) {
		return ('У вас высокий уровень дохода');
	} else if (budget >= 600 && budget < 1200) {
		return('У вас средний уровень дохода');
	} else if (budget < 600) {
		return('К сожалению у вас уровень дохода ниже среднего');
	} else if (budget <= 0) {
		return('Что-то пошло не так');
	}
};

const getEnding = () => {
	if ((getTargetMonth(mission, accumulatedMonth) / 10) < 1) {
		if (getTargetMonth(mission, accumulatedMonth) === 1) {
			return '';
		} else if (getTargetMonth(mission, accumulatedMonth) >= 2 && getTargetMonth(mission, accumulatedMonth) <= 4) {
			return 'а';
		} else if (getTargetMonth(mission, accumulatedMonth) >= 5 && getTargetMonth(mission, accumulatedMonth) <= 9) {
			return 'ев';
		}
	} else if (getTargetMonth(mission, accumulatedMonth).toString().slice(-2) === '11') {
		return 'ев';
	} else if ((getTargetMonth(mission, accumulatedMonth) / 10) >= 1) {
		if ((getTargetMonth(mission, accumulatedMonth) % 10) === 1) {
			return '';
		} else if ((getTargetMonth(mission, accumulatedMonth) % 10) === 0 ||
			(getTargetMonth(mission, accumulatedMonth) % 10) >= 2 ||
			(getTargetMonth(mission, accumulatedMonth) % 10) <= 9) {
			return 'ев';
		}
	}
};

const getResult = () => {
	if (getTargetMonth(mission, accumulatedMonth) > 0) {
		return (`Цель в ${mission}руб. будет достигнута через ${getTargetMonth(mission, accumulatedMonth)} месяц${getEnding()}`);
	} else if (getTargetMonth(mission, accumulatedMonth)) {
		return (`Цель не будет достигрута`);
	}
};

console.log('addExperienses: ', validateExpenses(addExperienses));
console.log('expenses: ', expenses);
console.log('Расходы за месяц: ', expensesAmount);
console.log('budgetMonth: ', accumulatedMonth);
console.log('budgetDay: ', budgetDay);
console.log(getStatusIncome(budgetDay));
console.log(getResult());


