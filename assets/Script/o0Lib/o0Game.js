var o0 = require('o0');
var o0CC = require('o0CC');
//for this game

var GroupIndex = {
    Default : 0,
    Food : 1,
    Head : 2,
    Body : 3,
    PlayGround : 4,
    UI : 5,
}

class SnakeDirectionControl{
    constructor(script) {
        this.script = script;
        this.speed = 1;
        this.turningSpeed = 2;
        this.normalSpeedRate = 1;
        this.speedingSpeedRate = 3;
        this.targetSpeedRate = 1;
        this.targetVector = null;

        this.bodySpacingRate = 0.3;
        this.bodySpacing = 0;
        
        this.pulledScore = 0;
        this.pullScoreRate = 0.7;//the rate means remove 1 score from snake, and 0.5 score will come out to be food.
        this.speedingScoreCost = 0.02;//score cost per frame speeding
        this.minScore = 5;     
                   
        this.addScore(10);
        this.script.updateScale();
        this.updateBodySpacing();
        this.updateSpeed();
        this.setTargetVector(new o0.Vector2(1,0));
    }
    get node(){
        return this.script.node;
    }
    get radius(){
        return this.script.radius;
    }
    set radius(_radius){
        this.script.radius = _radius;
    }

    get bodyParentNode(){
        return this.script.bodyParentNode;
    }
    get foodParentNode(){
        return this.script.foodParentNode;
    }
    get body(){
        return this.script.body;
    }
    get head(){
        return this.script.head;
    }
    get score(){
        return this.script.score;
    }
    set score(_score){
        this.script.score = _score;
    }

    get pullScoreThreshold(){
        return Math.pow(this.body[0].scaleX * this.body[0].scaleY,1) * 1.5;
    }
    get targetBodyLength(){
        return this.score / Math.pow(this.body[0].scaleX * this.body[0].scaleY,1.5);
    }
    
    updateSpeed(){
        this.speed = 2 * Math.pow(this.body[0].scaleX * this.body[0].scaleY,1.0/3);
    }
    updateBodySpacing(){
        this.bodySpacing = this.radius*2 * this.bodySpacingRate * Math.sqrt(this.body[0].scaleX * this.body[0].scaleY);
    }
    setTargetSpeeding(bool){
        if(!bool)
            this.targetSpeedRate = this.normalSpeedRate;
        else
            this.targetSpeedRate = this.speedingSpeedRate;
    }
    setTargetVector(vector){
        this.targetVector = vector;
    }
    addScore(score) {
        this.score += score;
        this.script.updateScale();
        this.updateBodySpacing();
        this.updateSpeed();
        var targetBodyLength = Math.ceil(this.bodyLength);
        while(targetBodyLength > this.body.length){
            this.script.addBody();
        }
    }
    pullFood(score) {
        var newFood = o0CC.addScriptNode(this.foodParentNode,'Food',-100);
        var lastBody = this.body[this.body.length-1];
        var foodPosition = o0.randomInCircle2(lastBody,(this.radius-newFood.radius)*2);
        newFood.node.x = foodPosition.x;
        newFood.node.y = foodPosition.y;
        newFood.score = score;
    }
    pullScore(score){
        this.score -= score;
        this.script.updateScale();
        this.updateBodySpacing();
        this.updateSpeed();
        this.pulledScore += score * this.pullScoreRate;
        if(this.pulledScore >= this.pullScoreThreshold){
            this.pulledScore -= this.pullScoreThreshold;
            this.pullFood(this.pullScoreThreshold);
        }
        var targetBodyLength = Math.ceil(this.bodyLength);
        while(targetBodyLength < this.body.length && this.body.length > 1){
            this.script.removeBody();
        }
    }
    updateSnakeBody(){
        for(var i = 0, j = 1;j<this.body.length;++i, ++j){
            var targetVector = new o0.Vector2(this.body[i].x-this.body[j].x,this.body[i].y-this.body[j].y);
            var moveDistance = targetVector.length - this.bodySpacing;
            if(j==this.body.length-1)
                moveDistance += this.bodySpacing * (Math.ceil(this.bodyLength)-this.bodyLength)
            targetVector = targetVector.mod;
            this.body[j].rotation = o0CC.rotationFromVector(targetVector);
            if(moveDistance <= 0)
                continue;
            this.body[j].x += targetVector.x * moveDistance;
            this.body[j].y += targetVector.y * moveDistance;
        }
    }
    destroySnake(){
        this.node.active = false;//防止destory之前body再增长
        while(this.score >= 1){
            //cc.log("1");
            this.pullScore(1);
        }
        while(this.body.length > 1){
            //cc.log("2");
            this.script.removeBody();
        }
        //cc.log(this.score);
        this.node.destroy();
        //this.destroy();
    }

