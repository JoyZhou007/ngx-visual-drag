import { stringify } from '@angular/compiler/src/util';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ComponentDataService } from '../../../core/component/component-data.service';
import {
  ComponentBaseStyle,
  ComponentBaseData,
} from '../../../types/component-type';
import calculateComponentPositonAndSize from '../../../utils/calculateComponentPositonAndSize';

@Component({
  selector: 'shape',
  templateUrl: './shape.component.html',
  styleUrls: ['./shape.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ShapeComponent implements OnInit {
  @Input() active: boolean = false;
  @Input() element: ComponentBaseData;
  @Input() defaultStyle: ComponentBaseStyle;
  @Input() index: number;
  cursors = {};
  pointList: string[] = ['lt', 't', 'rt', 'r', 'rb', 'b', 'lb', 'l']; // 八个方向
  initialAngle = {
    // 每个点对应的初始角度
    lt: 0,
    t: 45,
    rt: 90,
    r: 135,
    rb: 180,
    b: 225,
    lb: 270,
    l: 315,
  };
  angleToCursor = [
    // 每个范围的角度对应的光标
    { start: 338, end: 23, cursor: 'nw' },
    { start: 23, end: 68, cursor: 'n' },
    { start: 68, end: 113, cursor: 'ne' },
    { start: 113, end: 158, cursor: 'e' },
    { start: 158, end: 203, cursor: 'se' },
    { start: 203, end: 248, cursor: 's' },
    { start: 248, end: 293, cursor: 'sw' },
    { start: 293, end: 338, cursor: 'w' },
  ];
  constructor(public componentDataService: ComponentDataService) {}

  ngOnInit(): void {}

  getShapeStyle(style: ComponentBaseStyle) {
    const result = { ...style };
    if (result.width) {
      result.width += 'px';
    }

    if (result.height) {
      result.height += 'px';
    }

    if (result.top) {
      result.top += 'px';
    }

    if (result.left) {
      result.left += 'px';
    }

    if (result.rotate) {
      result['transform'] = 'rotate(' + result.rotate + 'deg)';
    }

    return result;
  }

  handleMouseDownOnShape(e) {
    if (this.element.component != 'v-text') {
      e.preventDefault();
    }

    e.stopPropagation();
    this.componentDataService.curComponent = this.element;
    this.componentDataService.curComponentIndex = this.index;
    this.cursors = this.getCursor(); // 根据旋转角度获取光标位置
    const pos = { ...this.defaultStyle };
    const startY = e.clientY;
    const startX = e.clientX;
    // 如果直接修改属性，值的类型会变为字符串，所以要转为数值型
    const startTop = Number(pos.top);
    const startLeft = Number(pos.left);

    // 如果元素没有移动，则不保存快照
    let hasMove = false;
    const move = (moveEvent) => {
      hasMove = true;
      const curX = moveEvent.clientX;
      const curY = moveEvent.clientY;
      pos.top = curY - startY + startTop;
      pos.left = curX - startX + startLeft;

      // 修改当前组件样式
      this.componentDataService.$shapeStyle.next(pos);
      // 等更新完当前组件的样式并绘制到屏幕后再判断是否需要吸附
      // 如果不使用 $nextTick，吸附后将无法移动
      // this.$nextTick(() => {
      //   // 触发元素移动事件，用于显示标线、吸附功能
      //   // 后面两个参数代表鼠标移动方向
      //   // curY - startY > 0 true 表示向下移动 false 表示向上移动
      //   // curX - startX > 0 true 表示向右移动 false 表示向左移动
      //   eventBus.$emit('move', curY - startY > 0, curX - startX > 0);
      // })
      this.componentDataService.notification.next({
        event: 'move',
        value: [curY - startY > 0, curX - startX > 0],
      });
    };

    const up = () => {
      hasMove && this.componentDataService.recordSnapshot();
      // 触发元素停止移动事件，用于隐藏标线
      // eventBus.$emit('unmove')
      this.componentDataService.notification.next({
        event: 'unmove',
      });
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
    };

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  }

  selectCurComponent(e) {
    e.stopPropagation();
    e.preventDefault();
    this.componentDataService.hideContextMenu();
  }

  handleRotate() {}

  handleMouseDownOnPoint(point: string, e) {
    const downEvent = window.event;
    downEvent.stopPropagation();
    downEvent.preventDefault();

    const style = { ...this.defaultStyle };
    const center = {
      x: style.left + style.width / 2,
      y: style.top + style.height / 2,
    };

    // 获取画布位移信息
    const editorRectInfo = document
      .querySelector('#editor')
      .getBoundingClientRect();

    // 当前点击坐标
    const curPoint = {
      x: e.clientX - editorRectInfo.left,
      y: e.clientY - editorRectInfo.top,
    };

    // 获取对称点的坐标
    const symmetricPoint = {
      x: center.x - (curPoint.x - center.x),
      y: center.y - (curPoint.y - center.y),
    };

    // 是否需要保存快照
    let needSave = false;
    let isFirst = true;
    const move = (moveEvent) => {
      // 第一次点击时也会触发 move，所以会有“刚点击组件但未移动，组件的大小却改变了”的情况发生
      // 因此第一次点击时不触发 move 事件
      if (isFirst) {
        isFirst = false;
        return;
      }

      needSave = true;
      const curPositon = {
        x: moveEvent.clientX - editorRectInfo.left,
        y: moveEvent.clientY - editorRectInfo.top,
      };

      calculateComponentPositonAndSize(point, style, curPositon, {
        center,
        curPoint,
        symmetricPoint,
      });

      this.componentDataService.$shapeStyle.next(style);
    };

    const up = () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
      needSave && this.componentDataService.recordSnapshot();
    };

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  }

  getPointStyle(
    point: string
  ): {
    marginLeft: string;
    marginTop: string;
    left: string;
    top: string;
    cursor: string;
  } {
    const { width, height } = this.defaultStyle;
    const hasT = /t/.test(point);
    const hasB = /b/.test(point);
    const hasL = /l/.test(point);
    const hasR = /r/.test(point);
    let newLeft = 0;
    let newTop = 0;

    // 四个角的点
    if (point.length === 2) {
      newLeft = hasL ? 0 : width;
      newTop = hasT ? 0 : height;
    } else {
      // 上下两点的点，宽度居中
      if (hasT || hasB) {
        newLeft = width / 2;
        newTop = hasT ? 0 : height;
      }

      // 左右两边的点，高度居中
      if (hasL || hasR) {
        newLeft = hasL ? 0 : width;
        newTop = Math.floor(height / 2);
      }
    }

    const style = {
      marginLeft: hasR ? '-4px' : '-4px',
      marginTop: '-4px',
      left: `${newLeft}px`,
      top: `${newTop}px`,
      cursor: this.cursors[point],
    };

    return style;
  }

  getCursor() {
    const { angleToCursor, initialAngle, pointList } = this;
    const curComponent = this.componentDataService.curComponent;
    const rotate = (curComponent.style.rotate + 360) % 360; // 防止角度有负数，所以 + 360
    const result = {};
    let lastMatchIndex = -1; // 从上一个命中的角度的索引开始匹配下一个，降低时间复杂度
    pointList.forEach((point) => {
      const angle = (initialAngle[point] + rotate) % 360;
      const len = angleToCursor.length;
      while (true) {
        lastMatchIndex = (lastMatchIndex + 1) % len;
        const angleLimit = angleToCursor[lastMatchIndex];
        if (angle < 23 || angle >= 338) {
          result[point] = 'nw-resize';
          return;
        }

        if (angleLimit.start <= angle && angle < angleLimit.end) {
          result[point] = angleLimit.cursor + '-resize';
          return;
        }
      }
    });

    return result;
  }
}
