(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/o0Lib/o0Game.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '3ae883we4NBLZXo5ebCQiAe', 'o0Game', __filename);
// Script/o0Lib/o0Game.js

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var o0 = require('o0');
var o0CC = require('o0CC');
//for this game

var GroupIndex = {
    Default: 0,
    Food: 1,
    Head: 2,
    Body: 3,
    PlayGround: 4,
    UI: 5
};

var SnakeDirectionControl = function () {
    function SnakeDirectionControl(script) {
        _classCallCheck(this, SnakeDirectionControl);

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
        this.pullScoreRate = 0.7; //the rate means remove 1 score from snake, and 0.5 score will come out to be food.
        this.speedingScoreCost = 0.02; //score cost per frame speeding
        this.minScore = 5;

        this.addScore(10);
        this.script.updateScale();
        this.updateBodySpacing();
        this.updateSpeed();
        this.setTargetVector(new o0.Vector2(1, 0));
    }

    _createClass(SnakeDirectionControl, [{
        key: 'updateSpeed',
        value: function updateSpeed() {
            this.speed = 2 * Math.pow(this.body[0].scaleX * this.body[0].scaleY, 1.0 / 3);
        }
    }, {
        key: 'updateBodySpacing',
        value: function updateBodySpacing() {
            this.bodySpacing = this.radius * 2 * this.bodySpacingRate * Math.sqrt(this.body[0].scaleX * this.body[0].scaleY);
        }
    }, {
        key: 'setTargetSpeeding',
        value: function setTargetSpeeding(bool) {
            if (!bool) this.targetSpeedRate = this.normalSpeedRate;else this.targetSpeedRate = this.speedingSpeedRate;
        }
    }, {
        key: 'setTargetVector',
        value: function setTargetVector(vector) {
            this.targetVector = vector;
        }
    }, {
        key: 'addScore',
        value: function addScore(score) {
            this.score += score;
            this.script.updateScale();
            this.updateBodySpacing();
            this.updateSpeed();
            var targetBodyLength = Math.ceil(this.bodyLength);
            while (targetBodyLength > this.body.length) {
                this.script.addBody();
            }
        }
    }, {
        key: 'pullFood',
        value: function pullFood(score) {
            var newFood = o0CC.addScriptNode(this.foodParentNode, 'Food', -100);
            var lastBody = this.body[this.body.length - 1];
            var foodPosition = o0.randomInCircle2(lastBody, (this.radius - newFood.radius) * 2);
            newFood.node.x = foodPosition.x;
            newFood.node.y = foodPosition.y;
            newFood.score = score;
        }
    }, {
        key: 'pullScore',
        value: function pullScore(score) {
            this.score -= score;
            this.script.updateScale();
            this.updateBodySpacing();
            this.updateSpeed();
            this.pulledScore += score * this.pullScoreRate;
            if (this.pulledScore >= this.pullScoreThreshold) {
                this.pulledScore -= this.pullScoreThreshold;
                this.pullFood(this.pullScoreThreshold);
            }
            var targetBodyLength = Math.ceil(this.bodyLength);
            while (targetBodyLength < this.body.length && this.body.length > 1) {
                this.script.removeBody();
            }
        }
    }, {
        key: 'updateSnakeBody',
        value: function updateSnakeBody() {
            for (var i = 0, j = 1; j < this.body.length; ++i, ++j) {
                var targetVector = new o0.Vector2(this.body[i].x - this.body[j].x, this.body[i].y - this.body[j].y);
                var moveDistance = targetVector.length - this.bodySpacing;
                if (j == this.body.length - 1) moveDistance += this.bodySpacing * (Math.ceil(this.bodyLength) - this.bodyLength);
                targetVector = targetVector.mod;
                this.body[j].rotation = o0CC.rotationFromVector(targetVector);
                if (moveDistance <= 0) continue;
                this.body[j].x += targetVector.x * moveDistance;
                this.body[j].y += targetVector.y * moveDistance;
            }
        }
    }, {
        key: 'destroySnake',
        value: function destroySnake() {
            this.node.active = false; //防止destory之前body再增长
            while (this.score >= 1) {
                //cc.log("1");
                this.pullScore(1);
            }
            while (this.body.length > 1) {
                //cc.log("2");
                this.script.removeBody();
            }
            //cc.log(this.score);
            this.node.destroy();
            //this.destroy();
        }

        // called every frame

    }, {
        key: 'update',
        value: function update(dt) {
            var speedRate;
            if (this.score <= this.minScore) speedRate = this.normalSpeedRate;else {
                speedRate = this.targetSpeedRate;
                if (speedRate != this.normalSpeedRate && speedRate == this.speedingSpeedRate) this.pullScore(this.speedingScoreCost);
            }
            for (var i = 0; i < speedRate; ++i) {
                //移动蛇头
                this.targetRotation = o0CC.rotationFromVector(this.targetVector);
                this.head.rotation = o0CC.nextRotation(this.head.rotation, this.targetRotation, this.turningSpeed);
                var moveVector = o0CC.vectorFromRotation(this.head.rotation);
                this.body[0].x += moveVector.x * this.speed;
                this.body[0].y += moveVector.y * this.speed;

                //////////////下面是移动蛇身
                this.updateSnakeBody();
            }
        }
    }, {
        key: 'onCollisionEnter',
        value: function onCollisionEnter(other, self) {
            if (other.node.active == false || this.node.active == false) {
                //貌似能解决两蛇对撞导致卡死的bug
                return;
            }
            if (other.node.groupIndex == GroupIndex.Body) {
                //cc.log("aaaaaaaaaaaaaaaaaaa");
                var selfBody = false;
                if (this.body.length > 1) for (var i = 1; i < this.body.length; ++i) {
                    if (other.node == this.body[i]) {
                        selfBody = true;
                        break;
                    }
                }
                if (selfBody == false) {
                    //cc.log("dsadasd");
                    this.destroySnake();
                }
            }
            if (other.node.groupIndex == GroupIndex.Food) {
                this.addScore(other.score);
                other.node.destroy();
                //other.destroy();
            }
        }
    }, {
        key: 'onCollisionExit',
        value: function onCollisionExit(other, self) {
            if (other.node.active == false || this.node.active == false) {
                //貌似能解决两蛇对撞导致卡死的bug
                return;
            }
            if (other.node.groupIndex == GroupIndex.PlayGround) {
                this.destroySnake();
            }
        }
    }, {
        key: 'node',
        get: function get() {
            return this.script.node;
        }
    }, {
        key: 'radius',
        get: function get() {
            return this.script.radius;
        },
        set: function set(_radius) {
            this.script.radius = _radius;
        }
    }, {
        key: 'bodyParentNode',
        get: function get() {
            return this.script.bodyParentNode;
        }
    }, {
        key: 'foodParentNode',
        get: function get() {
            return this.script.foodParentNode;
        }
    }, {
        key: 'body',
        get: function get() {
            return this.script.body;
        }
    }, {
        key: 'head',
        get: function get() {
            return this.script.head;
        }
    }, {
        key: 'score',
        get: function get() {
            return this.script.score;
        },
        set: function set(_score) {
            this.script.score = _score;
        }
    }, {
        key: 'pullScoreThreshold',
        get: function get() {
            return Math.pow(this.body[0].scaleX * this.body[0].scaleY, 1) * 1.5;
        }
    }, {
        key: 'targetBodyLength',
        get: function get() {
            return this.score / Math.pow(this.body[0].scaleX * this.body[0].scaleY, 1.5);
        }
    }]);

    return SnakeDirectionControl;
}();

