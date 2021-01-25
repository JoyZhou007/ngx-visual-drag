import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ComponentDataService } from '../../../core/component/component-data.service';
import { deepCopy } from '../../../utils/utils';

@Component({
  selector: 'context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ContextMenuComponent implements OnInit {
  get menuShow(): boolean {
    return this.componentDataService.contextmenu.show;
  }
  get menuTop(): number {
    return this.componentDataService.contextmenu.top;
  }
  get menuLeft(): number {
    return this.componentDataService.contextmenu.left;
  }
  constructor(public componentDataService: ComponentDataService) {}

  ngOnInit(): void {}

  copy() {
    this.componentDataService.copy();
  }

  paste() {
    this.componentDataService.paste(true);
  }

  cut() {
    this.componentDataService.cut();
  }

  deleteComponent() {
    this.componentDataService.deleteCurComponent();
    this.componentDataService.recordSnapshot();
  }

  topComponent() {
    this.componentDataService.topComponent();
    this.componentDataService.recordSnapshot();
  }

  bottomComponent() {
    this.componentDataService.bottomComponent();
    this.componentDataService.recordSnapshot();
  }

  upComponent() {
    this.componentDataService.upComponent();
    this.componentDataService.recordSnapshot();
  }

  downComponent() {
    this.componentDataService.downComponent();
    this.componentDataService.recordSnapshot();
  }
}
