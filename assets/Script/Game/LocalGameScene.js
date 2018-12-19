var o0 = require('o0');
var o0CC = require('o0CC');
var o0Game = require('o0Game');

cc.Class({
    extends: require('GameScene'),

    properties: {
    },
    onLoad: function () {
        this._super();
        var self = this;
        
        cc.director.getCollisionManager().enabled = true;//碰撞检测
        
        this.respawnButton.o0ClickEvent.push(function () {
            self.playerSnake = self.addSnake('Snake','LocalControl',self.playerInput);
            self.playerSnake.name = self.playerName;
            self.playerSnake.skin = self.playerSkin;
            var newSnakePosition = o0.randomInCircle2(self.playGround.radius*2);
            self.playerSnake.head.x = newSnakePosition.x;
            self.playerSnake.head.y = newSnakePosition.y;
        });
    },
    
    start:function(){
        this._super();
        
        this.playerSnake = this.addSnake('Snake','LocalControl',this.playerInput);
        //this.playerSnake = this.addSnake('Snake','LocalControl','SnakeMouseInput');
        this.playerSnake.name = this.playerName;
        this.playerSnake.skin = this.playerSkin;
    },


    update: function (dt) {
        this._super();
        this.generateAISnake();
    },
});