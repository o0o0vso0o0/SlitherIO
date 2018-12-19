"use strict";
cc._RF.push(module, 'e21eaoSCVRKFI0ZqS4AKAJm', 'anyADs');
// Script/anyADs.ts

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.TXT = null;
        _this.Btn = null;
        return _this;
        // update (dt) {}
    }
    NewClass.prototype.btnClick = function (event, customEventData) {
        cc.director.loadScene("SlitherIO");
    };
    NewClass.prototype.ADTest = function (event) {
        if (typeof (anysdk) == 'undefined') {
            this.TXT.string = 'anysdk undefined';
            return;
        }
        else {
            this.TXT.string = 'anysdk';
        }
        letads_plugin = anysdk.agentManager;
        if (typeof (ads_plugin) == 'undefined') {
            this.TXT.string = 'ads_plugin undefined';
            return;
        }
        else {
            this.TXT.string = 'ads_plugin';
        }
        letads = ads_plugin.getAdsPlugin();
        if (typeof (ads) == 'undefined') {
            this.TXT.string = 'ads underfined';
            return;
        }
        else {
            this.TXT.string = 'ads';
        }
        if (ads && ads.isAdTypeSupported(anysdk.AdsType.AD_TYPE_FULLSCREEN)) {
            ads.showAds(anysdk.AdsType.AD_TYPE_FULLSCREEN);
        }
        ads.setListener(this.onAdsResult, this);
    };
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    NewClass.prototype.start = function () {
    };
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "TXT", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "Btn", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();