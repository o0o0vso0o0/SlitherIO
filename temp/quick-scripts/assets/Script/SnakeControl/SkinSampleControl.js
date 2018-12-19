(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/SnakeControl/SkinSampleControl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '92716Ba7rxJSJHC3JJpqwQp', 'SkinSampleControl', __filename);
// Script/SnakeControl/SkinSampleControl.js

'use strict';

var o0 = require('o0');
var o0CC = require('o0CC');
var o0Game = require('o0Game');

cc.Class({
    extends: require('LocalControl'),

    properties: {
        targetPosition: null
    },
    start: function start() {

        //this.fixedTimer = new o0.FixedTimerDT(60);
    },
    update: function update(dt) {
        this._super();

        var transferVector = this.targetPosition.minus(this.snake.head);
        for (var i = 0; i < this.snake.body.length; ++i) {
            this.snake.body[i].x += transferVector.x;
            this.snake.body[i].y += transferVector.y;
        } /** */
    }
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
        //# sourceMappingURL=SkinSampleControl.js.map
        