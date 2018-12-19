"use strict";
cc._RF.push(module, '69c5bcWU7dAB5hv0xapjMOS', 'SnakeTouchInput');
// Script/SnakeInput/SnakeTouchInput.js

'use strict';

var o0 = require('o0');
var o0CC = require('o0CC');
var o0Game = require('o0Game');

cc.Class({
    extends: require('SnakeDirectionInput'),
    properties: {
        touchLocation: null,
        speedingButton: null
    },
    // use this for initialization
    onLoad: function onLoad() {
        this._super();
        var self = this;

        this.speedingButton = o0CC.addScriptNode(this.control.snake.node, 'o0CCButton', 10);
        o0CC.setGroup(this.speedingButton, o0Game.GroupIndex.UI);
        this.speedingButton.node.x = this.control.snake.gameScene.canvas.node.width / 2 - 150;
        this.speedingButton.node.y = 0;
        this.speedingButton.node.width = 80;
        this.speedingButton.node.height = 80; /** */
        this.speedingButton.name = 'Boost';
        this.speedingButton.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            self.setTargetSpeeding(true);
        }, this);
        this.speedingButton.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            self.setTargetSpeeding(false);
        }, this); /** */

        this.touchLocation = new o0.Vector2(1, 0);
        //TOUCH_ONE_BY_ONE
        //TOUCH_ALL_AT_ONCE
        var listener = {
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function onTouchBegan(touch, event) {
                self.touchLocation = touch.getLocation();
                return true;
            },
            onTouchMoved: function onTouchMoved(touch, event) {
                self.touchLocation = touch.getLocation();
                return true;
            },
            onTouchEnded: function onTouchEnded(touch, event) {
                self.touchLocation = touch.getLocation();
                return true;
            }
        };
        cc.eventManager.addListener(listener, this.node);
    },
    start: function start(dt) {},
    update: function update(dt) {
        this._super();
        var localLocation = this.node.parent.convertToNodeSpaceAR(this.touchLocation);
        this.setTargetVector(new o0.Vector2(localLocation).mod);
    } /*
      test:function(){
        cc.log('mouse snake');
      },/** */
});

cc._RF.pop();