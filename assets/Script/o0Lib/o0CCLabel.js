var o0 = require('o0');
var o0CC = require('o0CC');
var o0Game = require('o0Game');

cc.Class({
    extends: cc.Label,
    properties: {
        label:null,
    },
    onLoad: function () {
        this.label = this;
        this.label.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        this.label.verticalAlign = cc.Label.VerticalAlign.CENTER;
        //this.label.fontSize = 16;
        //this.label.lineHeight = 20;
        this.label.overflow = cc.Label.Overflow.SHRINK;
        this.label.color = new cc.Color(255,255,255);
        this.label.enableWrapText = false;
    }, 
    // called every frame
    update: function (dt) {
        this.label.fontSize = this.node.height - 15;
    }
})