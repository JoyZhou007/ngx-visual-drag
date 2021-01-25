import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { ComponentDataService } from '../../../core/component/component-data.service';

@Component({
  selector: 'Preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PreviewComponent implements OnInit {
  @Input() isShowPreview: boolean = false;
  @Output() OutClose = new EventEmitter();
  constructor(public componentDataService: ComponentDataService) {}

  ngOnInit(): void {}

  close() {
    this.OutClose.emit();
  }
}
