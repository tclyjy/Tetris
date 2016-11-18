/*
 * @Author: XM-web
 * @Date:   2016-11-18 15:17:07
 * @Last Modified by:   XM-web
 * @Last Modified time: 2016-11-18 20:53:27
 */

'use strict';

var game = {
    CSIZE: 26,
    OFFSET: 15,
    pg: null, //容器元素
    shape: null, //正在下落的图形
    interval: 300, //下落时间间隔
    timer: null, //定时器序号
    wall: null, //停止方块下落的墙
    RN: 20,
    CN: 10, //保存总行数和总列数
    start: function() {
        this.pg = $('.viewground');
        this.shape = new T();
        this.wall = [];
        for (var r = 0; r < this.RN; r++) {
            this.wall[r] = new Array(this.CN);
        };
        console.dir(this.wall);
        this.paintShape();
        this.timer = setInterval(function() {
            this.moveDown();
        }.bind(game), this.interval);
    },
    //绘制正在下落的图形
    paintShape: function() {
        var that = this;
        $(that.shape.cells).each(function() {
            that.paintCell(this,'moving');
        });
    },

    //重绘内容
    paint: function() {
    	var that=this;
        $(that.shape.cells).each(function(index) {
            $('.moving').eq(index).animate({
                top: this.r * that.CSIZE + 'px',
                left: this.c * that.CSIZE + 'px'
            }, 100);
        })
    },

    //绘制图形元素
    paintCell: function(cell,className) {
        var that = this;
        $('<img>').attr({
                src: cell.src
            })
            .css({
                top: cell.r * that.CSIZE + 'px',
                left: cell.c * that.CSIZE + 'px'
            })
            .addClass(className)
            .appendTo(that.pg);
    },

    //能否继续下落
    canDown: function() {
        var that = this;
        var bool = true;
        $(that.shape.cells).each(function(index) {
            if (this.r == that.RN - 1 || that.wall[this.r + 1][this.c] != undefined)
                bool = false;
        })
        if (bool) {
            return true
        } else {
            return false
        };
    },

    //将沉底元素加入well
    landIntoWall: function() {
        var that = this;
        $(that.shape.cells).each(function() {
            that.wall[this.r][this.c] = this;
        })
    },

    //绘制wall沉底元素
    paintWall: function() {
        // var that = this
        for (var r = 0; r < this.RN; r++) {
            for (var c = 0; c < this.CN; c++) {
                if (this.wall[r][c] != undefined) {
                    this.paintCell(this.wall[r][c],'fixed');
                }
            }
        }
        console.log('aa')
    },

    //下移动作
    moveDown: function() {
        console.log(this.canDown());
        if (this.canDown()) {
            this.shape.moveDown();
            this.paint();
        } else {
            this.landIntoWall();
            this.paintWall();
			$('.moving').remove();
            this.shape = new T();
           	this.paintShape();
        }
    },
}

game.start();
