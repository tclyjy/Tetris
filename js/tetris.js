/*
* @Author: XM-web
* @Date:   2016-11-18 15:17:07
* @Last Modified by:   XM-web
* @Last Modified time: 2016-11-18 15:57:14
*/

'use strict';

var game = {
	CSIZE:26,
	OFFSET:15,
	pg:null,//容器元素
	shape:null,//正在下落的图形
	start:function() {
		this.pg = $('.viewground');
		this.shape = new T();
		this.paintShape();
	},
	//绘制正在下落的图形
	paintShape:function(){
		for(var i=0;i<this.shape.cells.length;i++){
			$('<img>').attr({
				src: this.shape.cells[i].src
			})
			.css({
				top: this.shape.cells[i].r*this.CSIZE + 'px' ,
				left: this.shape.cells[i].c*this.CSIZE + 'px'
			})
			.appendTo(this.pg);
		}
	}
}

game.start();
