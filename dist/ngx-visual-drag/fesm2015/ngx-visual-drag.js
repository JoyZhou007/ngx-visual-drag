import { ɵɵdefineInjectable, Injectable, ɵɵinject, EventEmitter, Component, ViewEncapsulation, Input, Output, NgModule, ViewChildren, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { NzMessageService, NzMessageModule } from 'ng-zorro-antd/message';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

class NgxVisualDragService {
    constructor() { }
}
NgxVisualDragService.ɵprov = ɵɵdefineInjectable({ factory: function NgxVisualDragService_Factory() { return new NgxVisualDragService(); }, token: NgxVisualDragService, providedIn: "root" });
NgxVisualDragService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
NgxVisualDragService.ctorParameters = () => [];

let id = 0;
// 为每个元素创建一个独一无二的 ID
function generateID() {
    return id++;
}

function deepCopy(target) {
    if (typeof target == 'object') {
        const result = Array.isArray(target) ? [] : {};
        for (const key in target) {
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
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

class ComponentDataService {
    constructor(message) {
        this.message = message;
        this.componentData = []; // 画布组件数据
        this.canvasStyleData = {
            width: 1200,
            height: 740,
        }; // 页面全局数据
        this.$shapeStyle = new Subject();
        this.contextmenu = {
            show: false,
            top: 0,
            left: 0,
        }; // 右击菜单数据
        this.snapshotData = []; // 编辑器快照数据
        this.snapshotIndex = -1; // 快照索引
        this.notification = new Subject();
        this.$storageData = new Subject();
        this.initData();
        this.$shapeStyle.subscribe((x) => {
            if (x.top)
                this.curComponent.style.top = x.top;
            if (x.left)
                this.curComponent.style.left = x.left;
            if (x.width)
                this.curComponent.style.width = x.width;
            if (x.height)
                this.curComponent.style.height = x.height;
            if (x.rotate)
                this.curComponent.style.rotate = x.rotate;
        });
    }
    initData() { }
    deleteCurComponent() {
        this.componentData.splice(this.curComponentIndex, 1);
    }
    hideContextMenu() {
        this.contextmenu = {
            show: false,
            top: 0,
            left: 0,
        };
    }
    upComponent() {
        // 上移图层 index，表示元素在数组中越往后
        if (this.curComponentIndex < this.componentData.length - 1) {
            swap(this.componentData, this.curComponentIndex, this.curComponentIndex + 1);
        }
        else {
            this.message.warning('已经到顶了');
        }
    }
    downComponent() {
        // 下移图层 index，表示元素在数组中越往前
        if (this.curComponentIndex > 0) {
            swap(this.componentData, this.curComponentIndex, this.curComponentIndex - 1);
        }
        else {
            this.message.warning('已经到底了');
        }
    }
    topComponent() {
        // 置顶
        if (this.curComponentIndex < this.componentData.length - 1) {
            swap(this.componentData, this.curComponentIndex, this.componentData.length - 1);
        }
        else {
            this.message.warning('已经到顶了');
        }
    }
    bottomComponent() {
        // 置底
        if (this.curComponentIndex > 0) {
            swap(this.componentData, this.curComponentIndex, 0);
        }
        else {
            this.message.warning('已经到底了');
        }
    }
    recordSnapshot() {
        // 添加新的快照
        this.snapshotData[++this.snapshotIndex] = deepCopy(this.componentData);
        // 在 undo 过程中，添加新的快照时，要将它后面的快照清理掉
        if (this.snapshotIndex < this.snapshotData.length - 1) {
            this.snapshotData = this.snapshotData.slice(0, this.snapshotIndex + 1);
        }
    }
    undo() {
        if (this.snapshotIndex >= 0) {
            this.snapshotIndex--;
            this.componentData =
                deepCopy(this.snapshotData[this.snapshotIndex]) || [];
        }
    }
    redo() {
        if (this.snapshotIndex < this.snapshotData.length - 1) {
            this.snapshotIndex++;
            this.componentData =
                deepCopy(this.snapshotData[this.snapshotIndex]) || [];
        }
    }
    setShapePosStyle({ key, value }) {
        this.curComponent.style[key] = value;
    }
    copy() {
        this.copyData = {
            data: deepCopy(this.curComponent),
            index: this.curComponentIndex,
        };
    }
    paste(isMouse) {
        if (!this.copyData) {
            this.message.warning('请选择组件');
            return;
        }
        const data = this.copyData.data;
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
    }
    addComponent(component, index) {
        if (index !== undefined) {
            this.componentData.splice(index, 0, component);
        }
        else {
            this.componentData.push(component);
        }
    }
    cut() {
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
    }
    clearCanvas() {
        this.componentData = [];
    }
    restore(data) {
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
    }
    save() {
        localStorage.setItem('canvasData', JSON.stringify(this.componentData));
        localStorage.setItem('canvasStyle', JSON.stringify(this.canvasStyleData));
        this.message.success('保存成功');
        this.$storageData.next({
            canvasData: this.componentData,
            canvasStyle: this.canvasStyleData,
        });
    }
    resetID(data) {
        data.forEach((item) => {
            item.id = generateID();
        });
        return data;
    }
    setEditMode(type) {
        this.editMode = type;
    }
}
ComponentDataService.ɵprov = ɵɵdefineInjectable({ factory: function ComponentDataService_Factory() { return new ComponentDataService(ɵɵinject(NzMessageService)); }, token: ComponentDataService, providedIn: "root" });
ComponentDataService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
ComponentDataService.ctorParameters = () => [
    { type: NzMessageService }
];

class NgxVisualDragComponent {
    constructor(componentDataService) {
        this.componentDataService = componentDataService;
        this.onDataSave = new EventEmitter();
    }
    ngOnInit() {
        this.componentDataService.$storageData.subscribe((x) => {
            this.onDataSave.emit(x);
        });
    }
}
NgxVisualDragComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-ngx-visual-drag',
                template: ` <lib-home [data]="data"></lib-home> `,
                encapsulation: ViewEncapsulation.None,
                styles: ["@import \"~ng-zorro-antd/ng-zorro-antd.min.css\";.mt-10{margin-top:10px!important}.mt-11{margin-top:11px!important}.mt-12{margin-top:12px!important}.mt-13{margin-top:13px!important}.mt-14{margin-top:14px!important}.mt-15{margin-top:15px!important}.mt-16{margin-top:16px!important}.mt-17{margin-top:17px!important}.mt-18{margin-top:18px!important}.mt-19{margin-top:19px!important}.mt-20{margin-top:20px!important}.mt-21{margin-top:21px!important}.mt-22{margin-top:22px!important}.mt-23{margin-top:23px!important}.mt-24{margin-top:24px!important}.mt-25{margin-top:25px!important}.mt-26{margin-top:26px!important}.mt-27{margin-top:27px!important}.mt-28{margin-top:28px!important}.mt-29{margin-top:29px!important}.mr-10{margin-right:10px!important}.mr-11{margin-right:11px!important}.mr-12{margin-right:12px!important}.mr-13{margin-right:13px!important}.mr-14{margin-right:14px!important}.mr-15{margin-right:15px!important}.mr-16{margin-right:16px!important}.mr-17{margin-right:17px!important}.mr-18{margin-right:18px!important}.mr-19{margin-right:19px!important}.mr-20{margin-right:20px!important}.mr-21{margin-right:21px!important}.mr-22{margin-right:22px!important}.mr-23{margin-right:23px!important}.mr-24{margin-right:24px!important}.mr-25{margin-right:25px!important}.mr-26{margin-right:26px!important}.mr-27{margin-right:27px!important}.mr-28{margin-right:28px!important}.mr-29{margin-right:29px!important}.mb-10{margin-bottom:10px!important}.mb-11{margin-bottom:11px!important}.mb-12{margin-bottom:12px!important}.mb-13{margin-bottom:13px!important}.mb-14{margin-bottom:14px!important}.mb-15{margin-bottom:15px!important}.mb-16{margin-bottom:16px!important}.mb-17{margin-bottom:17px!important}.mb-18{margin-bottom:18px!important}.mb-19{margin-bottom:19px!important}.mb-20{margin-bottom:20px!important}.mb-21{margin-bottom:21px!important}.mb-22{margin-bottom:22px!important}.mb-23{margin-bottom:23px!important}.mb-24{margin-bottom:24px!important}.mb-25{margin-bottom:25px!important}.mb-26{margin-bottom:26px!important}.mb-27{margin-bottom:27px!important}.mb-28{margin-bottom:28px!important}.mb-29{margin-bottom:29px!important}.ml-10{margin-left:10px!important}.ml-11{margin-left:11px!important}.ml-12{margin-left:12px!important}.ml-13{margin-left:13px!important}.ml-14{margin-left:14px!important}.ml-15{margin-left:15px!important}.ml-16{margin-left:16px!important}.ml-17{margin-left:17px!important}.ml-18{margin-left:18px!important}.ml-19{margin-left:19px!important}.ml-20{margin-left:20px!important}.ml-21{margin-left:21px!important}.ml-22{margin-left:22px!important}.ml-23{margin-left:23px!important}.ml-24{margin-left:24px!important}.ml-25{margin-left:25px!important}.ml-26{margin-left:26px!important}.ml-27{margin-left:27px!important}.ml-28{margin-left:28px!important}.ml-29{margin-left:29px!important}.absoulte{position:absolute}"]
            },] }
];
NgxVisualDragComponent.ctorParameters = () => [
    { type: ComponentDataService }
];
NgxVisualDragComponent.propDecorators = {
    data: [{ type: Input }],
    onDataSave: [{ type: Output }]
};

