import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ComponentDataService } from '../../core/component/component-data.service';

@Component({
  selector: 'editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditorComponent implements OnInit {
  isEdit: boolean = false;
  constructor(public componentDataService: ComponentDataService) { }

  ngOnInit(): void {
  }

  handleContextMenu(e) {
    e.stopPropagation()
    e.preventDefault()
    // 计算菜单相对于编辑器的位移
    let target = e.target;
    let top = e.offsetY;
    let left = e.offsetX;
    while (!target.className.includes('editor')) {
      left += target.offsetLeft;
      top += target.offsetTop;
      target = target.parentNode;
    }
    this.componentDataService.contextmenu = {
      show: true,
      top,
      left
    };
  }

}
