/*
 * @Author: XM-web
 * @Date:   2016-11-18 15:17:07
 * @Last Modified by:   XM-web
 * @Last Modified time: 2016-11-19 16:06:13
 */

'use strict';

var game = {
    CSIZE: 26,
    OFFSET: 15,
    pg: null, //容器元素
    shape: null, //正在下落的图形
    nextShape: null, //展示下一个方块图形
    interval: 300, //下落时间间隔
    timer: null, //定时器序号
    wall: null, //停止方块下落的墙
    RN: 20,
    CN: 10, //保存总行数和总列数
    start: function() {
        this.pg = $('.viewground');
        this.shape = new T();
        this.randomShape();
        this.wall = [];
        for (var r = 0; r < this.RN; r++) {
            this.wall[r] = new Array(this.CN);
        };
        this.paintShape();
        this.paintNextShape();
        this.timer = setInterval(function() {
            this.moveDown();
        }.bind(game), this.interval);
    },
    //绘制正在下落的图形
    paintShape: function() {
        var that = this;
        $(that.shape.cells).each(function() {
            that.paintCell(this, 'moving');
        });
    },

    //方块动画
    animate: function() {
        var that = this;
        $(that.shape.cells).each(function(index) {
            $('.moving').eq(index).animate({
                top: this.r * that.CSIZE + 'px',
                left: this.c * that.CSIZE + 'px'
            }, 100);
        })
    },

    //绘制图形元素imgElement
    paintCell: function(cell, className) {
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

    //下移动作
    moveDown: function() {

        if (this.canDown()) {
            this.shape.moveDown();
            this.animate();
        } else {
            this.landIntoWall();
            this.deleteWallRows();
            this.paintWall();
            $('.moving').remove();
            this.shape = this.nextShape;
            this.randomShape();
            $('.next-shape').remove();
            this.paintNextShape();
            this.paintShape();
        }
    },

    canLeft: function() {
        var that = this;
        var bool = true;
        $(that.shape.cells).each(function(index) {
            if (this.c == 0 || that.wall[this.r][this.c - 1] != undefined)
                bool = false;
        })
        if (bool) {
            return true
        } else {
            return false
        };
    },

    moveLeft: function() {
        if (this.canLeft()) {
            this.shape.moveLeft();
            this.animate();
        }
    },

    canRight: function() {
        var that = this;
        var bool = true;
        $(that.shape.cells).each(function(index) {
            if (this.c == that.CN - 1 || that.wall[this.r][this.c + 1] != undefined)
                bool = false;
        })
        if (bool) {
            return true
        } else {
            return false
        };
    },

    moveRight: function() {
        if (this.canRight()) {
            this.shape.moveRight();
            this.animate();
        }
    },

    pushDown: function() {
        while (this.canDown()) {
            this.shape.moveDown();
        }
        this.animate();
    },

    rotateR: function() {
        if (this.canRotate()) {
            this.shape.rotateR();
            this.animate();
        }

    },

    rotateL: function() {
        if (this.canRotate()) {
            this.shape.rotateL();
            this.animate();
        }
    },

    canRotate: function() {
        var that = this;
        var bool = true;
        $(that.shape.cells).each(function(index) {
            if (this.c < 0 || this.c >= that.CN || this.r < 0 || this.r >= that.RN || that.wall[this.r][this.c] != undefined)
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
        $('.fixed').remove();
        for (var r = 0; r < this.RN; r++) {
            for (var c = 0; c < this.CN; c++) {
                if (this.wall[r].join('') === '') {
                    break;
                } else if (this.wall[r][c] != undefined) {
                    this.paintCell(this.wall[r][c], 'fixed');
                }
            }
        }

    },

    //随机生成方块
    randomShape: function() {
        switch (Math.floor(Math.random() * 4)) {
            case 1:
                this.nextShape = new T()
                break;
            case 2:
                this.nextShape = new O()
                break;
                /*case 3:
                    this.nextShape = new S()
                    break;
                case 4:
                    this.nextShape = new Z()
                    break;
                case 5:
                    this.nextShape = new L()
                    break;
                case 6:
                    this.nextShape = new J()
                    break;*/
            default:
                this.nextShape = new I()
                break;
        }
    },

    paintNextShape: function() {
        var that = this;
        $(that.nextShape.cells).each(function() {
            $('<img>').attr({
                    src: this.src
                })
                .css({
                    top: this.r * that.CSIZE + 26 + 'px',
                    left: this.c * that.CSIZE - 10 + 'px'
                })
                .addClass('next-shape')
                .appendTo($('.next'))
        });
    },

    //删除满格行
    deleteWallRows: function() {
        /* for (var r = this.RN - 1, ln = 0; r >= 0; r--) {
             console.log(this.wall[r].toString());
             if (!this.wall[r].toString().match(/^,|,,|,$/)) {
                 this.deleteWallRow(r);
                 for (var c = 0; c < this.CN; c++) {

                     this.wall[r][c] = undefined;

                 }
             }
         }*/
        //自底向上遍历wall中每一行,声明ln=0
        for (var r = this.RN - 1, ln = 0; r >= 0; r--) {
            //如果当前行是空行,就退出循环
            if (this.wall[r].join("") === "") {
                break;
            }
            //定义正则reg: 开头,或,,或,结尾
            //如果用reg检测当前行转为字符串的结果 未通过
            if (!/^,|,,|,$/.test(String(this.wall[r]))) {
                this.deleteWallRow(r); //就删除当前行
                //先将ln+1，再如果ln等于4,就break
                if (++ln == 4) {
                    break;
                }
                r++; //r留在原地
            }
        } //(遍历结束)
        return ln; //返回ln
    },

    deleteWallRow: function(r) {
        console.log(r);
        for (; r >= 0; r--) {
            //复制wall中r-1行给r行
            this.wall[r] = this.wall[r - 1].slice();
            //如果wall中r-1行是空行,就退出循环
            if (this.wall[r - 1].join("") === "") {
                break;
            } else { //否则
                //将wall中r-1行重置为CN个空元素的数组
                this.wall[r - 1] = new Array(this.CN);
                //遍历wall中r行的每个格
                for (var c = 0; c < this.CN; c++) {
                    //如果当前格不是undefined，就将当前格的r+1
                    this.wall[r][c] && (this.wall[r][c].r++);
                }
            }
        }
    },



}

game.start();
$(document).on('keydown', function(e) {
    switch (e.keyCode) {
        case 37:
            game.moveLeft()
            break;
        case 39:
            game.moveRight()
            break;
        case 40:
            game.pushDown()
            break;
        case 90:
            game.rotateL()
            break;
        case 88:
            game.rotateR()
            break;
    }
})
