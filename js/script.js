'use strict';

let start = document.getElementById('start'),
	bntPlus = document.getElementsByTagName('button'),
	incomePlus = bntPlus[0],
	expensesPlus = bntPlus[1],
	additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
	depositCheck = document.querySelector('#deposit-check'),
	budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
	budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
	expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
	additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
	additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
	incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
	targetMonthValue = document.getElementsByClassName('target_month-value')[0],
	salaryAmount = document.querySelector('.salary-amount'),
	incomeTitle = document.querySelector('.income-title'),
	incomeItems = document.querySelectorAll('.income-items'),
	expensesTitle = document.querySelector('.expenses-title'),
	expensesItems = document.querySelectorAll('.expenses-items'),
	additionalExpenses = document.querySelector('.additional_expenses-item'),
	periodSelect = document.querySelector('.period-select'),
	targetAmount = document.querySelector('.target-amount'),
	additionalExpensesItem = document.querySelector('.additional_expenses-item');

let isNumber = n => {
	return !isNaN(parseFloat(n)) && isFinite(n);
};

let appData = {
	income: {},
	addIncome: [],
	expenses: {},
	addExpenses: [],
	deposit: false,
	percentDeposit: 0,
	moneyDeposit: 0,
	budget: 0,
	budgetDay: 0,
	budgetMonth: 0,
	expensesMonth: 0,
	incomeMonth: 0,
	start: () => {

		if (salaryAmount.value === '') {
			alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
			return;
		}
		appData.budget = +salaryAmount.value;
		appData.getExpenses();
		appData.getIncome();
		appData.getExpensesMonth();
		appData.getTargetMonth();
		appData.getInfoDeposit();
		appData.getAddExpenses();
		appData.getAddIncome();
		appData.getBudget();

		appData.getResult();
	},
	getPeriodAmount: () => {
		let periodAmount = document. querySelector('.period-amount');
		periodAmount.textContent = periodSelect.value;
	},
	addExpensesBlock: () => {
		let cloneExpensesItem = expensesItems[0].cloneNode(true);
		expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
		expensesItems = document.querySelectorAll('.expenses-items');
		if (expensesItems.length === 3) {
			expensesPlus.style.display = 'none';
		}
	},
	addIncomeBlock: () => {
		let cloneIncomeItem = incomeItems[0].cloneNode(true);
		incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
		incomeItems = document.querySelectorAll('.income-items');
		if (incomeItems.length === 3) {
			incomePlus.style.display = 'none';
		}
	},
	getExpenses: () => {
		expensesItems.forEach(item => {
			let itemExpenses = item.querySelector('.expenses-title').value;
			let cashExpenses = item.querySelector('.expenses-amount').value;
			if (itemExpenses !== '' && cashExpenses !== '') {
				appData.expenses[itemExpenses] = +cashExpenses;
			}
		});
	},
	getIncome: () => {
		incomeItems.forEach(item => {
			let itemIncome = item.querySelector('.income-title').value;
			let cashIncome = item.querySelector('.income-amount').value;
			if (itemIncome !== '' && cashIncome !== '') {
				appData.income[itemIncome] = +cashIncome;
			}
		});

		for (let key in appData.income) {
			appData.incomeMonth += +appData.income[key];
		}
	},
	getAddExpenses: () => {
		let addExpenses = additionalExpensesItem.value.split(',');
		addExpenses.forEach(item => {
			item = item.trim();
			if (item !== '') {
				appData.addExpenses.push(item);
			}
		});
	},
	getAddIncome: () => {
		additionalIncomeItem.forEach(item => {
			let itemValue = item.value.trim();
			if (itemValue !== '') {
				appData.addIncome.push(itemValue);
			}
		});
	},
	getExpensesMonth: () => {
		for (let key in appData.expenses) {
			appData.expensesMonth += +appData.expenses[key];
		}
	},
	getBudget: () => {
		appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
		appData.budgetDay = Math.floor(appData.budgetMonth / 31);
	},
	getTargetMonth: () => {
		return Math.ceil(targetAmount.value / appData.budgetMonth);
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
		budgetMonthValue.value = appData.budgetMonth;
		budgetDayValue.value = appData.budgetDay;
		expensesMonthValue.value = appData.expensesMonth;
		additionalExpensesValue.value = appData.addExpenses.join(', ');
		additionalIncomeValue.value = appData.addIncome.join(', ');
		targetMonthValue.value = appData.getTargetMonth();
		incomePeriodValue.value = appData.calcSavedMoney();
		periodSelect.addEventListener('input', () => {
			incomePeriodValue.value = appData.calcSavedMoney();
		});



		// if (appData.getTargetMonth() > 0) {
		// 	return (`Цель в ${appData.mission} руб. будет достигнута через ${appData.getTargetMonth()}
		// 	месяц${appData.getEnding()}`);
		// } else {
		// 	return (`Цель не будет достигрута`);
		// }
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
		return appData.budgetMonth * periodSelect.value;
	},
	checkSalaryAmount: () => {
		start.setAttribute('disabled', 'disabled');
		salaryAmount.addEventListener('input', () => {
			if (salaryAmount.value !== '') {
				start.removeAttribute('disabled');
				return;
			}
			start.setAttribute('disabled', 'disabled');
		});
	}
};
appData.checkSalaryAmount();
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
start.addEventListener('click', appData.start);
periodSelect.addEventListener('input', appData.getPeriodAmount);
