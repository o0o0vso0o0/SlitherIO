(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Snake/SkinSampleSnake.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'c9acfPSgqdB45mus0AHDb2R', 'SkinSampleSnake', __filename);
// Script/Snake/SkinSampleSnake.js

'use strict';

var o0 = require('o0');
var o0CC = require('o0CC');
var o0Game = require('o0Game');

cc.Class({
    extends: require('Snake'),

    addSkin: function addSkin(name) {
        if (this.skin == null) {
            this.skin = [];
            this.skin.push(name);
        } else if (this.skin.length >= 20) {
            return;
        } else {
            this.skin.push(name);
            this.addBody();
        }
        var sprite = this.body[this.body.length - 1].getComponent(cc.Sprite);
        cc.loader.loadRes('snake/' + name, cc.SpriteFrame, function (err, spriteFrame) {
            sprite.spriteFrame = spriteFrame;
        });
    },
    clearSkin: function clearSkin() {
        this.skin = null;
        this.removeAllBody();
        var sprite = this.body[0].getComponent(cc.Sprite);
        sprite.spriteFrame = null;
    },

    addHead: function addHead() {
        this.head = new cc.Node('head');
        this.body.push(this.head);
        this.head.parent = this.node;
        this.head.rotation = Math.random() * 360;
        //Graphic.

        var sprite = this.body[this.body.length - 1].addComponent(cc.Sprite, 0);
        sprite.trim = true;
        sprite.type = cc.Sprite.Type.SLICED;
        sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        sprite.SrcBlendFactor = cc.macro.BlendFactor.SRC_ALPHA;
        sprite.DstBlendFactor = cc.macro.BlendFactor.ONE_MINUS_SRC_ALPHA;
        o0CC.setGroup(sprite, o0Game.GroupIndex.UI);
        sprite.node.width = this.size;
        sprite.node.height = this.size;

        var eyeNode = new cc.Node();
        eyeNode.parent = this.head;
        var Graphic = this.addEyeGraphic(eyeNode);
    },
    addBody: function addBody() {
        if (this.node.active == false) return;
        var i = this.body.length;
        this.body.push(new cc.Node('body' + i));
        this.node.addChild(this.body[i], -i);
        this.body[i].x = this.body[i - 1].x;
        this.body[i].y = this.body[i - 1].y;
        this.body[i].rotation = this.body[i - 1].rotation;

        var collider = this.body[i].addComponent('cc.CircleCollider');
        //collider.tag = o0Game.CollisionTag.Body;
        collider.radius = this.radius;

        var sprite = this.body[this.body.length - 1].addComponent(cc.Sprite, 0);
        sprite.trim = true;
        sprite.type = cc.Sprite.Type.SLICED;
        sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        sprite.SrcBlendFactor = cc.macro.BlendFactor.SRC_ALPHA;
        sprite.DstBlendFactor = cc.macro.BlendFactor.ONE_MINUS_SRC_ALPHA;
        o0CC.setGroup(sprite, o0Game.GroupIndex.UI);
        sprite.node.width = this.size;
        sprite.node.height = this.size;
    },
    start: function start() {} //必须保留
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
        //# sourceMappingURL=SkinSampleSnake.js.map
        