(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/SnakeInput/SnakeKeyboardArrowkeyInput.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '7dfd5magJ5BabfAM4i7ZdFF', 'SnakeKeyboardArrowkeyInput', __filename);
// Script/SnakeInput/SnakeKeyboardArrowkeyInput.js

'use strict';

var o0 = require('o0');
var o0CC = require('o0CC');

cc.Class({
    extends: require('SnakeDirectionInput'),
    properties: {
        keyDirection: null,
        key: null,
        speedingKey: 0
    },
    onLoad: function onLoad() {
        this._super();

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        this.keyDirection = new Array();
        this.keyDirection[cc.macro.KEY.right] = new o0.Vector2(1, 0);
        this.keyDirection[cc.macro.KEY.left] = new o0.Vector2(-1, 0);
        this.keyDirection[cc.macro.KEY.up] = new o0.Vector2(0, 1);
        this.keyDirection[cc.macro.KEY.down] = new o0.Vector2(0, -1);
        this.keyDirection[cc.macro.KEY.d] = new o0.Vector2(1, 0);
        this.keyDirection[cc.macro.KEY.a] = new o0.Vector2(-1, 0);
        this.keyDirection[cc.macro.KEY.w] = new o0.Vector2(0, 1);
        this.keyDirection[cc.macro.KEY.s] = new o0.Vector2(0, -1);
        this.key = new Array();
        this.speedingKey = cc.macro.KEY.space;
    },
    onDestroy: function onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    update: function update(dt) {
        var targetVector = new o0.Vector2(0, 0);
        for (var _key in this.keyDirection) {
            if (this.key[_key] == true) {
                targetVector = targetVector.plus(this.keyDirection[_key]);
            }
        }
        if (this.keyDirection.length != 0 && targetVector.length != 0) {
            this.setTargetVector(targetVector.mod);
        } else {
            this.removeTargetVector();
        }

        this._super();
    },

    onKeyDown: function onKeyDown(event) {
        if (this.keyDirection[event.keyCode] != null) {
            this.key[event.keyCode] = true;
        }
        if (event.keyCode == this.speedingKey) {
            this.setTargetSpeeding(true);
        }
    },
    onKeyUp: function onKeyUp(event) {
        if (this.keyDirection[event.keyCode] != null) {
            this.key[event.keyCode] = false;
        }
        if (event.keyCode == this.speedingKey) {
            this.setTargetSpeeding(false);
        }
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
        //# sourceMappingURL=SnakeKeyboardArrowkeyInput.js.map
        