/*
1) Объявить функцию getExpensesMonth. Функция возвращает сумму всех обязательных расходов за месяц

2) Объявить функцию getAccumulatedMonth. Функция возвращает Накопления за месяц (Доходы минус расходы)

3) Объявить переменную accumulatedMonth и присвоить ей результат вызова функции getAccumulatedMonth

4) Объявить функцию getTargetMonth. Подсчитывает за какой период будет достигнута цель, зная результат месячного
 накопления (accumulatedMonth) и возвращает результат

5) Удалить из кода переменную budgetMonth

6) budgetDay высчитываем исходя из значения месячного накопления (accumulatedMonth)

7) Почистить консоль логи и добавить недостающие, должны остаться:
 - вызовы функции showTypeOf
 - Расходы за месяц вызов getExpensesMonth
 - Вывод возможных расходов в виде массива (addExpenses)
 - Cрок достижения цели в месяцах (результат вызова функции getTargetMonth)
 - Бюджет на день (budgetDay)
 - вызов функции getStatusIncome

8) Проверить, чтобы все работало и не было ошибок в консоли
*/
let money = 25000,
   income = 'премия',
   addExperienses = 'интернет, проезд, сигареты',
   deposit = true,
   mission = 1000000,
   period = 12;

const showTypeOf = arg => {
   return typeof(arg);
};

console.log('typeof money: ', showTypeOf(money));
console.log('typeof income: ', showTypeOf(income));
console.log('typeof deposit: ', showTypeOf(deposit));
console.log('addExperienses.length: ', addExperienses.length);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей`);

money = +prompt('Ваш месячный доход?');
addExperienses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
const validateExpenses = (exp) => {
   if (exp !== null) {
      exp = exp.split(', ');
      return exp;
   }
};
deposit = confirm('Есть ли у вас депозит в банке?');
let expenses1 = prompt('Введите обязательную статью расходов 1?'),
   amount1 = +prompt('Во сколько это обойдется?'),
   expenses2 = prompt('Введите обязательную статью расходов 2?'),
   amount2 = +prompt('Во сколько это обойдется?');

const getExpensesMonth = (a1, a2) => {
   return a1 + a2;
},
    getAccumulatedMonth = m => {
   return m - getExpensesMonth(amount1, amount2);
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

console.log('addExperienses: ', validateExpenses(addExperienses));
console.log('Расходы за месяц: ', getExpensesMonth(amount1, amount2));
console.log('budgetMonth: ', accumulatedMonth);
console.log('budgetDay: ', budgetDay);
console.log(getStatusIncome(budgetDay));
console.log(
`Цель в ${mission}руб. будет достигнута через ${getTargetMonth(mission, accumulatedMonth)} месяц${getEnding()}`);


