"use strict";
cc._RF.push(module, '44e79V4erNPb7aRjvVc/VQL', 'o0CCLabel');
// Script/o0Lib/o0CCLabel.js

'use strict';

var o0 = require('o0');
var o0CC = require('o0CC');
var o0Game = require('o0Game');

cc.Class({
    extends: cc.Label,
    properties: {
        label: null
    },
    onLoad: function onLoad() {
        this.label = this;
        this.label.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        this.label.verticalAlign = cc.Label.VerticalAlign.CENTER;
        //this.label.fontSize = 16;
        //this.label.lineHeight = 20;
        this.label.overflow = cc.Label.Overflow.SHRINK;
        this.label.color = new cc.Color(255, 255, 255);
        this.label.enableWrapText = false;
    },
    // called every frame
    update: function update(dt) {
        this.label.fontSize = this.node.height - 15;
    }
});

cc._RF.pop();