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
var SudokuScene = (function (_super) {
    __extends(SudokuScene, _super);
    function SudokuScene() {
        var _this = _super.call(this) || this;
        _this.once(eui.UIEvent.COMPLETE, _this.uiComplete, _this);
        _this.skinName = "SudokuSceneSkin";
        return _this;
    }
    SudokuScene.prototype.uiComplete = function (e) {
        egret.log("A");
    };
    SudokuScene.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    SudokuScene.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    return SudokuScene;
}(eui.Component));
__reflect(SudokuScene.prototype, "SudokuScene", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=SudokuScene.js.map