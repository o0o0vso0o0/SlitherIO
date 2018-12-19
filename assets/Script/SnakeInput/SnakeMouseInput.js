var o0 = require('o0');
var o0CC = require('o0CC');

cc.Class({
    extends: require('SnakeDirectionInput'),
    properties: {
        mouseLocation: null,
    },
    // use this for initialization
    onLoad: function () {
        this._super();
        var self = this;
        
        this.mouseLocation = new o0.Vector2(1,0);
        
        var listener = {
            event: cc.EventListener.MOUSE,
            onMouseDown: function (event) {
                self.setTargetSpeeding(true);   
            },
            onMouseUp: function (event) {
                self.setTargetSpeeding(false);
            },
            onMouseMove: function (event) {
                self.mouseLocation = event.getLocation();
            },
            onMouseScroll: function (event) {
            }
        }
        cc.eventManager.addListener(listener, this.node);
    },
    update: function (dt) {
        this._super();
        var localLocation = this.node.parent.convertToNodeSpaceAR(this.mouseLocation);
        this.setTargetVector(new o0.Vector2(localLocation).mod);
    },/*
    test:function(){
        cc.log('mouse snake');
    },/** */
});