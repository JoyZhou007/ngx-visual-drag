import { Component, ComponentFactoryResolver, Input, ViewChild, ViewContainerRef, ViewEncapsulation, } from '@angular/core';
import getStyle from '../../../utils/style';
export class ComponentWrapperComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LXdyYXBwZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uL3Byb2plY3RzL25neC12aXN1YWwtZHJhZy9zcmMvIiwic291cmNlcyI6WyJsaWIvcGFnZXMvZWRpdG9yL2NvbXBvbmVudC13cmFwcGVyL2NvbXBvbmVudC13cmFwcGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULHdCQUF3QixFQUN4QixLQUFLLEVBSUwsU0FBUyxFQUNULGdCQUFnQixFQUNoQixpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFNdkIsT0FBTyxRQUFRLE1BQU0sc0JBQXNCLENBQUM7QUFTNUMsTUFBTSxPQUFPLHlCQUF5QjtJQUlwQyxZQUFvQix3QkFBa0Q7UUFBbEQsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtJQUFHLENBQUM7SUFFMUUsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksT0FBTyxDQUFDLE1BQU0sSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRTtZQUNqRCx1QkFBdUI7U0FDeEI7SUFDSCxDQUFDO0lBRUQsWUFBWTtRQUNWLGlCQUFpQjtRQUNqQixtQ0FBbUM7UUFDbkMscUJBQXFCO1FBQ3JCLG9DQUFvQztRQUNwQyxhQUFhO1FBQ2IsYUFBYTtRQUNiLGFBQWE7UUFDYixJQUFJO1FBQ0osa0ZBQWtGO1FBQ2xGLGNBQWM7UUFDZCxLQUFLO1FBQ0wsK0NBQStDO1FBQy9DLDJFQUEyRTtRQUMzRSwwQkFBMEI7UUFDMUIsMEJBQTBCO1FBQzFCLHdDQUF3QztRQUN4QywyRUFBMkU7UUFDM0UsWUFBWTtJQUNkLENBQUM7SUFFRCxRQUFRLEtBQVUsQ0FBQztJQUVuQixXQUFXLEtBQUksQ0FBQztJQUVoQixpQkFBaUIsQ0FBQyxLQUF5QjtRQUN6QyxPQUFPLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6QixDQUFDOzs7WUE3Q0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLDJqQkFBaUQ7Z0JBRWpELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOzthQUN0Qzs7O1lBdEJDLHdCQUF3Qjs7O3FCQXdCdkIsS0FBSzs0QkFDTCxTQUFTLFNBQUMsZUFBZSxFQUFFLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25Jbml0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENvbXBvbmVudEJhc2VEYXRhLFxuICBDb21wb25lbnRCYXNlU3R5bGUsXG4gIENvbXBvbmVudEJhc2ljSW5wdXQsXG59IGZyb20gJy4uLy4uLy4uL3R5cGVzL2NvbXBvbmVudC10eXBlJztcbmltcG9ydCBnZXRTdHlsZSBmcm9tICcuLi8uLi8uLi91dGlscy9zdHlsZSc7XG5pbXBvcnQgeyBWQnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vY3VzdG9tLWNvbXBvbmVudC92LWJ1dHRvbi92LWJ1dHRvbi5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdDb21wb25lbnQtd3JhcHBlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9jb21wb25lbnQtd3JhcHBlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2NvbXBvbmVudC13cmFwcGVyLmNvbXBvbmVudC5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIENvbXBvbmVudFdyYXBwZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGNvbmZpZzogQ29tcG9uZW50QmFzZURhdGE7XG4gIEBWaWV3Q2hpbGQoJ3ZpZXdDb250YWluZXInLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogdHJ1ZSB9KVxuICB2aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKSB7fVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlcy5jb25maWcgJiYgY2hhbmdlcy5jb25maWcuY3VycmVudFZhbHVlKSB7XG4gICAgICAvLyB0aGlzLmFkZENvbXBvbmVudCgpO1xuICAgIH1cbiAgfVxuXG4gIGFkZENvbXBvbmVudCgpIHtcbiAgICAvLyBsZXQgY2luc3RhbmNlO1xuICAgIC8vIHN3aXRjaCAodGhpcy5jb25maWcuY29tcG9uZW50KSB7XG4gICAgLy8gICBjYXNlICd2LWJ1dHRvbic6XG4gICAgLy8gICAgIGNpbnN0YW5jZSA9IFZCdXR0b25Db21wb25lbnQ7XG4gICAgLy8gICAgIGJyZWFrO1xuICAgIC8vICAgZGVmYXVsdDpcbiAgICAvLyAgICAgYnJlYWs7XG4gICAgLy8gfVxuICAgIC8vIGNvbnN0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShcbiAgICAvLyAgIGNpbnN0YW5jZVxuICAgIC8vICk7XG4gICAgLy8gY29uc3Qgdmlld0NvbnRhaW5lclJlZiA9IHRoaXMudmlld0NvbnRhaW5lcjtcbiAgICAvLyBjb25zdCBjb21wb25lbnRSZWYgPSB2aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcbiAgICAvLyAoPENvbXBvbmVudEJhc2ljSW5wdXQ+KFxuICAgIC8vICAgY29tcG9uZW50UmVmLmluc3RhbmNlXG4gICAgLy8gKSkucHJvcFZhbHVlID0gdGhpcy5jb25maWcucHJvcFZhbHVlO1xuICAgIC8vICg8Q29tcG9uZW50QmFzaWNJbnB1dD5jb21wb25lbnRSZWYuaW5zdGFuY2UpLnZTdHlsZSA9IHRoaXMuY29uZmlnLnN0eWxlO1xuICAgIC8vIGRlYnVnZ2VyO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7fVxuXG4gIGhhbmRsZUNsaWNrKCkge31cblxuICBnZXRDb21wb25lbnRTdHlsZShzdHlsZTogQ29tcG9uZW50QmFzZVN0eWxlKSB7XG4gICAgcmV0dXJuIGdldFN0eWxlKHN0eWxlKTtcbiAgfVxufVxuIl19