// 公共样式
const commonStyle = {
    rotate: '',
    opacity: 1,
};
// 编辑器左侧组件列表
const list = [
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
list.forEach((item) => {
    item.style = Object.assign(Object.assign({}, item.style), commonStyle);
});

class HomeComponent {
    constructor(componentDataService) {
        this.componentDataService = componentDataService;
    }
    ngOnInit() {
        this.componentDataService.restore(this.data);
    }
    handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        const component = deepCopy(list[e.dataTransfer.getData('index')]);
        component.style.top = e.offsetY;
        component.style.left = e.offsetX;
        component.id = generateID();
        this.componentDataService.componentData.push(component);
        this.componentDataService.recordSnapshot();
    }
    handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    }
    deselectCurComponent() {
        this.componentDataService.curComponent = null;
        this.componentDataService.curComponentIndex = null;
        this.componentDataService.hideContextMenu();
    }
}
HomeComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-home',
                template: "<div class=\"home\">\n    <toolbar></toolbar>\n\n    <main>\n        <!-- \u5DE6\u4FA7\u7EC4\u4EF6\u5217\u8868 -->\n        <section class=\"left\">\n            <component-list></component-list>\n        </section>\n        <!-- \u4E2D\u95F4\u753B\u5E03 -->\n        <section class=\"center\">\n            <div class=\"content\" (drop)=\"handleDrop($event)\" (dragover)=\"handleDragOver($event)\"\n                (click)=\"deselectCurComponent()\">\n                <editor></editor>\n            </div>\n        </section>\n        <!-- \u53F3\u4FA7\u5C5E\u6027\u5217\u8868 -->\n        <section class=\"right\">\n            <!-- <el-tabs v-model=\"activeName\">\n                <el-tab-pane label=\"\u5C5E\u6027\" name=\"attr\">\n                    <AttrList v-if=\"curComponent\" />\n                    <p v-else class=\"placeholder\">\u8BF7\u9009\u62E9\u7EC4\u4EF6</p>\n                </el-tab-pane>\n                <el-tab-pane label=\"\u52A8\u753B\" name=\"animation\">\n                    <AnimationList v-if=\"curComponent\" />\n                    <p v-else class=\"placeholder\">\u8BF7\u9009\u62E9\u7EC4\u4EF6</p>\n                </el-tab-pane>\n                <el-tab-pane label=\"\u4E8B\u4EF6\" name=\"events\">\n                    <EventList v-if=\"curComponent\" />\n                    <p v-else class=\"placeholder\">\u8BF7\u9009\u62E9\u7EC4\u4EF6</p>\n                </el-tab-pane>\n            </el-tabs> -->\n            <nz-tabset class=\"tabset\">\n                <nz-tab nzTitle=\"\u5C5E\u6027\">\n                    <Attr-list *ngIf=\"!!componentDataService.curComponent\"></Attr-list>\n                </nz-tab>\n                <nz-tab nzTitle=\"Tab 2\">\n                    Content of Tab Pane 2\n                </nz-tab>\n                <nz-tab nzTitle=\"Tab 3\">\n                    Content of Tab Pane 3\n                </nz-tab>\n            </nz-tabset>\n        </section>\n    </main>\n</div>",
                encapsulation: ViewEncapsulation.None,
                styles: [".home{background:#fff;height:100vh}.home main{height:calc(100% - 64px);position:relative}.home main .left{left:0;padding-top:10px;width:200px}.home main .left,.home main .right{height:100%;position:absolute;top:0}.home main .right{padding:0 15px;right:0;width:262px}.home main .right .tabset{height:100%}.home main .center,.home main .right .tabset .ant-tabs-content-holder{height:100%;overflow:auto}.home main .center{background:#f5f5f5;margin-left:200px;margin-right:262px;padding:20px}.home main .center .content{align-items:center;display:flex;height:100%;justify-content:center;overflow:auto}.home .placeholder{color:#333;text-align:center}"]
            },] }
];
HomeComponent.ctorParameters = () => [
    { type: ComponentDataService }
];
HomeComponent.propDecorators = {
    data: [{ type: Input }]
};

