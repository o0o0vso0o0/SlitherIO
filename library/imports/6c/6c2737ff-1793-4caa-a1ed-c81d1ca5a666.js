"use strict";
cc._RF.push(module, '6c273f/F5NMqqHtyB0cpaZm', 'SnakeSteeringControl');
// Script/SnakeInput/SnakeInputBasic/SnakeSteeringControl.js

'use strict';

var o0 = require('o0');
var o0CC = require('o0CC');

cc.Class({
    extends: require('SnakeDirectionInput'),
    properties: {
        targetTurning: 0
    },
    setTargetTurning: function setTargetTurning(turning) {
        this.targetTurning = turning;
    },
    // use this for initialization
    onLoad: function onLoad() {
        this._super();
    },
    update: function update(dt) {
        this.control.setTargetVector(o0CC.vectorFromRotation(this.control.snake.head.rotation + this.targetTurning));
        this._super();
    }
});

cc._RF.pop();