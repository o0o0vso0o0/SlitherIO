var o0 = require('o0');

module.exports = {
    /*
    destroyNode: function(node) {
        node.active = false;
        var components = node.getComponents();
        for(var i = 0;i<components.length;++i){
            components[i].destroy();
        }
        node.destroy();
    },/* */
    addScriptNode: function(parentNode,script) {
        var zIndex;
        switch(arguments.length) {
            default:
            case 2:
                zIndex = 0;
                break;
            case 3:
                zIndex = arguments[2];
                break;
        }
        var node = new cc.Node();
        var scriptComponent = node.addComponent(script);
        parentNode.addChild(node,zIndex);
        return scriptComponent;
    },
    addSpriteNode: function(parentNode,imageNameInResourceFile) {
        var zIndex;
        switch(arguments.length) {
            default:
            case 2:
                zIndex = 0;
                break;
            case 3:
                zIndex = arguments[2];
                break;
        }
        var node = new cc.Node();
        parentNode.addChild(node,zIndex);
        var sprite = node.addComponent(cc.Sprite);
        cc.loader.loadRes(imageNameInResourceFile, cc.SpriteFrame, function (err, spriteFrame) {
            sprite.spriteFrame = spriteFrame;
        });
        return sprite;
    },
    addGraphicNode: function(parentNode) {
        var zIndex;
        switch(arguments.length) {
            default:
            case 1:
                zIndex = 0;
                break;
            case 2:
                zIndex = arguments[1];
                break;
        }
        var node = new cc.Node();
        parentNode.addChild(node,zIndex);
        var component = node.addComponent(cc.Graphics);
        return component;
    },
    rotationFromVector: function(modVector){//rotation between 0-360 
        var rotation = modVector.angle(new o0.Vector2(1,0));
        if(modVector.y > 0)
            rotation = 360-rotation;
        return rotation;
    },
    vectorFromRotation: function(rotation){//rotation between 0-360 
        var radian = rotation/180*Math.PI;
        if(rotation<90)
            return new o0.Vector2(Math.cos(radian),-Math.sin(radian));
        if(rotation<180){
            radian = Math.PI - radian;
            return new o0.Vector2(-Math.cos(radian),-Math.sin(radian));
        }
        if(rotation<270){
            radian -= Math.PI;
            return new o0.Vector2(-Math.cos(radian),Math.sin(radian));
        }
        radian = Math.PI*2 - radian;/**/
        return new o0.Vector2(Math.cos(radian),Math.sin(radian));
    },
    nextRotation: function(currentRotation, targetRotation, turningSpeed){//rotation between 0-360 
        var rotationDifference = currentRotation - targetRotation;
        if(Math.abs(rotationDifference) <= turningSpeed
        ||Math.abs(rotationDifference+360) <= turningSpeed
        ||Math.abs(rotationDifference-360) <= turningSpeed)
            currentRotation = targetRotation;
        else if((rotationDifference > 0 && rotationDifference < 180)
        ||(rotationDifference > - 360 && rotationDifference < -180))
            currentRotation -= turningSpeed;
        else
            currentRotation += turningSpeed;
        if(currentRotation >= 360)
            currentRotation -= 360;
        if(currentRotation < 0)
            currentRotation += 360;
        return currentRotation;
    },
    setGroup:function(component,groupIndex){
        if(component.node.groupIndex==groupIndex){
            return;
        }
        component.node.active = false;
        component.scheduleOnce(() => {
            if(component!=null&&component.node!=null){
                component.node.groupIndex = groupIndex;
                component.node.active = true;
            }
        }, 0.1);/*用来解决cocos动态改变group的bug */
    },
    randomBrightColor:function(){
        var c = new cc.Color(Math.random()*255, Math.random()*255, Math.random()*255, 255);
        var rate = 255.0 / Math.max(c.getR(),c.getG(),c.getB(),c.getA());
        return new cc.Color(c.getR()*rate,c.getG()*rate,c.getB()*rate,255);
    },

    
};