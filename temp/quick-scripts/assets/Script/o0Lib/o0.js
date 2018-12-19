(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/o0Lib/o0.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '895c0YF2R9OtLpbGDZeVBxq', 'o0', __filename);
// Script/o0Lib/o0.js

"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = {
    Timer: function () {
        function Timer(second) {
            _classCallCheck(this, Timer);

            this.interval = second * 1000;
            this.nextTiming();
        }

        _createClass(Timer, [{
            key: "nextTiming",
            value: function nextTiming() {
                this.date = new Date();
            }
        }, {
            key: "tryNextTiming",
            value: function tryNextTiming() {
                if (!this.isDue) {
                    return false;
                }
                this.nextTiming();
                return true;
            }
        }, {
            key: "isDue",
            get: function get() {
                return new Date().getTime() - this.date.getTime() >= this.interval;
            }
        }]);

        return Timer;
    }(),
    FixedTimer: function () {
        function FixedTimer(fps) {
            _classCallCheck(this, FixedTimer);

            this.fps = fps;
            this.updateInterval = 1000.0 / fps;
            this.remainder = 0;
            this.nextTiming();
        }

        _createClass(FixedTimer, [{
            key: "nextTiming",
            value: function nextTiming() {
                this.date = new Date();
            }
        }, {
            key: "fixedUpdateTimes",
            value: function fixedUpdateTimes() {
                var newTime = new Date();
                var interval = newTime.getTime() - this.date.getTime() + this.remainder;
                this.date = newTime;
                this.remainder = interval % this.updateInterval;

                return parseInt(interval / this.updateInterval);
            }
        }]);

        return FixedTimer;
    }(),
    FixedTimerDT: function () {
        function FixedTimerDT(fps) {
            _classCallCheck(this, FixedTimerDT);

            this.fps = fps;
            this.updateInterval = 1000.0 / fps;
            this.remainder = 0;
        }

        _createClass(FixedTimerDT, [{
            key: "fixedUpdateTimes",
            value: function fixedUpdateTimes(dt) {
                //time in second
                var interval = dt * 1000 + this.remainder;
                this.remainder = interval % this.updateInterval;

                //cc.log(parseInt(interval / this.updateInterval));
                return parseInt(interval / this.updateInterval);
            }
        }]);

        return FixedTimerDT;
    }(),
    Vector2: function () {
        function Vector2() {
            _classCallCheck(this, Vector2);

            switch (arguments.length) {
                default:
                case 1:
                    this.x = arguments[0].x;
                    this.y = arguments[0].y;
                    break;
                case 2:
                    this.x = arguments[0];
                    this.y = arguments[1];
                    break;
            }
        }

        _createClass(Vector2, [{
            key: "radian",
            /**/
            value: function radian(anotherVector) {
                //都必须是长度为1的vector
                return Math.asin(Math.sqrt(Math.pow(this.x - anotherVector.x, 2) + Math.pow(this.y - anotherVector.y, 2)) / 2) * 2;
            }
        }, {
            key: "angle",
            value: function angle(anotherModVector) {
                return this.radian(anotherModVector) / Math.PI * 180;
            }
        }, {
            key: "rotate",
            value: function rotate(radian) {
                var cosRadian = Math.cos(radian);
                var sinRadian = Math.sin(radian);
                return new this.constructor(this.x * cosRadian + this.y * sinRadian, this.y * cosRadian - this.x * sinRadian);
            }
        }, {
            key: "rotateAngle",
            value: function rotateAngle(angle) {
                return this.rotate(angle / 180 * Math.PI);
            }
        }, {
            key: "plus",
            value: function plus(anotherVector) {
                return new this.constructor(this.x + anotherVector.x, this.y + anotherVector.y);
            }
        }, {
            key: "minus",
            value: function minus(anotherVector) {
                return new this.constructor(this.x - anotherVector.x, this.y - anotherVector.y);
            }
        }, {
            key: "multiply",
            value: function multiply(num) {
                return new this.constructor(this.x * num, this.y * num);
            }
        }, {
            key: "toLength",
            value: function toLength(length) {
                var mod = this.mod;
                return new this.constructor(mod.x * length, mod.y * length);
            }
        }, {
            key: "length",
            get: function get() {
                if (this.x == 0 && this.y == 0) return 0;
                return Math.sqrt(this.x * this.x + this.y * this.y);
            } /** */

        }, {
            key: "mod",
            get: function get() {
                var length = this.length;
                return new this.constructor(this.x / length, this.y / length);
            }
        }]);

        return Vector2;
    }(),
    Line2: function () {
        function Line2() {
            _classCallCheck(this, Line2);

            switch (arguments.length) {
                default:
                case 1:
                    this.a = arguments[0].a;
                    this.b = arguments[0].b;
                    break;
                case 2:
                    this.a = arguments[0];
                    this.b = arguments[1];
                    break;
                case 4:
                    this.a = new module.exports.Vector2(arguments[0], arguments[1]);
                    this.b = new module.exports.Vector2(arguments[2], arguments[3]);
                    break;
            }
        }

        _createClass(Line2, [{
            key: "vertex",
            value: function vertex(index) {
                switch (index) {
                    default:
                    case 0:
                        return this.a;
                    case 1:
                        return this.b;
                }
            }
        }, {
            key: "vector",
            get: function get() {
                return this.b.minus(this.a);
            }
        }, {
            key: "length",
            get: function get() {
                return this.vector.length;
            }
        }]);

        return Line2;
    }(),
    Rect: function () {
        function Rect() {
            _classCallCheck(this, Rect);

            switch (arguments.length) {
                default:
                case 1:
                    this.position = arguments[0].position;
                    this.size = arguments[0].size;
                    break;
                case 2:
                    this.position = arguments[0];
                    this.size = arguments[1];
                    break;
                case 4:
                    this.position = new module.exports.Vector2(arguments[0], arguments[1]);
                    this.size = new module.exports.Vector2(arguments[2], arguments[3]);
                    break;
            }
        }

        _createClass(Rect, [{
            key: "vertex",
            value: function vertex(index) {
                switch (index) {
                    default:
                    case 0:
                        return this.position;
                    case 1:
                        return new module.exports.Vector2(this.position.x, this.position.y + this.size.y);
                    case 2:
                        return this.position.plus(this.size);
                    case 3:
                        return new module.exports.Vector2(this.position.x + this.size.x, this.position.y);
                }
            } //Clockwise

        }, {
            key: "edge",
            value: function edge(index) {
                switch (index) {
                    default:
                    case 0:
                        return new module.exports.Line2(this.vertex(0), this.vertex(1));
                    case 1:
                        return new module.exports.Line2(this.vertex(1), this.vertex(2));
                    case 2:
                        return new module.exports.Line2(this.vertex(2), this.vertex(3));
                    case 3:
                        return new module.exports.Line2(this.vertex(3), this.vertex(0));
                }
            } //Clockwise

        }, {
            key: "vertexs",
            get: function get() {
                var edges = [];
                for (var i = 0; i < 4; ++i) {
                    edges.push(this.vertex(i));
                }
                return edges;
            }
        }, {
            key: "edges",
            get: function get() {
                var edges = [];
                for (var i = 0; i < 4; ++i) {
                    edges.push(this.edge(i));
                }
                return edges;
            }
        }, {
            key: "pos",
            get: function get() {
                return this.position;
            },
            set: function set(value) {
                this.position = value;
            }
        }, {
            key: "x",
            get: function get() {
                return this.position.x;
            },
            set: function set(value) {
                this.position.x = value;
            }
        }, {
            key: "y",
            get: function get() {
                return this.position.y;
            },
            set: function set(value) {
                this.position.y = value;
            }
        }, {
            key: "width",
            get: function get() {
                return this.size.x;
            },
            set: function set(value) {
                this.size.x = value;
            }
        }, {
            key: "height",
            get: function get() {
                return this.size.y;
            },
            set: function set(value) {
                this.size.y = value;
            }
        }]);

        return Rect;
    }(),
    Vector3: function () {
        function Vector3() {
            _classCallCheck(this, Vector3);

            switch (arguments.length) {
                default:
                case 1:
                    this.x = arguments[0].x;
                    this.y = arguments[0].y;
                    this.z = arguments[0].z;
                    break;
                case 3:
                    this.x = arguments[0];
                    this.y = arguments[1];
                    this.z = arguments[2];
                    break;
            }
        }

        _createClass(Vector3, [{
            key: "plus",
            value: function plus(anotherVector) {
                return new this.constructor(this.x + anotherVector.x, this.y + anotherVector.y, this.z + anotherVector.z);
            }
        }, {
            key: "minus",
            value: function minus(anotherVector) {
                return new this.constructor(this.x - anotherVector.x, this.y - anotherVector.y, this.z - anotherVector.z);
            }
        }, {
            key: "multiply",
            value: function multiply(num) {
                return new this.constructor(this.x * num, this.y * num, this.z * num);
            }
        }, {
            key: "toLength",
            value: function toLength(length) {
                var mod = this.mod;
                return new this.constructor(mod.x * length, mod.y * length, mod.z * length);
            }
        }, {
            key: "length",
            get: function get() {
                if (this.x == 0 && this.y == 0 && this.z == 0) return 0;
                return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
            } /** */

        }, {
            key: "mod",
            get: function get() {
                var length = this.length;
                return new this.constructor(this.x / length, this.y / length, this.z / length);
            }
        }]);

        return Vector3;
    }(),
    isSameSign: function isSameSign(a, b) {
        if (a >= 0 && b >= 0 || a <= 0 && b <= 0) {
            return true;
        }
        return false;
    },
    distance2: function distance2(a, b) {
        var distance = Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
        switch (arguments.length) {
            default:
            case 2:
                return distance;
            case 3:
                var vector = arguments[2]; //vector must be in same line with a b
                if (module.exports.isSameSign(b.x - a.x, vector.x) && module.exports.isSameSign(b.y - a.y, vector.y)) {
                    return distance;
                } else {
                    return -distance;
                }
        }
    },
    maxLengthLine2: function maxLengthLine2(vertexs) {
        if (vertexs.length == 0) {
            return null;
        }
        if (vertexs.length == 1) {
            return new module.exports.Line2(vertexs[0], vertexs[0]);
        }
        var maxLengthLine = null;
        var maxLength = -1;
        for (var i = 0; i < vertexs.length - 1; ++i) {
            for (var j = i + 1; j < vertexs.length; ++j) {
                var newLine = new module.exports.Line2(vertexs[i], vertexs[j]);
                var newLength = newLine.length;
                if (maxLength < newLength) {
                    maxLength = newLength;
                    maxLengthLine = newLine;
                }
            }
        }
        return maxLengthLine;
    },
    randomInCircle2: function randomInCircle2() {
        var center; //diameter
        var size; //diameter
        switch (arguments.length) {
            default:
            case 1:
                center = new module.exports.Vector2(0, 0);
                size = arguments[0];
                break;
            case 2:
                center = arguments[0];
                size = arguments[1];
                break;
        }
        return new module.exports.Vector2(1, 0).rotate(Math.random() * Math.PI * 2).toLength(Math.sqrt(Math.random() * Math.pow(size / 2, 2))).plus(center);
    },
    intersectionLineLine2: function intersectionLineLine2() {
        //for 2D //https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection
        var p11, p12, p21, p22;
        switch (arguments.length) {
            default:
            case 4:
                p11 = arguments[0];
                p12 = arguments[1];
                p21 = arguments[2];
                p22 = arguments[3];
                break;
            case 2:
                p11 = arguments[0].a;
                p12 = arguments[0].b;
                p21 = arguments[1].a;
                p22 = arguments[1].b;
                break;
        }
        var denominator = (p11.x - p12.x) * (p21.y - p22.y) - (p11.y - p12.y) * (p21.x - p22.x);
        if (denominator == 0) {
            return null;
        }
        var t = ((p11.x - p21.x) * (p21.y - p22.y) - (p11.y - p21.y) * (p21.x - p22.x)) / denominator;
        var u = ((p11.x - p12.x) * (p11.y - p21.y) - (p11.y - p12.y) * (p11.x - p21.x)) / denominator;
        return new module.exports.Vector2(p11.x + t * (p12.x - p11.x), p11.y + t * (p12.y - p11.y));
    },
    arrangeInLine1: function arrangeInLine1(p1, p2, vector) {
        //1维//vector为正,p1小于p2
        var values = [];
        for (var i = Math.ceil(p1 / vector) * vector; i <= p2; i += vector) {
            values.push(i);
        }
        return values;
    },
    arrangeInLine2: function arrangeInLine2() {
        //3点必须在1线
        //return [];
        var p1, p2, origin, vector;
        switch (arguments.length) {
            default:
            case 4:
                p1 = arguments[0];
                p2 = arguments[1];
                origin = arguments[2];
                vector = arguments[3];
                break;
            case 3:
                if (arguments[0] == null) {
                    return [];
                }
                p1 = arguments[0].a;
                p2 = arguments[0].b;
                origin = arguments[1];
                vector = arguments[2];
                break;
        }
        var begin, end;
        if (module.exports.isSameSign(p2.x - p1.x, vector.x) && module.exports.isSameSign(p2.y - p1.y, vector.y)) {
            begin = p1;
            end = p2;
        } else {
            begin = p2;
            end = p1;
        }
        if (module.exports.isSameSign(begin.x - origin.x, vector.x) && module.exports.isSameSign(begin.y - origin.y, vector.y)) {
            begin = module.exports.distance2(origin, begin);
        } else {
            begin = -module.exports.distance2(origin, begin);
        }
        if (module.exports.isSameSign(end.x - origin.x, vector.x) && module.exports.isSameSign(end.y - origin.y, vector.y)) {
            end = module.exports.distance2(origin, end);
        } else {
            end = -module.exports.distance2(origin, end);
        }
        var points = [];
        var modVector = vector.mod;
        var values = module.exports.arrangeInLine1(begin, end, vector.length);
        for (var i = 0; i < values.length; ++i) {
            points.push(origin.plus(modVector.multiply(values[i])));
        }
        return points; /** */
    },
    pointOnLineSegment: function pointOnLineSegment(line, point) {
        var acceptableError = line.length / 1000000; //存在计算误差
        var v1 = line.a.minus(point);
        var v2 = line.b.minus(point);
        if (module.exports.isSameSign(v1.x, v2.x) && module.exports.isSameSign(v1.y, v2.y) && v1.length >= acceptableError && v2.length >= acceptableError) {
            //存在计算误差
            return false;
        }
        return true;
    },
    lineSegmentInRect: function lineSegmentInRect(rect, line) {
        var edge = rect.edges;
        var ip = [];
        for (var i = 0; i < edge.length; ++i) {
            var newIp = module.exports.intersectionLineLine2(edge[i], line);
            if (newIp != null && module.exports.pointOnLineSegment(edge[i], newIp)) {
                ip.push(newIp);
            }
        }
        return module.exports.maxLengthLine2(ip); /** */
    },

    arrangeInRect2: function arrangeInRect2(rect, origin, horizontalVector, verticalVector) {
        var ip = [];
        for (var i = 0; i < 4; ++i) {
            ip.push(module.exports.intersectionLineLine2(origin, origin.plus(verticalVector), rect.vertex(i), rect.vertex(i).plus(horizontalVector)));
        }
        if (module.exports.distance2(ip[0], ip[2]) > module.exports.distance2(ip[1], ip[3])) {
            ip = [ip[0], ip[2], ip[1], ip[3]]; //verticalBegin;verticalEnd;horizontalBegin;horizontalEnd;
        } else {
            ip = [ip[1], ip[3], ip[0], ip[2]]; //verticalBegin;verticalEnd;horizontalBegin;horizontalEnd;
        }
        var pos = [];
        var verticalPoints = module.exports.arrangeInLine2(ip[0], ip[1], origin, verticalVector);
        for (var i = 0; i < verticalPoints.length; ++i) {
            var lineSegmentInRect = module.exports.lineSegmentInRect(rect, new module.exports.Line2(verticalPoints[i], verticalPoints[i].plus(horizontalVector))); //}/*
            var horizontalPoints = module.exports.arrangeInLine2(lineSegmentInRect, verticalPoints[i], horizontalVector);
            pos = pos.concat(horizontalPoints);
        }
        return pos; /** */
        //return verticalPoints;
    }
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
        //# sourceMappingURL=o0.js.map
        