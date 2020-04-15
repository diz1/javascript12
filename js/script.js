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


class AppData {
	constructor(income = {},
	            addIncome = [],
	            expenses = {},
	            addExpenses = [],
	            deposit = false,
	            percentDeposit = 0,
	            moneyDeposit = 0,
	            budget = 0,
	            budgetDay = 0,
	            budgetMonth = 0,
	            expensesMonth = 0,
	            incomeMonth = 0) {
		this.income = income;
		this.addIncome = addIncome;
		this.expenses = expenses;
		this.addExpenses = addExpenses;
		this.deposit = deposit;
		this.percentDeposit = percentDeposit;
		this.moneyDeposit = moneyDeposit;
		this.budget = budget;
		this.budgetDay = budgetDay;
		this.budgetMonth = budgetMonth;
		this.expensesMonth = expensesMonth;
		this.incomeMonth = incomeMonth;
	}

	start() {
		if (salaryAmount.value === '') {
			alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
			return;
		}

		this.budget = +salaryAmount.value;
		this.checkSalaryAmount();
		this.getExpInc();
		this.getExpensesMonth();
		this.getTargetMonth();
		// this.getInfoDeposit();
		this.getAddExpenses();
		this.getAddIncome();
		this.getBudget();
		this.blockInputs();
		this.hideStartButton();
		this.showResetButton();

		this.getResult();
	}

	getPeriodAmount() {
		let periodAmount = document.querySelector('.period-amount');
		periodAmount.textContent = periodSelect.value;
	}

	// addExpensesBlock() {
	// 	let cloneExpensesItem = expensesItems[0].cloneNode(true);
	// 	cloneExpensesItem.children[0].value = '';
	// 	cloneExpensesItem.children[1].value = '';
	// 	expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
	// 	expensesItems = document.querySelectorAll('.expenses-items');
	// 	this.startCheck();
	// 	if (expensesItems.length === 3) {
	// 		expensesPlus.style.display = 'none';
	// 	}
	// }
	//
	// addIncomeBlock() {
	// 	let cloneIncomeItem = incomeItems[0].cloneNode(true);
	// 	cloneIncomeItem.children[0].value = '';
	// 	cloneIncomeItem.children[1].value = '';
	// 	incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
	// 	incomeItems = document.querySelectorAll('.income-items');
	// 	this.startCheck();
	// 	if (incomeItems.length === 3) {
	// 		incomePlus.style.display = 'none';
	// 	}
	// }

	addBlock (e, items, btn) {
		if (e.target === expensesPlus) {
			let cloneItem = expensesItems[0].cloneNode(true);
			cloneItem.children[0].value = '';
			cloneItem.children[1].value = '';
			const startStr = expensesItems[0].className.split(`-`)[0];
			expensesItems[0].parentNode.insertBefore(cloneItem, e.target);
			expensesItems = document.querySelectorAll(`.${startStr}-items`);
			this.startCheck();
			if (expensesItems.length === 3) {
				e.target.style.display = 'none';
			}
		} else if (e.target === incomePlus) {
			let cloneItem = incomeItems[0].cloneNode(true);
			cloneItem.children[0].value = '';
			cloneItem.children[1].value = '';
			const startStr = incomeItems[0].className.split(`-`)[0];
			incomeItems[0].parentNode.insertBefore(cloneItem, e.target);
			incomeItems = document.querySelectorAll(`.${startStr}-items`);
			this.startCheck();
			if (incomeItems.length === 3) {
				e.target.style.display = 'none';
			}
		}
	}

	getExpInc() {
		const count = item => {
			const startStr = item.className.split(`-`)[0];
			const itemTitle = item.querySelector(`.${startStr}-title`).value;
			const itemAmount = item.querySelector(`.${startStr}-amount`).value;

			if (itemTitle !== '' && itemAmount !== '') {
				this[startStr][itemTitle] = +itemAmount;
			}
		};

		incomeItems.forEach(count);
		expensesItems.forEach(count);

		for (let key in this.income) {
			this.incomeMonth += +this.income[key];
		}
	}

	getAddExpenses() {
		let addExpenses = additionalExpensesItem.value.split(',');
		addExpenses.forEach(item => {
			item = item.trim();
			if (item !== '') {
				this.addExpenses.push(item);
			}
		});
	}

	getAddIncome() {
		additionalIncomeItem.forEach(item => {
			let itemValue = item.value.trim();
			if (itemValue !== '') {
				this.addIncome.push(itemValue);
			}
		});
	}

	getExpensesMonth() {
		for (let key in this.expenses) {
			this.expensesMonth += +this.expenses[key];
		}
	}

	getBudget() {
		this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
		this.budgetDay = Math.floor(this.budgetMonth / 31);
	}

	getTargetMonth() {
		return Math.ceil(targetAmount.value / this.budgetMonth);
	}

	getResult() {
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
	}

	// getInfoDeposit () {
	// 	if (this.deposit) {
	// 		do {
	// 			this.percentDeposit = prompt('Какой годовой процент?');
	// 		} while (!isNumber(this.percentDeposit));
	// 		do {
	// 			this.moneyDeposit = prompt('Какая сумма заложена?');
	// 		} while (!isNumber(this.moneyDeposit));
	// 	}
	// }

	calcSavedMoney() {
		return this.budgetMonth * periodSelect.value;
	}

	checkSalaryAmount() {
		salaryAmount.addEventListener('input', () => {
			if (salaryAmount.value !== '') {
				start.removeAttribute('disabled');
				return;
			}
			start.setAttribute('disabled', 'true');
		});
	}

	checkNamesValue(e) {
		e.target.value = e.target.value.replace(/[^а-яА-Я\,\.\s]/g, '');
	}

	checkSumValue(e) {
		e.target.value = e.target.value.replace(/[\D]/g, '');
	}

	startCheck() {
		start.setAttribute('disabled', 'true');
		this.checkSalaryAmount();
		let inputNames = document.querySelectorAll('input[placeholder="Наименование"]'),
			inputSum = document.querySelectorAll('input[placeholder="Сумма"]');
		inputNames.forEach(item => {
			item.addEventListener('input', this.checkNamesValue);
		});
		inputSum.forEach(item => {
			item.addEventListener('input', this.checkSumValue);
		});
	}

	reset() {
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
		let periodAmount = document.querySelector('.period-amount');
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

		this.startCheck();
		this.getExpInc();
		this.getExpensesMonth();
		this.getTargetMonth();
		// this.getInfoDeposit();
		this.getAddExpenses();
		this.getAddIncome();
		this.getBudget();
		this.blockInputs();
		this.showStartButton();
		this.hideResetButton();
	}

	blockInputs() {
		let inputs = document.querySelectorAll('.data input[type="text"');
		inputs.forEach(item => {
			item.toggleAttribute('disabled');
		});
	}

	showStartButton() {
		start.style.display = 'block';
	}

	hideStartButton() {
		start.style.display = 'none';
	}

	showResetButton() {
		cancel.style.display = 'block';
	}

	hideResetButton() {
		cancel.style.display = 'none';
	}

	eventsListeners() {
		expensesPlus.addEventListener('click', this.addBlock.bind(this));
		incomePlus.addEventListener('click', this.addBlock.bind(this));
		start.addEventListener('click', this.start.bind(this));
		cancel.addEventListener('click', this.reset.bind(this));
		periodSelect.addEventListener('input', this.getPeriodAmount);
	}
}

const appData = new AppData();
appData.startCheck();
appData.eventsListeners();
