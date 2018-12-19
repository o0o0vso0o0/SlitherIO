var o0 = require('o0');
var o0CC = require('o0CC');
var o0Game = require('o0Game');

cc.Class({
    extends: cc.Component,

    properties: {
        canvas:null,
        camera:null,

//        gameSceneNode:null,

        playGround:null,
        snakeNode:null,
        //snakeBodyNode:null,
        foodNode:null,
        playerSnake:null,
        playerName:'Player',
        playerSkin:null,
        playerInput:'',
        skinSet:null,

        snakeGeneratorTimer:null,

        maxSnake: 10,
        maxFood: 100,

        snakeIDcounter: 0,
        foodIDcounter: 0,

        leaderBoardNode:null,
        leaderBoardBackground:null,
        lengthLabel:null,
        lengthValueLabel:null,
        rankLabel:null,
        leaderBoardLabel:null,
        LRankLabels:[],
        LNameLabels:[],
        LScoreLabels:[],
        statisticalUpdateTimer:null,
        map:null,
        mapSize: 150,//直径

        respawnButton:null,
        returnButton:null,

        shareButton:null,

    },
    generateAISnake:function(){
        if(this.snakeGeneratorTimer.tryNextTiming()){
            if(this.snakeNode.childrenCount < this.maxSnake && this.foodNode.childrenCount < this.maxFood){
                var newAISnake = this.addSnake('Snake','LocalControl','SnakeAIInput');
                //var control = newAISnake.node.getComponent('SnakePositionControl');

                newAISnake.name = 'AI-'+newAISnake.node.name;
                newAISnake.skin = [];
                newAISnake.skin.push(this.skinSet[parseInt(this.skinSet.length*Math.random())]);

                var newSnakePosition = o0.randomInCircle2(this.playGround.radius*2);
                newAISnake.head.x = newSnakePosition.x;
                newAISnake.head.y = newSnakePosition.y;
                //var newSnakeRotation = Math.random() * 360;
                //newAISnake.head.rotation = newSnakeRotation;
                //control.setTargetVector(o0CC.vectorFromRotation(newSnakeRotation));
            }
        }
    },
    addSnake:function(snakeScript){
        var snake = o0CC.addScriptNode(this.snakeNode,snakeScript,-1);
        //snake.bodyParentNode = this.snakeBodyNode;
        snake.gameScene = this;
        snake.node.name = ''+this.snakeIDcounter++;
        
        for(var i=1;i<arguments.length;++i){
            snake.head.addComponent(arguments[i]);
        }/** */
        //snake.head.addComponent(controlScript);
        //snake.head.addComponent(inputScript);
        return snake;
    },
    
    onLoad: function () {
        var self = this;
        //cc.director.getCollisionManager().enabled = true;//开启碰撞检测
        //this.gameSceneNode = new cc.Node();
        //this.node.addChild(this.gameSceneNode,0);















        this.playGround = o0CC.addScriptNode(this.node,'PlayGround2',-100);  

        this.snakeNode = new cc.Node();
        this.node.addChild(this.snakeNode,4);
        //this.snakeBodyNode = new cc.Node();
        //this.node.addChild(this.snakeBodyNode,3);
        this.foodNode = new cc.Node();
        this.node.addChild(this.foodNode,2);
      
        this.snakeGeneratorTimer = new o0.Timer(1);

        
        
        



        
/*
        if(this.playerSnake.node.getComponent('Snake')!=null){
            //cc.log('dasdad');
            this.playerSnake.node.getComponent('Snake').test();
        }/** */        
        this.rankLabel = o0CC.addScriptNode(this.node,'cc.Label',10);
        o0CC.setGroup(this.rankLabel,o0Game.GroupIndex.UI);
        this.rankLabel.node.anchorX = 0;
        this.rankLabel.node.anchorY = 0;/** */
        this.rankLabel.node.color = new cc.Color(255,255,255);
        //this.rankLabel.node.opacity = 0;无效
        this.rankLabel.fontSize = 16;
        this.rankLabel.lineHeight = 22;
        this.rankLabel.horizontalAlign = cc.Label.HorizontalAlign.LEFT;
        this.rankLabel.verticalAlign = cc.Label.VerticalAlign.CENTER;//TOP//CENTER//BOTTOM
        
        this.lengthLabel = o0CC.addScriptNode(this.node,'cc.Label',10);
        o0CC.setGroup(this.lengthLabel,o0Game.GroupIndex.UI);
        this.lengthLabel.node.anchorX = 0;
        this.lengthLabel.node.anchorY = 0;/** */
        this.lengthLabel.node.color = new cc.Color(255,255,255);
        this.lengthLabel.fontSize = 16;
        this.lengthLabel.lineHeight = 22;
        this.lengthLabel.horizontalAlign = cc.Label.HorizontalAlign.LEFT;
        this.lengthLabel.verticalAlign = cc.Label.VerticalAlign.CENTER;
        
        this.lengthValueLabel = o0CC.addScriptNode(this.node,'cc.Label',10);
        o0CC.setGroup(this.lengthValueLabel,o0Game.GroupIndex.UI);
        this.lengthValueLabel.node.anchorX = 0;
        this.lengthValueLabel.node.anchorY = 0;/** */
        this.lengthValueLabel.node.color = new cc.Color(255,255,255);
        this.lengthValueLabel.fontSize = 26;
        this.lengthValueLabel.lineHeight = 32;
        this.lengthValueLabel.horizontalAlign = cc.Label.HorizontalAlign.LEFT;
        this.lengthValueLabel.verticalAlign = cc.Label.VerticalAlign.CENTER;
        

        this.leaderBoardBackground = o0CC.addScriptNode(this.node,'cc.Graphics',10);
        o0CC.setGroup(this.leaderBoardBackground,o0Game.GroupIndex.UI);
        this.leaderBoardNode = this.leaderBoardBackground.node;

        this.leaderBoardLabel = o0CC.addScriptNode(this.leaderBoardNode,'cc.Label',10);
        this.leaderBoardLabel.node.anchorX = 1;
        this.leaderBoardLabel.node.anchorY = 1;/** */
        this.leaderBoardLabel.node.color = new cc.Color(255,255,255);
        this.leaderBoardLabel.fontSize = 20;
        this.leaderBoardLabel.lineHeight = 36;
        this.leaderBoardLabel.horizontalAlign = cc.Label.HorizontalAlign.LEFT;
        this.leaderBoardLabel.verticalAlign = cc.Label.VerticalAlign.CENTER;


        for(var i = 0;i<10;++i){
            var newLabel = o0CC.addScriptNode(this.leaderBoardNode,'cc.Label',10);
            newLabel.node.anchorX = 1;
            newLabel.node.anchorY = 1;/** */
            newLabel.node.color = new cc.Color(255,255,255);
            newLabel.fontSize = 16;
            newLabel.lineHeight = 22;
            newLabel.horizontalAlign = cc.Label.HorizontalAlign.LEFT;
            newLabel.verticalAlign = cc.Label.VerticalAlign.CENTER;
            this.LScoreLabels.push(newLabel);
        }
        for(var i = 0;i<10;++i){
            var newLabel = o0CC.addScriptNode(this.leaderBoardNode,'cc.Label',10);
            newLabel.node.anchorX = 0;
            newLabel.node.anchorY = 1;/** */
            newLabel.node.color = new cc.Color(255,255,255);
            newLabel.fontSize = 16;
            newLabel.lineHeight = 22;
            newLabel.horizontalAlign = cc.Label.HorizontalAlign.LEFT;
            newLabel.verticalAlign = cc.Label.VerticalAlign.CENTER;
            this.LNameLabels.push(newLabel);
        }
        for(var i = 0;i<10;++i){
            var newLabel = o0CC.addScriptNode(this.leaderBoardNode,'cc.Label',10);
            newLabel.node.anchorX = 1;
            newLabel.node.anchorY = 1;/** */
            newLabel.node.color = new cc.Color(255,255,255);
            newLabel.fontSize = 16;
            newLabel.lineHeight = 22;
            newLabel.horizontalAlign = cc.Label.HorizontalAlign.LEFT;
            newLabel.verticalAlign = cc.Label.VerticalAlign.CENTER;
            newLabel.string = '#'+(i+1);
            this.LRankLabels.push(newLabel);
        }
        this.statisticalUpdateTimer = new o0.Timer(1);

        this.map = o0CC.addScriptNode(this.node,'cc.Graphics',10);
        o0CC.setGroup(this.map,o0Game.GroupIndex.UI);

        
        this.respawnButton = o0CC.addScriptNode(this.node,'o0CCButton',10);
        o0CC.setGroup(this.respawnButton,o0Game.GroupIndex.UI);
        this.respawnButton.node.active = false;
        this.respawnButton.node.x = 0;
        this.respawnButton.node.y = 0;
        this.respawnButton.node.width = 200;
        this.respawnButton.node.height = 40;/** */
        this.respawnButton.name = 'Respawn';

        var sdadsa = this;
        
        this.shareButton = o0CC.addScriptNode(this.node,'o0CCButton',10);
        o0CC.setGroup(this.shareButton,o0Game.GroupIndex.UI);
        this.shareButton.node.active = false;
        this.shareButton.node.x = 0;
        this.shareButton.node.y = 60;
        this.shareButton.node.width = 200;
        this.shareButton.node.height = 40;/** */
        this.shareButton.name = 'Share';
        this.shareButton.o0ClickEvent.push(function () {
            cc.log("share");
            cc.log(sdadsa.rankLabel.string);
            cc.log(sdadsa.lengthValueLabel.string);
            cc.sys.openURL('twitter://post?text=' + "I am in possion " +sdadsa.rankLabel.string + "with " + sdadsa.lengthValueLabel.string + "!!!!")
        });
        
        


        this.returnButton = o0CC.addScriptNode(this.node,'o0CCButton',10);
        o0CC.setGroup(this.returnButton,o0Game.GroupIndex.UI);
        this.returnButton.node.active = false;
        this.returnButton.node.x = 0;
        this.returnButton.node.y = -60;
        this.returnButton.node.width = 200;
        this.returnButton.node.height = 40;/** */
        this.returnButton.name = 'Return to Menu';
        this.returnButton.o0ClickEvent.push(function () {
            self.node.destroy();
        });
    },
    start:function(){
        var self = this;
        this.camera.node.zIndex = 100;
        this.playGround.canvas = this.canvas;
        this.playGround.camera = this.camera;
    },
    


















    update: function (dt) {
        if(this.playerSnake!= null && this.playerSnake.node!=null){
            this.returnButton.node.active = false;
            this.respawnButton.node.active = false;
            this.shareButton.node.active = false;
            
        }else{
            this.returnButton.node.active = true;
            this.respawnButton.node.active = true;
            this.shareButton.node.active = true;
        }
        
        
        
        
        //////////////////////////////
        this.rankLabel.node.x = -this.canvas.node.width/2 + 5;
        this.rankLabel.node.y = -this.canvas.node.height/2 + 5;// + this.rankLabel.lineHeight/2;
        if(this.playerSnake!= null && this.playerSnake.node!=null){
            var rank = 1;
            for(var i = 0; i < this.snakeNode.childrenCount; ++i){
                if(this.snakeNode.children[i].getComponent('Snake').score > this.playerSnake.score){
                    rank++;
                }
            }
            this.rankLabel.string = 'Your rank: ' + rank + ' of ' + this.snakeNode.childrenCount;
        }

        this.lengthLabel.node.x = this.rankLabel.node.x;
        this.lengthLabel.node.y = this.rankLabel.node.y + this.rankLabel.fontSize;
        this.lengthLabel.string = 'Your length: ';

        this.lengthValueLabel.node.x = this.lengthLabel.node.x + 85;
        this.lengthValueLabel.node.y = this.lengthLabel.node.y;
        if(this.playerSnake!= null && this.playerSnake.node!=null){
            this.lengthValueLabel.string = Math.floor(this.playerSnake.score);
        }
//////////////////////////////////// leaderBoard      
        this.leaderBoardLabel.node.x = this.canvas.node.width/2 - 65;
        this.leaderBoardLabel.node.y = this.canvas.node.height/2;
        this.leaderBoardLabel.string = 'LeaderBoard'; 

        this.leaderBoardBackground.clear();
        this.leaderBoardBackground.fillRect(this.canvas.node.width/2 - 235, this.canvas.node.height/2 - 205, 230, 170);
        this.leaderBoardBackground.fillColor = new cc.Color(255,255,255,30);
        this.leaderBoardBackground.fill();/** */

        for(var i = 0;i<10;++i){
            this.LScoreLabels[i].node.x = this.canvas.node.width/2 - 10;
            this.LScoreLabels[i].node.y = this.leaderBoardLabel.node.y - this.leaderBoardLabel.lineHeight - i * this.LScoreLabels[i].fontSize;
            this.LNameLabels[i].node.x = this.canvas.node.width/2 - 180;
            this.LNameLabels[i].node.y = this.leaderBoardLabel.node.y - this.leaderBoardLabel.lineHeight - i * this.LScoreLabels[i].fontSize;
            this.LRankLabels[i].node.x = this.canvas.node.width/2 - 200;
            this.LRankLabels[i].node.y = this.leaderBoardLabel.node.y - this.leaderBoardLabel.lineHeight - i * this.LScoreLabels[i].fontSize;
        }

        this.map.node.x = (this.canvas.node.width/2 - this.mapSize/2 - 10);
        this.map.node.y = -(this.canvas.node.height/2 - this.mapSize/2 - 10);

        if(this.statisticalUpdateTimer.tryNextTiming()){
            var sortChildren = [];
            for(var i =0;i<this.snakeNode.childrenCount;++i){
                if(this.snakeNode.children[i]!=null && this.snakeNode.children[i].isValid && this.snakeNode.children[i].getComponent('Snake') != null){
                    sortChildren.push(this.snakeNode.children[i]);
                }
            }
            sortChildren = sortChildren.sort(function(a, b){
                var ac = a.getComponent('Snake');
                var bc = b.getComponent('Snake');
                if(ac == null){
                    return bc.score;
                }else if(bc == null){
                    return ac.score;
                }else if(ac == null && bc == null){
                    return 0;
                }
                return bc.score - ac.score;
            });
            for(var i = 0;i<10;++i){
                if(sortChildren[i]!=null){
                    var snake = sortChildren[i].getComponent('Snake');
                    if(snake!=null){
                        this.LScoreLabels[i].string = Math.floor(snake.score);
                    }
                    this.LNameLabels[i].string = snake.name;
    
                    this.LScoreLabels[i].node.color = snake.color;
                    this.LNameLabels[i].node.color = snake.color;
                    this.LRankLabels[i].node.color = snake.color;
                }else{
                    this.LScoreLabels[i].string = '';
                    this.LNameLabels[i].string = '';
    
                    this.LScoreLabels[i].node.color = new cc.Color(255,255,255);
                    this.LNameLabels[i].node.color = new cc.Color(255,255,255);
                    this.LRankLabels[i].node.color = new cc.Color(255,255,255);
                }
            }
            
            this.map.clear();
            this.map.circle(0, 0, this.mapSize/2);
            this.map.fillColor = new cc.Color(255,255,255,30);
            this.map.fill();
            if(this.foodNode.childrenCount!=0){
                this.map.close();
                for(var i = 0;i<this.foodNode.childrenCount;++i){
                    var foodPos = new o0.Vector2(this.foodNode.children[i]).multiply(this.mapSize/1.1/2/this.playGround.radius);
                    this.map.circle(foodPos.x, foodPos.y, 1);
                }
                this.map.fillColor = new cc.Color(255,255,255,255);
                this.map.fill();/** */
            }
            if(this.playerSnake!= null && this.playerSnake.node!=null){
                this.map.close();
                for(var i = 0;i<1;++i){
                    var bodyPos = new o0.Vector2(this.playerSnake.body[i]).multiply(this.mapSize/1.1/2/this.playGround.radius);
                    this.map.circle(bodyPos.x, bodyPos.y, 5);
                }
                this.map.fillColor = new cc.Color(0,255,0,100);
                this.map.fill();/** */
            }
        }
///////////////////////////////////
    },


    lateUpdate: function (dt) {
        if(this.playerSnake != null && this.playerSnake.node != null){
            var targetCameraPosition = this.camera.node.parent.convertToNodeSpaceAR(this.playerSnake.head.convertToWorldSpace(cc.v2(0,0)));
            if(this.camera.node.x!=targetCameraPosition.x || this.camera.node.y!=targetCameraPosition.y){
                var targetVector = new o0.Vector2(targetCameraPosition).minus(new o0.Vector2(this.camera.node));
                if(targetVector.length > 10){
                    targetVector = targetVector.toLength(Math.pow(targetVector.length,0.6));
                    //targetVector = targetVector.toLength(targetVector.length/10);
                }
                this.camera.node.x += targetVector.x;
                this.camera.node.y += targetVector.y;
            }

            //var currentScale = 1/Math.pow(this.gameSceneNode.scaleX* this.gameSceneNode.scaleY,0.5);
            var currentScale = 1/this.camera.zoomRatio;
            var targetScale = Math.pow(this.playerSnake.head.scaleX* this.playerSnake.head.scaleY,0.5);
            var newScale = currentScale * Math.pow(targetScale/currentScale,0.1);
            this.camera.zoomRatio = 1/newScale;
            /*
            this.gameSceneNode.scaleX = 1/newScale;
            this.gameSceneNode.scaleY = 1/newScale;/** */

            

            //this.camera.node.scaleX = this.playerSnake.node.scaleX;//抵消canvas scale的副作用
            //this.camera.node.scaleY = this.playerSnake.node.scaleY;//抵消canvas scale的副作用
        }//更新摄像机
    },

    _onPreDestroy:function(){
        //cc.director.getCollisionManager().enabled = false;//碰撞检测
        //this.node.active = false;
    },
});