import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subject } from 'rxjs';
import {
  canvasStyleData,
  ComponentDataStyleType,
  ComponentDataType,
} from '../../types/component-type';
import { deepCopy, swap } from '../../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class ComponentDataService {
  componentData: ComponentDataType[] = []; // 画布组件数据
  canvasStyleData: canvasStyleData = {
    width: 1200,
    height: 740,
  }; // 页面全局数据
  curComponent: ComponentDataType;
  curComponentIndex: number;
  shapeStyle: Subject<ComponentDataStyleType> = new Subject();
  contextmenu: {
    show: boolean;
    top: number;
    left: number;
  } = {
    show: false,
    top: 0,
    left: 0,
  }; // 右击菜单数据
  snapshotData: Array<ComponentDataType[]> = []; // 编辑器快照数据
  snapshotIndex: number = -1; // 快照索引
  constructor(private message: NzMessageService) {
    this.initData();
    this.shapeStyle.subscribe((x) => {
      if (x.top) this.curComponent.style.top = x.top;
      if (x.left) this.curComponent.style.left = x.left;
      if (x.width) this.curComponent.style.width = x.width;
      if (x.height) this.curComponent.style.height = x.height;
      if (x.rotate) this.curComponent.style.rotate = x.rotate;
    });
  }

  initData() {}

  deleteCurComponent() {
    this.componentData.splice(this.curComponentIndex, 1);
  }

  hideContextMenu() {
    this.contextmenu = {
      show: false,
      top: 0,
      left: 0,
    };
  }

  upComponent() {
    // 上移图层 index，表示元素在数组中越往后
    if (this.curComponentIndex < this.componentData.length - 1) {
      swap(
        this.componentData,
        this.curComponentIndex,
        this.curComponentIndex + 1
      );
    } else {
      this.message.warning('已经到顶了');
    }
  }

  recordSnapshot() {
    // 添加新的快照
    this.snapshotData[++this.snapshotIndex] = deepCopy(this.componentData);
    // 在 undo 过程中，添加新的快照时，要将它后面的快照清理掉
    if (this.snapshotIndex < this.snapshotData.length - 1) {
      this.snapshotData = this.snapshotData.slice(0, this.snapshotIndex + 1);
    }
  }

  undo() {
    if (this.snapshotIndex >= 0) {
      this.snapshotIndex--;
      this.componentData =
        deepCopy(this.snapshotData[this.snapshotIndex]) || [];
    }
  }

  redo() {
    if (this.snapshotIndex < this.snapshotData.length - 1) {
      this.snapshotIndex++;
      this.componentData =
        deepCopy(this.snapshotData[this.snapshotIndex]) || [];
    }
  }
}
