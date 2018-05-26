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
        game: {
            default: null,
            serializable: false
            },
        timer: 0,
        mouseDuration: 3,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.timer = 0;
        var self = this;
        this.node.on(cc.Node.EventType.TOUCH_START, function  (event) {
            var location = event.touch.getLocation();   
            self.game.spawNewAtack(location);
            self.onPicked();
            return true;
        },this.node);
    },
    onPicked: function() {
        this.game.spawNewMouse();
        this.node.destroy();
    },
    
    start () {

    },

    update (dt) {
        
        if (this.timer > this.mouseDuration) {
            this.onPicked();
            return;
            }
            this.timer += dt;
    },
});
