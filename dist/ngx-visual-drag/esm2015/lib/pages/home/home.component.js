import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ComponentDataService } from '../../core/component/component-data.service';
import componentList from '../../core/custom-component/component-list';
import generateID from '../../utils/generateID';
import { deepCopy } from '../../utils/utils';
export class HomeComponent {
    constructor(componentDataService) {
        this.componentDataService = componentDataService;
    }
    ngOnInit() {
        this.componentDataService.restore(this.data);
    }
    handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        const component = deepCopy(componentList[e.dataTransfer.getData('index')]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vcHJvamVjdHMvbmd4LXZpc3VhbC1kcmFnL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9wYWdlcy9ob21lL2hvbWUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzVFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ25GLE9BQU8sYUFBYSxNQUFNLDRDQUE0QyxDQUFDO0FBRXZFLE9BQU8sVUFBVSxNQUFNLHdCQUF3QixDQUFDO0FBQ2hELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQVE3QyxNQUFNLE9BQU8sYUFBYTtJQUV4QixZQUFtQixvQkFBMEM7UUFBMUMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtJQUFHLENBQUM7SUFFakUsUUFBUTtRQUNOLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCxVQUFVLENBQUMsQ0FBQztRQUNWLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNuQixDQUFDLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDcEIsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0UsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUNoQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQ2pDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsVUFBVSxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzdDLENBQUM7SUFFRCxjQUFjLENBQUMsQ0FBQztRQUNkLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNuQixDQUFDLENBQUMsWUFBWSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7SUFDckMsQ0FBQztJQUVELG9CQUFvQjtRQUNsQixJQUFJLENBQUMsb0JBQW9CLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUM5QyxJQUFJLENBQUMsb0JBQW9CLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1FBQ25ELElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUM5QyxDQUFDOzs7WUFsQ0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxVQUFVO2dCQUNwQixzNkRBQW9DO2dCQUVwQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7YUFDdEM7OztZQVhRLG9CQUFvQjs7O21CQWExQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tcG9uZW50RGF0YVNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL2NvbXBvbmVudC9jb21wb25lbnQtZGF0YS5zZXJ2aWNlJztcbmltcG9ydCBjb21wb25lbnRMaXN0IGZyb20gJy4uLy4uL2NvcmUvY3VzdG9tLWNvbXBvbmVudC9jb21wb25lbnQtbGlzdCc7XG5pbXBvcnQgeyBTdG9yYWdlRGF0YSB9IGZyb20gJy4uLy4uL3R5cGVzL2NvbXBvbmVudC10eXBlJztcbmltcG9ydCBnZW5lcmF0ZUlEIGZyb20gJy4uLy4uL3V0aWxzL2dlbmVyYXRlSUQnO1xuaW1wb3J0IHsgZGVlcENvcHkgfSBmcm9tICcuLi8uLi91dGlscy91dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpYi1ob21lJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2hvbWUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9ob21lLmNvbXBvbmVudC5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIEhvbWVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBkYXRhOiBTdG9yYWdlRGF0YTtcbiAgY29uc3RydWN0b3IocHVibGljIGNvbXBvbmVudERhdGFTZXJ2aWNlOiBDb21wb25lbnREYXRhU2VydmljZSkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmNvbXBvbmVudERhdGFTZXJ2aWNlLnJlc3RvcmUodGhpcy5kYXRhKTtcbiAgfVxuXG4gIGhhbmRsZURyb3AoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGNvbnN0IGNvbXBvbmVudCA9IGRlZXBDb3B5KGNvbXBvbmVudExpc3RbZS5kYXRhVHJhbnNmZXIuZ2V0RGF0YSgnaW5kZXgnKV0pO1xuICAgIGNvbXBvbmVudC5zdHlsZS50b3AgPSBlLm9mZnNldFk7XG4gICAgY29tcG9uZW50LnN0eWxlLmxlZnQgPSBlLm9mZnNldFg7XG4gICAgY29tcG9uZW50LmlkID0gZ2VuZXJhdGVJRCgpO1xuICAgIHRoaXMuY29tcG9uZW50RGF0YVNlcnZpY2UuY29tcG9uZW50RGF0YS5wdXNoKGNvbXBvbmVudCk7XG4gICAgdGhpcy5jb21wb25lbnREYXRhU2VydmljZS5yZWNvcmRTbmFwc2hvdCgpO1xuICB9XG5cbiAgaGFuZGxlRHJhZ092ZXIoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBlLmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ2NvcHknO1xuICB9XG5cbiAgZGVzZWxlY3RDdXJDb21wb25lbnQoKSB7XG4gICAgdGhpcy5jb21wb25lbnREYXRhU2VydmljZS5jdXJDb21wb25lbnQgPSBudWxsO1xuICAgIHRoaXMuY29tcG9uZW50RGF0YVNlcnZpY2UuY3VyQ29tcG9uZW50SW5kZXggPSBudWxsO1xuICAgIHRoaXMuY29tcG9uZW50RGF0YVNlcnZpY2UuaGlkZUNvbnRleHRNZW51KCk7XG4gIH1cbn1cbiJdfQ==