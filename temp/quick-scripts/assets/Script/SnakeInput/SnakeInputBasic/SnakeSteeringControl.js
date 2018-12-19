(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/SnakeInput/SnakeInputBasic/SnakeSteeringControl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6c273f/F5NMqqHtyB0cpaZm', 'SnakeSteeringControl', __filename);
// Script/SnakeInput/SnakeInputBasic/SnakeSteeringControl.js

'use strict';

var o0 = require('o0');
var o0CC = require('o0CC');

cc.Class({
    extends: require('SnakeDirectionInput'),
    properties: {
        targetTurning: 0
    },
    setTargetTurning: function setTargetTurning(turning) {
        this.targetTurning = turning;
    },
    // use this for initialization
    onLoad: function onLoad() {
        this._super();
    },
    update: function update(dt) {
        this.control.setTargetVector(o0CC.vectorFromRotation(this.control.snake.head.rotation + this.targetTurning));
        this._super();
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
        //# sourceMappingURL=SnakeSteeringControl.js.map
        