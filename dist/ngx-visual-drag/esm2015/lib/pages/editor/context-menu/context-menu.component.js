import { Component, ViewEncapsulation } from '@angular/core';
import { ComponentDataService } from '../../../core/component/component-data.service';
export class ContextMenuComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1tZW51LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi9wcm9qZWN0cy9uZ3gtdmlzdWFsLWRyYWcvc3JjLyIsInNvdXJjZXMiOlsibGliL3BhZ2VzL2VkaXRvci9jb250ZXh0LW1lbnUvY29udGV4dC1tZW51LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdEQUFnRCxDQUFDO0FBU3RGLE1BQU0sT0FBTyxvQkFBb0I7SUFVL0IsWUFBbUIsb0JBQTBDO1FBQTFDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7SUFBRyxDQUFDO0lBVGpFLElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7SUFDcEQsQ0FBQztJQUNELElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUM7SUFDbkQsQ0FBQztJQUNELElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7SUFDcEQsQ0FBQztJQUdELFFBQVEsS0FBVSxDQUFDO0lBRW5CLElBQUk7UUFDRixJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVELEtBQUs7UUFDSCxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxHQUFHO1FBQ0QsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFFRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDL0MsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzdDLENBQUM7SUFFRCxZQUFZO1FBQ1YsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUM1QyxJQUFJLENBQUMsb0JBQW9CLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDN0MsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsb0JBQW9CLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDeEMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzdDLENBQUM7SUFFRCxhQUFhO1FBQ1gsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQzFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUM3QyxDQUFDOzs7WUF2REYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxjQUFjO2dCQUN4Qix5MEJBQTRDO2dCQUU1QyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7YUFDdEM7OztZQVJRLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tcG9uZW50RGF0YVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2NvbXBvbmVudC9jb21wb25lbnQtZGF0YS5zZXJ2aWNlJztcbmltcG9ydCB7IGRlZXBDb3B5IH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvdXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjb250ZXh0LW1lbnUnLFxuICB0ZW1wbGF0ZVVybDogJy4vY29udGV4dC1tZW51LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY29udGV4dC1tZW51LmNvbXBvbmVudC5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIENvbnRleHRNZW51Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgZ2V0IG1lbnVTaG93KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmNvbXBvbmVudERhdGFTZXJ2aWNlLmNvbnRleHRtZW51LnNob3c7XG4gIH1cbiAgZ2V0IG1lbnVUb3AoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5jb21wb25lbnREYXRhU2VydmljZS5jb250ZXh0bWVudS50b3A7XG4gIH1cbiAgZ2V0IG1lbnVMZWZ0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuY29tcG9uZW50RGF0YVNlcnZpY2UuY29udGV4dG1lbnUubGVmdDtcbiAgfVxuICBjb25zdHJ1Y3RvcihwdWJsaWMgY29tcG9uZW50RGF0YVNlcnZpY2U6IENvbXBvbmVudERhdGFTZXJ2aWNlKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge31cblxuICBjb3B5KCkge1xuICAgIHRoaXMuY29tcG9uZW50RGF0YVNlcnZpY2UuY29weSgpO1xuICB9XG5cbiAgcGFzdGUoKSB7XG4gICAgdGhpcy5jb21wb25lbnREYXRhU2VydmljZS5wYXN0ZSh0cnVlKTtcbiAgfVxuXG4gIGN1dCgpIHtcbiAgICB0aGlzLmNvbXBvbmVudERhdGFTZXJ2aWNlLmN1dCgpO1xuICB9XG5cbiAgZGVsZXRlQ29tcG9uZW50KCkge1xuICAgIHRoaXMuY29tcG9uZW50RGF0YVNlcnZpY2UuZGVsZXRlQ3VyQ29tcG9uZW50KCk7XG4gICAgdGhpcy5jb21wb25lbnREYXRhU2VydmljZS5yZWNvcmRTbmFwc2hvdCgpO1xuICB9XG5cbiAgdG9wQ29tcG9uZW50KCkge1xuICAgIHRoaXMuY29tcG9uZW50RGF0YVNlcnZpY2UudG9wQ29tcG9uZW50KCk7XG4gICAgdGhpcy5jb21wb25lbnREYXRhU2VydmljZS5yZWNvcmRTbmFwc2hvdCgpO1xuICB9XG5cbiAgYm90dG9tQ29tcG9uZW50KCkge1xuICAgIHRoaXMuY29tcG9uZW50RGF0YVNlcnZpY2UuYm90dG9tQ29tcG9uZW50KCk7XG4gICAgdGhpcy5jb21wb25lbnREYXRhU2VydmljZS5yZWNvcmRTbmFwc2hvdCgpO1xuICB9XG5cbiAgdXBDb21wb25lbnQoKSB7XG4gICAgdGhpcy5jb21wb25lbnREYXRhU2VydmljZS51cENvbXBvbmVudCgpO1xuICAgIHRoaXMuY29tcG9uZW50RGF0YVNlcnZpY2UucmVjb3JkU25hcHNob3QoKTtcbiAgfVxuXG4gIGRvd25Db21wb25lbnQoKSB7XG4gICAgdGhpcy5jb21wb25lbnREYXRhU2VydmljZS5kb3duQ29tcG9uZW50KCk7XG4gICAgdGhpcy5jb21wb25lbnREYXRhU2VydmljZS5yZWNvcmRTbmFwc2hvdCgpO1xuICB9XG59XG4iXX0=