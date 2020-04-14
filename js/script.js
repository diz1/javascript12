'use strict';

const DomElement = function (selector, width, height, bg, fontSize, fontColor) {
	this.selector = selector;
	this.width = width;
	this.height = height;
	this.bg = bg;
	this.fontSize = fontSize;
	this.fontColor = fontColor;
};

DomElement.prototype.createElement = function () {
	let element, sel = this.selector.slice(1, this.selector.length);
	if (this.selector.startsWith('.')) {
		element = document.createElement('div');
		element.classList.add(sel);
		element.style.cssText =
			`
				width: ${this.width};
				height: ${this.height};
				background: ${this.bg};
				font-size: ${this.fontSize};
				color: ${this.fontColor};
			`;
		element.textContent = `Привет я блок с классом = ${sel}`;
		return element;
	} else if (this.selector.startsWith('#')) {
		element = document.createElement('p');
		element.id = sel;
		element.style.cssText =
			`
				width: ${this.width};
				height: ${this.height};
				background: ${this.bg};
				font-size: ${this.fontSize};
				color: ${this.fontColor};
			`;
		element.textContent = `Привет, я параграф с id = ${sel}`;
		return element;
	}
};

const divClass = new DomElement('.class', '200px', '200px', '#000', '20px', '#fff'),
	pId = new DomElement('#id', '400px', '200px', '#f00', '20px', '#fff');

document.body.prepend(divClass.createElement());
document.body.prepend(pId.createElement());
