import { Component, ViewEncapsulation } from '@angular/core';
import { ComponentDataService } from '../../core/component/component-data.service';
import getStyle from '../../utils/style';
export class EditorComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi9wcm9qZWN0cy9uZ3gtdmlzdWFsLWRyYWcvc3JjLyIsInNvdXJjZXMiOlsibGliL3BhZ2VzL2VkaXRvci9lZGl0b3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFFbkYsT0FBTyxRQUFRLE1BQU0sbUJBQW1CLENBQUM7QUFRekMsTUFBTSxPQUFPLGVBQWU7SUFFMUIsWUFBbUIsb0JBQTBDO1FBQTFDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFEN0QsV0FBTSxHQUFZLEtBQUssQ0FBQztJQUN3QyxDQUFDO0lBRWpFLFFBQVEsS0FBVSxDQUFDO0lBRW5CLGlCQUFpQixDQUFDLENBQUM7UUFDakIsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNuQixnQkFBZ0I7UUFDaEIsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUN0QixJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQ3BCLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFDckIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzNDLElBQUksSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDO1lBQzFCLEdBQUcsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDO1lBQ3hCLE1BQU0sR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDO1NBQzVCO1FBQ0QsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsR0FBRztZQUN0QyxJQUFJLEVBQUUsSUFBSTtZQUNWLEdBQUc7WUFDSCxJQUFJO1NBQ0wsQ0FBQztJQUNKLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxLQUF5QjtRQUN6QyxPQUFPLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUN2RSxDQUFDOzs7WUFqQ0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxRQUFRO2dCQUNsQixraERBQXNDO2dCQUV0QyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7YUFDdEM7OztZQVRRLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tcG9uZW50RGF0YVNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL2NvbXBvbmVudC9jb21wb25lbnQtZGF0YS5zZXJ2aWNlJztcbmltcG9ydCB7IENvbXBvbmVudEJhc2VTdHlsZSB9IGZyb20gJy4uLy4uL3R5cGVzL2NvbXBvbmVudC10eXBlJztcbmltcG9ydCBnZXRTdHlsZSBmcm9tICcuLi8uLi91dGlscy9zdHlsZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2VkaXRvcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9lZGl0b3IuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9lZGl0b3IuY29tcG9uZW50LnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgRWRpdG9yQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgaXNFZGl0OiBib29sZWFuID0gZmFsc2U7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjb21wb25lbnREYXRhU2VydmljZTogQ29tcG9uZW50RGF0YVNlcnZpY2UpIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7fVxuXG4gIGhhbmRsZUNvbnRleHRNZW51KGUpIHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAvLyDorqHnrpfoj5zljZXnm7jlr7nkuo7nvJbovpHlmajnmoTkvY3np7tcbiAgICBsZXQgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgbGV0IHRvcCA9IGUub2Zmc2V0WTtcbiAgICBsZXQgbGVmdCA9IGUub2Zmc2V0WDtcbiAgICB3aGlsZSAoIXRhcmdldC5jbGFzc05hbWUuaW5jbHVkZXMoJ2VkaXRvcicpKSB7XG4gICAgICBsZWZ0ICs9IHRhcmdldC5vZmZzZXRMZWZ0O1xuICAgICAgdG9wICs9IHRhcmdldC5vZmZzZXRUb3A7XG4gICAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50Tm9kZTtcbiAgICB9XG4gICAgdGhpcy5jb21wb25lbnREYXRhU2VydmljZS5jb250ZXh0bWVudSA9IHtcbiAgICAgIHNob3c6IHRydWUsXG4gICAgICB0b3AsXG4gICAgICBsZWZ0LFxuICAgIH07XG4gIH1cblxuICBnZXRDb21wb25lbnRTdHlsZShzdHlsZTogQ29tcG9uZW50QmFzZVN0eWxlKSB7XG4gICAgcmV0dXJuIGdldFN0eWxlKHN0eWxlLCBbJ3RvcCcsICdsZWZ0JywgJ3dpZHRoJywgJ2hlaWdodCcsICdyb3RhdGUnXSk7XG4gIH1cbn1cbiJdfQ==