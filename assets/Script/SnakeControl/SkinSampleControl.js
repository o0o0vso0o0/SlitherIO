var o0 = require('o0');
var o0CC = require('o0CC');
var o0Game = require('o0Game');


cc.Class({
    extends: require('LocalControl'),

    properties: {
        targetPosition:null,
    },
    start: function () {

        //this.fixedTimer = new o0.FixedTimerDT(60);
    },
    update: function (dt) {
        this._super();
        
        var transferVector = this.targetPosition.minus(this.snake.head);
        for(var i = 0;i<this.snake.body.length;++i){
            this.snake.body[i].x += transferVector.x;
            this.snake.body[i].y += transferVector.y;
        }/** */
    },
});