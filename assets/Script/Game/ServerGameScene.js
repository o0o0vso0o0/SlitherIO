var o0 = require('o0');
var o0CC = require('o0CC');
var o0Game = require('o0Game');

cc.Class({
    extends: require('LocalGameScene'),

    properties: {
        serverUINode:null,
        serverUIPortBox:null,
        serverUIHostButton:null,
        serverIO:null,
    },
    onLoad: function () {
        this._super();
        
        var self = this;

        this.serverUINode = new cc.Node()
        this.node.addChild(this.serverUINode,10);
        
        this.serverUIPortBox = o0CC.addScriptNode(this.serverUINode,'o0CCEditBox',10);
        o0CC.setGroup(this.serverUIPortBox,o0Game.GroupIndex.UI);
        this.serverUIPortBox.node.anchorX = 0;
        this.serverUIPortBox.node.anchorY = 1;
        this.serverUIPortBox.node.x = 0;
        this.serverUIPortBox.node.y = 0;
        this.serverUIPortBox.node.width = 60;
        this.serverUIPortBox.node.height = 30;
        this.serverUIPortBox.maxLength = 5;
        this.serverUIPortBox.string = '6666';
        this.serverUIHostButton = o0CC.addScriptNode(this.serverUINode,'o0CCButton',10);
        o0CC.setGroup(this.serverUIHostButton,o0Game.GroupIndex.UI);
        this.serverUIHostButton.node.anchorX = 0;
        this.serverUIHostButton.node.anchorY = 1;
        this.serverUIHostButton.node.x = 60;
        this.serverUIHostButton.node.y = 0;
        this.serverUIHostButton.node.width = 60;
        this.serverUIHostButton.node.height = 30;
        this.serverUIHostButton.name = 'Host';
        this.serverUIHostButton.node.on(cc.Node.EventType.MOUSE_UP, function (event) {
            /*
            self.serverUIHostButton.interactable = false;
            if(self.serverIO == null){
                var socketIO = require('socket.io');
                self.serverIO = socketIO(self.serverUIPortBox.string);
                self.serverIO.on('connection', function (socket) {
                    socket.on('message', function () {
                        socket.send('hi');
                    });
                    socket.on('disconnect', function () {    
                    });
                });
                self.serverUIHostButton.name = 'Close';
            }else{
                self.serverIO.close();
                self.serverUIHostButton.name = 'Host';
            }
            self.serverUIHostButton.interactable = true;/** */
        }, this.serverUIHostButton);
    },
    
    update: function (dt) {
        this._super();

        this.serverUINode.x = -this.canvas.node.width/2 + 10;
        this.serverUINode.y = this.canvas.node.height/2 - 10;        
    },
});