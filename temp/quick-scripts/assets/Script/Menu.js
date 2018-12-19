(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Menu.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '9ca35CIzUhIx4zqA23EHC93', 'Menu', __filename);
// Script/Menu.js

'use strict';

var o0 = require('o0');
var o0CC = require('o0CC');
var o0Game = require('o0Game');

cc.Class({
    extends: cc.Component,

    properties: {
        canvas: {
            default: null,
            type: cc.Canvas
        },
        camera: {
            default: null,
            type: cc.Camera
        },
        UICamera: {
            default: null,
            type: cc.Camera
        },
        gameScene: null,

        menuNode: null,
        nameBox: null,
        singlePlayerButton: null,
        connectAddressBox: null,
        multiplayerButton: null,

        backgroundGraphic: null,

        skinNode: null,
        skinDict: [],
        skinSnake: null,
        skinLabel: null,
        skinClearButton: null,

        inputArray: [],
        inputDict: [],
        currentInputIndex: 0,
        leftInputButton: null,
        rightInputButton: null,
        inputLabel: null
    },

    addSkin: function addSkin(name, x, y) {
        var self = this;

        var skinButton = o0CC.addScriptNode(this.skinNode, 'o0CCButtonNoImage', 10);
        o0CC.setGroup(this.multiplayerButton, o0Game.GroupIndex.UI);
        skinButton.node.x = x;
        skinButton.node.y = y;
        skinButton.node.width = 42;
        skinButton.node.height = 42; /** */
        skinButton.label.enabled = false;
        skinButton.o0ClickEvent.push(function () {
            //cc.log(name);
            self.skinSnake.addSkin(name);
        });

        cc.loader.loadRes('snake/' + name, cc.SpriteFrame, function (err, spriteFrame) {
            self.skinDict[name] = spriteFrame;
            skinButton.sprite.spriteFrame = spriteFrame;
        }); /** */
    },

    // use this for initialization
    onLoad: function onLoad() {
        //cc.director.setAnimationInterval(1.0/30);
        //cc.game.setFrameRate(30);//模拟器不能正常显示

        var self = this;
        cc.director.getPhysicsManager().enabled = true;

        //this.cocos.node.x;
        //node.parent = this.canvas.node;
        //this.label.node.parent = node;
        //this.label.node.x = 0;
        //this.label.node.y = 0;
        //this.label.string = this.text;

        //var Snake = require("Snake");
        //cc.log("oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo "+Snake);

        /*var snake = new cc.Node('snake');
        snake.parent = this.camera.node;
        snake.addComponent('Snake');/** */

        //newSnake(this.camera.node);

        this.menuNode = new cc.Node();
        this.node.addChild(this.menuNode, 1);

        this.nameBox = o0CC.addScriptNode(this.menuNode, 'o0CCEditBox', 10);
        o0CC.setGroup(this.nameBox, o0Game.GroupIndex.UI);
        this.nameBox.node.x = -240;
        this.nameBox.node.y = 100;
        this.nameBox.node.width = 200;
        this.nameBox.node.height = 40;
        this.nameBox.maxLength = 20;
        this.nameBox.string = 'Player-' + Math.floor(Math.random() * 1000);
        this.nameBox.placeholder = 'snake name';

        this.singlePlayerButton = o0CC.addScriptNode(this.menuNode, 'o0CCButton', 10);
        o0CC.setGroup(this.singlePlayerButton, o0Game.GroupIndex.UI);
        this.singlePlayerButton.node.x = -240;
        this.singlePlayerButton.node.y = 20;
        this.singlePlayerButton.node.width = 200;
        this.singlePlayerButton.node.height = 40; /** */
        this.singlePlayerButton.name = 'Play';
        this.singlePlayerButton.o0ClickEvent.push(function () {
            if (self.skinSnake.skin == null) {
                return;
            }
            self.gameScene = o0CC.addScriptNode(self.node, 'LocalGameScene', 0);
            self.gameScene.playerName = self.nameBox.string;
            self.gameScene.playerSkin = self.skinSnake.skin;
            self.gameScene.playerInput = self.inputArray[self.currentInputIndex];
            self.gameScene.skinSet = Object.keys(self.skinDict);
            self.gameScene.canvas = self.canvas;
            self.gameScene.camera = self.camera;
        });

        /*
        this.singlePlayerButton.node.on(cc.Node.EventType.MOUSE_UP, function (event) {
          self.gameScene = o0CC.addScriptNode(self.node,'LocalGameScene',0);
          self.gameScene.playerName = self.nameBox.string;
          self.gameScene.canvas = self.canvas;
          self.gameScene.camera = self.camera;
        }, this.singlePlayerButton);/** */

        this.connectAddressBox = o0CC.addScriptNode(this.menuNode, 'o0CCEditBox', 10);
        o0CC.setGroup(this.connectAddressBox, o0Game.GroupIndex.UI);
        this.connectAddressBox.node.x = -240;
        this.connectAddressBox.node.y = -60;
        this.connectAddressBox.node.width = 200;
        this.connectAddressBox.node.height = 40;
        this.connectAddressBox.maxLength = 21;
        this.connectAddressBox.string = 'localhost:6666';
        this.connectAddressBox.placeholder = 'address';

        this.multiplayerButton = o0CC.addScriptNode(this.menuNode, 'o0CCButton', 10);
        o0CC.setGroup(this.multiplayerButton, o0Game.GroupIndex.UI);
        this.multiplayerButton.node.x = -240;
        this.multiplayerButton.node.y = -100;
        this.multiplayerButton.node.width = 200;
        this.multiplayerButton.node.height = 40; /** */
        this.multiplayerButton.name = 'Join';
        this.multiplayerButton.o0ClickEvent.push(function () {
            if (self.skinSnake.skin == null) {
                return;
            }
            self.gameScene = o0CC.addScriptNode(self.node, 'RemoteGameScene', 0);
            self.gameScene.playerName = self.nameBox.string;
            self.gameScene.playerSkin = self.skinSnake.skin;
            self.gameScene.playerInput = self.inputArray[self.currentInputIndex];
            self.gameScene.skinSet = Object.keys(self.skinDict);
            self.gameScene.canvas = self.canvas;
            self.gameScene.camera = self.camera;
            self.gameScene.remoteUIAddress.string = self.connectAddressBox.string;
        });

        this.skinNode = new cc.Node();
        this.skinNode.parent = this.menuNode;
        this.skinNode.x = -50;
        this.skinNode.y = 150;

        this.addSkin("blue", 0, 0);
        this.addSkin("blueYellow", 60, 0);
        this.addSkin("green", 120, 0);
        this.addSkin("greenLightBlue", 180, 0);
        this.addSkin("lightBlue", 240, 0);
        this.addSkin("orangeYellow", 300, 0);
        this.addSkin("pink", 360, 0);
        this.addSkin("pinkBlue", 30, 50);
        this.addSkin("rainbow", 90, 50);
        this.addSkin("red", 150, 50);
        this.addSkin("redGreen", 210, 50);
        this.addSkin("redGreen2", 270, 50);
        this.addSkin("redGreen3", 330, 50);
        this.addSkin("yellow", 390, 50);

        //o0CCLabel

        this.skinLabel = o0CC.addScriptNode(this.skinNode, 'o0CCLabel', 10);
        o0CC.setGroup(this.skinLabel, o0Game.GroupIndex.UI);
        this.skinLabel.node.x = 80;
        this.skinLabel.node.y = 100;
        this.skinLabel.node.width = 200;
        this.skinLabel.node.height = 40;
        this.skinLabel.string = 'Choose Your Skin:'; /** */

        this.skinClearButton = o0CC.addScriptNode(this.skinNode, 'o0CCButton', 10);
        o0CC.setGroup(this.skinClearButton, o0Game.GroupIndex.UI);
        this.skinClearButton.node.x = 350;
        this.skinClearButton.node.y = 100;
        this.skinClearButton.node.width = 100;
        this.skinClearButton.node.height = 40; /** */
        this.skinClearButton.name = 'Reset';
        this.skinClearButton.o0ClickEvent.push(function () {
            self.skinSnake.clearSkin();
        });

        this.skinSnake = o0CC.addScriptNode(this.skinNode, 'SkinSampleSnake', 1);
        this.skinSnake.addSkin('lightBlue');
        this.skinSnake.addSkin('orangeYellow');
        this.skinSnake.addSkin('lightBlue');
        this.skinSnake.addSkin('orangeYellow');
        this.skinSnake.addSkin('lightBlue');
        this.skinSnake.addSkin('orangeYellow');
        this.skinSnake.addSkin('lightBlue');
        this.skinSnake.addSkin('orangeYellow');
        var control = this.skinSnake.head.addComponent("SkinSampleControl");
        control.targetPosition = new o0.Vector2(200, -200);
        control.setTargetVector(new o0.Vector2(1, 1).mod);
        //cc.log(control.targetVector.x+' '+control.targetVector.y);

        this.schedule(function () {
            control.setTargetVector(o0CC.vectorFromRotation(Math.random() * 360));
        }, 3);

        this.inputArray.push("SnakeJoystickInput");
        this.inputDict["SnakeJoystickInput"] = 'Joystick';
        this.inputArray.push("SnakeTouchInput");
        this.inputDict["SnakeTouchInput"] = 'Touch';
        this.inputArray.push("SnakeMouseInput");
        this.inputDict["SnakeMouseInput"] = 'Mouse';
        this.inputArray.push("SnakeAccelerometerInput");
        this.inputDict["SnakeAccelerometerInput"] = 'Accelerometer';
        this.inputArray.push("SnakeKeyboardArrowkeyInput");
        this.inputDict["SnakeKeyboardArrowkeyInput"] = 'Keyboard Arrow keys';
        this.inputArray.push("SnakeKeyboardSteeringInput");
        this.inputDict["SnakeKeyboardSteeringInput"] = 'Keyboard Steering';

        this.leftInputButton = o0CC.addScriptNode(this.menuNode, 'o0CCButton', 10);
        o0CC.setGroup(this.leftInputButton, o0Game.GroupIndex.UI);
        this.leftInputButton.node.x = -150;
        this.leftInputButton.node.y = -this.canvas.node.height / 2 + 40;
        this.leftInputButton.node.width = 40;
        this.leftInputButton.node.height = 40; /** */
        this.leftInputButton.name = '<';
        this.leftInputButton.o0ClickEvent.push(function () {
            self.currentInputIndex -= 1;
            if (self.currentInputIndex < 0) {
                self.currentInputIndex += self.inputArray.length;
            }
            self.inputLabel.string = "Control: " + self.inputDict[self.inputArray[self.currentInputIndex]];
        });

        this.rightInputButton = o0CC.addScriptNode(this.menuNode, 'o0CCButton', 10);
        o0CC.setGroup(this.rightInputButton, o0Game.GroupIndex.UI);
        this.rightInputButton.node.x = 150;
        this.rightInputButton.node.y = -this.canvas.node.height / 2 + 40;
        this.rightInputButton.node.width = 40;
        this.rightInputButton.node.height = 40; /** */
        this.rightInputButton.name = '>';
        this.rightInputButton.o0ClickEvent.push(function () {
            self.currentInputIndex += 1;
            if (self.currentInputIndex >= self.inputArray.length) {
                self.currentInputIndex -= self.inputArray.length;
            }
            self.inputLabel.string = "Control: " + self.inputDict[self.inputArray[self.currentInputIndex]];
        });

        this.inputLabel = o0CC.addScriptNode(this.menuNode, 'o0CCLabel', 10);
        o0CC.setGroup(this.inputLabel, o0Game.GroupIndex.UI);
        this.inputLabel.node.x = 0;
        this.inputLabel.node.y = -this.canvas.node.height / 2 + 40;
        this.inputLabel.node.width = 250;
        this.inputLabel.node.height = 40; /** */
        this.inputLabel.string = "Control: " + self.inputDict[self.inputArray[self.currentInputIndex]];

        /*
        this.gameScene = o0CC.addScriptNode(this.node,'GameScene',0);
        this.gameScene.canvas = this.canvas;
        this.gameScene.camera = this.camera;/** */
        this.backgroundGraphic = this.menuNode.addComponent(cc.Graphics, 0);
        o0CC.setGroup(this.backgroundGraphic, o0Game.GroupIndex.UI);
    },

    // called every frame
    update: function update(dt) {
        if (this.gameScene == null || this.gameScene.node == null) {
            this.menuNode.active = true;
        } else {
            this.menuNode.active = false;
        }

        if (this.menuNode.active == true) {
            this.backgroundGraphic.clear();
            this.backgroundGraphic.lineWidth = 1;
            var time = new Date().getTime();
            for (var i = parseInt(-this.canvas.node.width / 2); i < parseInt(this.canvas.node.width / 2 * 1.2); ++i) {
                this.backgroundGraphic.moveTo(i, -this.canvas.node.height / 2);
                this.backgroundGraphic.lineTo(i - parseInt(this.canvas.node.width / 2 * 0.2), this.canvas.node.height / 2);
                var color = Math.abs(Math.cos(i / 20 + Math.tan(time / 5000) * 5)) * 50;
                this.backgroundGraphic.strokeColor = new cc.Color(color, color * 1.1, color * 1.2, 100);
                this.backgroundGraphic.stroke();
            }
            for (var i = parseInt(-this.canvas.node.height / 2); i < parseInt(this.canvas.node.height / 2 * 1.2); ++i) {
                this.backgroundGraphic.moveTo(-this.canvas.node.width / 2, i - parseInt(this.canvas.node.height / 2 * 0.2));
                this.backgroundGraphic.lineTo(this.canvas.node.width / 2, i);
                var color = Math.abs(Math.cos(i / 20 + Math.sin(time / 2000) * 10)) * 50;
                this.backgroundGraphic.strokeColor = new cc.Color(color, color * 1.1, color * 1.2, 100);
                this.backgroundGraphic.stroke();
            }
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
        //# sourceMappingURL=Menu.js.map
        