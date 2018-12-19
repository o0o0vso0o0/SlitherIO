var o0 = require('o0');
var o0CC = require('o0CC');

cc.Class({
    extends: require('SnakeDirectionInput'),
    properties: {
        targetPosition: null,
        controllByPosition: true,
    },
    setTargetPosition:function(position){
        this.targetPosition = position;
    },
    setControllByPosition:function(bool){
        this.controllByPosition = bool;
    },
    // use this for initialization
    onLoad: function () {
        this.targetPosition = new o0.Vector2(1,0);
        this._super();
    },
    update: function (dt) {
        if(this.controllByPosition)
            this.setTargetVector(this.targetPosition.minus(this.node).mod);
        this._super();
    },
});