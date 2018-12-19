(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/SnakeInput/SnakeMouseInput.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b6b43R6rXxKmbARziIByDgg', 'SnakeMouseInput', __filename);
// Script/SnakeInput/SnakeMouseInput.js

'use strict';

var o0 = require('o0');
var o0CC = require('o0CC');

cc.Class({
    extends: require('SnakeDirectionInput'),
    properties: {
        mouseLocation: null
    },
    // use this for initialization
    onLoad: function onLoad() {
        this._super();
        var self = this;

        this.mouseLocation = new o0.Vector2(1, 0);

        var listener = {
            event: cc.EventListener.MOUSE,
            onMouseDown: function onMouseDown(event) {
                self.setTargetSpeeding(true);
            },
            onMouseUp: function onMouseUp(event) {
                self.setTargetSpeeding(false);
            },
            onMouseMove: function onMouseMove(event) {
                self.mouseLocation = event.getLocation();
            },
            onMouseScroll: function onMouseScroll(event) {}
        };
        cc.eventManager.addListener(listener, this.node);
    },
    update: function update(dt) {
        this._super();
        var localLocation = this.node.parent.convertToNodeSpaceAR(this.mouseLocation);
        this.setTargetVector(new o0.Vector2(localLocation).mod);
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
        //# sourceMappingURL=SnakeMouseInput.js.map
        