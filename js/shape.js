/*
* @Author: XM-web
* @Date:   2016-11-18 14:21:19
* @Last Modified by:   XM-web
* @Last Modified time: 2016-11-18 15:32:55
*/

'use strict';

//定义Cell类型描述格子对象统一结构
function Cell(r,c,src){
	this.r=r;this.c=c;this.src=src;
}

function Shape(r0,c0,r1,c1,r2,c2,r3,c3,src){
	this.cells = [
	new Cell(r0,c0),
	new Cell(r1,c1),
	new Cell(r2,c2),
	new Cell(r3,c3),
	];
	for(var i=0;i<this.cells.length;i++)
		this.cells[i].src = src;
}

Shape.prototype={
	IMG:{
		T:"img/T.png",
		O:"img/O.png",
		L:"img/L.png",
		I:"img/I.png",
		J:"img/J.png",
		S:"img/S.png",
		Z:"img/Z.png"
	}
/*	moveDown:function(){},
	moveLeft:function(){},
	moveRight:function(){},
	rotateR:function(){},
	rotateL:function(){}*/
}

//T图形数据结构
function T(){
	Shape.call(this,0,3,0,4,0,5,1,4,this.IMG.T);
}
//设置子类型原型对象继承父类型原型对象
Object.setPrototypeOf(T.prototype, Shape.prototype);
//O图形数据结构
function O(){
	Shape.call(this,0,4,0,5,1,4,1,5,this.IMG.O);
}
Object.setPrototypeOf(O.prototype, Shape.prototype);
//L图形数据结构
function L(){
	Shape.call(this,0,4,1,4,2,4,2,5,this.IMG.L);
}
Object.setPrototypeOf(L.prototype, Shape.prototype);
//I图形数据结构
function I(){
	Shape.call(this,0,5,1,5,2,5,3,5,this.IMG.I);
}
Object.setPrototypeOf(I.prototype, Shape.prototype);
//J图形数据结构
function J(){
	Shape.call(this,0,5,1,5,2,5,2,4,this.IMG.J);
}
Object.setPrototypeOf(J.prototype, Shape.prototype);
//S图形数据结构
function S(){
	Shape.call(this,0,4,0,5,1,4,1,3,this.IMG.S);
}
Object.setPrototypeOf(S.prototype, Shape.prototype);
//Z图形数据结构
function Z(){
	Shape.call(this,0,4,0,5,1,5,1,6,this.IMG.Z);
}
Object.setPrototypeOf(Z.prototype, Shape.prototype);
