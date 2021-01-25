import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ComponentDataService } from '../../core/component/component-data.service';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ToolbarComponent implements OnInit {
  isShowPreview: boolean = false;
  constructor(
    public componentDataService: ComponentDataService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {}

  redo() {
    this.componentDataService.redo();
  }

  undo() {
    this.componentDataService.undo();
  }

  save() {
    this.componentDataService.save();
  }

  clearCanvas() {
    this.componentDataService.clearCanvas();
  }

  preview() {
    this.isShowPreview = true;
    this.componentDataService.setEditMode('read');
  }

  closePreview() {
    this.isShowPreview = false;
  }
}
