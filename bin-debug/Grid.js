var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Grid = (function (_super) {
    __extends(Grid, _super);
    function Grid() {
        var _this = _super.call(this) || this;
        _this.once(eui.UIEvent.COMPLETE, _this.uiComplete, _this);
        return _this;
    }
    Grid.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    Grid.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    Grid.prototype.uiComplete = function (e) {
        this.ans.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clearText, this);
        this.hint.visible = false;
    };
    Grid.prototype.clearText = function (e) {
        this.ans.text = "";
    };
    Grid.prototype.setValue = function (v) {
        this.ans.text = v.toString();
    };
    Grid.prototype.getValue = function () {
        if (this.ans.text == "") {
            return -1;
        }
        else {
            return parseInt(this.ans.text);
        }
    };
    return Grid;
}(eui.Component));
__reflect(Grid.prototype, "Grid", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=Grid.js.map