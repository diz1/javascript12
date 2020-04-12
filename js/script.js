'use strict';

let start = document.getElementById('start'),
	cancel = document.getElementById('cancel'),
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
	start () {
		if (salaryAmount.value === '') {
			alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
			return;
		}

		this.budget = +salaryAmount.value;
		this.getExpenses();
		this.getIncome();
		this.getExpensesMonth();
		this.getTargetMonth();
		this.getInfoDeposit();
		this.getAddExpenses();
		this.getAddIncome();
		this.getBudget();
		this.blockInputs();
		this.hideStartButton();
		this.showResetButton();

		this.getResult();
	},
	getPeriodAmount () {
		let periodAmount = document. querySelector('.period-amount');
		periodAmount.textContent = periodSelect.value;
	},
	addExpensesBlock () {
		let cloneExpensesItem = expensesItems[0].cloneNode(true);
		cloneExpensesItem.children[0].value = '';
		cloneExpensesItem.children[1].value = '';
		expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
		expensesItems = document.querySelectorAll('.expenses-items');
		this.startCheck();
		if (expensesItems.length === 3) {
			expensesPlus.style.display = 'none';
		}
	},
	addIncomeBlock () {
		let cloneIncomeItem = incomeItems[0].cloneNode(true);
		cloneIncomeItem.children[0].value = '';
		cloneIncomeItem.children[1].value = '';
		incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
		incomeItems = document.querySelectorAll('.income-items');
		this.startCheck();
		if (incomeItems.length === 3) {
			incomePlus.style.display = 'none';
		}
	},
	getExpenses () {
		expensesItems.forEach(item => {
			let itemExpenses = item.querySelector('.expenses-title').value;
			let cashExpenses = item.querySelector('.expenses-amount').value;
			if (itemExpenses !== '' && cashExpenses !== '') {
				this.expenses[itemExpenses] = +cashExpenses;
			}
		});
	},
	getIncome () {
		incomeItems.forEach(item => {
			let itemIncome = item.querySelector('.income-title').value;
			let cashIncome = item.querySelector('.income-amount').value;
			if (itemIncome !== '' && cashIncome !== '') {
				this.income[itemIncome] = +cashIncome;
			}
		});

		for (let key in appData.income) {
			appData.incomeMonth += +appData.income[key];
		}
	},
	getAddExpenses () {
		let addExpenses = additionalExpensesItem.value.split(',');
		addExpenses.forEach(item => {
			item = item.trim();
			if (item !== '') {
				this.addExpenses.push(item);
			}
		});
	},
	getAddIncome () {
		additionalIncomeItem.forEach(item => {
			let itemValue = item.value.trim();
			if (itemValue !== '') {
				this.addIncome.push(itemValue);
			}
		});
	},
	getExpensesMonth () {
		for (let key in appData.expenses) {
			this.expensesMonth += +appData.expenses[key];
		}
	},
	getBudget () {
		this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
		this.budgetDay = Math.floor(this.budgetMonth / 31);
	},
	getTargetMonth () {
		return Math.ceil(targetAmount.value / this.budgetMonth);
	},
	getStatusIncome () {
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
	getEnding () {
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
	getResult () {
		budgetMonthValue.value = this.budgetMonth;
		budgetDayValue.value = this.budgetDay;
		expensesMonthValue.value = this.expensesMonth;
		additionalExpensesValue.value = this.addExpenses.join(', ');
		additionalIncomeValue.value = this.addIncome.join(', ');
		targetMonthValue.value = this.getTargetMonth();
		incomePeriodValue.value = this.calcSavedMoney();
		periodSelect.addEventListener('input', () => {
			incomePeriodValue.value = this.calcSavedMoney();
		});

		// if (appData.getTargetMonth() > 0) {
		// 	return (`Цель в ${appData.mission} руб. будет достигнута через ${appData.getTargetMonth()}
		// 	месяц${appData.getEnding()}`);
		// } else {
		// 	return (`Цель не будет достигрута`);
		// }
	},
	getInfoDeposit () {
		if (appData.deposit) {
			do {
				this.percentDeposit = prompt('Какой годовой процент?');
			} while (!isNumber(this.percentDeposit));
			do {
				this.moneyDeposit = prompt('Какая сумма заложена?');
			} while (!isNumber(this.moneyDeposit));
		}
	},
	calcSavedMoney () {
		return this.budgetMonth * periodSelect.value;
	},
	checkSalaryAmount () {
		start.setAttribute('disabled', 'disabled');
		salaryAmount.addEventListener('input', () => {
			if (salaryAmount.value !== '') {
				start.removeAttribute('disabled');
				return;
			}
			start.setAttribute('disabled', 'disabled');
		});
	},
	checkNamesValue (e) {
		e.target.value = e.target.value.replace(/[^а-яА-Я\,\.\s]/g, '');
	},
	checkSumValue (e) {
		e.target.value = e.target.value.replace(/[\D]/g, '');
	},
	startCheck () {
		let inputNames = document.querySelectorAll('input[placeholder="Наименование"]'),
			inputSum = document.querySelectorAll('input[placeholder="Сумма"]');
		inputNames.forEach(item => {
			item.addEventListener('input', this.checkNamesValue);
		});
		inputSum.forEach(item => {
			item.addEventListener('input', this.checkSumValue);
		});
	},
	reset () {
		this.income = {};
		this.addIncome = [];
		this.expenses = {};
		this.addExpenses = [];
		this.deposit = false;
		this.percentDeposit = 0;
		this.moneyDeposit = 0;
		this.budget = 0;
		this.budgetDay = 0;
		this.budgetMonth = 0;
		this.expensesMonth = 0;
		this.incomeMonth = 0;

		let dataInputs = document.querySelectorAll('.data input[type="text"');
		dataInputs.forEach(item => {
			item.value = '';
		});
		let resultInputs = document.querySelectorAll('.result input');
		resultInputs.forEach(item => {
			item.value = '';
		});

		periodSelect.value = 1;
		let periodAmount = document. querySelector('.period-amount');
		periodAmount.textContent = periodSelect.value;

		incomeItems.forEach(item => {
			if (incomeItems.length !== 1) {
				item.remove();
			}
			incomeItems = document.querySelectorAll('.income-items');
		});
		incomePlus.style.display = 'block';

		expensesItems.forEach(item => {
			if (expensesItems.length !== 1) {
				item.remove();
			}
			expensesItems = document.querySelectorAll('.expenses-items');
		});
		expensesPlus.style.display = 'block';

		this.getExpenses();
		this.getIncome();
		this.getExpensesMonth();
		this.getTargetMonth();
		this.getInfoDeposit();
		this.getAddExpenses();
		this.getAddIncome();
		this.getBudget();
		this.blockInputs();
		this.showStartButton();
		this.hideResetButton();
	},
	blockInputs () {
		let inputs = document.querySelectorAll('.data input[type="text"');
		inputs.forEach(item => {
			item.toggleAttribute('disabled');
		});
	},
	hideStartButton () {
		start.style.display = 'none';
	},
	showStartButton () {
		start.style.display = 'block';
	},
	showResetButton () {
		cancel.style.display = 'block';
	},
	hideResetButton () {
		cancel.style.display = 'none';
	}
};

appData.startCheck();
appData.checkSalaryAmount();
expensesPlus.addEventListener('click', appData.addExpensesBlock.bind(appData));
incomePlus.addEventListener('click', appData.addIncomeBlock.bind(appData));
start.addEventListener('click', appData.start.bind(appData));
cancel.addEventListener('click', appData.reset.bind(appData));
periodSelect.addEventListener('input', appData.getPeriodAmount);
