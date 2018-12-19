(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Snake/RemoteSnake.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e83d6SRj6tBQozEKzhnxnlW', 'RemoteSnake', __filename);
// Script/Snake/RemoteSnake.js

'use strict';

var o0 = require('o0');
var o0CC = require('o0CC');
var o0Game = require('o0Game');

cc.Class({
    extends: require('Snake'),

    properties: {} /*
                   addHead:function(){
                       this.head = new cc.Node('head');
                     this.body.push(this.head);
                     this.head.parent = this.node;
                     this.head.rotation = Math.random() * 360;
                       //this.tag = o0Game.CollisionTag.Head;
                       this.addGraphic(this.head);
                   },
                   addBody:function(){
                     if(this.node.active == false)
                         return;
                     var i = this.body.length;
                     this.body.push(new cc.Node('body'+i));
                     this.node.addChild(this.body[i],-i);
                     this.body[i].x = this.body[i-1].x;
                     this.body[i].y = this.body[i-1].y;
                     this.body[i].rotation = this.body[i-1].rotation;
                       this.addGraphic2(this.body[i]);
                   },/** */
});
//module.exports = Snake;

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
        //# sourceMappingURL=RemoteSnake.js.map
        