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

@NgModule({
  declarations: [
    NgxVisualDragComponent,
    HomeComponent,
    ToolbarComponent,
    ComponentListComponent,
    EditorComponent,
    ShapeComponent,
    VButtonComponent,
    ContextMenuComponent,
  ],
  imports: [BrowserAnimationsModule, SharedModule],
  exports: [NgxVisualDragComponent],
})
export class NgxVisualDragModule {}
