var o0 = require('o0');
var o0CC = require('o0CC');

cc.Class({
    extends: require('SnakeDirectionInput'),
    properties: {
        targetTurning: 0,
    },
    setTargetTurning:function(turning){
        this.targetTurning = turning;
    },
    // use this for initialization
    onLoad: function () {
        this._super();
    },
    update: function (dt) {
        this.control.setTargetVector(o0CC.vectorFromRotation(this.control.snake.head.rotation+this.targetTurning));
        this._super();
    },
});