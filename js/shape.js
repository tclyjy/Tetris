/*
* @Author: XM-web
* @Date:   2016-11-18 14:21:19
* @Last Modified by:   XM-web
* @Last Modified time: 2016-11-19 15:37:23
*/

'use strict';

//定义Cell类型描述格子对象统一结构
function Cell(r,c,src){
	this.r=r;this.c=c;this.src=src;
}

function State(r0,c0,r1,c1,r2,c2,r3,c3){
	this.r0=r0; this.c0=c0;
	this.r1=r1; this.c1=c1;
	this.r2=r2; this.c2=c2;
	this.r3=r3; this.c3=c3;
}

function Shape(r0,c0,r1,c1,r2,c2,r3,c3,src,states,orgi){
	this.cells = [
	new Cell(r0,c0),
	new Cell(r1,c1),
	new Cell(r2,c2),
	new Cell(r3,c3),
	];
	for(var i=0;i<this.cells.length;i++){
		this.cells[i].src = src;
	}

	this.states = states;
	this.orgCell = this.cells[orgi];
	this.statei=0; //初始旋转状态
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
	},
	moveDown:function(){
		$(this.cells).each(function(index){
			this.r += 1;
		})
	},
	moveLeft:function(){
		$(this.cells).each(function(index){
			this.c -= 1;
		})
	},
	moveRight:function(){
		$(this.cells).each(function(index){
			this.c += 1;
		})
	},
	rotateR:function(){
		this.statei += 1;
		if(this.statei>=this.states.length)
			this.statei = 0;
		this.rotate();
	},
	rotateL:function(){
		this.statei -=1;
		if(this.statei<0)
			this.statei = this.states.length-1;
		this.rotate();
	},
	rotate:function(){
		var that=this;
		$(that.cells).each(function(index) {
			var ri = 'r'+index;
			var ci = 'c'+index;
			this.r = that.orgCell.r + that.states[that.statei][ri];
			this.c = that.orgCell.c + that.states[that.statei][ci];
		});
	}
}

//T图形数据结构
function T(){
	Shape.call(this,0,3,0,4,0,5,1,4,this.IMG.T,
		[
		new State(0,-1,0,0,0,1,1,0),
		new State(-1,0,0,0,1,0,0,-1),
		new State(0,1,0,0,0,-1,-1,0),
		new State(1,0,0,0,-1,0,0,1)
		],1);
}
//设置子类型原型对象继承父类型原型对象
Object.setPrototypeOf(T.prototype, Shape.prototype);
//O图形数据结构
function O(){
	Shape.call(this,0,4,0,5,1,4,1,5,this.IMG.O,
		[
		new State(0,-1,0,0,1,-1,1,0)
		],1);
}
Object.setPrototypeOf(O.prototype, Shape.prototype);
//L图形数据结构
function L(){
	Shape.call(this,0,4,1,4,2,4,2,5,this.IMG.L);
}
Object.setPrototypeOf(L.prototype, Shape.prototype);
//I图形数据结构
function I(){
	Shape.call(this,0,3,0,4,0,5,0,6,this.IMG.I,
		[
		new State(0,-1,0,0,0,1,0,2),
		new State(-1,0,0,0,1,0,2,0)
		],1);
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
