'use strict';
let isNumber = n => {
	return !isNaN(parseFloat(n)) && isFinite(n);
}, money;

const start = () => {
	do {
		money = prompt('Ваш месячный доход?');
	} while (!isNumber(money));
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
	mission: 1000000,
	period: 12,
	budget: +money,
	budgetDay: 0,
	budgetMonth: 0,
	expensesMonth: 0,
	asking: () => {

		if (confirm('Есть ли у вас дополнительный источник заработка?')) {
			let itemIncome, cashIncome;
			do {
				itemIncome = prompt(`Какой у вас дополнительный заработок?
Примечание: введите более 3-х символов`);
			} while (itemIncome === null || itemIncome.length < 3);
			do {
				cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?');
			} while (!isNumber(cashIncome));

			appData.income[itemIncome] = +cashIncome;
		}

		let	addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
		addExpenses = addExpenses.toLowerCase().split(',');
		addExpenses.forEach(item => appData.addExpenses.push(item.trim()));
		appData.deposit = confirm('Есть ли у вас депозит в банке?');
		for (let i = 0; i < 2; i++) {
			let amount, expenses;
			do {
				expenses = prompt(`Введите обязательную статью расходов ${i + 1}?
Примечание: введите более 3-х символов`);
			} while (expenses === null || expenses.length < 3);
			do {
				amount = prompt('Во сколько это обойдется?');
			} while (!isNumber(amount));
			appData.expenses[expenses] = +amount;
		}
	},
	getExpensesMonth: () => {
		for (let key in appData.expenses) {
			appData.expensesMonth += +appData.expenses[key];
		}
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
		} else {
			return (`Цель не будет достигрута`);
		}
	},
	getInfoDeposit: () => {
		if (appData.deposit) {
			do {
				appData.percentDeposit = prompt('Какой годовой процент?');
			} while (!isNumber(appData.percentDeposit));
			do {
				appData.moneyDeposit = prompt('Какая сумма заложена?');
			} while (!isNumber(appData.moneyDeposit));
		}
	},
	calcSavedMoney: () => {
		return appData.budgetMonth * appData.period;
	}
};
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getInfoDeposit();

console.log('Возможные расходы: ', appData.addExpenses.map(item => `${item[0].toUpperCase()}${item.slice(1)}`).join(', '));
console.log('Статьи расходов: ', appData.expenses);
console.log('Расходы за месяц: ', appData.expensesMonth);
console.log('Оставшийся бюджет на месяц: ', appData.budgetMonth);
console.log('Бюджет на день: ', appData.budgetDay);
console.log(`Ваш депозит ${appData.moneyDeposit} под ${appData.percentDeposit}% годовых`);
console.log(`Накопите ${Math.ceil(appData.calcSavedMoney())} за ${appData.period} месяц${appData.getEnding()}`);
console.log(appData.getStatusIncome());
console.log(appData.getResult());
// console.log('Наша программа включает в себя данные:');
//
// for (let key in appData) {
// 	console.log(key + ': ', appData[key]);
// }