    // called every frame
    update (dt) {               
        var speedRate;
        if(this.score <= this.minScore)
            speedRate = this.normalSpeedRate;
        else{
            speedRate = this.targetSpeedRate;
            if(speedRate != this.normalSpeedRate && speedRate == this.speedingSpeedRate)
                this.pullScore(this.speedingScoreCost);
        }
        for(var i = 0;i<speedRate;++i){
            //移动蛇头
            this.targetRotation = o0CC.rotationFromVector(this.targetVector);
            this.head.rotation = o0CC.nextRotation(this.head.rotation,this.targetRotation,this.turningSpeed);
            var moveVector = o0CC.vectorFromRotation(this.head.rotation);
            this.body[0].x += moveVector.x*this.speed;
            this.body[0].y += moveVector.y*this.speed;
            
            //////////////下面是移动蛇身
            this.updateSnakeBody();
        }
    }
    onCollisionEnter(other, self){
        if(other.node.active == false || this.node.active == false){//貌似能解决两蛇对撞导致卡死的bug
            return;
        }
        if(other.node.groupIndex == GroupIndex.Body){
            //cc.log("aaaaaaaaaaaaaaaaaaa");
            var selfBody = false;
            if(this.body.length > 1)
                for(var i = 1; i<this.body.length;++i){
                    if(other.node == this.body[i]){
                        selfBody = true;
                        break;
                    }
                }
            if(selfBody == false){
                //cc.log("dsadasd");
                this.destroySnake();
            }
        }
        if(other.node.groupIndex == GroupIndex.Food){
            this.addScore(other.score);
            other.node.destroy();
            //other.destroy();
        }
    }
    onCollisionExit(other,self){
        if(other.node.active == false || this.node.active == false){//貌似能解决两蛇对撞导致卡死的bug
            return;
        }
        if(other.node.groupIndex == GroupIndex.PlayGround){
            this.destroySnake();
        }
    }
}


class SnakeMouseControl extends SnakeDirectionControl{
    constructor(script) {
        super(script);
        //module.exports.snakeDirectionControl.prototype.getName.call(this,);
        
        var self = this;
        this.mouseLocation = new o0.Vector2(1,0);
        
        var listener = {
            event: cc.EventListener.MOUSE,
            onMouseDown: function (event) {
                self.setTargetSpeeding(true);   
            },
            onMouseUp: function (event) {
                self.setTargetSpeeding(false);
            },
            onMouseMove: function (event) {
                self.mouseLocation = event.getLocation();
            },
            onMouseScroll: function (event) {
            }
        }
        cc.eventManager.addListener(listener, this.node);
    }
    update(dt) {
        var localLocation = this.node.parent.convertToNodeSpaceAR(this.mouseLocation);
        this.setTargetVector(new o0.Vector2(localLocation).mod);
        
        SnakeDirectionControl.prototype.update(dt);
    }
}/** */

module.exports = {
    GroupIndex,
    //SnakeDirectionControl,
    //SnakeMouseControl,
};
