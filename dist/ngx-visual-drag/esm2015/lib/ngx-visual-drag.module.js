import { NgModule } from '@angular/core';
import { NgxVisualDragComponent } from './ngx-visual-drag.component';
import { HomeComponent } from './pages/home/home.component';
import { ToolbarComponent } from './pages/toolbar/toolbar.component';
import { SharedModule } from './shared/shared/shared.module';
import { ComponentListComponent } from './pages/component-list/component-list.component';
import { EditorComponent } from './pages/editor/editor.component';
import { ShapeComponent } from './pages/editor/shape/shape.component';
import { VButtonComponent } from './pages/custom-component/v-button/v-button.component';
import { ContextMenuComponent } from './pages/editor/context-menu/context-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MarklineComponent } from './pages/editor/markline/markline.component';
import { AttrListComponent } from './pages/attr-list/attr-list.component';
import { PreviewComponent } from './pages/editor/preview/preview.component';
import { ComponentWrapperComponent } from './pages/editor/component-wrapper/component-wrapper.component';
export class NgxVisualDragModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXZpc3VhbC1kcmFnLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi9wcm9qZWN0cy9uZ3gtdmlzdWFsLWRyYWcvc3JjLyIsInNvdXJjZXMiOlsibGliL25neC12aXN1YWwtZHJhZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNyRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDckUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzdELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBQ3pGLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNsRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDdEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFDeEYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFDMUYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDL0UsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDL0UsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDMUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDNUUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sOERBQThELENBQUM7QUFvQnpHLE1BQU0sT0FBTyxtQkFBbUI7OztZQWxCL0IsUUFBUSxTQUFDO2dCQUNSLFlBQVksRUFBRTtvQkFDWixzQkFBc0I7b0JBQ3RCLGFBQWE7b0JBQ2IsZ0JBQWdCO29CQUNoQixzQkFBc0I7b0JBQ3RCLGVBQWU7b0JBQ2YsY0FBYztvQkFDZCxnQkFBZ0I7b0JBQ2hCLG9CQUFvQjtvQkFDcEIsaUJBQWlCO29CQUNqQixpQkFBaUI7b0JBQ2pCLGdCQUFnQjtvQkFDaEIseUJBQXlCO2lCQUMxQjtnQkFDRCxPQUFPLEVBQUUsQ0FBQyx1QkFBdUIsRUFBRSxZQUFZLENBQUM7Z0JBQ2hELE9BQU8sRUFBRSxDQUFDLHNCQUFzQixDQUFDO2FBQ2xDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5neFZpc3VhbERyYWdDb21wb25lbnQgfSBmcm9tICcuL25neC12aXN1YWwtZHJhZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgSG9tZUNvbXBvbmVudCB9IGZyb20gJy4vcGFnZXMvaG9tZS9ob21lLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUb29sYmFyQ29tcG9uZW50IH0gZnJvbSAnLi9wYWdlcy90b29sYmFyL3Rvb2xiYXIuY29tcG9uZW50JztcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gJy4vc2hhcmVkL3NoYXJlZC9zaGFyZWQubW9kdWxlJztcbmltcG9ydCB7IENvbXBvbmVudExpc3RDb21wb25lbnQgfSBmcm9tICcuL3BhZ2VzL2NvbXBvbmVudC1saXN0L2NvbXBvbmVudC1saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBFZGl0b3JDb21wb25lbnQgfSBmcm9tICcuL3BhZ2VzL2VkaXRvci9lZGl0b3IuY29tcG9uZW50JztcbmltcG9ydCB7IFNoYXBlQ29tcG9uZW50IH0gZnJvbSAnLi9wYWdlcy9lZGl0b3Ivc2hhcGUvc2hhcGUuY29tcG9uZW50JztcbmltcG9ydCB7IFZCdXR0b25Db21wb25lbnQgfSBmcm9tICcuL3BhZ2VzL2N1c3RvbS1jb21wb25lbnQvdi1idXR0b24vdi1idXR0b24uY29tcG9uZW50JztcbmltcG9ydCB7IENvbnRleHRNZW51Q29tcG9uZW50IH0gZnJvbSAnLi9wYWdlcy9lZGl0b3IvY29udGV4dC1tZW51L2NvbnRleHQtbWVudS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgTWFya2xpbmVDb21wb25lbnQgfSBmcm9tICcuL3BhZ2VzL2VkaXRvci9tYXJrbGluZS9tYXJrbGluZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQXR0ckxpc3RDb21wb25lbnQgfSBmcm9tICcuL3BhZ2VzL2F0dHItbGlzdC9hdHRyLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IFByZXZpZXdDb21wb25lbnQgfSBmcm9tICcuL3BhZ2VzL2VkaXRvci9wcmV2aWV3L3ByZXZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7IENvbXBvbmVudFdyYXBwZXJDb21wb25lbnQgfSBmcm9tICcuL3BhZ2VzL2VkaXRvci9jb21wb25lbnQtd3JhcHBlci9jb21wb25lbnQtd3JhcHBlci5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOZ3hWaXN1YWxEcmFnQ29tcG9uZW50LFxuICAgIEhvbWVDb21wb25lbnQsXG4gICAgVG9vbGJhckNvbXBvbmVudCxcbiAgICBDb21wb25lbnRMaXN0Q29tcG9uZW50LFxuICAgIEVkaXRvckNvbXBvbmVudCxcbiAgICBTaGFwZUNvbXBvbmVudCxcbiAgICBWQnV0dG9uQ29tcG9uZW50LFxuICAgIENvbnRleHRNZW51Q29tcG9uZW50LFxuICAgIE1hcmtsaW5lQ29tcG9uZW50LFxuICAgIEF0dHJMaXN0Q29tcG9uZW50LFxuICAgIFByZXZpZXdDb21wb25lbnQsXG4gICAgQ29tcG9uZW50V3JhcHBlckNvbXBvbmVudCxcbiAgXSxcbiAgaW1wb3J0czogW0Jyb3dzZXJBbmltYXRpb25zTW9kdWxlLCBTaGFyZWRNb2R1bGVdLFxuICBleHBvcnRzOiBbTmd4VmlzdWFsRHJhZ0NvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIE5neFZpc3VhbERyYWdNb2R1bGUge31cbiJdfQ==