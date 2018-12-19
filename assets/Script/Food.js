var o0 = require('o0');
var o0CC = require('o0CC');
var o0Game = require('o0Game');

cc.Class({
    extends: cc.CircleCollider,

    properties: {
        score: {
            get: function (){
                return this._score;
            },
            set: function (value) {
                this._score = value;
                var scale = Math.sqrt(value);
                //var scale = 4;
                this.node.scaleX = scale;
                this.node.scaleY = scale;

                //cc.log(scale);
            }
        },
        //startDestory:false,
    },

    
    onLoad: function () {
        this.radius = 15;//圆碰撞体的局部变量
        //this.tag = o0Game.CollisionTag.Food;
        o0CC.setGroup(this,o0Game.GroupIndex.Food);
/*
        var graphics = this.node.addComponent(cc.Graphics);
        graphics.clear();
        graphics.circle(0, 0, this.radius);
        graphics.fillColor = cc.Color.GREEN;
        graphics.fill();/** */
        

        var particleSystem = this.node.addComponent(cc.ParticleSystem);
        /*
        cc.loader.loadRes("atom", function (err, plist) {
            particleSystem.file = plist;
        });/** */
        cc.loader.loadRes("food16-16", cc.SpriteFrame, function (err, spriteFrame) {
            particleSystem.spriteFrame = spriteFrame;
        });
        /*cc.loader.loadRes("food64-64", function (err, file) {
            particleSystem.spriteFrame = new cc.SpriteFrame(file, new cc.Rect(0, 0, 64, 64));
        });/** */
        particleSystem.playOnLoad = true;
        particleSystem.custom = true;
        particleSystem.duration = -1;
        particleSystem.emissionRate  = 1000;
        particleSystem.life = 10;
        particleSystem.lifeVar = 0;
        particleSystem.totalParticles = 1;
        var color = o0CC.randomBrightColor();
        particleSystem.startColor = new cc.Color(color.getR(), color.getG(), color.getB(), 1000);
        particleSystem.endColor = new cc.Color(color.getR(), color.getG(), color.getB(), 0);
        var ColorVar = new cc.Color(0, 0, 0, 0);
        particleSystem.startColorVar = ColorVar;
        particleSystem.endColorVar = ColorVar;/*** *//*
        particleSystem.startColor = new cc.Color(0, 0, 0, 1);
        particleSystem.endColor = new cc.Color(0, 0, 0, 1);
        particleSystem.startColorVar = new cc.Color(1, 1, 1, 0);
        particleSystem.endColorVar = new cc.Color(1, 1, 1, 0);/*** */
        particleSystem.angle = 0;
        particleSystem.angleVar = 0;
        particleSystem.startSize = 30;
        particleSystem.startSizeVar = 0;
        particleSystem.endSize = 30;
        particleSystem.endSizeVar = 0;
        particleSystem.startSpin = 0;
        particleSystem.startSpinVar = 0;
        particleSystem.endSpin = 0;
        particleSystem.endSpinVar = 0;
        particleSystem.sourcePos = new cc.v2(0,0);
        particleSystem.posVar = new cc.v2(0,0);
        particleSystem.positionType = cc.ParticleSystem.PositionType.GROUPED;
        particleSystem.emitterMode = cc.ParticleSystem.EmitterMode.RADIUS;
        particleSystem.startRadius = 0;
        particleSystem.startRadiusVar = 15;
        particleSystem.endRadius = 0;
        particleSystem.endRadiusVar = 15;
        particleSystem.rotatePerS = 0;
        particleSystem.rotatePerSVar = 300;
        particleSystem.SrcBlendFactor = cc.macro.BlendFactor.ONE;
        particleSystem.DstBlendFactor = cc.macro.BlendFactor.ONE_MINUS_SRC_ALPHA;/** */
        /*particleSystem.SrcBlendFactor = cc.macro.BlendFactor.SRC_ALPHA;
        particleSystem.DstBlendFactor = cc.macro.BlendFactor.ONE_MINUS_SRC_ALPHA;
        //particleSystem.DstBlendFactor = cc.macro.BlendFactor.ONE;/** */
         
        


        this.scheduleOnce(() => {
            this.node.destroy();
            //this.startDestory = true;
            //this.node.active = false;            
        }, 10);
    },  


/*
    update: function (dt) {
        if(this.node == null || this.node.isValid == false){
            cc.log("Memory leak: Food");
            return;
        }

        if(this.startDestory = true){
            if(this.node.opacity == 0){
                this.node.destroy();
            }
            this.node.opacity -= 1;
        }
    }/** */
});
