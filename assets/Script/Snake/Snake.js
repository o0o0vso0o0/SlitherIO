var o0 = require('o0');
var o0CC = require('o0CC');
var o0Game = require('o0Game');


cc.Class({
    extends: cc.CircleCollider,

    properties: {
        //bodyParentNode: null,
        gameScene: null,
        head:null,
        body:[cc.Node],
        size:40,//大小，直径
        //bodySize: this.radius 子类CircleCollider的变量
        score: 0,
        color:null,
        bodyLength: {
            get: function (){
                return this.score / Math.pow(this.body[0].scaleX * this.body[0].scaleY,1.5);
            }
        },
        skin:null,
        nameLabel:null,
    },

    setScore:function(score){
        this.score = score;
        this.updateScale();
        var targetBodyLength = Math.ceil(this.bodyLength);
        while(targetBodyLength > this.body.length){
            this.addBody();
        }
        while(targetBodyLength < this.body.length && this.body.length > 1){
            this.removeBody();
        }
    },
    updateScale:function(){
        var newScale = Math.pow(1+(this.score - 10)/50,1.0/3);
        for(var i=0;i<this.body.length;++i){
            this.body[i].scaleX = newScale;
            this.body[i].scaleY = newScale;
        }
    },
    addEyeGraphic:function(node){
        var graphics = node.addComponent(cc.Graphics,10);
        graphics.clear();
        graphics.circle(12, 10, 10);
        graphics.circle(12, -10, -10);
        graphics.fillColor = cc.Color.WHITE;
        graphics.fill();
        graphics.circle(13, 9, 6);
        graphics.circle(13, -9, 6);
        graphics.fillColor = cc.Color.BLACK;
        graphics.fill();
        return graphics;
    },
    addGraphic:function(node){
        var graphics = node.addComponent(cc.Graphics);
        graphics.clear();
        graphics.circle(0, 0, this.radius);
        graphics.fillColor = cc.Color.YELLOW;
        graphics.fill();
        graphics.circle(15, 0, 5);
        graphics.fillColor = cc.Color.RED;
        graphics.fill();
        return graphics;
    },
    addGraphic2:function(node){
        var graphics = node.addComponent(cc.Graphics);
        graphics.clear();
        graphics.circle(0, 0, this.radius);
        graphics.fillColor = cc.Color.YELLOW;
        graphics.fill();
        graphics.circle(-15, 0, 5);
        graphics.fillColor = cc.Color.GRAY;
        graphics.fill();
    },    
    addHead:function(){
        this.head = new cc.Node('head');
        this.body.push(this.head);
        this.head.parent = this.node;
        this.head.rotation = Math.random() * 360;
        //Graphic.
        var eyeNode = new cc.Node();
        eyeNode.parent = this.head;
        eyeNode.zIndex = 3;
        var Graphic = this.addEyeGraphic(eyeNode);

        this.nameLabel = o0CC.addScriptNode(this.head,'cc.Label',20);
        this.nameLabel.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        this.nameLabel.verticalAlign = cc.Label.VerticalAlign.TOP;
        this.nameLabel.node.color = new cc.Color(255,255,255);
        this.nameLabel.node.anchorX = 0;
        this.nameLabel.node.anchorY = 0;
        this.nameLabel.node.x = 0;
        this.nameLabel.node.y = 0;
        this.nameLabel.node.height = 300;
        this.nameLabel.fontSize = 20;
        this.nameLabel.node.anchorX = 0.5;
        this.nameLabel.node.anchorY = 0.5;
        
        var graphics = this.head.addComponent('cc.Graphics');
        o0CC.setGroup(graphics,o0Game.GroupIndex.Head);
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

        var collider = this.body[i].addComponent('cc.CircleCollider');
        //collider.tag = o0Game.CollisionTag.Body;
        collider.radius = this.radius;

        var sprite = o0CC.addScriptNode(this.body[this.body.length-1],'cc.Sprite',2);
        //var sprite = this.body[this.body.length-1].addComponent(cc.Sprite,0);
        sprite.trim = true;
        sprite.type = cc.Sprite.Type.SLICED;
        sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        sprite.SrcBlendFactor = cc.macro.BlendFactor.SRC_ALPHA;
        sprite.DstBlendFactor = cc.macro.BlendFactor.ONE_MINUS_SRC_ALPHA;
        sprite.node.width = this.size;
        sprite.node.height = this.size;
        cc.loader.loadRes('snake/'+this.skin[(this.body.length-1)%this.skin.length], cc.SpriteFrame, function (err, spriteFrame) {
            sprite.spriteFrame = spriteFrame;
        });
        
        var graphics = this.body[i].addComponent('cc.Graphics');
        o0CC.setGroup(graphics,o0Game.GroupIndex.Body);
    },
    removeBody:function(){
        if(this.body.length == 1)
            return;
        //this.body[this.body.length-1].getComponent('cc.CircleCollider').destroy();
        this.body[this.body.length-1].destroy();
        this.body.pop();
    },
    removeAllBody:function(){
        for(;this.body.length>1;){
            this.removeBody();
        }
    },

    // use this for initialization
    onLoad: function () {
        this.radius = 20;//圆碰撞体的局部变量
        this.color = o0CC.randomBrightColor();
        this.addHead();
		//cc.log('snake log');
    },
    start: function () {

        var sprite = o0CC.addScriptNode(this.head,cc.Sprite,1);
        //var sprite = this.head.addComponent(cc.Sprite,0);
        sprite.trim = true;
        sprite.type = cc.Sprite.Type.SLICED;
        sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        sprite.SrcBlendFactor = cc.macro.BlendFactor.SRC_ALPHA;
        sprite.DstBlendFactor = cc.macro.BlendFactor.ONE_MINUS_SRC_ALPHA;        
        sprite.node.width = this.size;
        sprite.node.height = this.size;

        //var sprite = this.body[0].getComponent(cc.Sprite);
        cc.loader.loadRes('snake/'+this.skin[0], cc.SpriteFrame, function (err, spriteFrame) {
            sprite.spriteFrame = spriteFrame;
        });
    },

    lateUpdate:function(){
        if(this.nameLabel!=null){ 
            if(this.nameLabel.string==null||this.nameLabel.string==''){
                this.nameLabel.string = this.name+'\n\n';/** */
            }
            this.nameLabel.node.rotation = -this.head.rotation;
        }
    },
/*
    // called every frame
    update: function (dt) {
    },
    onCollisionEnter:function(other,self){
    },
    onCollisionExit:function(other,self){
    },/** */
    _onPreDestroy:function(){
        //cc.log('dsada');
        /*
        while(this.body.length > 1){
            this.removeBody();
        }/** */
    },/*
    test:function(){
        cc.log('snake');
    },/** */
});
//module.exports = Snake;