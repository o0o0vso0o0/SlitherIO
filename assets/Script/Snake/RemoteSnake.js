var o0 = require('o0');
var o0CC = require('o0CC');
var o0Game = require('o0Game');


cc.Class({
    extends: require('Snake'),

    properties: {
    },/*
    addHead:function(){

        this.head = new cc.Node('head');
        this.body.push(this.head);
        this.head.parent = this.node;
        this.head.rotation = Math.random() * 360;

        //this.tag = o0Game.CollisionTag.Head;

        this.addGraphic(this.head);
    },
    addBody:function(){
        if(this.node.active == false)
            return;
        var i = this.body.length;
        this.body.push(new cc.Node('body'+i));
        this.node.addChild(this.body[i],-i);
        this.body[i].x = this.body[i-1].x;
        this.body[i].y = this.body[i-1].y;
        this.body[i].rotation = this.body[i-1].rotation;

        this.addGraphic2(this.body[i]);
    },/** */
});
//module.exports = Snake;