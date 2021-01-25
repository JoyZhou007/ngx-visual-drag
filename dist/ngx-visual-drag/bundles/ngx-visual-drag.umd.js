(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('ng-zorro-antd/message'), require('rxjs'), require('@angular/common'), require('ng-zorro-antd/button'), require('ng-zorro-antd/input'), require('@angular/forms'), require('ng-zorro-antd/layout'), require('ng-zorro-antd/tabs'), require('ng-zorro-antd/select'), require('@angular/platform-browser/animations')) :
    typeof define === 'function' && define.amd ? define('ngx-visual-drag', ['exports', '@angular/core', 'ng-zorro-antd/message', 'rxjs', '@angular/common', 'ng-zorro-antd/button', 'ng-zorro-antd/input', '@angular/forms', 'ng-zorro-antd/layout', 'ng-zorro-antd/tabs', 'ng-zorro-antd/select', '@angular/platform-browser/animations'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['ngx-visual-drag'] = {}, global.ng.core, global.i1, global.rxjs, global.ng.common, global.button, global.input, global.ng.forms, global.layout, global.tabs, global.select, global.ng.platformBrowser.animations));
}(this, (function (exports, i0, i1, rxjs, common$1, button, input, forms, layout, tabs, select, animations) { 'use strict';

    var NgxVisualDragService = /** @class */ (function () {
        function NgxVisualDragService() {
        }
        return NgxVisualDragService;
    }());
    NgxVisualDragService.ɵprov = i0.ɵɵdefineInjectable({ factory: function NgxVisualDragService_Factory() { return new NgxVisualDragService(); }, token: NgxVisualDragService, providedIn: "root" });
    NgxVisualDragService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    NgxVisualDragService.ctorParameters = function () { return []; };

    var id = 0;
    // 为每个元素创建一个独一无二的 ID
    function generateID() {
        return id++;
    }

    function deepCopy(target) {
        if (typeof target == 'object') {
            var result = Array.isArray(target) ? [] : {};
            for (var key in target) {
                if (typeof target[key] == 'object') {
                    result[key] = deepCopy(target[key]);
                }
                else {
                    result[key] = target[key];
                }
            }
            return result;
        }
        return target;
    }
    function swap(arr, i, j) {
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    var ComponentDataService = /** @class */ (function () {
        function ComponentDataService(message) {
            var _this = this;
            this.message = message;
            this.componentData = []; // 画布组件数据
            this.canvasStyleData = {
                width: 1200,
                height: 740,
            }; // 页面全局数据
            this.$shapeStyle = new rxjs.Subject();
            this.contextmenu = {
                show: false,
                top: 0,
                left: 0,
            }; // 右击菜单数据
            this.snapshotData = []; // 编辑器快照数据
            this.snapshotIndex = -1; // 快照索引
            this.notification = new rxjs.Subject();
            this.$storageData = new rxjs.Subject();
            this.initData();
            this.$shapeStyle.subscribe(function (x) {
                if (x.top)
                    _this.curComponent.style.top = x.top;
                if (x.left)
                    _this.curComponent.style.left = x.left;
                if (x.width)
                    _this.curComponent.style.width = x.width;
                if (x.height)
                    _this.curComponent.style.height = x.height;
                if (x.rotate)
                    _this.curComponent.style.rotate = x.rotate;
            });
        }
        ComponentDataService.prototype.initData = function () { };
        ComponentDataService.prototype.deleteCurComponent = function () {
            this.componentData.splice(this.curComponentIndex, 1);
        };
        ComponentDataService.prototype.hideContextMenu = function () {
            this.contextmenu = {
                show: false,
                top: 0,
                left: 0,
            };
        };
        ComponentDataService.prototype.upComponent = function () {
            // 上移图层 index，表示元素在数组中越往后
            if (this.curComponentIndex < this.componentData.length - 1) {
                swap(this.componentData, this.curComponentIndex, this.curComponentIndex + 1);
            }
            else {
                this.message.warning('已经到顶了');
            }
        };
        ComponentDataService.prototype.downComponent = function () {
            // 下移图层 index，表示元素在数组中越往前
            if (this.curComponentIndex > 0) {
                swap(this.componentData, this.curComponentIndex, this.curComponentIndex - 1);
            }
            else {
                this.message.warning('已经到底了');
            }
        };
        ComponentDataService.prototype.topComponent = function () {
            // 置顶
            if (this.curComponentIndex < this.componentData.length - 1) {
                swap(this.componentData, this.curComponentIndex, this.componentData.length - 1);
            }
            else {
                this.message.warning('已经到顶了');
            }
        };
        ComponentDataService.prototype.bottomComponent = function () {
            // 置底
            if (this.curComponentIndex > 0) {
                swap(this.componentData, this.curComponentIndex, 0);
            }
            else {
                this.message.warning('已经到底了');
            }
        };
        ComponentDataService.prototype.recordSnapshot = function () {
            // 添加新的快照
            this.snapshotData[++this.snapshotIndex] = deepCopy(this.componentData);
            // 在 undo 过程中，添加新的快照时，要将它后面的快照清理掉
            if (this.snapshotIndex < this.snapshotData.length - 1) {
                this.snapshotData = this.snapshotData.slice(0, this.snapshotIndex + 1);
            }
        };
        ComponentDataService.prototype.undo = function () {
            if (this.snapshotIndex >= 0) {
                this.snapshotIndex--;
                this.componentData =
                    deepCopy(this.snapshotData[this.snapshotIndex]) || [];
            }
        };
        ComponentDataService.prototype.redo = function () {
            if (this.snapshotIndex < this.snapshotData.length - 1) {
                this.snapshotIndex++;
                this.componentData =
                    deepCopy(this.snapshotData[this.snapshotIndex]) || [];
            }
        };
        ComponentDataService.prototype.setShapePosStyle = function (_a) {
            var key = _a.key, value = _a.value;
            this.curComponent.style[key] = value;
        };
        ComponentDataService.prototype.copy = function () {
            this.copyData = {
                data: deepCopy(this.curComponent),
                index: this.curComponentIndex,
            };
        };
        ComponentDataService.prototype.paste = function (isMouse) {
            if (!this.copyData) {
                this.message.warning('请选择组件');
                return;
            }
            var data = this.copyData.data;
            if (isMouse) {
                data.style.top = this.contextmenu.top;
                data.style.left = this.contextmenu.left;
            }
            else {
                data.style.top += 10;
                data.style.left += 10;
            }
            data.id = generateID();
            this.addComponent(data);
            this.recordSnapshot();
            this.copyData = null;
        };
        ComponentDataService.prototype.addComponent = function (component, index) {
            if (index !== undefined) {
                this.componentData.splice(index, 0, component);
            }
            else {
                this.componentData.push(component);
            }
        };
        ComponentDataService.prototype.cut = function () {
            if (!this.curComponent) {
                this.message.warning('请选择组件');
                return;
            }
            if (this.copyData) {
                this.addComponent(this.copyData.data, this.copyData.index);
                if (this.curComponentIndex >= this.copyData.index) {
                    // 如果当前组件索引大于等于插入索引，需要加一，因为当前组件往后移了一位
                    this.curComponentIndex++;
                }
            }
            this.copy();
            this.deleteCurComponent();
        };
        ComponentDataService.prototype.clearCanvas = function () {
            this.componentData = [];
        };
        ComponentDataService.prototype.restore = function (data) {
            // 用保存的数据恢复画布
            if (data) {
                this.componentData = this.resetID(data.canvasData);
                this.canvasStyleData = data.canvasStyle;
            }
            else {
                if (localStorage.getItem('canvasData')) {
                    this.componentData = this.resetID(JSON.parse(localStorage.getItem('canvasData')));
                }
                if (localStorage.getItem('canvasStyle')) {
                    this.canvasStyleData = JSON.parse(localStorage.getItem('canvasStyle'));
                }
            }
        };
        ComponentDataService.prototype.save = function () {
            localStorage.setItem('canvasData', JSON.stringify(this.componentData));
            localStorage.setItem('canvasStyle', JSON.stringify(this.canvasStyleData));
            this.message.success('保存成功');
            this.$storageData.next({
                canvasData: this.componentData,
                canvasStyle: this.canvasStyleData,
            });
        };
        ComponentDataService.prototype.resetID = function (data) {
            data.forEach(function (item) {
                item.id = generateID();
            });
            return data;
        };
        ComponentDataService.prototype.setEditMode = function (type) {
            this.editMode = type;
        };
        return ComponentDataService;
    }());
    ComponentDataService.ɵprov = i0.ɵɵdefineInjectable({ factory: function ComponentDataService_Factory() { return new ComponentDataService(i0.ɵɵinject(i1.NzMessageService)); }, token: ComponentDataService, providedIn: "root" });
    ComponentDataService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    ComponentDataService.ctorParameters = function () { return [
        { type: i1.NzMessageService }
    ]; };

    var NgxVisualDragComponent = /** @class */ (function () {
        function NgxVisualDragComponent(componentDataService) {
            this.componentDataService = componentDataService;
            this.onDataSave = new i0.EventEmitter();
        }
        NgxVisualDragComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.componentDataService.$storageData.subscribe(function (x) {
                _this.onDataSave.emit(x);
            });
        };
        return NgxVisualDragComponent;
    }());
    NgxVisualDragComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'lib-ngx-visual-drag',
                    template: " <lib-home [data]=\"data\"></lib-home> ",
                    encapsulation: i0.ViewEncapsulation.None,
                    styles: ["@import \"~ng-zorro-antd/ng-zorro-antd.min.css\";.mt-10{margin-top:10px!important}.mt-11{margin-top:11px!important}.mt-12{margin-top:12px!important}.mt-13{margin-top:13px!important}.mt-14{margin-top:14px!important}.mt-15{margin-top:15px!important}.mt-16{margin-top:16px!important}.mt-17{margin-top:17px!important}.mt-18{margin-top:18px!important}.mt-19{margin-top:19px!important}.mt-20{margin-top:20px!important}.mt-21{margin-top:21px!important}.mt-22{margin-top:22px!important}.mt-23{margin-top:23px!important}.mt-24{margin-top:24px!important}.mt-25{margin-top:25px!important}.mt-26{margin-top:26px!important}.mt-27{margin-top:27px!important}.mt-28{margin-top:28px!important}.mt-29{margin-top:29px!important}.mr-10{margin-right:10px!important}.mr-11{margin-right:11px!important}.mr-12{margin-right:12px!important}.mr-13{margin-right:13px!important}.mr-14{margin-right:14px!important}.mr-15{margin-right:15px!important}.mr-16{margin-right:16px!important}.mr-17{margin-right:17px!important}.mr-18{margin-right:18px!important}.mr-19{margin-right:19px!important}.mr-20{margin-right:20px!important}.mr-21{margin-right:21px!important}.mr-22{margin-right:22px!important}.mr-23{margin-right:23px!important}.mr-24{margin-right:24px!important}.mr-25{margin-right:25px!important}.mr-26{margin-right:26px!important}.mr-27{margin-right:27px!important}.mr-28{margin-right:28px!important}.mr-29{margin-right:29px!important}.mb-10{margin-bottom:10px!important}.mb-11{margin-bottom:11px!important}.mb-12{margin-bottom:12px!important}.mb-13{margin-bottom:13px!important}.mb-14{margin-bottom:14px!important}.mb-15{margin-bottom:15px!important}.mb-16{margin-bottom:16px!important}.mb-17{margin-bottom:17px!important}.mb-18{margin-bottom:18px!important}.mb-19{margin-bottom:19px!important}.mb-20{margin-bottom:20px!important}.mb-21{margin-bottom:21px!important}.mb-22{margin-bottom:22px!important}.mb-23{margin-bottom:23px!important}.mb-24{margin-bottom:24px!important}.mb-25{margin-bottom:25px!important}.mb-26{margin-bottom:26px!important}.mb-27{margin-bottom:27px!important}.mb-28{margin-bottom:28px!important}.mb-29{margin-bottom:29px!important}.ml-10{margin-left:10px!important}.ml-11{margin-left:11px!important}.ml-12{margin-left:12px!important}.ml-13{margin-left:13px!important}.ml-14{margin-left:14px!important}.ml-15{margin-left:15px!important}.ml-16{margin-left:16px!important}.ml-17{margin-left:17px!important}.ml-18{margin-left:18px!important}.ml-19{margin-left:19px!important}.ml-20{margin-left:20px!important}.ml-21{margin-left:21px!important}.ml-22{margin-left:22px!important}.ml-23{margin-left:23px!important}.ml-24{margin-left:24px!important}.ml-25{margin-left:25px!important}.ml-26{margin-left:26px!important}.ml-27{margin-left:27px!important}.ml-28{margin-left:28px!important}.ml-29{margin-left:29px!important}.absoulte{position:absolute}"]
                },] }
    ];
    NgxVisualDragComponent.ctorParameters = function () { return [
        { type: ComponentDataService }
    ]; };
    NgxVisualDragComponent.propDecorators = {
        data: [{ type: i0.Input }],
        onDataSave: [{ type: i0.Output }]
    };

    // 公共样式
    var commonStyle = {
        rotate: '',
        opacity: 1,
    };
    // 编辑器左侧组件列表
    var list = [
        {
            component: 'v-text',
            label: '文字',
            propValue: '文字',
            icon: 'el-icon-edit',
            animations: [],
            events: {},
            style: {
                width: 200,
                height: 33,
                fontSize: 14,
                fontWeight: 500,
                lineHeight: '',
                letterSpacing: 0,
                textAlign: '',
                color: '',
            },
        },
        {
            component: 'v-button',
            label: '按钮',
            propValue: '按钮',
            icon: 'el-icon-thumb',
            animations: [],
            events: {},
            style: {
                width: 100,
                height: 34,
                borderWidth: '',
                borderColor: '',
                borderRadius: '',
                fontSize: 14,
                fontWeight: 500,
                lineHeight: '',
                letterSpacing: 0,
                textAlign: '',
                color: '',
                backgroundColor: '',
            },
        },
        {
            component: 'Picture',
            label: '图片',
            icon: 'el-icon-picture',
            propValue: './../../assets/title.jpg',
            animations: [],
            events: {},
            style: {
                width: 300,
                height: 200,
                borderRadius: '',
            },
        },
    ];
    list.forEach(function (item) {
        item.style = Object.assign(Object.assign({}, item.style), commonStyle);
    });

    var HomeComponent = /** @class */ (function () {
        function HomeComponent(componentDataService) {
            this.componentDataService = componentDataService;
        }
        HomeComponent.prototype.ngOnInit = function () {
            this.componentDataService.restore(this.data);
        };
        HomeComponent.prototype.handleDrop = function (e) {
            e.preventDefault();
            e.stopPropagation();
            var component = deepCopy(list[e.dataTransfer.getData('index')]);
            component.style.top = e.offsetY;
            component.style.left = e.offsetX;
            component.id = generateID();
            this.componentDataService.componentData.push(component);
            this.componentDataService.recordSnapshot();
        };
        HomeComponent.prototype.handleDragOver = function (e) {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
        };
        HomeComponent.prototype.deselectCurComponent = function () {
            this.componentDataService.curComponent = null;
            this.componentDataService.curComponentIndex = null;
            this.componentDataService.hideContextMenu();
        };
        return HomeComponent;
    }());
    HomeComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'lib-home',
                    template: "<div class=\"home\">\n    <toolbar></toolbar>\n\n    <main>\n        <!-- \u5DE6\u4FA7\u7EC4\u4EF6\u5217\u8868 -->\n        <section class=\"left\">\n            <component-list></component-list>\n        </section>\n        <!-- \u4E2D\u95F4\u753B\u5E03 -->\n        <section class=\"center\">\n            <div class=\"content\" (drop)=\"handleDrop($event)\" (dragover)=\"handleDragOver($event)\"\n                (click)=\"deselectCurComponent()\">\n                <editor></editor>\n            </div>\n        </section>\n        <!-- \u53F3\u4FA7\u5C5E\u6027\u5217\u8868 -->\n        <section class=\"right\">\n            <!-- <el-tabs v-model=\"activeName\">\n                <el-tab-pane label=\"\u5C5E\u6027\" name=\"attr\">\n                    <AttrList v-if=\"curComponent\" />\n                    <p v-else class=\"placeholder\">\u8BF7\u9009\u62E9\u7EC4\u4EF6</p>\n                </el-tab-pane>\n                <el-tab-pane label=\"\u52A8\u753B\" name=\"animation\">\n                    <AnimationList v-if=\"curComponent\" />\n                    <p v-else class=\"placeholder\">\u8BF7\u9009\u62E9\u7EC4\u4EF6</p>\n                </el-tab-pane>\n                <el-tab-pane label=\"\u4E8B\u4EF6\" name=\"events\">\n                    <EventList v-if=\"curComponent\" />\n                    <p v-else class=\"placeholder\">\u8BF7\u9009\u62E9\u7EC4\u4EF6</p>\n                </el-tab-pane>\n            </el-tabs> -->\n            <nz-tabset class=\"tabset\">\n                <nz-tab nzTitle=\"\u5C5E\u6027\">\n                    <Attr-list *ngIf=\"!!componentDataService.curComponent\"></Attr-list>\n                </nz-tab>\n                <nz-tab nzTitle=\"Tab 2\">\n                    Content of Tab Pane 2\n                </nz-tab>\n                <nz-tab nzTitle=\"Tab 3\">\n                    Content of Tab Pane 3\n                </nz-tab>\n            </nz-tabset>\n        </section>\n    </main>\n</div>",
                    encapsulation: i0.ViewEncapsulation.None,
                    styles: [".home{background:#fff;height:100vh}.home main{height:calc(100% - 64px);position:relative}.home main .left{left:0;padding-top:10px;width:200px}.home main .left,.home main .right{height:100%;position:absolute;top:0}.home main .right{padding:0 15px;right:0;width:262px}.home main .right .tabset{height:100%}.home main .center,.home main .right .tabset .ant-tabs-content-holder{height:100%;overflow:auto}.home main .center{background:#f5f5f5;margin-left:200px;margin-right:262px;padding:20px}.home main .center .content{align-items:center;display:flex;height:100%;justify-content:center;overflow:auto}.home .placeholder{color:#333;text-align:center}"]
                },] }
    ];
    HomeComponent.ctorParameters = function () { return [
        { type: ComponentDataService }
    ]; };
    HomeComponent.propDecorators = {
        data: [{ type: i0.Input }]
    };

    var ToolbarComponent = /** @class */ (function () {
        function ToolbarComponent(componentDataService, message) {
            this.componentDataService = componentDataService;
            this.message = message;
            this.isShowPreview = false;
        }
        ToolbarComponent.prototype.ngOnInit = function () { };
        ToolbarComponent.prototype.redo = function () {
            this.componentDataService.redo();
        };
        ToolbarComponent.prototype.undo = function () {
            this.componentDataService.undo();
        };
        ToolbarComponent.prototype.save = function () {
            this.componentDataService.save();
        };
        ToolbarComponent.prototype.clearCanvas = function () {
            this.componentDataService.clearCanvas();
        };
        ToolbarComponent.prototype.preview = function () {
            this.isShowPreview = true;
            this.componentDataService.setEditMode('read');
        };
        ToolbarComponent.prototype.closePreview = function () {
            this.isShowPreview = false;
        };
        return ToolbarComponent;
    }());
    ToolbarComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'toolbar',
                    template: "<div>\n    <div class=\"toolbar\">\n        <button nz-button (click)=\"undo()\" class=\"mr-20  ml-20\">\u64A4\u6D88</button>\n        <button nz-button (click)=\"redo()\" class=\"mr-20\">\u91CD\u505A</button>\n        <label for=\"input\" class=\"insert\">\u63D2\u5165\u56FE\u7247</label>\n        <input type=\"file\" id=\"input\" hidden />\n        <button nz-button style=\"margin-left: 10px;\" class=\"mr-20\" (click)=\"preview()\">\u9884\u89C8</button>\n        <button nz-button class=\"mr-20\" (click)=\"save()\">\u4FDD\u5B58</button>\n        <button nz-button (click)=\"clearCanvas()\">\u6E05\u7A7A\u753B\u5E03</button>\n        <div class=\"canvas-config\">\n            <span>\u753B\u5E03\u5927\u5C0F</span>\n            <input nz-input [(ngModel)]=\"componentDataService.canvasStyleData.width\">\n            <span>*</span>\n            <input nz-input [(ngModel)]=\"componentDataService.canvasStyleData.height\">\n        </div>\n    </div>\n\n    <!-- \u9884\u89C8 -->\n    <!-- <Preview v-model=\"isShowPreview\" @change=\"handlePreviewChange\" /> -->\n    <Preview [isShowPreview]=\"isShowPreview\" (OutClose)=\"closePreview()\"></Preview>\n</div>",
                    encapsulation: i0.ViewEncapsulation.None,
                    styles: [".toolbar{background:#fff;border-bottom:1px solid #ddd;height:64px;line-height:64px}.toolbar .canvas-config{color:#606266;display:inline-block;font-size:14px;margin-left:10px}.toolbar .canvas-config input{border:1px solid #ddd;color:#606266;margin-left:10px;outline:none;padding:0 5px;width:50px}.toolbar .canvas-config span{margin-left:10px}.toolbar .insert{-webkit-appearance:none;background:#fff;border:1px solid #dcdfe6;border-radius:3px;box-sizing:border-box;color:#606266;cursor:pointer;display:inline-block;font-size:12px;font-weight:500;line-height:1;margin:0 0 0 10px;outline:0;padding:9px 15px;text-align:center;transition:.1s;white-space:nowrap}.toolbar .insert:active{border-color:#3a8ee6;color:#3a8ee6;outline:0}.toolbar .insert:hover{background-color:#ecf5ff;color:#3a8ee6}"]
                },] }
    ];
    ToolbarComponent.ctorParameters = function () { return [
        { type: ComponentDataService },
        { type: i1.NzMessageService }
    ]; };

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
            to[j] = from[i];
        return to;
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    //#region
    var list$1 = [
        button.NzButtonModule,
        input.NzInputModule,
        i1.NzMessageModule,
        layout.NzLayoutModule,
        tabs.NzTabsModule,
        select.NzSelectModule,
    ];
    //#endregion
    //#region
    var common = [common$1.CommonModule, forms.FormsModule];
    //#endregion
    var SharedModule = /** @class */ (function () {
        function SharedModule() {
        }
        return SharedModule;
    }());
    SharedModule.decorators = [
        { type: i0.NgModule, args: [{
                    declarations: [],
                    imports: __spread(common, list$1),
                    exports: __spread([common], list$1),
                },] }
    ];

    var ComponentListComponent = /** @class */ (function () {
        function ComponentListComponent() {
            this.componentList = list;
        }
        ComponentListComponent.prototype.ngOnInit = function () {
        };
        ComponentListComponent.prototype.handleDragStart = function (e) {
            e.dataTransfer.setData('index', e.target.dataset.index);
        };
        return ComponentListComponent;
    }());
    ComponentListComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'component-list',
                    template: "<div class=\"component-list\">\n    <div *ngFor=\"let item of componentList; index as i\" class=\"list\" draggable=\"true\"\n        (dragstart)=\"handleDragStart($event)\" [attr.data-index]=\"i\">\n        <i class=\"{{item.icon}}\"></i>\n        <span>{{ item.label }}</span>\n    </div>\n</div>",
                    styles: [".component-list{display:flex;flex-wrap:wrap;justify-content:space-between;padding:10px}.component-list .list{border:1px solid #ddd;color:#333;cursor:grab;margin-bottom:10px;padding:2px 5px;text-align:center;width:45%}.component-list .list:active{cursor:grabbing}"]
                },] }
    ];
    ComponentListComponent.ctorParameters = function () { return []; };

    function getStyle(style, filter) {
        if (filter === void 0) { filter = []; }
        var needUnit = [
            'fontSize',
            'width',
            'height',
            'top',
            'left',
            'borderWidth',
            'borderRadius',
        ];
        var result = {};
        Object.keys(style).forEach(function (key) {
            if (!filter.includes(key)) {
                if (key != 'rotate') {
                    result[key] = style[key];
                    if (needUnit.includes(key)) {
                        result[key] += 'px';
                    }
                }
                else {
                    result['transform'] = key + '(' + style[key] + 'deg)';
                }
            }
        });
        return result;
    }

    var EditorComponent = /** @class */ (function () {
        function EditorComponent(componentDataService) {
            this.componentDataService = componentDataService;
            this.isEdit = false;
        }
        EditorComponent.prototype.ngOnInit = function () { };
        EditorComponent.prototype.handleContextMenu = function (e) {
            e.stopPropagation();
            e.preventDefault();
            // 计算菜单相对于编辑器的位移
            var target = e.target;
            var top = e.offsetY;
            var left = e.offsetX;
            while (!target.className.includes('editor')) {
                left += target.offsetLeft;
                top += target.offsetTop;
                target = target.parentNode;
            }
            this.componentDataService.contextmenu = {
                show: true,
                top: top,
                left: left,
            };
        };
        EditorComponent.prototype.getComponentStyle = function (style) {
            return getStyle(style, ['top', 'left', 'width', 'height', 'rotate']);
        };
        return EditorComponent;
    }());
    EditorComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'editor',
                    template: "<div class=\"editor\" id=\"editor\" [class.edit]=\"isEdit\" [style.width.px]=\"componentDataService.canvasStyleData.width\"\n    [style.height.px]=\"componentDataService.canvasStyleData.height\" (contextmenu)=\"handleContextMenu($event)\">\n    <!--\u9875\u9762\u7EC4\u4EF6\u5217\u8868\u5C55\u793A-->\n    <shape *ngFor=\"let item of componentDataService.componentData; index as i\" [defaultStyle]=\"item.style\"\n        [active]=\"item.id === componentDataService?.curComponent?.id\" [element]=\"item\" [index]=\"i\">\n        <ng-container [ngSwitch]=\"item.component\">\n            <ng-container *ngSwitchCase=\"'v-button'\">\n                <v-button class=\"component\" [propValue]=\"item.propValue\" [vStyle]=\"getComponentStyle(item.style)\">\n                </v-button>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"'v-text'\">\n\n            </ng-container>\n            <ng-container *ngSwitchDefault>\n\n            </ng-container>\n        </ng-container>\n        <!-- <component v-if=\"item.component != 'v-text'\" class=\"component\" :is=\"item.component\"\n            :style=\"getComponentStyle(item.style)\" :propValue=\"item.propValue\" />\n\n        <component v-else class=\"component\" :is=\"item.component\" :style=\"getComponentStyle(item.style)\"\n            :propValue=\"item.propValue\" @input=\"handleInput\" :element=\"item\" /> -->\n    </shape>\n    <!-- \u53F3\u51FB\u83DC\u5355 -->\n    <context-menu></context-menu>\n    <!-- \u6807\u7EBF -->\n    <Markline></Markline>\n</div>",
                    encapsulation: i0.ViewEncapsulation.None,
                    styles: [".editor{background:#fff;flex-shrink:0;position:relative}.edit .component{height:100%;outline:none;width:100%}"]
                },] }
    ];
    EditorComponent.ctorParameters = function () { return [
        { type: ComponentDataService }
    ]; };

    // 角度转弧度
    // Math.PI = 180 度
    function angleToRadian(angle) {
        return angle * Math.PI / 180;
    }
    /**
     * 计算根据圆心旋转后的点的坐标
     * @param   {Object}  point  旋转前的点坐标
     * @param   {Object}  center 旋转中心
     * @param   {Number}  rotate 旋转的角度
     * @return  {Object}         旋转后的坐标
     * https://www.zhihu.com/question/67425734/answer/252724399 旋转矩阵公式
     */
    function calculateRotatedPointCoordinate(point, center, rotate) {
        /**
         * 旋转公式：
         *  点a(x, y)
         *  旋转中心c(x, y)
         *  旋转后点n(x, y)
         *  旋转角度θ                tan ??
         * nx = cosθ * (ax - cx) - sinθ * (ay - cy) + cx
         * ny = sinθ * (ax - cx) + cosθ * (ay - cy) + cy
         */
        return {
            x: (point.x - center.x) * Math.cos(angleToRadian(rotate)) - (point.y - center.y) * Math.sin(angleToRadian(rotate)) + center.x,
            y: (point.x - center.x) * Math.sin(angleToRadian(rotate)) + (point.y - center.y) * Math.cos(angleToRadian(rotate)) + center.y,
        };
    }
    /**
     * 获取旋转后的点坐标（八个点之一）
     * @param  {Object} style  样式
     * @param  {Object} center 组件中心点
     * @param  {String} name   点名称
     * @return {Object}        旋转后的点坐标
     */
    function getRotatedPointCoordinate(style, center, name) {
        var point; // point 是未旋转前的坐标
        switch (name) {
            case 't':
                point = {
                    x: style.left + (style.width / 2),
                    y: style.top,
                };
                break;
            case 'b':
                point = {
                    x: style.left + (style.width / 2),
                    y: style.top + style.height,
                };
                break;
            case 'l':
                point = {
                    x: style.left,
                    y: style.top + style.height / 2,
                };
                break;
            case 'r':
                point = {
                    x: style.left + style.width,
                    y: style.top + style.height / 2,
                };
                break;
            case 'lt':
                point = {
                    x: style.left,
                    y: style.top,
                };
                break;
            case 'rt':
                point = {
                    x: style.left + style.width,
                    y: style.top,
                };
                break;
            case 'lb':
                point = {
                    x: style.left,
                    y: style.top + style.height,
                };
                break;
            default: // rb
                point = {
                    x: style.left + style.width,
                    y: style.top + style.height,
                };
                break;
        }
        return calculateRotatedPointCoordinate(point, center, style.rotate);
    }
    // 求两点之间的中点坐标
    function getCenterPoint(p1, p2) {
        return {
            x: p1.x + ((p2.x - p1.x) / 2),
            y: p1.y + ((p2.y - p1.y) / 2),
        };
    }
    function sin(rotate) {
        return Math.abs(Math.sin(angleToRadian(rotate)));
    }
    function cos(rotate) {
        return Math.abs(Math.cos(angleToRadian(rotate)));
    }

    var funcs = {
        lt: calculateLeftTop,
        t: calculateTop,
        rt: calculateRightTop,
        r: calculateRight,
        rb: calculateRightBottom,
        b: calculateBottom,
        lb: calculateLeftBottom,
        l: calculateLeft,
    };
    function calculateLeftTop(style, curPositon, pointInfo) {
        var symmetricPoint = pointInfo.symmetricPoint;
        var newCenterPoint = getCenterPoint(curPositon, symmetricPoint);
        var newTopLeftPoint = calculateRotatedPointCoordinate(curPositon, newCenterPoint, -style.rotate);
        var newBottomRightPoint = calculateRotatedPointCoordinate(symmetricPoint, newCenterPoint, -style.rotate);
        var newWidth = newBottomRightPoint.x - newTopLeftPoint.x;
        var newHeight = newBottomRightPoint.y - newTopLeftPoint.y;
        if (newWidth > 0 && newHeight > 0) {
            style.width = Math.round(newWidth);
            style.height = Math.round(newHeight);
            style.left = Math.round(newTopLeftPoint.x);
            style.top = Math.round(newTopLeftPoint.y);
        }
    }
    function calculateTop(style, curPositon, pointInfo) {
        var symmetricPoint = pointInfo.symmetricPoint, curPoint = pointInfo.curPoint;
        var rotatedcurPositon = calculateRotatedPointCoordinate(curPositon, curPoint, -style.rotate);
        var rotatedTopMiddlePoint = calculateRotatedPointCoordinate({
            x: curPoint.x,
            y: rotatedcurPositon.y,
        }, curPoint, style.rotate);
        // 勾股定理
        var newHeight = Math.sqrt(Math.pow((rotatedTopMiddlePoint.x - symmetricPoint.x), 2) +
            Math.pow((rotatedTopMiddlePoint.y - symmetricPoint.y), 2));
        if (newHeight > 0) {
            var newCenter = {
                x: rotatedTopMiddlePoint.x -
                    (rotatedTopMiddlePoint.x - symmetricPoint.x) / 2,
                y: rotatedTopMiddlePoint.y +
                    (symmetricPoint.y - rotatedTopMiddlePoint.y) / 2,
            };
            style.height = Math.round(newHeight);
            style.top = Math.round(newCenter.y - newHeight / 2);
            style.left = Math.round(newCenter.x - style.width / 2);
        }
    }
    function calculateRight(style, curPositon, pointInfo) {
        var symmetricPoint = pointInfo.symmetricPoint, curPoint = pointInfo.curPoint;
        var rotatedcurPositon = calculateRotatedPointCoordinate(curPositon, curPoint, -style.rotate);
        var rotatedRightMiddlePoint = calculateRotatedPointCoordinate({
            x: rotatedcurPositon.x,
            y: curPoint.y,
        }, curPoint, style.rotate);
        var newWidth = Math.sqrt(Math.pow((rotatedRightMiddlePoint.x - symmetricPoint.x), 2) +
            Math.pow((rotatedRightMiddlePoint.y - symmetricPoint.y), 2));
        if (newWidth > 0) {
            var newCenter = {
                x: rotatedRightMiddlePoint.x -
                    (rotatedRightMiddlePoint.x - symmetricPoint.x) / 2,
                y: rotatedRightMiddlePoint.y +
                    (symmetricPoint.y - rotatedRightMiddlePoint.y) / 2,
            };
            style.width = Math.round(newWidth);
            style.top = Math.round(newCenter.y - style.height / 2);
            style.left = Math.round(newCenter.x - newWidth / 2);
        }
    }
    function calculateBottom(style, curPositon, pointInfo) {
        var symmetricPoint = pointInfo.symmetricPoint, curPoint = pointInfo.curPoint;
        var rotatedcurPositon = calculateRotatedPointCoordinate(curPositon, curPoint, -style.rotate);
        var rotatedBottomMiddlePoint = calculateRotatedPointCoordinate({
            x: curPoint.x,
            y: rotatedcurPositon.y,
        }, curPoint, style.rotate);
        var newHeight = Math.sqrt(Math.pow((rotatedBottomMiddlePoint.x - symmetricPoint.x), 2) +
            Math.pow((rotatedBottomMiddlePoint.y - symmetricPoint.y), 2));
        if (newHeight > 0) {
            var newCenter = {
                x: rotatedBottomMiddlePoint.x -
                    (rotatedBottomMiddlePoint.x - symmetricPoint.x) / 2,
                y: rotatedBottomMiddlePoint.y +
                    (symmetricPoint.y - rotatedBottomMiddlePoint.y) / 2,
            };
            style.height = Math.round(newHeight);
            style.top = Math.round(newCenter.y - newHeight / 2);
            style.left = Math.round(newCenter.x - style.width / 2);
        }
    }
    function calculateLeft(style, curPositon, pointInfo) {
        var symmetricPoint = pointInfo.symmetricPoint, curPoint = pointInfo.curPoint;
        var rotatedcurPositon = calculateRotatedPointCoordinate(curPositon, curPoint, -style.rotate);
        var rotatedLeftMiddlePoint = calculateRotatedPointCoordinate({
            x: rotatedcurPositon.x,
            y: curPoint.y,
        }, curPoint, style.rotate);
        var newWidth = Math.sqrt(Math.pow((rotatedLeftMiddlePoint.x - symmetricPoint.x), 2) +
            Math.pow((rotatedLeftMiddlePoint.y - symmetricPoint.y), 2));
        if (newWidth > 0) {
            var newCenter = {
                x: rotatedLeftMiddlePoint.x -
                    (rotatedLeftMiddlePoint.x - symmetricPoint.x) / 2,
                y: rotatedLeftMiddlePoint.y +
                    (symmetricPoint.y - rotatedLeftMiddlePoint.y) / 2,
            };
            style.width = Math.round(newWidth);
            style.top = Math.round(newCenter.y - style.height / 2);
            style.left = Math.round(newCenter.x - newWidth / 2);
        }
    }
    function calculateRightTop(style, curPositon, pointInfo) {
        var symmetricPoint = pointInfo.symmetricPoint;
        var newCenterPoint = getCenterPoint(curPositon, symmetricPoint);
        var newTopRightPoint = calculateRotatedPointCoordinate(curPositon, newCenterPoint, -style.rotate);
        var newBottomLeftPoint = calculateRotatedPointCoordinate(symmetricPoint, newCenterPoint, -style.rotate);
        var newWidth = newTopRightPoint.x - newBottomLeftPoint.x;
        var newHeight = newBottomLeftPoint.y - newTopRightPoint.y;
        if (newWidth > 0 && newHeight > 0) {
            style.width = Math.round(newWidth);
            style.height = Math.round(newHeight);
            style.left = Math.round(newBottomLeftPoint.x);
            style.top = Math.round(newTopRightPoint.y);
        }
    }
    function calculateRightBottom(style, curPositon, pointInfo) {
        var symmetricPoint = pointInfo.symmetricPoint;
        var newCenterPoint = getCenterPoint(curPositon, symmetricPoint);
        var newTopLeftPoint = calculateRotatedPointCoordinate(symmetricPoint, newCenterPoint, -style.rotate);
        var newBottomRightPoint = calculateRotatedPointCoordinate(curPositon, newCenterPoint, -style.rotate);
        var newWidth = newBottomRightPoint.x - newTopLeftPoint.x;
        var newHeight = newBottomRightPoint.y - newTopLeftPoint.y;
        if (newWidth > 0 && newHeight > 0) {
            style.width = Math.round(newWidth);
            style.height = Math.round(newHeight);
            style.left = Math.round(newTopLeftPoint.x);
            style.top = Math.round(newTopLeftPoint.y);
        }
    }
    function calculateLeftBottom(style, curPositon, pointInfo) {
        var symmetricPoint = pointInfo.symmetricPoint;
        var newCenterPoint = getCenterPoint(curPositon, symmetricPoint);
        var newTopRightPoint = calculateRotatedPointCoordinate(symmetricPoint, newCenterPoint, -style.rotate);
        var newBottomLeftPoint = calculateRotatedPointCoordinate(curPositon, newCenterPoint, -style.rotate);
        var newWidth = newTopRightPoint.x - newBottomLeftPoint.x;
        var newHeight = newBottomLeftPoint.y - newTopRightPoint.y;
        if (newWidth > 0 && newHeight > 0) {
            style.width = Math.round(newWidth);
            style.height = Math.round(newHeight);
            style.left = Math.round(newBottomLeftPoint.x);
            style.top = Math.round(newTopRightPoint.y);
        }
    }
    function calculateComponentPositonAndSize(name, style, curPositon, pointInfo) {
        funcs[name](style, curPositon, pointInfo);
    }

    var ShapeComponent = /** @class */ (function () {
        function ShapeComponent(componentDataService) {
            this.componentDataService = componentDataService;
            this.active = false;
            this.cursors = {};
            this.pointList = ['lt', 't', 'rt', 'r', 'rb', 'b', 'lb', 'l']; // 八个方向
            this.initialAngle = {
                // 每个点对应的初始角度
                lt: 0,
                t: 45,
                rt: 90,
                r: 135,
                rb: 180,
                b: 225,
                lb: 270,
                l: 315,
            };
            this.angleToCursor = [
                // 每个范围的角度对应的光标
                { start: 338, end: 23, cursor: 'nw' },
                { start: 23, end: 68, cursor: 'n' },
                { start: 68, end: 113, cursor: 'ne' },
                { start: 113, end: 158, cursor: 'e' },
                { start: 158, end: 203, cursor: 'se' },
                { start: 203, end: 248, cursor: 's' },
                { start: 248, end: 293, cursor: 'sw' },
                { start: 293, end: 338, cursor: 'w' },
            ];
        }
        ShapeComponent.prototype.ngOnInit = function () { };
        ShapeComponent.prototype.getShapeStyle = function (style) {
            var result = Object.assign({}, style);
            if (result.width) {
                result.width += 'px';
            }
            if (result.height) {
                result.height += 'px';
            }
            if (result.top) {
                result.top += 'px';
            }
            if (result.left) {
                result.left += 'px';
            }
            if (result.rotate) {
                result['transform'] = 'rotate(' + result.rotate + 'deg)';
            }
            return result;
        };
        ShapeComponent.prototype.handleMouseDownOnShape = function (e) {
            var _this = this;
            if (this.element.component != 'v-text') {
                e.preventDefault();
            }
            e.stopPropagation();
            this.componentDataService.curComponent = this.element;
            this.componentDataService.curComponentIndex = this.index;
            this.cursors = this.getCursor(); // 根据旋转角度获取光标位置
            var pos = Object.assign({}, this.defaultStyle);
            var startY = e.clientY;
            var startX = e.clientX;
            // 如果直接修改属性，值的类型会变为字符串，所以要转为数值型
            var startTop = Number(pos.top);
            var startLeft = Number(pos.left);
            // 如果元素没有移动，则不保存快照
            var hasMove = false;
            var move = function (moveEvent) {
                hasMove = true;
                var curX = moveEvent.clientX;
                var curY = moveEvent.clientY;
                pos.top = curY - startY + startTop;
                pos.left = curX - startX + startLeft;
                // 修改当前组件样式
                _this.componentDataService.$shapeStyle.next(pos);
                // 等更新完当前组件的样式并绘制到屏幕后再判断是否需要吸附
                // 如果不使用 $nextTick，吸附后将无法移动
                // this.$nextTick(() => {
                //   // 触发元素移动事件，用于显示标线、吸附功能
                //   // 后面两个参数代表鼠标移动方向
                //   // curY - startY > 0 true 表示向下移动 false 表示向上移动
                //   // curX - startX > 0 true 表示向右移动 false 表示向左移动
                //   eventBus.$emit('move', curY - startY > 0, curX - startX > 0);
                // })
                _this.componentDataService.notification.next({
                    event: 'move',
                    value: [curY - startY > 0, curX - startX > 0],
                });
            };
            var up = function () {
                hasMove && _this.componentDataService.recordSnapshot();
                // 触发元素停止移动事件，用于隐藏标线
                // eventBus.$emit('unmove')
                _this.componentDataService.notification.next({
                    event: 'unmove',
                });
                document.removeEventListener('mousemove', move);
                document.removeEventListener('mouseup', up);
            };
            document.addEventListener('mousemove', move);
            document.addEventListener('mouseup', up);
        };
        ShapeComponent.prototype.selectCurComponent = function (e) {
            e.stopPropagation();
            e.preventDefault();
            this.componentDataService.hideContextMenu();
        };
        ShapeComponent.prototype.handleRotate = function () { };
        ShapeComponent.prototype.handleMouseDownOnPoint = function (point, e) {
            var _this = this;
            var downEvent = window.event;
            downEvent.stopPropagation();
            downEvent.preventDefault();
            var style = Object.assign({}, this.defaultStyle);
            var center = {
                x: style.left + style.width / 2,
                y: style.top + style.height / 2,
            };
            // 获取画布位移信息
            var editorRectInfo = document
                .querySelector('#editor')
                .getBoundingClientRect();
            // 当前点击坐标
            var curPoint = {
                x: e.clientX - editorRectInfo.left,
                y: e.clientY - editorRectInfo.top,
            };
            // 获取对称点的坐标
            var symmetricPoint = {
                x: center.x - (curPoint.x - center.x),
                y: center.y - (curPoint.y - center.y),
            };
            // 是否需要保存快照
            var needSave = false;
            var isFirst = true;
            var move = function (moveEvent) {
                // 第一次点击时也会触发 move，所以会有“刚点击组件但未移动，组件的大小却改变了”的情况发生
                // 因此第一次点击时不触发 move 事件
                if (isFirst) {
                    isFirst = false;
                    return;
                }
                needSave = true;
                var curPositon = {
                    x: moveEvent.clientX - editorRectInfo.left,
                    y: moveEvent.clientY - editorRectInfo.top,
                };
                calculateComponentPositonAndSize(point, style, curPositon, {
                    center: center,
                    curPoint: curPoint,
                    symmetricPoint: symmetricPoint,
                });
                _this.componentDataService.$shapeStyle.next(style);
            };
            var up = function () {
                document.removeEventListener('mousemove', move);
                document.removeEventListener('mouseup', up);
                needSave && _this.componentDataService.recordSnapshot();
            };
            document.addEventListener('mousemove', move);
            document.addEventListener('mouseup', up);
        };
        ShapeComponent.prototype.getPointStyle = function (point) {
            var _a = this.defaultStyle, width = _a.width, height = _a.height;
            var hasT = /t/.test(point);
            var hasB = /b/.test(point);
            var hasL = /l/.test(point);
            var hasR = /r/.test(point);
            var newLeft = 0;
            var newTop = 0;
            // 四个角的点
            if (point.length === 2) {
                newLeft = hasL ? 0 : width;
                newTop = hasT ? 0 : height;
            }
            else {
                // 上下两点的点，宽度居中
                if (hasT || hasB) {
                    newLeft = width / 2;
                    newTop = hasT ? 0 : height;
                }
                // 左右两边的点，高度居中
                if (hasL || hasR) {
                    newLeft = hasL ? 0 : width;
                    newTop = Math.floor(height / 2);
                }
            }
            var style = {
                marginLeft: hasR ? '-4px' : '-4px',
                marginTop: '-4px',
                left: newLeft + "px",
                top: newTop + "px",
                cursor: this.cursors[point],
            };
            return style;
        };
        ShapeComponent.prototype.getCursor = function () {
            var _a = this, angleToCursor = _a.angleToCursor, initialAngle = _a.initialAngle, pointList = _a.pointList;
            var curComponent = this.componentDataService.curComponent;
            var rotate = (curComponent.style.rotate + 360) % 360; // 防止角度有负数，所以 + 360
            var result = {};
            var lastMatchIndex = -1; // 从上一个命中的角度的索引开始匹配下一个，降低时间复杂度
            pointList.forEach(function (point) {
                var angle = (initialAngle[point] + rotate) % 360;
                var len = angleToCursor.length;
                while (true) {
                    lastMatchIndex = (lastMatchIndex + 1) % len;
                    var angleLimit = angleToCursor[lastMatchIndex];
                    if (angle < 23 || angle >= 338) {
                        result[point] = 'nw-resize';
                        return;
                    }
                    if (angleLimit.start <= angle && angle < angleLimit.end) {
                        result[point] = angleLimit.cursor + '-resize';
                        return;
                    }
                }
            });
            return result;
        };
        return ShapeComponent;
    }());
    ShapeComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'shape',
                    template: "<div class=\"shape\" [ngStyle]=\"getShapeStyle(defaultStyle)\" [class.active]=\"active\" (click)=\"selectCurComponent($event)\"\n    (mousedown)=\"handleMouseDownOnShape($event)\">\n    <i class=\"el-icon-refresh-right\" *ngIf=\"active\" (mousedown)=\"handleRotate()\"></i>\n    <div class=\"shape-point\" *ngFor=\"let item of (active? pointList : [])\"\n        (mousedown)=\"handleMouseDownOnPoint(item, $event)\" [ngStyle]=\"getPointStyle(item)\">\n    </div>\n    <ng-content></ng-content>\n</div>",
                    encapsulation: i0.ViewEncapsulation.None,
                    styles: [".shape{position:absolute}.shape:hover{cursor:move}.active{-webkit-user-select:none;outline:1px solid #70c0ff;user-select:none}.shape-point{background:#fff;border:1px solid #59c7f9;border-radius:50%;height:8px;position:absolute;width:8px}.el-icon-refresh-right{color:#59c7f9;cursor:grab;font-size:18px;font-size:22px;font-weight:600;font-weight:400;left:50%;position:absolute;top:-30px;transform:translateX(-50%)}.el-icon-refresh-right:active{cursor:grabbing}"]
                },] }
    ];
    ShapeComponent.ctorParameters = function () { return [
        { type: ComponentDataService }
    ]; };
    ShapeComponent.propDecorators = {
        active: [{ type: i0.Input }],
        element: [{ type: i0.Input }],
        defaultStyle: [{ type: i0.Input }],
        index: [{ type: i0.Input }]
    };

    var VButtonComponent = /** @class */ (function () {
        function VButtonComponent() {
            this.propValue = '';
            this.vStyle = {};
            this.absoulte = false;
        }
        VButtonComponent.prototype.ngOnInit = function () { };
        return VButtonComponent;
    }());
    VButtonComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'v-button',
                    template: "\n    <button class=\"v-button\" [ngStyle]=\"vStyle\" [class.absoulte]=\"absoulte\">\n      {{ propValue }}\n    </button>\n  ",
                    encapsulation: i0.ViewEncapsulation.None,
                    styles: [".v-button{-webkit-appearance:none;background:#fff;border:1px solid #dcdfe6;box-sizing:border-box;color:#606266;cursor:pointer;display:inline-block;font-size:14px;font-weight:500;height:100%;line-height:1;margin:0;outline:0;text-align:center;transition:.1s;white-space:nowrap;width:100%}.v-button:active{border-color:#3a8ee6;color:#3a8ee6;outline:0}.v-button:hover{background-color:#ecf5ff;color:#3a8ee6}"]
                },] }
    ];
    VButtonComponent.ctorParameters = function () { return []; };
    VButtonComponent.propDecorators = {
        propValue: [{ type: i0.Input }],
        vStyle: [{ type: i0.Input }],
        absoulte: [{ type: i0.Input }]
    };

    var ContextMenuComponent = /** @class */ (function () {
        function ContextMenuComponent(componentDataService) {
            this.componentDataService = componentDataService;
        }
        Object.defineProperty(ContextMenuComponent.prototype, "menuShow", {
            get: function () {
                return this.componentDataService.contextmenu.show;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ContextMenuComponent.prototype, "menuTop", {
            get: function () {
                return this.componentDataService.contextmenu.top;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ContextMenuComponent.prototype, "menuLeft", {
            get: function () {
                return this.componentDataService.contextmenu.left;
            },
            enumerable: false,
            configurable: true
        });
        ContextMenuComponent.prototype.ngOnInit = function () { };
        ContextMenuComponent.prototype.copy = function () {
            this.componentDataService.copy();
        };
        ContextMenuComponent.prototype.paste = function () {
            this.componentDataService.paste(true);
        };
        ContextMenuComponent.prototype.cut = function () {
            this.componentDataService.cut();
        };
        ContextMenuComponent.prototype.deleteComponent = function () {
            this.componentDataService.deleteCurComponent();
            this.componentDataService.recordSnapshot();
        };
        ContextMenuComponent.prototype.topComponent = function () {
            this.componentDataService.topComponent();
            this.componentDataService.recordSnapshot();
        };
        ContextMenuComponent.prototype.bottomComponent = function () {
            this.componentDataService.bottomComponent();
            this.componentDataService.recordSnapshot();
        };
        ContextMenuComponent.prototype.upComponent = function () {
            this.componentDataService.upComponent();
            this.componentDataService.recordSnapshot();
        };
        ContextMenuComponent.prototype.downComponent = function () {
            this.componentDataService.downComponent();
            this.componentDataService.recordSnapshot();
        };
        return ContextMenuComponent;
    }());
    ContextMenuComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'context-menu',
                    template: "<div class=\"contextmenu\" *ngIf=\"menuShow\" [style.top.px]=\"menuTop\" [style.left.px]=\"menuLeft\">\n    <ul>\n        <ng-container *ngIf=\"componentDataService.curComponent; else pasteTmp\">\n            <li (click)=\"copy()\">\u590D\u5236</li>\n            <li (click)=\"paste()\">\u7C98\u8D34</li>\n            <li (click)=\"cut()\">\u526A\u5207</li>\n            <li (click)=\"deleteComponent()\">\u5220\u9664</li>\n            <li (click)=\"topComponent()\">\u7F6E\u9876</li>\n            <li (click)=\"bottomComponent()\">\u7F6E\u5E95</li>\n            <li (click)=\"upComponent()\">\u4E0A\u79FB</li>\n            <li (click)=\"downComponent()\">\u4E0B\u79FB</li>\n        </ng-container>\n        <ng-template #pasteTmp>\n            <li (click)=\"paste()\">\u7C98\u8D34</li>\n        </ng-template>\n    </ul>\n</div>",
                    encapsulation: i0.ViewEncapsulation.None,
                    styles: [".contextmenu{position:absolute;z-index:1000}.contextmenu ul{background-color:#fff;border:1px solid #e4e7ed;border-radius:4px;box-shadow:0 2px 12px 0 rgba(0,0,0,.1);box-sizing:border-box;margin:5px 0;padding:6px 0}.contextmenu ul li{box-sizing:border-box;color:#606266;cursor:pointer;font-size:14px;height:34px;line-height:34px;overflow:hidden;padding:0 20px;position:relative;text-overflow:ellipsis;white-space:nowrap}.contextmenu ul li:hover{background-color:#f5f7fa}"]
                },] }
    ];
    ContextMenuComponent.ctorParameters = function () { return [
        { type: ComponentDataService }
    ]; };

    var MarklineComponent = /** @class */ (function () {
        function MarklineComponent(componentDataService) {
            this.componentDataService = componentDataService;
            this.lines = ['xt', 'xc', 'xb', 'yl', 'yc', 'yr']; // 分别对应三条横线和三条竖线
            this.diff = 3; // 相距 dff 像素将自动吸附
            this.lineStatus = {
                xt: false,
                xc: false,
                xb: false,
                yl: false,
                yc: false,
                yr: false,
            };
        }
        MarklineComponent.prototype.ngAfterContentInit = function () { };
        MarklineComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.componentDataService.notification.subscribe(function (x) {
                if (x.event === 'move') {
                    _this.showLine(x.value[0], x.value[1]);
                }
                if (x.event === 'unmove') {
                    _this.hideLine();
                }
            });
        };
        MarklineComponent.prototype.showLine = function (isDownward, isRightward) {
            var _this = this;
            var lines = Array.from(document.querySelectorAll('.line'));
            var findnode = function (type) {
                return lines.find(function (x) { return x['dataset'].index === type; });
            };
            var components = this.componentDataService.componentData;
            var curComponentStyle = this.translateComponentStyle(this.componentDataService.curComponent.style);
            var curComponentHalfwidth = curComponentStyle.width / 2;
            var curComponentHalfHeight = curComponentStyle.height / 2;
            this.hideLine();
            components.forEach(function (component) {
                if (component == _this.componentDataService.curComponent)
                    return;
                var componentStyle = _this.translateComponentStyle(component.style);
                var top = componentStyle.top, left = componentStyle.left, bottom = componentStyle.bottom, right = componentStyle.right;
                var componentHalfwidth = componentStyle.width / 2;
                var componentHalfHeight = componentStyle.height / 2;
                var conditions = {
                    top: [
                        {
                            isNearly: _this.isNearly(curComponentStyle.top, top),
                            lineNode: findnode('xt'),
                            line: 'xt',
                            dragShift: top,
                            lineShift: top,
                        },
                        {
                            isNearly: _this.isNearly(curComponentStyle.bottom, top),
                            lineNode: findnode('xt'),
                            line: 'xt',
                            dragShift: top - curComponentStyle.height,
                            lineShift: top,
                        },
                        {
                            // 组件与拖拽节点的中间是否对齐
                            isNearly: _this.isNearly(curComponentStyle.top + curComponentHalfHeight, top + componentHalfHeight),
                            lineNode: findnode('xc'),
                            line: 'xc',
                            dragShift: top + componentHalfHeight - curComponentHalfHeight,
                            lineShift: top + componentHalfHeight,
                        },
                        {
                            isNearly: _this.isNearly(curComponentStyle.top, bottom),
                            lineNode: findnode('xb'),
                            line: 'xb',
                            dragShift: bottom,
                            lineShift: bottom,
                        },
                        {
                            isNearly: _this.isNearly(curComponentStyle.bottom, bottom),
                            lineNode: findnode('xb'),
                            line: 'xb',
                            dragShift: bottom - curComponentStyle.height,
                            lineShift: bottom,
                        },
                    ],
                    left: [
                        {
                            isNearly: _this.isNearly(curComponentStyle.left, left),
                            lineNode: findnode('yl'),
                            line: 'yl',
                            dragShift: left,
                            lineShift: left,
                        },
                        {
                            isNearly: _this.isNearly(curComponentStyle.right, left),
                            lineNode: findnode('yl'),
                            line: 'yl',
                            dragShift: left - curComponentStyle.width,
                            lineShift: left,
                        },
                        {
                            // 组件与拖拽节点的中间是否对齐
                            isNearly: _this.isNearly(curComponentStyle.left + curComponentHalfwidth, left + componentHalfwidth),
                            lineNode: findnode('yc'),
                            line: 'yc',
                            dragShift: left + componentHalfwidth - curComponentHalfwidth,
                            lineShift: left + componentHalfwidth,
                        },
                        {
                            isNearly: _this.isNearly(curComponentStyle.left, right),
                            lineNode: findnode('yr'),
                            line: 'yr',
                            dragShift: right,
                            lineShift: right,
                        },
                        {
                            isNearly: _this.isNearly(curComponentStyle.right, right),
                            lineNode: findnode('yr'),
                            line: 'yr',
                            dragShift: right - curComponentStyle.width,
                            lineShift: right,
                        },
                    ],
                };
                var needToShow = [];
                var rotate = _this.componentDataService.curComponent.style.rotate;
                Object.keys(conditions).forEach(function (key) {
                    // 遍历符合的条件并处理
                    conditions[key].forEach(function (condition) {
                        if (!condition.isNearly)
                            return;
                        // 修改当前组件位移
                        _this.componentDataService.setShapePosStyle({
                            key: key,
                            value: rotate != 0
                                ? _this.translatecurComponentShift(key, condition, curComponentStyle)
                                : condition.dragShift,
                        });
                        condition.lineNode.style[key] = condition.lineShift + "px";
                        needToShow.push(condition.line);
                    });
                });
                // 同一方向上同时显示三条线可能不太美观，因此才有了这个解决方案
                // 同一方向上的线只显示一条，例如多条横条只显示一条横线
                if (needToShow.length) {
                    _this.chooseTheTureLine(needToShow, isDownward, isRightward);
                }
            });
        };
        MarklineComponent.prototype.translateComponentStyle = function (style) {
            style = Object.assign({}, style);
            if (style.rotate != 0) {
                var newWidth = style.width * cos(style.rotate) + style.height * sin(style.rotate);
                var diffX = (style.width - newWidth) / 2;
                style.left += diffX;
                style.right = style.left + newWidth;
                var newHeight = style.height * cos(style.rotate) + style.width * sin(style.rotate);
                var diffY = (newHeight - style.height) / 2;
                style.top -= diffY;
                style.bottom = style.top + newHeight;
                style.width = newWidth;
                style.height = newHeight;
            }
            else {
                style.bottom = style.top + style.height;
                style.right = style.left + style.width;
            }
            return style;
        };
        MarklineComponent.prototype.hideLine = function () {
            var _this = this;
            Object.keys(this.lineStatus).forEach(function (line) {
                _this.lineStatus[line] = false;
            });
        };
        MarklineComponent.prototype.isNearly = function (dragValue, targetValue) {
            return Math.abs(dragValue - targetValue) <= this.diff;
        };
        MarklineComponent.prototype.translatecurComponentShift = function (key, condition, curComponentStyle) {
            var _a = this.componentDataService.curComponent.style, width = _a.width, height = _a.height;
            if (key == 'top') {
                return Math.round(condition.dragShift - (height - curComponentStyle.height) / 2);
            }
            return Math.round(condition.dragShift - (width - curComponentStyle.width) / 2);
        };
        MarklineComponent.prototype.chooseTheTureLine = function (needToShow, isDownward, isRightward) {
            // 如果鼠标向右移动 则按从右到左的顺序显示竖线 否则按相反顺序显示
            // 如果鼠标向下移动 则按从下到上的顺序显示横线 否则按相反顺序显示
            if (isRightward) {
                if (needToShow.includes('yr')) {
                    this.lineStatus.yr = true;
                }
                else if (needToShow.includes('yc')) {
                    this.lineStatus.yc = true;
                }
                else if (needToShow.includes('yl')) {
                    this.lineStatus.yl = true;
                }
            }
            else {
                // eslint-disable-next-line no-lonely-if
                if (needToShow.includes('yl')) {
                    this.lineStatus.yl = true;
                }
                else if (needToShow.includes('yc')) {
                    this.lineStatus.yc = true;
                }
                else if (needToShow.includes('yr')) {
                    this.lineStatus.yr = true;
                }
            }
            if (isDownward) {
                if (needToShow.includes('xb')) {
                    this.lineStatus.xb = true;
                }
                else if (needToShow.includes('xc')) {
                    this.lineStatus.xc = true;
                }
                else if (needToShow.includes('xt')) {
                    this.lineStatus.xt = true;
                }
            }
            else {
                // eslint-disable-next-line no-lonely-if
                if (needToShow.includes('xt')) {
                    this.lineStatus.xt = true;
                }
                else if (needToShow.includes('xc')) {
                    this.lineStatus.xc = true;
                }
                else if (needToShow.includes('xb')) {
                    this.lineStatus.xb = true;
                }
            }
        };
        return MarklineComponent;
    }());
    MarklineComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'Markline',
                    template: "<div class=\"mark-line\">\n    <ng-container *ngFor=\"let line of lines\">\n        <div class=\"line \" #lines [ngClass]=\"{\n             'xline': line.includes('x'),\n             'yline': line.includes('y')\n        }\" [attr.data-index]=\"line\" [hidden]=\"!lineStatus[line]\"></div>\n    </ng-container>\n\n</div>",
                    encapsulation: i0.ViewEncapsulation.None,
                    styles: [".mark-line{height:100%}.line{background:#59c7f9;position:absolute;z-index:1000}.xline{height:1px;width:100%}.yline{height:100%;width:1px}"]
                },] }
    ];
    MarklineComponent.ctorParameters = function () { return [
        { type: ComponentDataService }
    ]; };
    MarklineComponent.propDecorators = {
        $refs: [{ type: i0.ViewChildren, args: ['lines',] }]
    };

    var AttrListComponent = /** @class */ (function () {
        function AttrListComponent(componentDataService) {
            this.componentDataService = componentDataService;
            this.map = {
                left: 'x 坐标',
                top: 'y 坐标',
                height: '高',
                width: '宽',
                color: '颜色',
                backgroundColor: '背景色',
                borderWidth: '边框宽度',
                borderColor: '边框颜色',
                borderRadius: '边框半径',
                fontSize: '字体大小',
                fontWeight: '字体粗细',
                lineHeight: '行高',
                letterSpacing: '字间距',
                textAlign: '对齐方式',
                opacity: '透明度',
            };
            this.excludes = ['Picture']; // 这些组件不显示内容
            this.options = [
                {
                    label: '左对齐',
                    value: 'left',
                },
                {
                    label: '居中',
                    value: 'center',
                },
                {
                    label: '右对齐',
                    value: 'right',
                },
            ];
        }
        Object.defineProperty(AttrListComponent.prototype, "styleKeys", {
            get: function () {
                return this.componentDataService.curComponent
                    ? Object.keys(this.componentDataService.curComponent.style).filter(function (item) { return item != 'rotate'; })
                    : [];
            },
            enumerable: false,
            configurable: true
        });
        AttrListComponent.prototype.ngOnInit = function () { };
        return AttrListComponent;
    }());
    AttrListComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'Attr-list',
                    template: "<div class=\"attr-list\">\n    <div nz-row *ngFor=\"let key of styleKeys\" class=\"mb-10\">\n        <div nz-col nzSpan=\"24\" class=\"mb-10\">{{map[key]}}</div>\n        <div nz-col nzSpan=\"24\">\n            <div [ngSwitch]=\"key\">\n                <div *ngSwitchCase=\"'borderColor'\"><input type=\"color\"\n                        [(ngModel)]=\"componentDataService.curComponent.style[key]\"></div>\n                <div *ngSwitchCase=\"'color'\"><input type=\"color\"\n                        [(ngModel)]=\"componentDataService.curComponent.style[key]\"></div>\n                <div *ngSwitchCase=\"'backgroundColor'\"><input type=\"color\"\n                        [(ngModel)]=\"componentDataService.curComponent.style[key]\"></div>\n                <div *ngSwitchCase=\"'textAlign'\">\n                    <nz-select [(ngModel)]=\"componentDataService.curComponent.style[key]\" style=\"width: 100%;\">\n                        <nz-option [nzValue]=\"item.value\" [nzLabel]=\"item.label\" *ngFor=\"let item of options\">\n                        </nz-option>\n                    </nz-select>\n                </div>\n                <div *ngSwitchDefault>\n                    <input nz-input type=\"number\" [(ngModel)]=\"componentDataService.curComponent.style[key]\">\n                </div>\n            </div>\n        </div>\n    </div>\n    <div nz-row\n        *ngIf=\"componentDataService.curComponent && !excludes.includes(componentDataService.curComponent.component)\">\n        <div nz-col nzSpan=\"24\" class=\"mb-10\">\u5185\u5BB9</div>\n        <div nz-col nzSpan=\"24\">\n            <textarea nz-input [(ngModel)]=\"componentDataService.curComponent.propValue\"\n                [nzAutosize]=\"{ minRows: 2, maxRows: 6 }\"></textarea>\n        </div>\n    </div>\n</div>",
                    styles: [".attr-list{height:100%;overflow:auto;padding:0 20px 20px}"]
                },] }
    ];
    AttrListComponent.ctorParameters = function () { return [
        { type: ComponentDataService }
    ]; };

    var PreviewComponent = /** @class */ (function () {
        function PreviewComponent(componentDataService) {
            this.componentDataService = componentDataService;
            this.isShowPreview = false;
            this.OutClose = new i0.EventEmitter();
        }
        PreviewComponent.prototype.ngOnInit = function () { };
        PreviewComponent.prototype.close = function () {
            this.OutClose.emit();
        };
        return PreviewComponent;
    }());
    PreviewComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'Preview',
                    template: "<div class=\"bg\" *ngIf=\"isShowPreview\">\n    <button (click)=\"close()\" class=\"close\" nz-button>\u5173\u95ED</button>\n    <div class=\"canvas-container\">\n        <div class=\"canvas\"\n            [ngStyle]=\"{ width: componentDataService.canvasStyleData.width + 'px', height: componentDataService.canvasStyleData.height + 'px' }\">\n\n            <Component-wrapper *ngFor=\"let item of componentDataService.componentData\" [config]=\"item\">\n            </Component-wrapper>\n        </div>\n    </div>\n</div>",
                    encapsulation: i0.ViewEncapsulation.None,
                    styles: [".bg{background:rgba(0,0,0,.5);height:100%;left:0;padding:20px;position:fixed;top:0;width:100%;z-index:10}.bg,.bg .canvas-container{align-items:center;display:flex;justify-content:center;overflow:auto}.bg .canvas-container{height:calc(100% - 120px);width:calc(100% - 40px)}.bg .canvas-container .canvas{background:#fff;flex-shrink:0;position:relative}.bg .close{position:absolute;right:20px;top:20px}"]
                },] }
    ];
    PreviewComponent.ctorParameters = function () { return [
        { type: ComponentDataService }
    ]; };
    PreviewComponent.propDecorators = {
        isShowPreview: [{ type: i0.Input }],
        OutClose: [{ type: i0.Output }]
    };

    var ComponentWrapperComponent = /** @class */ (function () {
        function ComponentWrapperComponent(componentFactoryResolver) {
            this.componentFactoryResolver = componentFactoryResolver;
        }
        ComponentWrapperComponent.prototype.ngOnChanges = function (changes) {
            if (changes.config && changes.config.currentValue) {
                // this.addComponent();
            }
        };
        ComponentWrapperComponent.prototype.addComponent = function () {
            // let cinstance;
            // switch (this.config.component) {
            //   case 'v-button':
            //     cinstance = VButtonComponent;
            //     break;
            //   default:
            //     break;
            // }
            // const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
            //   cinstance
            // );
            // const viewContainerRef = this.viewContainer;
            // const componentRef = viewContainerRef.createComponent(componentFactory);
            // (<ComponentBasicInput>(
            //   componentRef.instance
            // )).propValue = this.config.propValue;
            // (<ComponentBasicInput>componentRef.instance).vStyle = this.config.style;
            // debugger;
        };
        ComponentWrapperComponent.prototype.ngOnInit = function () { };
        ComponentWrapperComponent.prototype.handleClick = function () { };
        ComponentWrapperComponent.prototype.getComponentStyle = function (style) {
            return getStyle(style);
        };
        return ComponentWrapperComponent;
    }());
    ComponentWrapperComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'Component-wrapper',
                    template: "<div (click)=\"handleClick()\" class=\"component\">\n    <!-- <component class=\"conponent\" :is=\"config.component\" :style=\"getStyle(config.style)\" :propValue=\"config.propValue\" /> -->\n    <ng-container [ngSwitch]=\"config.component\">\n        <ng-container *ngSwitchCase=\"'v-button'\">\n            <v-button [propValue]=\"config.propValue\" [absoulte]=\"true\" [vStyle]=\"getComponentStyle(config.style)\">\n            </v-button>\n        </ng-container>\n        <ng-container *ngSwitchDefault>output2</ng-container>\n    </ng-container>\n</div>",
                    encapsulation: i0.ViewEncapsulation.None,
                    styles: [".conponent{position:absolute}"]
                },] }
    ];
    ComponentWrapperComponent.ctorParameters = function () { return [
        { type: i0.ComponentFactoryResolver }
    ]; };
    ComponentWrapperComponent.propDecorators = {
        config: [{ type: i0.Input }],
        viewContainer: [{ type: i0.ViewChild, args: ['viewContainer', { read: i0.ViewContainerRef, static: true },] }]
    };

    var NgxVisualDragModule = /** @class */ (function () {
        function NgxVisualDragModule() {
        }
        return NgxVisualDragModule;
    }());
    NgxVisualDragModule.decorators = [
        { type: i0.NgModule, args: [{
                    declarations: [
                        NgxVisualDragComponent,
                        HomeComponent,
                        ToolbarComponent,
                        ComponentListComponent,
                        EditorComponent,
                        ShapeComponent,
                        VButtonComponent,
                        ContextMenuComponent,
                        MarklineComponent,
                        AttrListComponent,
                        PreviewComponent,
                        ComponentWrapperComponent,
                    ],
                    imports: [animations.BrowserAnimationsModule, SharedModule],
                    exports: [NgxVisualDragComponent],
                },] }
    ];

    /*
     * Public API Surface of ngx-visual-drag
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.NgxVisualDragComponent = NgxVisualDragComponent;
    exports.NgxVisualDragModule = NgxVisualDragModule;
    exports.NgxVisualDragService = NgxVisualDragService;
    exports.ɵa = ComponentDataService;
    exports.ɵb = HomeComponent;
    exports.ɵc = ToolbarComponent;
    exports.ɵd = ComponentListComponent;
    exports.ɵe = EditorComponent;
    exports.ɵf = ShapeComponent;
    exports.ɵg = VButtonComponent;
    exports.ɵh = ContextMenuComponent;
    exports.ɵi = MarklineComponent;
    exports.ɵj = AttrListComponent;
    exports.ɵk = PreviewComponent;
    exports.ɵl = ComponentWrapperComponent;
    exports.ɵm = SharedModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-visual-drag.umd.js.map