class ToolbarComponent {
    constructor(componentDataService, message) {
        this.componentDataService = componentDataService;
        this.message = message;
        this.isShowPreview = false;
    }
    ngOnInit() { }
    redo() {
        this.componentDataService.redo();
    }
    undo() {
        this.componentDataService.undo();
    }
    save() {
        this.componentDataService.save();
    }
    clearCanvas() {
        this.componentDataService.clearCanvas();
    }
    preview() {
        this.isShowPreview = true;
        this.componentDataService.setEditMode('read');
    }
    closePreview() {
        this.isShowPreview = false;
    }
}
ToolbarComponent.decorators = [
    { type: Component, args: [{
                selector: 'toolbar',
                template: "<div>\n    <div class=\"toolbar\">\n        <button nz-button (click)=\"undo()\" class=\"mr-20  ml-20\">\u64A4\u6D88</button>\n        <button nz-button (click)=\"redo()\" class=\"mr-20\">\u91CD\u505A</button>\n        <label for=\"input\" class=\"insert\">\u63D2\u5165\u56FE\u7247</label>\n        <input type=\"file\" id=\"input\" hidden />\n        <button nz-button style=\"margin-left: 10px;\" class=\"mr-20\" (click)=\"preview()\">\u9884\u89C8</button>\n        <button nz-button class=\"mr-20\" (click)=\"save()\">\u4FDD\u5B58</button>\n        <button nz-button (click)=\"clearCanvas()\">\u6E05\u7A7A\u753B\u5E03</button>\n        <div class=\"canvas-config\">\n            <span>\u753B\u5E03\u5927\u5C0F</span>\n            <input nz-input [(ngModel)]=\"componentDataService.canvasStyleData.width\">\n            <span>*</span>\n            <input nz-input [(ngModel)]=\"componentDataService.canvasStyleData.height\">\n        </div>\n    </div>\n\n    <!-- \u9884\u89C8 -->\n    <!-- <Preview v-model=\"isShowPreview\" @change=\"handlePreviewChange\" /> -->\n    <Preview [isShowPreview]=\"isShowPreview\" (OutClose)=\"closePreview()\"></Preview>\n</div>",
                encapsulation: ViewEncapsulation.None,
                styles: [".toolbar{background:#fff;border-bottom:1px solid #ddd;height:64px;line-height:64px}.toolbar .canvas-config{color:#606266;display:inline-block;font-size:14px;margin-left:10px}.toolbar .canvas-config input{border:1px solid #ddd;color:#606266;margin-left:10px;outline:none;padding:0 5px;width:50px}.toolbar .canvas-config span{margin-left:10px}.toolbar .insert{-webkit-appearance:none;background:#fff;border:1px solid #dcdfe6;border-radius:3px;box-sizing:border-box;color:#606266;cursor:pointer;display:inline-block;font-size:12px;font-weight:500;line-height:1;margin:0 0 0 10px;outline:0;padding:9px 15px;text-align:center;transition:.1s;white-space:nowrap}.toolbar .insert:active{border-color:#3a8ee6;color:#3a8ee6;outline:0}.toolbar .insert:hover{background-color:#ecf5ff;color:#3a8ee6}"]
            },] }
];
ToolbarComponent.ctorParameters = () => [
    { type: ComponentDataService },
    { type: NzMessageService }
];

//#region
const list$1 = [
    NzButtonModule,
    NzInputModule,
    NzMessageModule,
    NzLayoutModule,
    NzTabsModule,
    NzSelectModule,
];
//#endregion
//#region
const common = [CommonModule, FormsModule];
//#endregion
class SharedModule {
}
SharedModule.decorators = [
    { type: NgModule, args: [{
                declarations: [],
                imports: [...common, ...list$1],
                exports: [common, ...list$1],
            },] }
];

class ComponentListComponent {
    constructor() {
        this.componentList = list;
    }
    ngOnInit() {
    }
    handleDragStart(e) {
        e.dataTransfer.setData('index', e.target.dataset.index);
    }
}
ComponentListComponent.decorators = [
    { type: Component, args: [{
                selector: 'component-list',
                template: "<div class=\"component-list\">\n    <div *ngFor=\"let item of componentList; index as i\" class=\"list\" draggable=\"true\"\n        (dragstart)=\"handleDragStart($event)\" [attr.data-index]=\"i\">\n        <i class=\"{{item.icon}}\"></i>\n        <span>{{ item.label }}</span>\n    </div>\n</div>",
                styles: [".component-list{display:flex;flex-wrap:wrap;justify-content:space-between;padding:10px}.component-list .list{border:1px solid #ddd;color:#333;cursor:grab;margin-bottom:10px;padding:2px 5px;text-align:center;width:45%}.component-list .list:active{cursor:grabbing}"]
            },] }
];
ComponentListComponent.ctorParameters = () => [];

