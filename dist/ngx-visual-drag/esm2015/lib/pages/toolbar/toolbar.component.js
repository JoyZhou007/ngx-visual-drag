import { Component, ViewEncapsulation } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ComponentDataService } from '../../core/component/component-data.service';
export class ToolbarComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbGJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vcHJvamVjdHMvbmd4LXZpc3VhbC1kcmFnL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9wYWdlcy90b29sYmFyL3Rvb2xiYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDekQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFRbkYsTUFBTSxPQUFPLGdCQUFnQjtJQUUzQixZQUNTLG9CQUEwQyxFQUN6QyxPQUF5QjtRQUQxQix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQ3pDLFlBQU8sR0FBUCxPQUFPLENBQWtCO1FBSG5DLGtCQUFhLEdBQVksS0FBSyxDQUFDO0lBSTVCLENBQUM7SUFFSixRQUFRLEtBQVUsQ0FBQztJQUVuQixJQUFJO1FBQ0YsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFRCxJQUFJO1FBQ0YsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFRCxJQUFJO1FBQ0YsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzFDLENBQUM7SUFFRCxPQUFPO1FBQ0wsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFDMUIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsWUFBWTtRQUNWLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO0lBQzdCLENBQUM7OztZQXRDRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFNBQVM7Z0JBQ25CLHdwQ0FBdUM7Z0JBRXZDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOzthQUN0Qzs7O1lBUFEsb0JBQW9CO1lBRHBCLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTnpNZXNzYWdlU2VydmljZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvbWVzc2FnZSc7XG5pbXBvcnQgeyBDb21wb25lbnREYXRhU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvY29tcG9uZW50L2NvbXBvbmVudC1kYXRhLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0b29sYmFyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3Rvb2xiYXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi90b29sYmFyLmNvbXBvbmVudC5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIFRvb2xiYXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBpc1Nob3dQcmV2aWV3OiBib29sZWFuID0gZmFsc2U7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBjb21wb25lbnREYXRhU2VydmljZTogQ29tcG9uZW50RGF0YVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBtZXNzYWdlOiBOek1lc3NhZ2VTZXJ2aWNlXG4gICkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHt9XG5cbiAgcmVkbygpIHtcbiAgICB0aGlzLmNvbXBvbmVudERhdGFTZXJ2aWNlLnJlZG8oKTtcbiAgfVxuXG4gIHVuZG8oKSB7XG4gICAgdGhpcy5jb21wb25lbnREYXRhU2VydmljZS51bmRvKCk7XG4gIH1cblxuICBzYXZlKCkge1xuICAgIHRoaXMuY29tcG9uZW50RGF0YVNlcnZpY2Uuc2F2ZSgpO1xuICB9XG5cbiAgY2xlYXJDYW52YXMoKSB7XG4gICAgdGhpcy5jb21wb25lbnREYXRhU2VydmljZS5jbGVhckNhbnZhcygpO1xuICB9XG5cbiAgcHJldmlldygpIHtcbiAgICB0aGlzLmlzU2hvd1ByZXZpZXcgPSB0cnVlO1xuICAgIHRoaXMuY29tcG9uZW50RGF0YVNlcnZpY2Uuc2V0RWRpdE1vZGUoJ3JlYWQnKTtcbiAgfVxuXG4gIGNsb3NlUHJldmlldygpIHtcbiAgICB0aGlzLmlzU2hvd1ByZXZpZXcgPSBmYWxzZTtcbiAgfVxufVxuIl19