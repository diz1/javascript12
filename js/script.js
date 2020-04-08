'use strict';

const book = document.querySelectorAll('.book'),
	h2 = book[4].querySelector('h2'),
	a = h2.querySelector('a'),
	adv = document.querySelector('.adv'),
	book2ListElements = book[0].querySelector('ul').querySelectorAll('li'),
	book5ListElements = book[5].querySelector('ul').querySelectorAll('li'),
	book6ListElements = book[2].querySelector('ul').querySelectorAll('li'),
	li = document.createElement('li');

book[0].before(book[1]);
book[0].after(book[4]);
book[4].after(book[3]);
book[3].after(book[5]);
document.body.style.backgroundImage = 'url(\'./image/you-dont-know-js.jpg\')';
a.textContent = 'Книга 3. this и Прототипы Объектов';
adv.remove();

book2ListElements[1].after(book2ListElements[3]);
book2ListElements[3].after(book2ListElements[6]);
book2ListElements[6].after(book2ListElements[8]);
book2ListElements[9].after(book2ListElements[2]);

book5ListElements[2].replaceWith(book5ListElements[9]);
book5ListElements[4].append(book5ListElements[2]);
book5ListElements[7].after(book5ListElements[5]);

book6ListElements[8].append(li);
li.textContent = 'Глава 8: За пределами ES6';
