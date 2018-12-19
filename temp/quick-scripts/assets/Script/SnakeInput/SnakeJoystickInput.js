(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/SnakeInput/SnakeJoystickInput.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '490c9r3dp5MSJvflJi3SoBw', 'SnakeJoystickInput', __filename);
// Script/SnakeInput/SnakeJoystickInput.js

'use strict';

var o0 = require('o0');
var o0CC = require('o0CC');
var o0Game = require('o0Game');

cc.Class({
    extends: require('SnakeDirectionInput'),
    properties: {
        touchLocation: null,
        moveLocation: null,
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

        var touchGraphic = o0CC.addScriptNode(this.control.snake.node, cc.Graphics, 9);
        o0CC.setGroup(touchGraphic, o0Game.GroupIndex.UI);
        //touchGraphic.groupIndex = o0Game.GroupIndex.UI;
        touchGraphic.clear();
        touchGraphic.circle(0, 0, 25);
        touchGraphic.fillColor = new cc.Color(255, 255, 255, 200);
        touchGraphic.fill();
        touchGraphic.node.x = -this.control.snake.gameScene.canvas.node.width / 2 + 200;
        touchGraphic.node.y = -this.control.snake.gameScene.canvas.node.height / 2 + 200;
        var moveGraphic = o0CC.addScriptNode(this.control.snake.node, cc.Graphics, 10);
        o0CC.setGroup(moveGraphic, o0Game.GroupIndex.UI);
        //moveGraphic.groupIndex = o0Game.GroupIndex.UI;
        moveGraphic.clear();
        moveGraphic.circle(0, 0, 20);
        moveGraphic.fillColor = new cc.Color(255, 255, 255, 150);
        moveGraphic.fill();
        moveGraphic.node.x = -this.control.snake.gameScene.canvas.node.width / 2 + 200;
        moveGraphic.node.y = -this.control.snake.gameScene.canvas.node.height / 2 + 200;

        this.touchLocation = new o0.Vector2(1, 0);
        //TOUCH_ONE_BY_ONE
        //TOUCH_ALL_AT_ONCE
        var listener = {
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function onTouchBegan(touch, event) {
                if (self.control == null) {
                    return false;
                }
                self.touchLocation = touch.getLocation();
                var localTouchLocation = self.control.snake.node.parent.convertToNodeSpaceAR(self.touchLocation);
                touchGraphic.node.active = true;
                touchGraphic.node.x = localTouchLocation.x;
                touchGraphic.node.y = localTouchLocation.y;
                return true;
            },
            onTouchMoved: function onTouchMoved(touch, event) {
                if (self.control == null) {
                    return false;
                }

                self.moveLocation = touch.getLocation();
                var localTouchLocation = self.control.snake.node.parent.convertToNodeSpaceAR(self.touchLocation);
                var localMoveLocation = self.control.snake.node.parent.convertToNodeSpaceAR(self.moveLocation);
                var vector = new o0.Vector2(localMoveLocation).minus(localTouchLocation);
                if (vector.length > 35) {
                    vector = vector.toLength(35);
                }
                moveGraphic.node.active = true;
                moveGraphic.node.x = touchGraphic.node.x + vector.x;
                moveGraphic.node.y = touchGraphic.node.y + vector.y;
                return true;
            },
            onTouchEnded: function onTouchEnded(touch, event) {
                self.touchLocation = null;
                if (touchGraphic.node != null) {
                    touchGraphic.node.active = false;
                }
                if (moveGraphic.node != null) {
                    moveGraphic.node.active = false;
                }
                return true;
            }
        };
        cc.eventManager.addListener(listener, this.node);
    },
    start: function start(dt) {},
    update: function update(dt) {
        this._super();
        if (this.touchLocation == null || this.moveLocation == null) {
            return;
        }
        var localTouchLocation = this.node.parent.convertToNodeSpaceAR(this.touchLocation);
        var localMoveLocation = this.node.parent.convertToNodeSpaceAR(this.moveLocation);
        this.setTargetVector(new o0.Vector2(localMoveLocation).minus(localTouchLocation).mod);
    } /*
      test:function(){
        cc.log('mouse snake');
      },/** */
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=SnakeJoystickInput.js.map
        