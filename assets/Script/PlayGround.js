var o0 = require('o0');
var o0CC = require('o0CC');
var o0Game = require('o0Game');

cc.Class({
    extends: cc.CircleCollider,

    properties: {
        backgroundPattern:[],
        canvas:null,
        camera:null,
    },

    
    onLoad: function () {
        this.radius = 3000;
        //this.tag = o0Game.CollisionTag.PlayGround;

        var displayRadius = this.radius+40;

        o0CC.setGroup(this,o0Game.GroupIndex.PlayGround);
        var background = this.node.addComponent(cc.Graphics);
        background.clear();
        background.circle(0, 0, displayRadius*2);
        background.fillColor = new cc.Color(155, 23, 33, 255);
        background.fill();/** */
        background.circle(0, 0, displayRadius);
        background.fillColor = new cc.Color(16, 23, 33, 255);
        background.fill();/** */

        var boundary = o0CC.addGraphicNode(this.node,1);
        boundary.clear();
        for(var i = 0;i<100;++i){
            boundary.circle(0, 0, displayRadius-100+i);
            boundary.strokeColor = new cc.Color(16+i/2, 23, 33, i*2.5);
            boundary.stroke();
        }
    },

    start:function(){        
        var listener = {
            event: cc.EventListener.MOUSE,
            onMouseDown: function (event) { 
            },
            onMouseUp: function (event) {
                cc.log();
            },
            onMouseMove: function (event) {
                //self.mouseLocation = event.getLocation();
            },
            onMouseScroll: function (event) {
            }
        }
        cc.eventManager.addListener(listener, this.node);
    },
    addBackgroundPattern(){
        var newPattern = o0CC.addSpriteNode(this.node,'background',0).node;
        this.backgroundPattern.push(newPattern);
        newPattern.scaleX = 1;
        newPattern.scaleY = 1;
        newPattern.rotation = 10;
    },
    update: function (dt) {
        var patternSize = 100;
        //var rectPos = this.camera.node.convertToNodeSpaceAR(cc.v2(0,0));
        var rectPos = this.camera.node.convertToWorldSpaceAR(cc.v2(0,0));
        rectPos = new o0.Vector2(this.node.convertToNodeSpaceAR(rectPos));
        var rectHalfSize= new o0.Vector2(this.node.convertToNodeSpaceAR(cc.v2(-patternSize,-patternSize))).multiply(-1/ this.camera.zoomRatio);//坐标换算不吃camera的radio
        rectPos = rectPos.minus(rectHalfSize);
        var rectSize = rectHalfSize.multiply(2);

        var patternPositions = o0.arrangeInRect2(new o0.Rect(rectPos,rectSize),new o0.Vector2(0,0),new o0.Vector2(50,-9),new o0.Vector2(25,32.5));
        var difference = this.backgroundPattern.length - patternPositions.length;
        for(var i=0;i<-difference;++i){
            this.addBackgroundPattern();
        }
        for(var i = 0;i<patternPositions.length;++i){
            this.backgroundPattern[i].x = patternPositions[i].x;
            this.backgroundPattern[i].y = patternPositions[i].y;
            var scale = 1-(Math.sin(patternPositions[i].x)+Math.sin(patternPositions[i].y))*0.1;
            this.backgroundPattern[i].scaleX = scale;
            this.backgroundPattern[i].scaleY = scale;
        }
    },

});