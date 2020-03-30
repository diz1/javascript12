/* 
1) Весь функционал что был ранее оставляем, если что то необходимо удалить, об этом будет написано в задании

2) Спрашиваем у пользователя “Ваш месячный доход?” и результат сохраняем в переменную money

3) Спросить у пользователя “Перечислите возможные расходы за рассчитываемый период через запятую” сохранить в переменную addExpenses

4) Спросить у пользователя “Есть ли у вас депозит в банке?” и сохранить данные в переменной deposit (булево значение true/false)

5) Спросить у пользователя по 2 раза каждый вопрос и записать ответы в разные переменные 

	1. “Введите обязательную статью расходов?” (например expenses1, expenses2);
	2. “Во сколько это обойдется?” (например amount1, amount2)
	в итоге 4 вопроса и 4 разные переменных.

6) Вычислить бюджет на месяц, учитывая обязательные расходы, сохранить в новую переменную budgetMonth и вывести результат в консоль

7) Зная budgetMonth, посчитать за сколько месяцев будет достигнута цель mission, вывести в консоль, округляя в большую сторону (методы объекта Math в помощь)

8) Поправить budgetDay учитывая бюджет на месяц, а не месячный доход. Вывести в консоль  округлив в меньшую сторону 

9) Написать конструкцию условий (расчеты приведены в рублях)	

	1. Если budgetDay больше 1200, то “У вас высокий уровень дохода”;
	2. Если budgetDay больше 600 и меньше 1200, то сообщение “У вас средний уровень дохода”;
	3. Если budgetDay меньше 600 то в консоль вывести сообщение “К сожалению у вас уровень дохода ниже среднего”;
	4. Если отрицательное значение то вывести “Что то пошло не так”;
	5. Учесть варианты 0, 600 и 1200.

10) Проверить, чтобы все работало и не было ошибок в консоли

11) Добавить папку с третьим уроком в свой репозиторий на GitHub
*/
let money = 25000,
   income = 'премия',
   addExperienses = 'интернет, проезд, сигареты',
   deposit = true,
   mission = 1000000,
   period = 12;

console.log('typeof money: ', typeof money);
console.log('typeof income: ', typeof income);
console.log('typeof deposit: ', typeof deposit);
console.log('addExperienses.length: ', addExperienses.length);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей`);

money = +prompt('Ваш месячный доход?');
addExperienses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
if (addExperienses !== null) {
   addExperienses = addExperienses.split(', ');
   console.log('addExperienses: ', addExperienses);
}
deposit = confirm('Есть ли у вас депозит в банке?');
let expenses1 = prompt('Введите обязательную статью расходов 1?'),
   amount1 = +prompt('Во сколько это обойдется?'),
   expenses2 = prompt('Введите обязательную статью расходов 2?'),
   amount2 = +prompt('Во сколько это обойдется?');
let budgetMonth = money - (amount1 + amount2),
   result = Math.round(mission / budgetMonth),
   budgetDay = Math.floor(budgetMonth / 31),
   ending;

console.log('budgetMonth: ', budgetMonth);
console.log('budgetDay: ', budgetDay);

if (budgetDay >= 1200) {
   console.log('У вас высокий уровень дохода');
} else if (budgetDay >= 600 && budgetDay < 1200) {
   console.log('У вас средний уровень дохода');
} else if (budgetDay < 600) {
   console.log('К сожалению у вас уровень дохода ниже среднего');
} else if (budgetDay <= 0) {
   console.log('Что-то пошло не так');
}

if ((result / 10) < 1) {
   if (result === 1) {
      ending = '';
   } else if (result >= 2 && result <= 4) {
      ending = 'а';
   } else if (result >= 5 && result <= 9) {
      ending = 'ев';
   }
} else if (result.toString().slice(-2) === '11') {
   ending = 'ев';
} else if ((result / 10) >= 1) {
   if ((result % 10) === 1) {
      ending = '';
   } else if ((result % 10) === 0 || (result % 10) >= 2 || (result % 10) <= 9) {
      ending = 'ев';
   }
}

console.log(`Цель в ${mission}руб. будет достигнута через ${result} месяц${ending}`);