var o0 = require('o0');
var o0CC = require('o0CC');
var o0Game = require('o0Game');

cc.Class({
    extends: require('GameScene'),

    properties: {
        remoteUINode:null,
        remoteUIAddress:null,
        isHost:false,
        webSocket:null,
        id:null,
        connectionIdToSnakeId:[],
    },

    processData:function(event){
        if(typeof(event.data) != "string"){
            return;
        }
        //cc.log(event.data);
        var serverData = JSON.parse(event.data);
        var data = serverData['data'];
        if(serverData['id']!=null){
            this.id = serverData['id'];
        }
        if(this.isHost){
            //cc.log(event.data);
            if(serverData['fromId'] != null
                && data != null
                && data['name'] != null
                && data['skin'] != null){
                if(this.connectionIdToSnakeId[serverData['fromId']] == null || this.snakeNode.getChildByName(this.connectionIdToSnakeId[serverData['fromId']] == null)){
                    var snakeScript = this.addSnake('Snake','LocalControl');
                    snakeScript.name = data['name'];
                    snakeScript.skin = data['skin'];
                    snake = snakeScript.node;
                    var newSnakePosition = o0.randomInCircle2(this.playGround.radius*2);
                    snakeScript.head.x = newSnakePosition.x;
                    snakeScript.head.y = newSnakePosition.y;
                    this.connectionIdToSnakeId[serverData['fromId']] = snake.name;
                }
            }
            if(serverData['fromId'] != null
                && data != null
                && data['vector'] != null
                && data['vector']['x'] != null
                && data['vector']['y'] != null
                && data['speeding'] != null
                && this.connectionIdToSnakeId[serverData['fromId']] != null){
                var snake = this.snakeNode.getChildByName(this.connectionIdToSnakeId[serverData['fromId']]);
                if(snake != null){
                    var snakeControl = snake.getComponent('Snake').head.getComponent('LocalControl');
                    if(snakeControl!=null){
                        snakeControl.setTargetVector(new o0.Vector2(data['vector']['x'],data['vector']['y']));
                        snakeControl.setTargetSpeeding(data['speeding']);
                    }
                }
            }
        }else{
            if(serverData['host']!=null){
                if(serverData['host'] == true){
                    if(this.snakeNode.childrenCount == 0 && this.foodNode.childrenCount == 0){
                        cc.log('Become Host');
                        this.isHost = true;
                        cc.director.getCollisionManager().enabled = true;//碰撞检测
                    }else{
                        if(this.webSocket!=null){
                            this.webSocket.close();
                            this.webSocket = null;
                        }
                    }
                }
            }
            if(data != null){
                //cc.log(data);
                if(data['snake'] != null){
                    //cc.log('o0data');
                    var snakes = new Array();
                    for(var i = 0;i<this.snakeNode.childrenCount;++i){
                        var snake = this.snakeNode.children[i];
                        if(snake.isValid == true)
                            snakes[snake.name] = snake;
                        //cc.log('0: '+snake.name);
                    }

                    for(var i = 0;i<data['snake'].length;++i){
                        var snakeData = data['snake'][i];
                        if(snakeData!=null
                            && snakeData['id']!=null
                            && snakeData['score']!=null
                            && snakeData['position']!=null
                            && snakeData['rotation']!=null
                            && snakeData['skin']!=null){
                            //cc.log('1: '+snakeData['id']);
                            var snake = snakes[snakeData['id']];
                            delete snakes[snakeData['id']];
                            //cc.log('l: '+snakeData['id']);
                            if(snake == null){
                                //cc.log('cr: '+snakeData['id']);
                                var snakeScript;
                                if(snakeData['cid']!=null && snakeData['cid'] == this.id){
                                    this.playerSnake = this.addSnake('RemoteSnake','RemoteControl',this.playerInput);
                                    snakeScript = this.playerSnake;
                                }else{
                                    snakeScript = this.addSnake('RemoteSnake','RemoteControl');
                                }/** */
                                //snakeScript = this.addSnake('RemoteSnake','RemoteControl');
                                if(snakeData['name']!=null){
                                    snakeScript.name = snakeData['name'];
                                }
                                snake = snakeScript.node;
                                snake.name = snakeData['id'];
                                //cc.log('fcr: '+snakeData['id']);

                                snakeScript.head.x = snakeData['position'].x;
                                snakeScript.head.y = snakeData['position'].y;
                                snakeScript.skin = snakeData['skin'];
                            }
                            //cc.log('o0data2');
                            
                            var snakeScript = snake.getComponent('Snake');
                            snakeScript.setScore(snakeData['score']);
                            snakeScript.head.rotation = snakeData['rotation'];/** */
                            var snakeControlScript = snakeScript.head.getComponent('RemoteControl');
                            snakeControlScript.remotePosition = new o0.Vector2(snakeData['position'].x,snakeData['position'].y);

                            //cc.log(snakeScript.head.rotation);
                        }
                    }
                    
                    for(var _key in snakes){
                        if(snakes[_key] != null && snakes[_key].active == true && snakes[_key].isValid){
                            //cc.log('d: '+_key);
                            snakes[_key].active = false;
                            snakes[_key].destroy();
                        }
                    }/** */
                }    
                
                
                if(data['food'] != null){
                    //cc.log('o0data');
                    var foods = new Array();
                    for(var i = 0;i<this.foodNode.childrenCount;++i){
                        var food = this.foodNode.children[i];
                        if(food.isValid == true)
                            foods[food.name] = food;
                        //cc.log('0: '+snake.name);
                    }

                    for(var i = 0;i<data['food'].length;++i){
                        var foodData = data['food'][i];
                        if(foodData!=null
                            && foodData['id']!=null
                            && foodData['score']!=null
                            && foodData['position']!=null){
                            //cc.log('1: '+snakeData['id']);
                            var food = foods[foodData['id']];
                            delete foods[foodData['id']];
                            //cc.log('l: '+snakeData['id']);
                            if(food == null){                                
                                var newFood = o0CC.addScriptNode(this.foodNode,'Food',-100);
                                newFood.node.x = foodData['position'].x;
                                newFood.node.y = foodData['position'].y;
                                newFood.score = foodData['score'];
                                newFood.node.name = foodData['id'];
                            }
                        }
                    }
                    
                    for(var _key in foods){
                        if(foods[_key] != null && foods[_key].active == true && foods[_key].isValid){
                            //cc.log('d: '+_key);
                            foods[_key].active = false;
                            foods[_key].destroy();
                        }
                    }/** */
                }  


            }   

        }   
    },


    generatePlayerSnake:function(data){
        if(this.isHost == true){
            this.playerSnake = this.addSnake('Snake','LocalControl',this.playerInput);
            this.playerSnake.name = this.playerName;
            this.playerSnake.skin = this.playerSkin;
            var newSnakePosition = o0.randomInCircle2(this.playGround.radius*2);
            this.playerSnake.head.x = newSnakePosition.x;
            this.playerSnake.head.y = newSnakePosition.y;
        }else{
            this.send({'name':this.playerName,
                'skin':this.playerSkin});/** */
        }
    },

    send:function(data){
        var jsonData = JSON.stringify(data);
        //cc.log(jsonData);
        var self = this;
        setTimeout(function () {
            if (self.webSocket !=null && self.webSocket.readyState === WebSocket.OPEN) {
                self.webSocket.send(jsonData);
            }
            else {
                console.log("WebSocket instance wasn't ready...");
            }
        }, 3);
    },

    onLoad: function () {
        this._super();
        var self = this;
        
        cc.director.getCollisionManager().enabled = false;//碰撞检测

        this.remoteUINode = new cc.Node();
        this.node.addChild(this.remoteUINode,10);

        this.remoteUIAddress = o0CC.addScriptNode(this.remoteUINode,'cc.Label',10);
        o0CC.setGroup(this.remoteUIAddress,o0Game.GroupIndex.UI);
        this.remoteUIAddress.node.anchorX = 0;
        this.remoteUIAddress.node.anchorY = 1;
        this.remoteUIAddress.node.x = 0;
        this.remoteUIAddress.node.y = 0;
        this.remoteUIAddress.node.width = 150;
        this.remoteUIAddress.node.height = 30;
        this.remoteUIAddress.node.color = new cc.Color(255,255,255);
        this.remoteUIAddress.fontSize = 20;
        this.remoteUIAddress.horizontalAlign = cc.Label.HorizontalAlign.LEFT;
        this.remoteUIAddress.verticalAlign = cc.Label.VerticalAlign.TOP;
        this.remoteUIAddress.string = 'testAddress';
        
        this.respawnButton.o0ClickEvent.push(function () {
            self.generatePlayerSnake();
        });
        
        //this.remoteEventDataList = new Array();
    },
    


    start:function(){
        this._super();
        var self = this;
        
        //this.webSocket = new WebSocket('ws://'+this.remoteUIAddress.string);
        try {
            this.webSocket = new WebSocket('ws://'+this.remoteUIAddress.string);
         }
         catch(err){
            self.webSocket = null;
            if(self.node!=null && self.node.active == true){
                self.node.active = false;
                self.node.destroy();
            }
         }
        this.webSocket.onopen = function (event) {
            self.generatePlayerSnake();
            //this.send([1,1,2,3]);
            console.log("Send Text WS was opened.");
        };
        this.webSocket.onmessage = function (event) {
            if(self.node!=null && self.node.isValid){
                self.processData(event);
            }
        };
        this.webSocket.onerror = function (event) {
            self.webSocket = null;
            if(self.node!=null && self.node.active == true){
                self.node.active = false;
                self.node.destroy();
            }
            console.log("Send Text fired an error");
        };
        this.webSocket.onclose = function (event) {
            self.webSocket = null;
            if(self.node!=null && self.node.active == true){
                self.node.active = false;
                self.node.destroy();
            }
            console.log("WebSocket instance closed.");
        };

        //this.playerSnake = this.addSnake('Snake','LocalControl','SnakeMouseInput');
        //this.playerSnake.name = this.playerName;
        this.generatePlayerSnake();
    },



    update: function (dt) {
        this._super();

        this.remoteUINode.x = -this.canvas.node.width/2 + 10;
        this.remoteUINode.y = this.canvas.node.height/2 - 10;



        var remoteUIAddressColor;
        if(this.isHost){
            remoteUIAddressColor = new cc.Color(255,255,255);
        }else{
            remoteUIAddressColor = new cc.Color(0,255,0);
        }
        this.remoteUIAddress.node.color = remoteUIAddressColor;

        if(this.webSocket!=null){
            if(this.isHost){
                var snakeIdToConnectionId = [];
                for(var key in this.connectionIdToSnakeId){
                    snakeIdToConnectionId[this.connectionIdToSnakeId[key]] = key;
                }

                var snakesData = new Array();
                for(var i =0;i< this.snakeNode.childrenCount;++i){
                    if(this.snakeNode.children[i] == null || this.snakeNode.children[i].isValid == false){
                        continue;
                    }
                    var snake = this.snakeNode.children[i].getComponent('Snake');
                    if(snake == null){
                        continue;
                    }

                    var snakeData;
                    if(snakeIdToConnectionId[this.snakeNode.children[i].name] == null){
                        snakeData = {'id':this.snakeNode.children[i].name,
                        'name':snake.name,
                        'score':snake.score,
                        'position':{"x":snake.body[0].x,"y":snake.body[0].y},
                        'rotation':snake.body[0].rotation,
                        'skin':snake.skin};
                    }else{
                        snakeData = {'id':this.snakeNode.children[i].name,
                        'cid':snakeIdToConnectionId[this.snakeNode.children[i].name],//client id,player id
                        'name':snake.name,
                        'score':snake.score,
                        'position':{"x":snake.body[0].x,"y":snake.body[0].y},
                        'rotation':snake.body[0].rotation,
                        'skin':snake.skin};
                        delete snakeIdToConnectionId[this.snakeNode.children[i].name];
                    }
                    snakesData.push(snakeData);
                }

                for(var key in snakeIdToConnectionId){
                    delete this.connectionIdToSnakeId[snakeIdToConnectionId[key]];
                }


                var foodsData = new Array();
                for(var i =0;i< this.foodNode.childrenCount;++i){
                    if(this.foodNode.children[i] == null || this.foodNode.children[i].isValid == false){
                        continue;
                    }
                    var food = this.foodNode.children[i].getComponent('Food');
                    if(food == null){
                        continue;
                    }

                    foodsData.push({'id':this.foodNode.children[i].name,
                    'score':food.score,
                    'position':{"x":food.node.x,"y":food.node.y}});
                }

                this.send({'snake':snakesData,'food':foodsData});/** */
            }else{
                if(this.playerSnake != null && this.playerSnake.node != null){
                    var playerControl = this.playerSnake.body[0].getComponent('LocalControl');
                    var data = {'vector':playerControl.targetVector,
                    'speeding':playerControl.isSpeeding};
                    this.send(data);
                }/** */
            }/** */
        }/** */

        if(this.isHost){
            this.generateAISnake();
        }
    },
    _onPreDestroy:function(){
        this._super();
        if(this.webSocket!=null){
            this.webSocket.close();
            this.webSocket = null;
        }
    },
});