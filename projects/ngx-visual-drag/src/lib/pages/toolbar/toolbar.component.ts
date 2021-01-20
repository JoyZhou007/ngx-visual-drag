import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ComponentDataService } from '../../core/component/component-data.service';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ToolbarComponent implements OnInit {
  constructor(public componentDataService: ComponentDataService) {}

  ngOnInit(): void {}

  redo() {
    this.componentDataService.redo();
  }

  undo() {
    this.componentDataService.undo();
  }
}
