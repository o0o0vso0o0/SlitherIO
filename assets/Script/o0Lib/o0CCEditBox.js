var o0 = require('o0');
var o0CC = require('o0CC');
var o0Game = require('o0Game');

cc.Class({
    extends: cc.EditBox,

    properties: {
        //background:null,
        label:null,
    },

    o0EditingDidBegan:function(){
        this.label.node.active = true;
        this.label.string = this.string;
    },
    o0TextChanged:function(){
        this.label.string = this.string;
    },
    o0EditingDidEnded:function(){
        this.label.node.active = false;
    },/** */

    // use this for initialization
    onLoad: function () {    
        var self = this;

        cc.loader.loadRes('editbox', cc.SpriteFrame, function (err, spriteFrame) {
            self.backgroundImage = spriteFrame;
        });/** */

        //this.background = o0CC.addScriptNode(this.node,'cc.Graphics',0);
        
        //this.fontColor = cc.c4b(255,255,255,255)
        this.fontColor = new cc.color(255,255,255);

        this.label = o0CC.addScriptNode(this.node,'cc.Label',2);
        /*this.label.node.anchorX = 0;
        this.label.node.anchorY = 0;/** */
        //this.label.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        //this.label.verticalAlign = cc.Label.VerticalAlign.CENTER;
        //this.label.fontSize = 16;
        //this.label.lineHeight = 20;
        this.label.overflow = cc.Label.Overflow.SHRINK;
        this.label.color = new cc.Color(155,155,155);
        this.label.node.color = new cc.Color(155,155,155);
        this.label.enableWrapText = false;
        this.label.node.active = false;


        var o0EditingDidBeganHandler = new cc.Component.EventHandler();
        o0EditingDidBeganHandler.target = this.node;
        o0EditingDidBeganHandler.component = "o0CCEditBox";
        o0EditingDidBeganHandler.handler = "o0EditingDidBegan";
        o0EditingDidBeganHandler.emit([]);
        this.editingDidBegan.push(o0EditingDidBeganHandler);
        
        var o0TextChangedHandler = new cc.Component.EventHandler();
        o0TextChangedHandler.target = this.node;
        o0TextChangedHandler.component = "o0CCEditBox";
        o0TextChangedHandler.handler = "o0TextChanged";
        o0TextChangedHandler.emit([]);
        this.textChanged.push(o0TextChangedHandler);
        
        var o0editingDidEndedHandler = new cc.Component.EventHandler();
        o0editingDidEndedHandler.target = this.node;
        o0editingDidEndedHandler.component = "o0CCEditBox";
        o0editingDidEndedHandler.handler = "o0EditingDidEnded";
        o0editingDidEndedHandler.emit([]);
        this.editingDidEnded.push(o0editingDidEndedHandler);/** */

        //this.background.enabled = false;
    },    
    // called every frame
    update: function (dt) {
        /*
        this.background.clear();
        this.background.roundRect(this.node.width*(-this.node.anchorX),this.node.height*(-this.node.anchorY), this.node.width, this.node.height,3);
        this.background.fillColor = new cc.Color(50,50,50,250);
        this.background.fill();
        this.background.roundRect(this.node.width*(-this.node.anchorX), this.node.height*(-this.node.anchorY), this.node.width, this.node.height,3);
        this.background.strokeColor = new cc.Color(255,255,255,155);
        this.background.stroke();/** */

        this.label.node.anchorX = this.node.anchorX;
        this.label.node.anchorY = this.node.anchorY;
        this.label.node.x = 0;
        this.label.node.y = 0;
        this.label.node.width = this.node.width - 5;
        this.label.node.height = this.node.height;
        this.label.fontSize = this.node.height - 15;
    }
})