(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/SnakeInput/SnakeInputBasic/SnakePositionInput.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '63004hJuFlE7Zzz6IwZWtMA', 'SnakePositionInput', __filename);
// Script/SnakeInput/SnakeInputBasic/SnakePositionInput.js

'use strict';

var o0 = require('o0');
var o0CC = require('o0CC');

cc.Class({
    extends: require('SnakeDirectionInput'),
    properties: {
        targetPosition: null,
        controllByPosition: true
    },
    setTargetPosition: function setTargetPosition(position) {
        this.targetPosition = position;
    },
    setControllByPosition: function setControllByPosition(bool) {
        this.controllByPosition = bool;
    },
    // use this for initialization
    onLoad: function onLoad() {
        this.targetPosition = new o0.Vector2(1, 0);
        this._super();
    },
    update: function update(dt) {
        if (this.controllByPosition) this.setTargetVector(this.targetPosition.minus(this.node).mod);
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
        //# sourceMappingURL=SnakePositionInput.js.map
        