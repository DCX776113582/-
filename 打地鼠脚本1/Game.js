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
        mousePrefab: {
            default: null,
            type: cc.Prefab
            },
        atackPrefab: {
            default: null,
            type:cc.Prefab
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.spawNewMouse();
    },
    spawNewMouse: function() {
        var newMouse = cc.instantiate(this.mousePrefab);
        newMouse.setPosition(this.getNewMousePosition());
        newMouse.getComponent('Mouse').game = this;
        this.node.addChild(newMouse);
    },
    spawNewAtack: function(point) {
        var newAtack = cc.instantiate(this.atackPrefab);
        newAtack.setPosition(point);
        this.node.addChild(newAtack);
    },
    getNewMousePosition: function() {
        var x = 190 + 275  * parseInt(3*Math.random());
        var y = 140 + 125  * parseInt(3*Math.random());
        return cc.p(x, y);
    },
    
    start () {

    },

    // update (dt) {},
});
