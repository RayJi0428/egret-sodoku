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
var NineGrid = (function (_super) {
    __extends(NineGrid, _super);
    function NineGrid() {
        var _this = _super.call(this) || this;
        _this.once(eui.UIEvent.COMPLETE, _this.uiComplete, _this);
        return _this;
    }
    NineGrid.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    NineGrid.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    NineGrid.prototype.uiComplete = function (e) {
        this.gridList = [];
        for (var i = 0; i < 9; ++i) {
            this.gridList.push(this["grid_" + i]);
        }
        egret.error(this.getValueList());
    };
    NineGrid.prototype.getValueList = function () {
        var result = [];
        this.gridList.forEach(function (v) {
            result.push(v.getValue());
        }, this);
        return result;
    };
    return NineGrid;
}(eui.Component));
__reflect(NineGrid.prototype, "NineGrid", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=NineGrid.js.map