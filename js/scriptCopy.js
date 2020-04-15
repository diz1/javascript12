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


const AppData = function () {

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

};

AppData.prototype.start = function () {
	if (salaryAmount.value === '') {
		alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
		return;
	}

	this.budget = +salaryAmount.value;
	this.checkSalaryAmount();
	this.getExpenses();
	this.getIncome();
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
};

AppData.prototype.getPeriodAmount = function () {
	let periodAmount = document. querySelector('.period-amount');
	periodAmount.textContent = periodSelect.value;
};

AppData.prototype.addExpensesBlock = function () {
	let cloneExpensesItem = expensesItems[0].cloneNode(true);
	cloneExpensesItem.children[0].value = '';
	cloneExpensesItem.children[1].value = '';
	expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
	expensesItems = document.querySelectorAll('.expenses-items');
	this.startCheck();
	if (expensesItems.length === 3) {
		expensesPlus.style.display = 'none';
	}
};
AppData.prototype.addIncomeBlock = function () {
	let cloneIncomeItem = incomeItems[0].cloneNode(true);
	cloneIncomeItem.children[0].value = '';
	cloneIncomeItem.children[1].value = '';
	incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
	incomeItems = document.querySelectorAll('.income-items');
	this.startCheck();
	if (incomeItems.length === 3) {
		incomePlus.style.display = 'none';
	}
};
AppData.prototype.getExpenses = function () {
	expensesItems.forEach(item => {
		let itemExpenses = item.querySelector('.expenses-title').value;
		let cashExpenses = item.querySelector('.expenses-amount').value;
		if (itemExpenses !== '' && cashExpenses !== '') {
			this.expenses[itemExpenses] = +cashExpenses;
		}
	});
};
AppData.prototype.getIncome = function () {
	incomeItems.forEach(item => {
		let itemIncome = item.querySelector('.income-title').value;
		let cashIncome = item.querySelector('.income-amount').value;
		if (itemIncome !== '' && cashIncome !== '') {
			this.income[itemIncome] = +cashIncome;
		}
	});

	for (let key in this.income) {
		this.incomeMonth += +this.income[key];
	}
};
AppData.prototype.getAddExpenses = function () {
	let addExpenses = additionalExpensesItem.value.split(',');
	addExpenses.forEach(item => {
		item = item.trim();
		if (item !== '') {
			this.addExpenses.push(item);
		}
	});
};
AppData.prototype.getAddIncome = function () {
	additionalIncomeItem.forEach(item => {
		let itemValue = item.value.trim();
		if (itemValue !== '') {
			this.addIncome.push(itemValue);
		}
	});
};
AppData.prototype.getExpensesMonth = function () {
	for (let key in this.expenses) {
		this.expensesMonth += +this.expenses[key];
	}
};
AppData.prototype.getBudget = function () {
	this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
	this.budgetDay = Math.floor(this.budgetMonth / 31);
};
AppData.prototype.getTargetMonth = function () {
	return Math.ceil(targetAmount.value / this.budgetMonth);
};
AppData.prototype.getResult = function () {
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
};
// AppData.prototype.getInfoDeposit = function () {
// 	if (this.deposit) {
// 		do {
// 			this.percentDeposit = prompt('Какой годовой процент?');
// 		} while (!isNumber(this.percentDeposit));
// 		do {
// 			this.moneyDeposit = prompt('Какая сумма заложена?');
// 		} while (!isNumber(this.moneyDeposit));
// 	}
// };
AppData.prototype.calcSavedMoney = function () {
	return this.budgetMonth * periodSelect.value;
};
AppData.prototype.checkSalaryAmount = function () {
	start.setAttribute('disabled', 'true');
	salaryAmount.addEventListener('input', () => {
		if (salaryAmount.value !== '') {
			start.removeAttribute('disabled');
			return;
		}
		start.setAttribute('disabled', 'true');
	});
};
AppData.prototype.checkNamesValue = function (e) {
	e.target.value = e.target.value.replace(/[^а-яА-Я\,\.\s]/g, '');
};
AppData.prototype.checkSumValue = function (e) {
	e.target.value = e.target.value.replace(/[\D]/g, '');
};
AppData.prototype.startCheck = function () {
	this.checkSalaryAmount();
	let inputNames = document.querySelectorAll('input[placeholder="Наименование"]'),
		inputSum = document.querySelectorAll('input[placeholder="Сумма"]');
	inputNames.forEach(item => {
		item.addEventListener('input', this.checkNamesValue);
	});
	inputSum.forEach(item => {
		item.addEventListener('input', this.checkSumValue);
	});
};
AppData.prototype.reset = function () {
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
	// this.getInfoDeposit();
	this.getAddExpenses();
	this.getAddIncome();
	this.getBudget();
	this.blockInputs();
	this.showStartButton();
	this.hideResetButton();
};
AppData.prototype.blockInputs = function () {
	let inputs = document.querySelectorAll('.data input[type="text"');
	inputs.forEach(item => {
		item.toggleAttribute('disabled');
	});
};
AppData.prototype.showStartButton = function () {
	start.style.display = 'block';
};
AppData.prototype.hideStartButton = function () {
	start.style.display = 'none';
};
AppData.prototype.showResetButton = function () {
	cancel.style.display = 'block';
};
AppData.prototype.hideResetButton = function () {
	cancel.style.display = 'none';
};
AppData.prototype.eventsListeners = function () {
	expensesPlus.addEventListener('click', this.addExpensesBlock.bind(this));
	incomePlus.addEventListener('click', this.addIncomeBlock.bind(this));
	start.addEventListener('click', this.start.bind(this));
	cancel.addEventListener('click', this.reset.bind(this));
	periodSelect.addEventListener('input', this.getPeriodAmount);
};

const appData = new AppData();
appData.startCheck();
appData.eventsListeners();
console.log(appData);


// let isNumber = n => {
// 	return !isNaN(parseFloat(n)) && isFinite(n);
// };


