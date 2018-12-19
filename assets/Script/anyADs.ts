// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    
    @property(cc.Label)
    TXT:cc.Label = null;

    @property(cc.Node)
    Btn:cc.Node =null;
    
    btnClick(event, customEventData){
        cc.director.loadScene("SlitherIO")
   }
    ADTest(event)
    {
        if(typeof(anysdk) == 'undefined'){
            this.TXT.string = 'anysdk undefined';
            return;
        }
        else{
            this.TXT.string = 'anysdk';
        }
        letads_plugin = anysdk.agentManager;
        if(typeof(ads_plugin) == 'undefined'){
            this.TXT.string = 'ads_plugin undefined';
            return;
        }else{
            this.TXT.string = 'ads_plugin';
        }
        letads = ads_plugin.getAdsPlugin();
        if(typeof(ads) == 'undefined'){
            this.TXT.string = 'ads underfined';
            return;

        }else{
            this.TXT.string = 'ads';

        }
        if(ads && ads.isAdTypeSupported(anysdk.AdsType.AD_TYPE_FULLSCREEN)){
            ads.showAds(anysdk.AdsType.AD_TYPE_FULLSCREEN);
        }
        ads.setListener(this.onAdsResult,this);

    }
   
   
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}
