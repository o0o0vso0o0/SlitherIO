var o0 = require('o0');
var o0CC = require('o0CC');
var o0Game = require('o0Game');


cc.Class({
    extends: require('SnakePositionInput'),
    properties: {
        viewRate:10,
        patientTimer:null,
        targetFoodNode:null,
    },
    // use this for initialization
    onLoad: function () {
        this._super();
        this.setControllByPosition(true);
        this.patientTimer = new o0.Timer(3);
    },
    update: function (dt) {
        if(this.control == null || this.control.snake == null){
            return;
        }
        this.radius = this.control.snake.radius*this.viewRate;

        //可以修改的部分
        //this.setTargetSpeeding(false);//设置是否加速
        //this.setTargetVector();//设置目标方向

        if(this.targetFoodNode == null || this.patientTimer.tryNextTiming()){
            //this.setControllByPosition(false);
            this.setTargetPosition(new o0.Vector2(0,0));
            this.targetFoodNode = null;
        }
        this._super();
    },
    onCollisionStay:function(other,self){
        if(other.node == null || other.node.active == false || this.node == null || this.node.active == false){//貌似能解决两蛇对撞导致卡死的bug
            return;
        }
        if(this.targetFoodNode == null && other.node.groupIndex == o0Game.GroupIndex.Food){
            //cc.log('dsadad');
            this.targetFoodNode = other.node;
            this.setTargetPosition(new o0.Vector2(this.targetFoodNode));
            //this.setControllByPosition(true);
            this.patientTimer.nextTiming();
        }/* */
    },
});