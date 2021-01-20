import { Component, OnInit } from '@angular/core';
import { ComponentDataService } from '../../../core/component/component-data.service';

@Component({
  selector: 'context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss'],
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

  copy() {}

  paste() {}

  cut() {}

  deleteComponent() {
    this.componentDataService.deleteCurComponent();
  }

  topComponent() {
    this.componentDataService.upComponent();
  }

  bottomComponent() {}

  upComponent() {}

  downComponent() {}
}
