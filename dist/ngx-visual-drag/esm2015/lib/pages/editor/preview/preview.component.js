import { Component, EventEmitter, Input, Output, ViewEncapsulation, } from '@angular/core';
import { ComponentDataService } from '../../../core/component/component-data.service';
export class PreviewComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJldmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vcHJvamVjdHMvbmd4LXZpc3VhbC1kcmFnL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9wYWdlcy9lZGl0b3IvcHJldmlldy9wcmV2aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBRUwsTUFBTSxFQUNOLGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQVF0RixNQUFNLE9BQU8sZ0JBQWdCO0lBRzNCLFlBQW1CLG9CQUEwQztRQUExQyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBRnBELGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBQzlCLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBQ3dCLENBQUM7SUFFakUsUUFBUSxLQUFVLENBQUM7SUFFbkIsS0FBSztRQUNILElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdkIsQ0FBQzs7O1lBZkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxTQUFTO2dCQUNuQixzaEJBQXVDO2dCQUV2QyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7YUFDdEM7OztZQVBRLG9CQUFvQjs7OzRCQVMxQixLQUFLO3VCQUNMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21wb25lbnREYXRhU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvY29tcG9uZW50L2NvbXBvbmVudC1kYXRhLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdQcmV2aWV3JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3ByZXZpZXcuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9wcmV2aWV3LmNvbXBvbmVudC5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIFByZXZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBpc1Nob3dQcmV2aWV3OiBib29sZWFuID0gZmFsc2U7XG4gIEBPdXRwdXQoKSBPdXRDbG9zZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgY29uc3RydWN0b3IocHVibGljIGNvbXBvbmVudERhdGFTZXJ2aWNlOiBDb21wb25lbnREYXRhU2VydmljZSkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHt9XG5cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5PdXRDbG9zZS5lbWl0KCk7XG4gIH1cbn1cbiJdfQ==