import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ComponentDataService } from '../../core/component/component-data.service';
import componentList from '../../core/custom-component/component-list';
import { StorageData } from '../../types/component-type';
import generateID from '../../utils/generateID';
import { deepCopy } from '../../utils/utils';

@Component({
  selector: 'lib-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  @Input() data: StorageData;
  constructor(public componentDataService: ComponentDataService) {}

  ngOnInit(): void {
    this.componentDataService.restore(this.data);
  }

  handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    const component = deepCopy(componentList[e.dataTransfer.getData('index')]);
    component.style.top = e.offsetY;
    component.style.left = e.offsetX;
    component.id = generateID();
    this.componentDataService.componentData.push(component);
    this.componentDataService.recordSnapshot();
  }

  handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }

  deselectCurComponent() {
    this.componentDataService.curComponent = null;
    this.componentDataService.curComponentIndex = null;
    this.componentDataService.hideContextMenu();
  }
}
