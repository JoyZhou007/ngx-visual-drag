import { Component } from '@angular/core';
import { StorageData } from 'projects/ngx-visual-drag/src/lib/types/component-type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'visual-drag-demo';
  data: StorageData = {
    canvasData: null,
    canvasStyle: null,
  };
  constructor() {
    if (localStorage.getItem('canvasData')) {
      this.data.canvasData = JSON.parse(localStorage.getItem('canvasData'));
    }

    if (localStorage.getItem('canvasStyle')) {
      this.data.canvasStyle = JSON.parse(localStorage.getItem('canvasStyle'));
    }
  }

  onDataSave(data: StorageData) {
    console.log(data);
  }
}
