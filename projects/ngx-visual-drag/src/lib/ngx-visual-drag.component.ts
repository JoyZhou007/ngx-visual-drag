import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { ComponentDataService } from './core/component/component-data.service';
import { StorageData } from './types/component-type';

@Component({
  selector: 'lib-ngx-visual-drag',
  template: ` <lib-home [data]="data"></lib-home> `,
  styleUrls: ['./index.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NgxVisualDragComponent implements OnInit {
  @Input() data: StorageData;
  @Output() onDataSave = new EventEmitter<StorageData>();
  constructor(private componentDataService: ComponentDataService) {}

  ngOnInit(): void {
    this.componentDataService.$storageData.subscribe((x) => {
      this.onDataSave.emit(x);
    });
  }
}
