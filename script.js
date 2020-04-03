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
}, money;

const start = () => {
	do {
		money = +prompt('Ваш месячный доход?');
	} while (!isNumber(money));
};

start();

let appData = {
	income: {},
	addIncome: [],
	expenses: {},
	addExpenses: [],
	deposit: false,
	mission: 1000000,
	period: 12,
	budget: money,
	budgetDay: 0,
	budgetMonth: 0,
	expensesMonth: 0,
	asking: () => {
		let	addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
		addExpenses = addExpenses.toLowerCase().split(',');
		addExpenses.forEach(item => appData.addExpenses.push(item.trim()));
		appData.deposit = confirm('Есть ли у вас депозит в банке?');
		for (let i = 0; i < 2; i++) {
			let amount, expenses = prompt(`Введите обязательную статью расходов ${i + 1}?`);
			do {
				amount = prompt('Во сколько это обойдется?');
			} while (!isNumber(amount));
			appData.expenses[expenses] = +amount;
		}
	},
	getExpensesMonth: () => {
		let sum = 0;
		for (let key in appData.expenses) {
			sum += appData.expenses[key];
		}
		appData.expensesMonth = sum;
		return appData.expensesMonth;
	},
	getBudget: () => {
		appData.budgetMonth = appData.budget - appData.expensesMonth;
		appData.budgetDay = Math.floor(appData.budgetMonth / 31);
	},
	getTargetMonth: () => {
		return Math.ceil(appData.mission / appData.budgetMonth);
	},
	getStatusIncome: () => {
		if (appData.budgetDay >= 1200) {
			return ('У вас высокий уровень дохода');
		} else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
			return('У вас средний уровень дохода');
		} else if (appData.budgetDay < 600) {
			return('К сожалению у вас уровень дохода ниже среднего');
		} else if (appData.budgetDay <= 0) {
			return('Что-то пошло не так');
		}
	},
	getEnding: () => {
		if ((appData.getTargetMonth() / 10) < 1) {
			if (appData.getTargetMonth() === 1) {
				return '';
			} else if (appData.getTargetMonth() >= 2 && appData.getTargetMonth() <= 4) {
				return 'а';
			} else if (appData.getTargetMonth() >= 5 && appData.getTargetMonth() <= 9) {
				return 'ев';
			}
		} else if (appData.getTargetMonth().toString().slice(-2) === '11') {
			return 'ев';
		} else if ((appData.getTargetMonth() / 10) >= 1) {
			if ((appData.getTargetMonth() % 10) === 1) {
				return '';
			} else if ((appData.getTargetMonth() % 10) === 0 ||
				(appData.getTargetMonth() % 10) >= 2 ||
				(appData.getTargetMonth() % 10) <= 9) {
				return 'ев';
			}
		}
	},
	getResult: () => {
		if (appData.getTargetMonth() > 0) {
			return (`Цель в ${appData.mission} руб. будет достигнута через ${appData.getTargetMonth()} месяц${appData.getEnding()}`);
		} else if (appData.getTargetMonth()) {
			return (`Цель не будет достигрута`);
		}
	}
};
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();

console.log('Возможные расходы: ', appData.addExpenses);
console.log('Статиь расходов: ', appData.expenses);
console.log('Расходы за месяц: ', appData.expensesMonth);
console.log('Оставшийся бюджет на месяц: ', appData.budgetMonth);
console.log('Бюджет на день: ', appData.budgetDay);
console.log(appData.getStatusIncome());
console.log(appData.getResult());
console.log('Наша программа включает в себя данные:');
for (let key in appData) {
	console.log(key + ': ', appData[key]);
}
