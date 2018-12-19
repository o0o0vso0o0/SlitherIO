"use strict";
cc._RF.push(module, '3f22dM+1nVCgqPx8X6iJ0m2', 'SnakeAccelerometerInput');
// Script/SnakeInput/SnakeAccelerometerInput.js

'use strict';

var o0 = require('o0');
var o0CC = require('o0CC');
var o0Game = require('o0Game');

cc.Class({
    extends: require('SnakeDirectionInput'),
    properties: {},

    onDeviceMotionEvent: function onDeviceMotionEvent(event) {
        this.setTargetVector(new o0.Vector2(event.acc).mod);
        //cc.log(event.acc.x + "   " + event.acc.y);
    },


    // use this for initialization
    onLoad: function onLoad() {
        this._super();
        var self = this;

        var listener = {
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function onTouchBegan(touch, event) {
                self.setTargetSpeeding(true);
                return true;
            },
            onTouchMoved: function onTouchMoved(touch, event) {
                return true;
            },
            onTouchEnded: function onTouchEnded(touch, event) {
                self.setTargetSpeeding(false);
                return true;
            }
        };
        cc.eventManager.addListener(listener, this.node);

        cc.systemEvent.setAccelerometerEnabled(true);
        cc.systemEvent.on(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
    },
    start: function start(dt) {},
    update: function update(dt) {}, /*
                                    test:function(){
                                      cc.log('mouse snake');
                                    },/** */

    onDestroy: function onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
    }
});

cc._RF.pop();