function getStyle(style, filter = []) {
    const needUnit = [
        'fontSize',
        'width',
        'height',
        'top',
        'left',
        'borderWidth',
        'borderRadius',
    ];
    const result = {};
    Object.keys(style).forEach((key) => {
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

class EditorComponent {
    constructor(componentDataService) {
        this.componentDataService = componentDataService;
        this.isEdit = false;
    }
    ngOnInit() { }
    handleContextMenu(e) {
        e.stopPropagation();
        e.preventDefault();
        // 计算菜单相对于编辑器的位移
        let target = e.target;
        let top = e.offsetY;
        let left = e.offsetX;
        while (!target.className.includes('editor')) {
            left += target.offsetLeft;
            top += target.offsetTop;
            target = target.parentNode;
        }
        this.componentDataService.contextmenu = {
            show: true,
            top,
            left,
        };
    }
    getComponentStyle(style) {
        return getStyle(style, ['top', 'left', 'width', 'height', 'rotate']);
    }
}
EditorComponent.decorators = [
    { type: Component, args: [{
                selector: 'editor',
                template: "<div class=\"editor\" id=\"editor\" [class.edit]=\"isEdit\" [style.width.px]=\"componentDataService.canvasStyleData.width\"\n    [style.height.px]=\"componentDataService.canvasStyleData.height\" (contextmenu)=\"handleContextMenu($event)\">\n    <!--\u9875\u9762\u7EC4\u4EF6\u5217\u8868\u5C55\u793A-->\n    <shape *ngFor=\"let item of componentDataService.componentData; index as i\" [defaultStyle]=\"item.style\"\n        [active]=\"item.id === componentDataService?.curComponent?.id\" [element]=\"item\" [index]=\"i\">\n        <ng-container [ngSwitch]=\"item.component\">\n            <ng-container *ngSwitchCase=\"'v-button'\">\n                <v-button class=\"component\" [propValue]=\"item.propValue\" [vStyle]=\"getComponentStyle(item.style)\">\n                </v-button>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"'v-text'\">\n\n            </ng-container>\n            <ng-container *ngSwitchDefault>\n\n            </ng-container>\n        </ng-container>\n        <!-- <component v-if=\"item.component != 'v-text'\" class=\"component\" :is=\"item.component\"\n            :style=\"getComponentStyle(item.style)\" :propValue=\"item.propValue\" />\n\n        <component v-else class=\"component\" :is=\"item.component\" :style=\"getComponentStyle(item.style)\"\n            :propValue=\"item.propValue\" @input=\"handleInput\" :element=\"item\" /> -->\n    </shape>\n    <!-- \u53F3\u51FB\u83DC\u5355 -->\n    <context-menu></context-menu>\n    <!-- \u6807\u7EBF -->\n    <Markline></Markline>\n</div>",
                encapsulation: ViewEncapsulation.None,
                styles: [".editor{background:#fff;flex-shrink:0;position:relative}.edit .component{height:100%;outline:none;width:100%}"]
            },] }
];
EditorComponent.ctorParameters = () => [
    { type: ComponentDataService }
];

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
    let point; // point 是未旋转前的坐标
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

const funcs = {
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
    const { symmetricPoint } = pointInfo;
    const newCenterPoint = getCenterPoint(curPositon, symmetricPoint);
    const newTopLeftPoint = calculateRotatedPointCoordinate(curPositon, newCenterPoint, -style.rotate);
    const newBottomRightPoint = calculateRotatedPointCoordinate(symmetricPoint, newCenterPoint, -style.rotate);
    const newWidth = newBottomRightPoint.x - newTopLeftPoint.x;
    const newHeight = newBottomRightPoint.y - newTopLeftPoint.y;
    if (newWidth > 0 && newHeight > 0) {
        style.width = Math.round(newWidth);
        style.height = Math.round(newHeight);
        style.left = Math.round(newTopLeftPoint.x);
        style.top = Math.round(newTopLeftPoint.y);
    }
}
function calculateTop(style, curPositon, pointInfo) {
    const { symmetricPoint, curPoint } = pointInfo;
    const rotatedcurPositon = calculateRotatedPointCoordinate(curPositon, curPoint, -style.rotate);
    const rotatedTopMiddlePoint = calculateRotatedPointCoordinate({
        x: curPoint.x,
        y: rotatedcurPositon.y,
    }, curPoint, style.rotate);
    // 勾股定理
    const newHeight = Math.sqrt(Math.pow((rotatedTopMiddlePoint.x - symmetricPoint.x), 2) +
        Math.pow((rotatedTopMiddlePoint.y - symmetricPoint.y), 2));
    if (newHeight > 0) {
        const newCenter = {
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
    const { symmetricPoint, curPoint } = pointInfo;
    const rotatedcurPositon = calculateRotatedPointCoordinate(curPositon, curPoint, -style.rotate);
    const rotatedRightMiddlePoint = calculateRotatedPointCoordinate({
        x: rotatedcurPositon.x,
        y: curPoint.y,
    }, curPoint, style.rotate);
    const newWidth = Math.sqrt(Math.pow((rotatedRightMiddlePoint.x - symmetricPoint.x), 2) +
        Math.pow((rotatedRightMiddlePoint.y - symmetricPoint.y), 2));
    if (newWidth > 0) {
        const newCenter = {
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
    const { symmetricPoint, curPoint } = pointInfo;
    const rotatedcurPositon = calculateRotatedPointCoordinate(curPositon, curPoint, -style.rotate);
    const rotatedBottomMiddlePoint = calculateRotatedPointCoordinate({
        x: curPoint.x,
        y: rotatedcurPositon.y,
    }, curPoint, style.rotate);
    const newHeight = Math.sqrt(Math.pow((rotatedBottomMiddlePoint.x - symmetricPoint.x), 2) +
        Math.pow((rotatedBottomMiddlePoint.y - symmetricPoint.y), 2));
    if (newHeight > 0) {
        const newCenter = {
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
    const { symmetricPoint, curPoint } = pointInfo;
    const rotatedcurPositon = calculateRotatedPointCoordinate(curPositon, curPoint, -style.rotate);
    const rotatedLeftMiddlePoint = calculateRotatedPointCoordinate({
        x: rotatedcurPositon.x,
        y: curPoint.y,
    }, curPoint, style.rotate);
    const newWidth = Math.sqrt(Math.pow((rotatedLeftMiddlePoint.x - symmetricPoint.x), 2) +
        Math.pow((rotatedLeftMiddlePoint.y - symmetricPoint.y), 2));
    if (newWidth > 0) {
        const newCenter = {
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
    const { symmetricPoint } = pointInfo;
    const newCenterPoint = getCenterPoint(curPositon, symmetricPoint);
    const newTopRightPoint = calculateRotatedPointCoordinate(curPositon, newCenterPoint, -style.rotate);
    const newBottomLeftPoint = calculateRotatedPointCoordinate(symmetricPoint, newCenterPoint, -style.rotate);
    const newWidth = newTopRightPoint.x - newBottomLeftPoint.x;
    const newHeight = newBottomLeftPoint.y - newTopRightPoint.y;
    if (newWidth > 0 && newHeight > 0) {
        style.width = Math.round(newWidth);
        style.height = Math.round(newHeight);
        style.left = Math.round(newBottomLeftPoint.x);
        style.top = Math.round(newTopRightPoint.y);
    }
}
function calculateRightBottom(style, curPositon, pointInfo) {
    const { symmetricPoint } = pointInfo;
    const newCenterPoint = getCenterPoint(curPositon, symmetricPoint);
    const newTopLeftPoint = calculateRotatedPointCoordinate(symmetricPoint, newCenterPoint, -style.rotate);
    const newBottomRightPoint = calculateRotatedPointCoordinate(curPositon, newCenterPoint, -style.rotate);
    const newWidth = newBottomRightPoint.x - newTopLeftPoint.x;
    const newHeight = newBottomRightPoint.y - newTopLeftPoint.y;
    if (newWidth > 0 && newHeight > 0) {
        style.width = Math.round(newWidth);
        style.height = Math.round(newHeight);
        style.left = Math.round(newTopLeftPoint.x);
        style.top = Math.round(newTopLeftPoint.y);
    }
}
function calculateLeftBottom(style, curPositon, pointInfo) {
    const { symmetricPoint } = pointInfo;
    const newCenterPoint = getCenterPoint(curPositon, symmetricPoint);
    const newTopRightPoint = calculateRotatedPointCoordinate(symmetricPoint, newCenterPoint, -style.rotate);
    const newBottomLeftPoint = calculateRotatedPointCoordinate(curPositon, newCenterPoint, -style.rotate);
    const newWidth = newTopRightPoint.x - newBottomLeftPoint.x;
    const newHeight = newBottomLeftPoint.y - newTopRightPoint.y;
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

class ShapeComponent {
    constructor(componentDataService) {
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
    ngOnInit() { }
    getShapeStyle(style) {
        const result = Object.assign({}, style);
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
    }
    handleMouseDownOnShape(e) {
        if (this.element.component != 'v-text') {
            e.preventDefault();
        }
        e.stopPropagation();
        this.componentDataService.curComponent = this.element;
        this.componentDataService.curComponentIndex = this.index;
        this.cursors = this.getCursor(); // 根据旋转角度获取光标位置
        const pos = Object.assign({}, this.defaultStyle);
        const startY = e.clientY;
        const startX = e.clientX;
        // 如果直接修改属性，值的类型会变为字符串，所以要转为数值型
        const startTop = Number(pos.top);
        const startLeft = Number(pos.left);
        // 如果元素没有移动，则不保存快照
        let hasMove = false;
        const move = (moveEvent) => {
            hasMove = true;
            const curX = moveEvent.clientX;
            const curY = moveEvent.clientY;
            pos.top = curY - startY + startTop;
            pos.left = curX - startX + startLeft;
            // 修改当前组件样式
            this.componentDataService.$shapeStyle.next(pos);
            // 等更新完当前组件的样式并绘制到屏幕后再判断是否需要吸附
            // 如果不使用 $nextTick，吸附后将无法移动
            // this.$nextTick(() => {
            //   // 触发元素移动事件，用于显示标线、吸附功能
            //   // 后面两个参数代表鼠标移动方向
            //   // curY - startY > 0 true 表示向下移动 false 表示向上移动
            //   // curX - startX > 0 true 表示向右移动 false 表示向左移动
            //   eventBus.$emit('move', curY - startY > 0, curX - startX > 0);
            // })
            this.componentDataService.notification.next({
                event: 'move',
                value: [curY - startY > 0, curX - startX > 0],
            });
        };
        const up = () => {
            hasMove && this.componentDataService.recordSnapshot();
            // 触发元素停止移动事件，用于隐藏标线
            // eventBus.$emit('unmove')
            this.componentDataService.notification.next({
                event: 'unmove',
            });
            document.removeEventListener('mousemove', move);
            document.removeEventListener('mouseup', up);
        };
        document.addEventListener('mousemove', move);
        document.addEventListener('mouseup', up);
    }
    selectCurComponent(e) {
        e.stopPropagation();
        e.preventDefault();
        this.componentDataService.hideContextMenu();
    }
    handleRotate() { }
    handleMouseDownOnPoint(point, e) {
        const downEvent = window.event;
        downEvent.stopPropagation();
        downEvent.preventDefault();
        const style = Object.assign({}, this.defaultStyle);
        const center = {
            x: style.left + style.width / 2,
            y: style.top + style.height / 2,
        };
        // 获取画布位移信息
        const editorRectInfo = document
            .querySelector('#editor')
            .getBoundingClientRect();
        // 当前点击坐标
        const curPoint = {
            x: e.clientX - editorRectInfo.left,
            y: e.clientY - editorRectInfo.top,
        };
        // 获取对称点的坐标
        const symmetricPoint = {
            x: center.x - (curPoint.x - center.x),
            y: center.y - (curPoint.y - center.y),
        };
        // 是否需要保存快照
        let needSave = false;
        let isFirst = true;
        const move = (moveEvent) => {
            // 第一次点击时也会触发 move，所以会有“刚点击组件但未移动，组件的大小却改变了”的情况发生
            // 因此第一次点击时不触发 move 事件
            if (isFirst) {
                isFirst = false;
                return;
            }
            needSave = true;
            const curPositon = {
                x: moveEvent.clientX - editorRectInfo.left,
                y: moveEvent.clientY - editorRectInfo.top,
            };
            calculateComponentPositonAndSize(point, style, curPositon, {
                center,
                curPoint,
                symmetricPoint,
            });
            this.componentDataService.$shapeStyle.next(style);
        };
        const up = () => {
            document.removeEventListener('mousemove', move);
            document.removeEventListener('mouseup', up);
            needSave && this.componentDataService.recordSnapshot();
        };
        document.addEventListener('mousemove', move);
        document.addEventListener('mouseup', up);
    }
    getPointStyle(point) {
        const { width, height } = this.defaultStyle;
        const hasT = /t/.test(point);
        const hasB = /b/.test(point);
        const hasL = /l/.test(point);
        const hasR = /r/.test(point);
        let newLeft = 0;
        let newTop = 0;
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
        const style = {
            marginLeft: hasR ? '-4px' : '-4px',
            marginTop: '-4px',
            left: `${newLeft}px`,
            top: `${newTop}px`,
            cursor: this.cursors[point],
        };
        return style;
    }
    getCursor() {
        const { angleToCursor, initialAngle, pointList } = this;
        const curComponent = this.componentDataService.curComponent;
        const rotate = (curComponent.style.rotate + 360) % 360; // 防止角度有负数，所以 + 360
        const result = {};
        let lastMatchIndex = -1; // 从上一个命中的角度的索引开始匹配下一个，降低时间复杂度
        pointList.forEach((point) => {
            const angle = (initialAngle[point] + rotate) % 360;
            const len = angleToCursor.length;
            while (true) {
                lastMatchIndex = (lastMatchIndex + 1) % len;
                const angleLimit = angleToCursor[lastMatchIndex];
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
    }
}
ShapeComponent.decorators = [
    { type: Component, args: [{
                selector: 'shape',
                template: "<div class=\"shape\" [ngStyle]=\"getShapeStyle(defaultStyle)\" [class.active]=\"active\" (click)=\"selectCurComponent($event)\"\n    (mousedown)=\"handleMouseDownOnShape($event)\">\n    <i class=\"el-icon-refresh-right\" *ngIf=\"active\" (mousedown)=\"handleRotate()\"></i>\n    <div class=\"shape-point\" *ngFor=\"let item of (active? pointList : [])\"\n        (mousedown)=\"handleMouseDownOnPoint(item, $event)\" [ngStyle]=\"getPointStyle(item)\">\n    </div>\n    <ng-content></ng-content>\n</div>",
                encapsulation: ViewEncapsulation.None,
                styles: [".shape{position:absolute}.shape:hover{cursor:move}.active{-webkit-user-select:none;outline:1px solid #70c0ff;user-select:none}.shape-point{background:#fff;border:1px solid #59c7f9;border-radius:50%;height:8px;position:absolute;width:8px}.el-icon-refresh-right{color:#59c7f9;cursor:grab;font-size:18px;font-size:22px;font-weight:600;font-weight:400;left:50%;position:absolute;top:-30px;transform:translateX(-50%)}.el-icon-refresh-right:active{cursor:grabbing}"]
            },] }
];
ShapeComponent.ctorParameters = () => [
    { type: ComponentDataService }
];
ShapeComponent.propDecorators = {
    active: [{ type: Input }],
    element: [{ type: Input }],
    defaultStyle: [{ type: Input }],
    index: [{ type: Input }]
};

class VButtonComponent {
    constructor() {
        this.propValue = '';
        this.vStyle = {};
        this.absoulte = false;
    }
    ngOnInit() { }
}
VButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'v-button',
                template: `
    <button class="v-button" [ngStyle]="vStyle" [class.absoulte]="absoulte">
      {{ propValue }}
    </button>
  `,
                encapsulation: ViewEncapsulation.None,
                styles: [".v-button{-webkit-appearance:none;background:#fff;border:1px solid #dcdfe6;box-sizing:border-box;color:#606266;cursor:pointer;display:inline-block;font-size:14px;font-weight:500;height:100%;line-height:1;margin:0;outline:0;text-align:center;transition:.1s;white-space:nowrap;width:100%}.v-button:active{border-color:#3a8ee6;color:#3a8ee6;outline:0}.v-button:hover{background-color:#ecf5ff;color:#3a8ee6}"]
            },] }
];
VButtonComponent.ctorParameters = () => [];
VButtonComponent.propDecorators = {
    propValue: [{ type: Input }],
    vStyle: [{ type: Input }],
    absoulte: [{ type: Input }]
};

class ContextMenuComponent {
    constructor(componentDataService) {
        this.componentDataService = componentDataService;
    }
    get menuShow() {
        return this.componentDataService.contextmenu.show;
    }
    get menuTop() {
        return this.componentDataService.contextmenu.top;
    }
    get menuLeft() {
        return this.componentDataService.contextmenu.left;
    }
    ngOnInit() { }
    copy() {
        this.componentDataService.copy();
    }
    paste() {
        this.componentDataService.paste(true);
    }
    cut() {
        this.componentDataService.cut();
    }
    deleteComponent() {
        this.componentDataService.deleteCurComponent();
        this.componentDataService.recordSnapshot();
    }
    topComponent() {
        this.componentDataService.topComponent();
        this.componentDataService.recordSnapshot();
    }
    bottomComponent() {
        this.componentDataService.bottomComponent();
        this.componentDataService.recordSnapshot();
    }
    upComponent() {
        this.componentDataService.upComponent();
        this.componentDataService.recordSnapshot();
    }
    downComponent() {
        this.componentDataService.downComponent();
        this.componentDataService.recordSnapshot();
    }
}
ContextMenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'context-menu',
                template: "<div class=\"contextmenu\" *ngIf=\"menuShow\" [style.top.px]=\"menuTop\" [style.left.px]=\"menuLeft\">\n    <ul>\n        <ng-container *ngIf=\"componentDataService.curComponent; else pasteTmp\">\n            <li (click)=\"copy()\">\u590D\u5236</li>\n            <li (click)=\"paste()\">\u7C98\u8D34</li>\n            <li (click)=\"cut()\">\u526A\u5207</li>\n            <li (click)=\"deleteComponent()\">\u5220\u9664</li>\n            <li (click)=\"topComponent()\">\u7F6E\u9876</li>\n            <li (click)=\"bottomComponent()\">\u7F6E\u5E95</li>\n            <li (click)=\"upComponent()\">\u4E0A\u79FB</li>\n            <li (click)=\"downComponent()\">\u4E0B\u79FB</li>\n        </ng-container>\n        <ng-template #pasteTmp>\n            <li (click)=\"paste()\">\u7C98\u8D34</li>\n        </ng-template>\n    </ul>\n</div>",
                encapsulation: ViewEncapsulation.None,
                styles: [".contextmenu{position:absolute;z-index:1000}.contextmenu ul{background-color:#fff;border:1px solid #e4e7ed;border-radius:4px;box-shadow:0 2px 12px 0 rgba(0,0,0,.1);box-sizing:border-box;margin:5px 0;padding:6px 0}.contextmenu ul li{box-sizing:border-box;color:#606266;cursor:pointer;font-size:14px;height:34px;line-height:34px;overflow:hidden;padding:0 20px;position:relative;text-overflow:ellipsis;white-space:nowrap}.contextmenu ul li:hover{background-color:#f5f7fa}"]
            },] }
];
ContextMenuComponent.ctorParameters = () => [
    { type: ComponentDataService }
];

class MarklineComponent {
    constructor(componentDataService) {
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
    ngAfterContentInit() { }
    ngOnInit() {
        this.componentDataService.notification.subscribe((x) => {
            if (x.event === 'move') {
                this.showLine(x.value[0], x.value[1]);
            }
            if (x.event === 'unmove') {
                this.hideLine();
            }
        });
    }
    showLine(isDownward, isRightward) {
        const lines = Array.from(document.querySelectorAll('.line'));
        const findnode = (type) => {
            return lines.find((x) => x['dataset'].index === type);
        };
        const components = this.componentDataService.componentData;
        const curComponentStyle = this.translateComponentStyle(this.componentDataService.curComponent.style);
        const curComponentHalfwidth = curComponentStyle.width / 2;
        const curComponentHalfHeight = curComponentStyle.height / 2;
        this.hideLine();
        components.forEach((component) => {
            if (component == this.componentDataService.curComponent)
                return;
            const componentStyle = this.translateComponentStyle(component.style);
            const { top, left, bottom, right } = componentStyle;
            const componentHalfwidth = componentStyle.width / 2;
            const componentHalfHeight = componentStyle.height / 2;
            const conditions = {
                top: [
                    {
                        isNearly: this.isNearly(curComponentStyle.top, top),
                        lineNode: findnode('xt'),
                        line: 'xt',
                        dragShift: top,
                        lineShift: top,
                    },
                    {
                        isNearly: this.isNearly(curComponentStyle.bottom, top),
                        lineNode: findnode('xt'),
                        line: 'xt',
                        dragShift: top - curComponentStyle.height,
                        lineShift: top,
                    },
                    {
                        // 组件与拖拽节点的中间是否对齐
                        isNearly: this.isNearly(curComponentStyle.top + curComponentHalfHeight, top + componentHalfHeight),
                        lineNode: findnode('xc'),
                        line: 'xc',
                        dragShift: top + componentHalfHeight - curComponentHalfHeight,
                        lineShift: top + componentHalfHeight,
                    },
                    {
                        isNearly: this.isNearly(curComponentStyle.top, bottom),
                        lineNode: findnode('xb'),
                        line: 'xb',
                        dragShift: bottom,
                        lineShift: bottom,
                    },
                    {
                        isNearly: this.isNearly(curComponentStyle.bottom, bottom),
                        lineNode: findnode('xb'),
                        line: 'xb',
                        dragShift: bottom - curComponentStyle.height,
                        lineShift: bottom,
                    },
                ],
                left: [
                    {
                        isNearly: this.isNearly(curComponentStyle.left, left),
                        lineNode: findnode('yl'),
                        line: 'yl',
                        dragShift: left,
                        lineShift: left,
                    },
                    {
                        isNearly: this.isNearly(curComponentStyle.right, left),
                        lineNode: findnode('yl'),
                        line: 'yl',
                        dragShift: left - curComponentStyle.width,
                        lineShift: left,
                    },
                    {
                        // 组件与拖拽节点的中间是否对齐
                        isNearly: this.isNearly(curComponentStyle.left + curComponentHalfwidth, left + componentHalfwidth),
                        lineNode: findnode('yc'),
                        line: 'yc',
                        dragShift: left + componentHalfwidth - curComponentHalfwidth,
                        lineShift: left + componentHalfwidth,
                    },
                    {
                        isNearly: this.isNearly(curComponentStyle.left, right),
                        lineNode: findnode('yr'),
                        line: 'yr',
                        dragShift: right,
                        lineShift: right,
                    },
                    {
                        isNearly: this.isNearly(curComponentStyle.right, right),
                        lineNode: findnode('yr'),
                        line: 'yr',
                        dragShift: right - curComponentStyle.width,
                        lineShift: right,
                    },
                ],
            };
            const needToShow = [];
            const { rotate } = this.componentDataService.curComponent.style;
            Object.keys(conditions).forEach((key) => {
                // 遍历符合的条件并处理
                conditions[key].forEach((condition) => {
                    if (!condition.isNearly)
                        return;
                    // 修改当前组件位移
                    this.componentDataService.setShapePosStyle({
                        key,
                        value: rotate != 0
                            ? this.translatecurComponentShift(key, condition, curComponentStyle)
                            : condition.dragShift,
                    });
                    condition.lineNode.style[key] = `${condition.lineShift}px`;
                    needToShow.push(condition.line);
                });
            });
            // 同一方向上同时显示三条线可能不太美观，因此才有了这个解决方案
            // 同一方向上的线只显示一条，例如多条横条只显示一条横线
            if (needToShow.length) {
                this.chooseTheTureLine(needToShow, isDownward, isRightward);
            }
        });
    }
    translateComponentStyle(style) {
        style = Object.assign({}, style);
        if (style.rotate != 0) {
            const newWidth = style.width * cos(style.rotate) + style.height * sin(style.rotate);
            const diffX = (style.width - newWidth) / 2;
            style.left += diffX;
            style.right = style.left + newWidth;
            const newHeight = style.height * cos(style.rotate) + style.width * sin(style.rotate);
            const diffY = (newHeight - style.height) / 2;
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
    }
    hideLine() {
        Object.keys(this.lineStatus).forEach((line) => {
            this.lineStatus[line] = false;
        });
    }
    isNearly(dragValue, targetValue) {
        return Math.abs(dragValue - targetValue) <= this.diff;
    }
    translatecurComponentShift(key, condition, curComponentStyle) {
        const { width, height } = this.componentDataService.curComponent.style;
        if (key == 'top') {
            return Math.round(condition.dragShift - (height - curComponentStyle.height) / 2);
        }
        return Math.round(condition.dragShift - (width - curComponentStyle.width) / 2);
    }
    chooseTheTureLine(needToShow, isDownward, isRightward) {
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
    }
}
MarklineComponent.decorators = [
    { type: Component, args: [{
                selector: 'Markline',
                template: "<div class=\"mark-line\">\n    <ng-container *ngFor=\"let line of lines\">\n        <div class=\"line \" #lines [ngClass]=\"{\n             'xline': line.includes('x'),\n             'yline': line.includes('y')\n        }\" [attr.data-index]=\"line\" [hidden]=\"!lineStatus[line]\"></div>\n    </ng-container>\n\n</div>",
                encapsulation: ViewEncapsulation.None,
                styles: [".mark-line{height:100%}.line{background:#59c7f9;position:absolute;z-index:1000}.xline{height:1px;width:100%}.yline{height:100%;width:1px}"]
            },] }
];
MarklineComponent.ctorParameters = () => [
    { type: ComponentDataService }
];
MarklineComponent.propDecorators = {
    $refs: [{ type: ViewChildren, args: ['lines',] }]
};

class AttrListComponent {
    constructor(componentDataService) {
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
    get styleKeys() {
        return this.componentDataService.curComponent
            ? Object.keys(this.componentDataService.curComponent.style).filter((item) => item != 'rotate')
            : [];
    }
    ngOnInit() { }
}
AttrListComponent.decorators = [
    { type: Component, args: [{
                selector: 'Attr-list',
                template: "<div class=\"attr-list\">\n    <div nz-row *ngFor=\"let key of styleKeys\" class=\"mb-10\">\n        <div nz-col nzSpan=\"24\" class=\"mb-10\">{{map[key]}}</div>\n        <div nz-col nzSpan=\"24\">\n            <div [ngSwitch]=\"key\">\n                <div *ngSwitchCase=\"'borderColor'\"><input type=\"color\"\n                        [(ngModel)]=\"componentDataService.curComponent.style[key]\"></div>\n                <div *ngSwitchCase=\"'color'\"><input type=\"color\"\n                        [(ngModel)]=\"componentDataService.curComponent.style[key]\"></div>\n                <div *ngSwitchCase=\"'backgroundColor'\"><input type=\"color\"\n                        [(ngModel)]=\"componentDataService.curComponent.style[key]\"></div>\n                <div *ngSwitchCase=\"'textAlign'\">\n                    <nz-select [(ngModel)]=\"componentDataService.curComponent.style[key]\" style=\"width: 100%;\">\n                        <nz-option [nzValue]=\"item.value\" [nzLabel]=\"item.label\" *ngFor=\"let item of options\">\n                        </nz-option>\n                    </nz-select>\n                </div>\n                <div *ngSwitchDefault>\n                    <input nz-input type=\"number\" [(ngModel)]=\"componentDataService.curComponent.style[key]\">\n                </div>\n            </div>\n        </div>\n    </div>\n    <div nz-row\n        *ngIf=\"componentDataService.curComponent && !excludes.includes(componentDataService.curComponent.component)\">\n        <div nz-col nzSpan=\"24\" class=\"mb-10\">\u5185\u5BB9</div>\n        <div nz-col nzSpan=\"24\">\n            <textarea nz-input [(ngModel)]=\"componentDataService.curComponent.propValue\"\n                [nzAutosize]=\"{ minRows: 2, maxRows: 6 }\"></textarea>\n        </div>\n    </div>\n</div>",
                styles: [".attr-list{height:100%;overflow:auto;padding:0 20px 20px}"]
            },] }
];
AttrListComponent.ctorParameters = () => [
    { type: ComponentDataService }
];

class PreviewComponent {
    constructor(componentDataService) {
        this.componentDataService = componentDataService;
        this.isShowPreview = false;
        this.OutClose = new EventEmitter();
    }
    ngOnInit() { }
    close() {
        this.OutClose.emit();
    }
}
PreviewComponent.decorators = [
    { type: Component, args: [{
                selector: 'Preview',
                template: "<div class=\"bg\" *ngIf=\"isShowPreview\">\n    <button (click)=\"close()\" class=\"close\" nz-button>\u5173\u95ED</button>\n    <div class=\"canvas-container\">\n        <div class=\"canvas\"\n            [ngStyle]=\"{ width: componentDataService.canvasStyleData.width + 'px', height: componentDataService.canvasStyleData.height + 'px' }\">\n\n            <Component-wrapper *ngFor=\"let item of componentDataService.componentData\" [config]=\"item\">\n            </Component-wrapper>\n        </div>\n    </div>\n</div>",
                encapsulation: ViewEncapsulation.None,
                styles: [".bg{background:rgba(0,0,0,.5);height:100%;left:0;padding:20px;position:fixed;top:0;width:100%;z-index:10}.bg,.bg .canvas-container{align-items:center;display:flex;justify-content:center;overflow:auto}.bg .canvas-container{height:calc(100% - 120px);width:calc(100% - 40px)}.bg .canvas-container .canvas{background:#fff;flex-shrink:0;position:relative}.bg .close{position:absolute;right:20px;top:20px}"]
            },] }
];
PreviewComponent.ctorParameters = () => [
    { type: ComponentDataService }
];
PreviewComponent.propDecorators = {
    isShowPreview: [{ type: Input }],
    OutClose: [{ type: Output }]
};

class ComponentWrapperComponent {
    constructor(componentFactoryResolver) {
        this.componentFactoryResolver = componentFactoryResolver;
    }
    ngOnChanges(changes) {
        if (changes.config && changes.config.currentValue) {
            // this.addComponent();
        }
    }
    addComponent() {
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
    }
    ngOnInit() { }
    handleClick() { }
    getComponentStyle(style) {
        return getStyle(style);
    }
}
ComponentWrapperComponent.decorators = [
    { type: Component, args: [{
                selector: 'Component-wrapper',
                template: "<div (click)=\"handleClick()\" class=\"component\">\n    <!-- <component class=\"conponent\" :is=\"config.component\" :style=\"getStyle(config.style)\" :propValue=\"config.propValue\" /> -->\n    <ng-container [ngSwitch]=\"config.component\">\n        <ng-container *ngSwitchCase=\"'v-button'\">\n            <v-button [propValue]=\"config.propValue\" [absoulte]=\"true\" [vStyle]=\"getComponentStyle(config.style)\">\n            </v-button>\n        </ng-container>\n        <ng-container *ngSwitchDefault>output2</ng-container>\n    </ng-container>\n</div>",
                encapsulation: ViewEncapsulation.None,
                styles: [".conponent{position:absolute}"]
            },] }
];
ComponentWrapperComponent.ctorParameters = () => [
    { type: ComponentFactoryResolver }
];
ComponentWrapperComponent.propDecorators = {
    config: [{ type: Input }],
    viewContainer: [{ type: ViewChild, args: ['viewContainer', { read: ViewContainerRef, static: true },] }]
};

class NgxVisualDragModule {
}
NgxVisualDragModule.decorators = [
    { type: NgModule, args: [{
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
                imports: [BrowserAnimationsModule, SharedModule],
                exports: [NgxVisualDragComponent],
            },] }
];

/*
 * Public API Surface of ngx-visual-drag
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NgxVisualDragComponent, NgxVisualDragModule, NgxVisualDragService, ComponentDataService as ɵa, HomeComponent as ɵb, ToolbarComponent as ɵc, ComponentListComponent as ɵd, EditorComponent as ɵe, ShapeComponent as ɵf, VButtonComponent as ɵg, ContextMenuComponent as ɵh, MarklineComponent as ɵi, AttrListComponent as ɵj, PreviewComponent as ɵk, ComponentWrapperComponent as ɵl, SharedModule as ɵm };
//# sourceMappingURL=ngx-visual-drag.js.map
