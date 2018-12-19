var o0 = require('o0');
var o0CC = require('o0CC');

cc.Class({
    extends: cc.CircleCollider,
    properties: {
        control:null,
    },
    setTargetSpeeding:function(bool){
        if(this.control==null){
            return;
        }
        this.control.setTargetSpeeding(bool);
    },
    setTargetVector:function(vector){
        if(this.control==null){
            return;
        }
        this.control.setTargetVector(vector);
    },
    removeTargetVector:function(vector){
        if(this.control==null){
            return;
        }
        this.control.removeTargetVector(vector);
    },
    // use this for initialization
    onLoad: function () {
        this.control = this.node.getComponent('LocalControl');
    },
    update: function (dt) {
        if(this.node == null || this.node.isValid == false){
            cc.log("Memory leak: Input");
        }
    },
});