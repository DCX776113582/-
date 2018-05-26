// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

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
        chuziPrefab:{
            default:null,
            type:cc.Prefab
        }

    },
    spawnNewMouse: function() {
    
        var num=Math.floor(Math.random()*4)

        var newMouse=cc.instantiate(this.mousePrefab[num]);
            // 将新增的节点添加到 Canvas 节点下面
            this.node.addChild(newMouse);
            this.mouse=newMouse;

            // 为mouse设置一个随机位置
          var num1=Math.floor(Math.random()*9)
            newMouse.setPosition(this.pointmouse[num1]);
            this.mousepoint=newMouse.getPosition()
    
             // 将 Game 组件的实例传入mouse组件
            newMouse.getComponent('mouse1').game = this;
    
        },
    // LIFE-CYCLE CALLBACKS:
   
    onLoad () {
        this.counn=0
        // var manager = cc.director.getCollisionManager();
        // manager.enabled = true;
        
        this.timer=0
        this.spawnNewMouse()
        
        cc.eventManager.addListener({
           event:cc.EventListener.TOUCH_ONE_BY_ONE,
           onTouchBegan:this.onTouchBegan.bind(this),
           onTouchMoved:this.onTouchMoved.bind(this),
           onTouchEnded:this.onTouchEnded.bind(this),
           onTouchCancelled:this.onTouchCancelled.bind(this)

        },this.node);
},


    onTouchBegan:function(touch,event){



    //  console.log("****&&&&&&&&&&********:",pointPos.x,pointPos.y)
    //  console.log("****&&&&&&&&&&********:",this.mousepoint.x,this.mousepoint.y)
        var pointPos = touch.getLocation();
        var dist = cc.pDistance(this.mousepoint, pointPos);
        if (dist<100)
        {
            this.counn++
            console.log("********************",this.counn);

            this.mouse.getComponent("mouse1").onPicked();
           
            //创建锤子
            var newChuizi=cc.instantiate(this.chuziPrefab);
            this.node.addChild(newChuizi);
            newChuizi.setPosition(cc.p(pointPos.x,pointPos.y-20));
    
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



    update (dt) {},
});
