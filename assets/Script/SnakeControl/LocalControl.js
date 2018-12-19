var o0 = require('o0');
var o0CC = require('o0CC');
var o0Game = require('o0Game');


cc.Class({
    extends: cc.CircleCollider,

    properties: {
        speed: 1,//per frame
        turningSpeed: 6,//degree per frame
        normalSpeedRate: 1,//加速时的速度比率
        speedingSpeedRate: 3,//加速时的速度比率
        targetSpeedRate: 1,//当前速度比率
        isSpeeding: {
            get: function (){
                return this.targetSpeedRate != this.normalSpeedRate;
            }
        },

        targetVector:null,
        
        bodySpacingRate: 0.4,//rate of size
        bodySpacing: 0,

        pulledScore: 0,
        pullScoreThreshold: {
            get: function (){
                return Math.pow(this.snake.body[0].scaleX * this.snake.body[0].scaleY,1) * 2;
            }
        },
        pullScoreRate:0.7,//the rate means remove 1 score from snake, and 0.5 score will come out to be food. 
        speedingScoreCost: 0.1,//score cost per frame speeding 
        minScore: 5,
        snake:null,
        fixedTimer:null,
    },
    updateSpeed:function(){
        this.speed = 5 * Math.pow(this.snake.body[0].scaleX * this.snake.body[0].scaleY,1.0/3);
    },
    updateBodySpacing:function(){
        this.bodySpacing = this.radius*2 * this.bodySpacingRate * Math.sqrt(this.snake.body[0].scaleX * this.snake.body[0].scaleY);
    },
    setTargetSpeeding:function(bool){
        if(!bool)
            this.targetSpeedRate = this.normalSpeedRate;
        else
            this.targetSpeedRate = this.speedingSpeedRate;
    },
    setTargetVector:function(vector){
        this.targetVector = vector;
    },
    removeTargetVector:function(){
        this.setTargetVector(o0CC.vectorFromRotation(this.snake.head.rotation));
    },
    addScore: function (score) {
        if(this.snake == null){
            return;
        }
           
        this.snake.setScore(this.snake.score + score);
        //this.snake.score += score;
        //this.snake.updateScale();
        this.updateBodySpacing();
        this.updateSpeed();
        /*var targetBodyLength = Math.ceil(this.snake.bodyLength);
        while(targetBodyLength > this.snake.body.length){
            this.snake.addBody();
        }/** */
    },
    pullFood: function (score) {
        var newFood = o0CC.addScriptNode(this.snake.gameScene.foodNode,'Food',-100);
        var lastBody = this.snake.body[this.snake.body.length-1];
        var foodPosition = o0.randomInCircle2(lastBody,(this.radius-newFood.radius)*2);
        newFood.node.x = foodPosition.x;
        newFood.node.y = foodPosition.y;
        newFood.score = score;
        newFood.node.name = ''+(this.snake.gameScene.foodIDcounter++);
    },
    pullAllFood: function () {
        var pullScoreThreshold = this.pullScoreThreshold;
        while(this.snake.score >= 1){
            this.pullScore(1,pullScoreThreshold);
        }
    },
    pullScore:function(score){  
        this.snake.setScore(this.snake.score - score);      
        //this.snake.score -= score;
        //this.snake.updateScale();
        this.updateBodySpacing();
        this.updateSpeed();
        this.pulledScore += score * this.pullScoreRate;

        var pullScoreThreshold;
        if(arguments.length < 2){
            pullScoreThreshold = this.pullScoreThreshold;
        }else{
            pullScoreThreshold = arguments[1];
        }

        if(this.pulledScore >= pullScoreThreshold){
            this.pulledScore -= pullScoreThreshold;
            this.pullFood(pullScoreThreshold);
        }/*
        var targetBodyLength = Math.ceil(this.snake.bodyLength);
        while(targetBodyLength < this.snake.body.length && this.snake.body.length > 1){
            this.snake.removeBody();
        }/** */
    },
    updateSnakeBody:function(){
        //cc.log(this.getComponent('Snake').body.length);
        for(var i = 0, j = 1;j<this.snake.body.length;++i, ++j){
            var targetVector = new o0.Vector2(this.snake.body[i].x-this.snake.body[j].x,this.snake.body[i].y-this.snake.body[j].y);
            var moveDistance = targetVector.length - this.bodySpacing;
            if(j==this.snake.body.length-1)
                moveDistance += this.bodySpacing * (Math.ceil(this.snake.bodyLength)-this.snake.bodyLength)
            targetVector = targetVector.mod;
            this.snake.body[j].rotation = o0CC.rotationFromVector(targetVector);
            if(moveDistance <= 0)
                continue;
            this.snake.body[j].x += targetVector.x * moveDistance;
            this.snake.body[j].y += targetVector.y * moveDistance;/** */
        }
    },/** */
    /*
    destroySnake: function(){
        this.node.active = false;//防止destory之前body再增长
        while(this.snake.score >= 1){
            this.pullScore(1);
        }
        while(this.snake.body.length > 1){
            this.removeBody();
        }
        //cc.log(this.snake.score);
        //this.destroy();
    },/** */
    pulsatingFeedback:function(){
        if(this.isSpeeding && this.snake.score > this.minScore){
            for(var i =0;i<this.snake.body.length;++i){
                var graphics = this.snake.body[i].getComponent(cc.Graphics);
                if(graphics==null){
                    return;
                }
                graphics.clear();
                var timeRemainder = Math.abs(((new Date()).getTime()/10 - i*2)%40-20);
                for(var j = 0;j<timeRemainder;++j){
                    graphics.circle(0, 0, this.radius+j);
                    graphics.strokeColor = new cc.Color(255,255,255,(timeRemainder-j)*5);
                    graphics.stroke();
                }
            }
        }else{
            for(var i =0;i<this.snake.body.length;++i){
                var graphics = this.snake.body[i].getComponent(cc.Graphics);
                if(graphics==null){
                    return;
                }
                graphics.clear();
            }
        }
    },


    // use this for initialization
    onLoad: function () {
        this.snake = this.node.parent.getComponent('Snake');
        this.radius = this.snake.size/2;
        this.removeTargetVector();

        this.snake.updateScale();
        this.updateBodySpacing();
        this.updateSpeed();
    },
    start: function () {
        this.addScore(10);
        //cc.log(this.snake.body.length);

        this.fixedTimer = new o0.FixedTimerDT(60);
    },
    
    // called every frame
    update: function (dt) {
        if(this.node == null || this.node.isValid == false){
            cc.log("Memory leak: Control");
        }


        if(this.isValid == false || this.node == null || this.node.isValid == false || this.snake == null){
            return;
        }
        //for(var t = 0;t<this.fixedTimer.fixedUpdateTimes(dt);++t){
        for(var t = 0;t<1;++t){
    
            var speedRate;
            if(this.snake.score <= this.minScore)
                speedRate = this.normalSpeedRate;
            else{
                speedRate = this.targetSpeedRate;
                if(speedRate != this.normalSpeedRate && speedRate == this.speedingSpeedRate)
                    this.pullScore(this.speedingScoreCost);
            }
            for(var i = 0;i<speedRate;++i){
                //移动蛇头
                this.targetRotation = o0CC.rotationFromVector(this.targetVector);
                this.snake.head.rotation = o0CC.nextRotation(this.snake.head.rotation,this.targetRotation,this.turningSpeed);
                var moveVector = o0CC.vectorFromRotation(this.snake.head.rotation);
                this.snake.body[0].x += moveVector.x*this.speed;
                this.snake.body[0].y += moveVector.y*this.speed;/** */
                
                //////////////下面是移动蛇身
                this.updateSnakeBody();
            }
        }
        this.pulsatingFeedback();
    },
    onCollisionEnter:function(other,self){
        if(other.node == null || other.node.active == false || this.node == null || this.node.active == false){//貌似能解决两蛇对撞导致卡死的bug
            return;
        }
        if(self != this){
            return;
        }
        if(other.node.groupIndex == o0Game.GroupIndex.Body){
            //cc.log("aaaaaaaaaaaaaaaaaaa");
            var selfBody = false;
            if(this.snake.body.length > 1)
                for(var i = 1; i<this.snake.body.length;++i){
                    if(other.node == this.snake.body[i]){
                        selfBody = true;
                        break;
                    }
                }
            if(selfBody == false){
                this.pullAllFood();
                this.snake.node.destroy();
            }
        }
        if(other.node.groupIndex == o0Game.GroupIndex.Food){
            this.addScore(other.score);
            other.node.destroy();
            //other.destroy();
        }/* */
    },
    onCollisionExit:function(other,self){
        if(other.node == null || other.node.active == false || this.node == null || this.node.active == false){//貌似能解决两蛇对撞导致卡死的bug
            return;
        }
        if(self != this){
            return;
        }
        if(other.node.groupIndex == o0Game.GroupIndex.PlayGround){
            //this.o0Destroy();
            this.pullAllFood();
            this.snake.node.destroy();
        }/* */
    },

/*
    o0Destroy:function(){
        this.node.active = false;
        //this.node.removeComponent(this);
        this.destroy();
        this.node.destroy();
    },/** */
    _onPreDestroy:function(){
    },
});
