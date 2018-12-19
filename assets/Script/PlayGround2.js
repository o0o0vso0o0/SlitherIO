var o0 = require('o0');
var o0CC = require('o0CC');
var o0Game = require('o0Game');

cc.Class({
    extends: cc.CircleCollider,

    properties: {
        canvas:null,
        camera:null,
        backgroundGraphic:null,
    },

    
    onLoad: function () {
        this.radius = 2000;
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

        this.backgroundGraphic = this.node.addComponent(cc.Graphics);
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
    lateUpdate: function (dt) {
        var patternSize = 0;
        var rectPos = this.camera.node.convertToWorldSpaceAR(cc.v2(0,0));
        rectPos = new o0.Vector2(this.node.convertToNodeSpaceAR(rectPos));
        var rectHalfSize= new o0.Vector2(this.node.convertToNodeSpaceAR(cc.v2(-patternSize,-patternSize))).multiply(-1/ this.camera.zoomRatio);//坐标换算不吃camera的radio
        rectPos = rectPos.minus(rectHalfSize);
        var rectSize = rectHalfSize.multiply(2);

        this.backgroundGraphic.clear();
        this.backgroundGraphic.lineWidth = 1;
        for(var i = parseInt(rectPos.x);i<parseInt(rectPos.x+rectSize.x*1.1);++i){
            this.backgroundGraphic.moveTo(i,parseInt(rectPos.y));
            this.backgroundGraphic.lineTo(i-parseInt(rectSize.x*0.1),parseInt(rectPos.y+rectSize.y));
            var color = Math.abs(Math.cos(i/50)) * 50;
            this.backgroundGraphic.strokeColor = new cc.Color(color,color*1.1,color*1.2,100);
            this.backgroundGraphic.stroke();
        }
        for(var i= parseInt(rectPos.y);i<parseInt(rectPos.y+rectSize.y*1.1);++i){
            this.backgroundGraphic.moveTo(parseInt(rectPos.x),i-parseInt(rectSize.y*0.1));
            this.backgroundGraphic.lineTo(parseInt(rectPos.x+rectSize.x),i);
            var color = Math.abs(Math.cos(i/50)) * 50;
            this.backgroundGraphic.strokeColor = new cc.Color(color,color*1.1,color*1.2,100);
            this.backgroundGraphic.stroke();/** */
        }
    },

});