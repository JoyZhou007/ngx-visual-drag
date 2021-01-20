import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxVisualDragModule } from 'projects/ngx-visual-drag/src/public-api';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxVisualDragModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
