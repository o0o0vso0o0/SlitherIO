(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/SnakeControl/RemoteControl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '166f5ToEDBKjroYKlQiXsZl', 'RemoteControl', __filename);
// Script/SnakeControl/RemoteControl.js

'use strict';

var o0 = require('o0');
var o0CC = require('o0CC');
var o0Game = require('o0Game');

cc.Class({
    extends: require('LocalControl'),

    properties: {
        remotePosition: null
    },
    update: function update(dt) {
        if (this.node == null || this.node.isValid == false) {
            cc.log("Memory leak: Control");
        }

        if (this.isValid == false || this.node == null || this.node.isValid == false || this.snake == null) {
            return;
        }
        this.updateBodySpacing();
        this.updateSpeed();
        //for(var t = 0;t<this.fixedTimer.fixedUpdateTimes(dt);++t){


        for (var t = 0; t < 1; ++t) {

            var speedRate;
            if (this.snake.score <= this.minScore) speedRate = this.normalSpeedRate;else {
                speedRate = this.targetSpeedRate;
            }

            for (var i = 0; i < speedRate; ++i) {
                this.targetRotation = o0CC.rotationFromVector(this.targetVector);
                this.snake.head.rotation = o0CC.nextRotation(this.snake.head.rotation, this.targetRotation, this.turningSpeed);

                if (this.remotePosition != null) {
                    //this.snake.head.x = this.remotePosition.x;
                    //this.snake.head.y = this.remotePosition.y;
                    var maximumSynchronizationDistance = this.speed * 1.1;
                    var targetVector = this.remotePosition.minus(new o0.Vector2(this.snake.head.x, this.snake.head.y));
                    if (targetVector.length <= maximumSynchronizationDistance) {
                        this.snake.head.x = this.remotePosition.x;
                        this.snake.head.y = this.remotePosition.y;
                    } else {
                        targetVector = targetVector.toLength(maximumSynchronizationDistance + (targetVector.length - maximumSynchronizationDistance) * 0.2);
                        this.snake.head.x += targetVector.x;
                        this.snake.head.y += targetVector.y;
                    }
                }

                this.updateSnakeBody();
            }
        }
        this.pulsatingFeedback();
    },
    onCollisionEnter: function onCollisionEnter(other, self) {},
    onCollisionExit: function onCollisionExit(other, self) {} //必须覆盖为空白
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
        //# sourceMappingURL=RemoteControl.js.map
        