var o0 = require('o0');
var o0CC = require('o0CC');
var o0Game = require('o0Game');

cc.Class({
    extends: require('SnakeDirectionInput'),
    properties: {
    },
    
    onDeviceMotionEvent (event) {
        this.setTargetVector(new o0.Vector2(event.acc).mod);
        //cc.log(event.acc.x + "   " + event.acc.y);
    },

    // use this for initialization
    onLoad: function () {
        this._super();
        var self = this;
        
        var listener = {
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function (touch, event) {
                self.setTargetSpeeding(true);
                return true;
            },
            onTouchMoved: function (touch, event) {
                return true;
            },
            onTouchEnded: function (touch, event) {
                self.setTargetSpeeding(false);
                return true;
            },
        }
        cc.eventManager.addListener(listener, this.node);

        cc.systemEvent.setAccelerometerEnabled(true);
        cc.systemEvent.on(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
    },
    start: function (dt) {
    },
    update: function (dt) {
    },/*
    test:function(){
        cc.log('mouse snake');
    },/** */

    onDestroy () {
        cc.systemEvent.off(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
    },
});