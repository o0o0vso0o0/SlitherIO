"use strict";
cc._RF.push(module, '18b9bGF3adBJJWYtzIxfR7I', 'SnakeDirectionInput');
// Script/SnakeInput/SnakeInputBasic/SnakeDirectionInput.js

'use strict';

var o0 = require('o0');
var o0CC = require('o0CC');

cc.Class({
    extends: cc.CircleCollider,
    properties: {
        control: null
    },
    setTargetSpeeding: function setTargetSpeeding(bool) {
        if (this.control == null) {
            return;
        }
        this.control.setTargetSpeeding(bool);
    },
    setTargetVector: function setTargetVector(vector) {
        if (this.control == null) {
            return;
        }
        this.control.setTargetVector(vector);
    },
    removeTargetVector: function removeTargetVector(vector) {
        if (this.control == null) {
            return;
        }
        this.control.removeTargetVector(vector);
    },
    // use this for initialization
    onLoad: function onLoad() {
        this.control = this.node.getComponent('LocalControl');
    },
    update: function update(dt) {
        if (this.node == null || this.node.isValid == false) {
            cc.log("Memory leak: Input");
        }
    }
});

cc._RF.pop();