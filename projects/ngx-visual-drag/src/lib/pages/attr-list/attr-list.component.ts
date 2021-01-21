import { Component, OnInit } from '@angular/core';
import { ComponentDataService } from '../../core/component/component-data.service';

@Component({
  selector: 'Attr-list',
  templateUrl: './attr-list.component.html',
  styleUrls: ['./attr-list.component.scss'],
})
export class AttrListComponent implements OnInit {
  map = {
    left: 'x 坐标',
    top: 'y 坐标',
    height: '高',
    width: '宽',
    color: '颜色',
    backgroundColor: '背景色',
    borderWidth: '边框宽度',
    borderColor: '边框颜色',
    borderRadius: '边框半径',
    fontSize: '字体大小',
    fontWeight: '字体粗细',
    lineHeight: '行高',
    letterSpacing: '字间距',
    textAlign: '对齐方式',
    opacity: '透明度',
  };
  excludes = ['Picture']; // 这些组件不显示内容
  options = [
    {
      label: '左对齐',
      value: 'left',
    },
    {
      label: '居中',
      value: 'center',
    },
    {
      label: '右对齐',
      value: 'right',
    },
  ];

  get styleKeys(): string[] {
    return this.componentDataService.curComponent
      ? Object.keys(this.componentDataService.curComponent.style).filter(
          (item) => item != 'rotate'
        )
      : [];
  }
  constructor(public componentDataService: ComponentDataService) {}

  ngOnInit(): void {}
}