var SnakeMouseControl = function (_SnakeDirectionContro) {
    _inherits(SnakeMouseControl, _SnakeDirectionContro);

    function SnakeMouseControl(script) {
        _classCallCheck(this, SnakeMouseControl);

        //module.exports.snakeDirectionControl.prototype.getName.call(this,);

        var _this = _possibleConstructorReturn(this, (SnakeMouseControl.__proto__ || Object.getPrototypeOf(SnakeMouseControl)).call(this, script));

        var self = _this;
        _this.mouseLocation = new o0.Vector2(1, 0);

        var listener = {
            event: cc.EventListener.MOUSE,
            onMouseDown: function onMouseDown(event) {
                self.setTargetSpeeding(true);
            },
            onMouseUp: function onMouseUp(event) {
                self.setTargetSpeeding(false);
            },
            onMouseMove: function onMouseMove(event) {
                self.mouseLocation = event.getLocation();
            },
            onMouseScroll: function onMouseScroll(event) {}
        };
        cc.eventManager.addListener(listener, _this.node);
        return _this;
    }

    _createClass(SnakeMouseControl, [{
        key: 'update',
        value: function update(dt) {
            var localLocation = this.node.parent.convertToNodeSpaceAR(this.mouseLocation);
            this.setTargetVector(new o0.Vector2(localLocation).mod);

            SnakeDirectionControl.prototype.update(dt);
        }
    }]);

    return SnakeMouseControl;
}(SnakeDirectionControl); /** */

module.exports = {
    GroupIndex: GroupIndex
    //SnakeDirectionControl,
    //SnakeMouseControl,
};

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=o0Game.js.map
        