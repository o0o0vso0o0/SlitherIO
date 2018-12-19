var o0 = require('o0');
var o0CC = require('o0CC');


cc.Class({
    extends: require('SnakeSteeringControl'),
    properties: {
        keyTurning:null,
        key:null,
        speedingKey:0,
    },
    onLoad: function () {
        this._super();

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        this.keyTurning = new Array();
        this.keyTurning[cc.macro.KEY.right] = 90;
        this.keyTurning[cc.macro.KEY.left] = -90;
        this.keyTurning[cc.macro.KEY.d] = 90;
        this.keyTurning[cc.macro.KEY.a] = -90;
        this.key = new Array();
        this.speedingKey = cc.macro.KEY.space;
    },
    onDestroy () {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);      
    },
    update: function (dt) {
        var targetTurning = 0;
        for(var _key in this.keyTurning){
            if(this.key[_key] == true){
                targetTurning+=this.keyTurning[_key];
            }
        }
        this.setTargetTurning(targetTurning);
        this._super();
    },

    onKeyDown: function (event) {
        if(this.keyTurning[event.keyCode] != null){
            this.key[event.keyCode] = true;
        }
        if(event.keyCode == this.speedingKey){
            this.setTargetSpeeding(true);   
        }
    },
    onKeyUp: function (event) {
        if(this.keyTurning[event.keyCode] != null){
            this.key[event.keyCode] = false;
        }
        if(event.keyCode == this.speedingKey){
            this.setTargetSpeeding(false);  
        }
    }
});