// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

// cc.Class({
//     extends: cc.Component,

//     properties: {
//         // foo: {
//         //     // ATTRIBUTES:
//         //     default: null,        // The default value will be used only when the component attaching
//         //                           // to a node for the first time
//         //     type: cc.SpriteFrame, // optional, default is typeof default
//         //     serializable: true,   // optional, default is true
//         // },
//         // bar: {
//         //     get () {
//         //         return this._bar;
//         //     },
//         //     set (value) {
//         //         this._bar = value;
//         //     }
//         // },
        
//         LaoShuPrefab:[cc.Prefab],
//         pointLaoshu:[cc.Vec2]
//     },
//     spawnNewLaoShu: function() {
//         var num = Math.floor(Math.random()*3)
        

//             var newLaoShu = cc.instantiate(this.LaoShuPrefab[num]);
//             this.node.addChild(newLaoShu);

//             // var num2 = Math.floor(Math.random()*8)
//             // newLaoShu.setPosition(pointLaoshu[num2]);
//             newLaoShu.getComponent('LaoShu').game = this;
//         },
       
//     // LIFE-CYCLE CALLBACKS:

//     onLoad () {
//         this.time = 0;
//         this.spawnNewLaoShu();
//     },

//     start () {

//     },

//     // update (dt) {
//     //   
//     // },
    


// });



cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        mousePrefab: [cc.Prefab],
        pointmouse:[cc.Vec2],
        chuiziParedf:{
            default:null,
            type:cc.Prefab
        }

    },
    spawnNewMouse: function() {
    
        var num=Math.floor(Math.random()*4)

        var newMouse=cc.instantiate(this.mousePrefab[num]);
        this.LaoShu = newMouse;
        this.node.addChild(newMouse);
          
            var num1=Math.floor(Math.random()*9)
            newMouse.setPosition(this.pointmouse[num1]);
            newMouse.getComponent('LaoShu').game = this;
            this.mousePoition = newMouse.getPosition();
    
        },

    onLoad () {
        this.timer=0
        this.spawnNewMouse()

        cc.eventManager.addListener({
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan:this.onTouchBegan.bind(this)
         },this.node);

    },
    onTouchBegan:function(touch,event){

   
           var point = touch.getLocation();
           var dist = cc.pDistance(this.mousePoition,point)
           if (dist < 80)
           {
                this.LaoShu.getComponent("LaoShu").onPicked();
                var newchuizi = cc.instantiate(this.chuiziParedf);
                this.node.addChild(newchuizi);
                newchuizi.setPosition(cc.p(point.x,point.y-20));
           }
   
           return true;
       },
       onTouchEnded:function(touch,event){
           console.log("onTouchEnded");
       },
       onTouchMoved:function(touch,event){
           console.log("onTouchMoved");
       },
       onTouchCancelled:function(touch,event){
           console.log("onTouchCancelled");
       },
    start () {

    },

    // update (dt){},
});
