'use strict';

const DomElement = function (selector, width, height, bg, fontSize, fontColor, position, vertical, horizontal, x, y) {
	this.selector = selector;
	this.width = width;
	this.height = height;
	this.bg = bg;
	this.fontSize = fontSize;
	this.fontColor = fontColor;
	this.position = position;
	// this.top = top;
	// this.right = right;
	// this.bottom = bottom;
	// this.left = left;
	this.top = vertical.top;
	this.bottom = vertical.bottom;
	this.left = horizontal.left;
	this.right = horizontal.right;
	this.x = x;
	this.y = y;
};

DomElement.prototype.createElement = function () {
	let element, sel = this.selector.slice(1, this.selector.length);
	if (this.selector.startsWith('.')) {
		element = document.createElement('div');
		element.classList.add(sel);
		element.style.cssText =
			`
				width: ${this.width}px;
				height: ${this.height}px;
				background: ${this.bg};
				font-size: ${this.fontSize}px;
				color: ${this.fontColor};
				position: ${this.position};
				top: ${this.top}px;
				right: ${this.right}px;
				bottom" ${this.bottom}px;
				left: ${this.left}px;
			`;
		element.textContent = `Привет я блок с классом = ${sel}`;
		return element;
	} else if (this.selector.startsWith('#')) {
		element = document.createElement('p');
		element.id = sel;
		element.style.cssText =
			`
				width: ${this.width}px;
				height: ${this.height}px;
				background: ${this.bg};
				font-size: ${this.fontSize}px;
				color: ${this.fontColor};
				position: ${this.position};
				top: ${this.top}px;
				right: ${this.right}px;
				bottom" ${this.bottom}px;
				left: ${this.left}px;
			`;
		element.textContent = `Привет, я параграф с id = ${sel}`;
		return element;
	}
};

DomElement.prototype.handler = function (e) {
	console.log('Нажата кнопка: ', e.code);
	let element = document.querySelector(this.selector),
		ten = 10;
	if (e.code === 'ArrowUp') {
		this.y -= +ten;
	}
	if (e.code === 'ArrowRight') {
		this.x += +ten;
	}
	if (e.code === 'ArrowDown') {
		this.y += +ten;
	}
	if (e.code === 'ArrowLeft') {
		this.x -= +ten;
	}
	element.style.transform = `translateX(${this.x}px) translateY(${this.y}px)`;
};

const square = new DomElement('.sq', 100, 100, '#f00', 20, '#000', 'absolute', {top: 0}, {left: 50 + '%'}, 0, 0);
console.log(square);

document.addEventListener('DOMContentLoaded', () => {
	document.body.append(square.createElement());
	document.addEventListener('keydown', square.handler.bind(square));
});

