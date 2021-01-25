import { Component } from '@angular/core';
import list from './../../core/custom-component/component-list';
export class ComponentListComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uL3Byb2plY3RzL25neC12aXN1YWwtZHJhZy9zcmMvIiwic291cmNlcyI6WyJsaWIvcGFnZXMvY29tcG9uZW50LWxpc3QvY29tcG9uZW50LWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxJQUFJLE1BQU0sOENBQThDLENBQUM7QUFPaEUsTUFBTSxPQUFPLHNCQUFzQjtJQUVqQztRQURBLGtCQUFhLEdBQUcsSUFBSSxDQUFDO0lBQ0wsQ0FBQztJQUVqQixRQUFRO0lBQ1IsQ0FBQztJQUVELGVBQWUsQ0FBQyxDQUFDO1FBQ2YsQ0FBQyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFELENBQUM7OztZQWRGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixxVEFBOEM7O2FBRS9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCBsaXN0IGZyb20gJy4vLi4vLi4vY29yZS9jdXN0b20tY29tcG9uZW50L2NvbXBvbmVudC1saXN0JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY29tcG9uZW50LWxpc3QnLFxuICB0ZW1wbGF0ZVVybDogJy4vY29tcG9uZW50LWxpc3QuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jb21wb25lbnQtbGlzdC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIENvbXBvbmVudExpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBjb21wb25lbnRMaXN0ID0gbGlzdDtcbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgfVxuXG4gIGhhbmRsZURyYWdTdGFydChlKSB7XG4gICAgZS5kYXRhVHJhbnNmZXIuc2V0RGF0YSgnaW5kZXgnLCBlLnRhcmdldC5kYXRhc2V0LmluZGV4KTtcbiAgfVxuXG59XG5cblxuIl19