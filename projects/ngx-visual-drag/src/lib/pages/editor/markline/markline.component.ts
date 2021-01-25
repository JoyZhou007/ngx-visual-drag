import {
  AfterContentInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import { ComponentDataService } from '../../../core/component/component-data.service';
import { cos, sin } from '../../../utils/translate';

@Component({
  selector: 'Markline',
  templateUrl: './markline.component.html',
  styleUrls: ['./markline.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MarklineComponent implements OnInit, AfterContentInit {
  lines = ['xt', 'xc', 'xb', 'yl', 'yc', 'yr']; // 分别对应三条横线和三条竖线
  diff = 3; // 相距 dff 像素将自动吸附
  lineStatus = {
    xt: false,
    xc: false,
    xb: false,
    yl: false,
    yc: false,
    yr: false,
  };
  @ViewChildren('lines') $refs: QueryList<any>;
  constructor(public componentDataService: ComponentDataService) {}

  ngAfterContentInit(): void {}

  ngOnInit(): void {
    this.componentDataService.notification.subscribe((x) => {
      if (x.event === 'move') {
        this.showLine(x.value[0], x.value[1]);
      }
      if (x.event === 'unmove') {
        this.hideLine();
      }
    });
  }

  showLine(isDownward, isRightward) {
    const lines = Array.from(document.querySelectorAll('.line'));
    const findnode = (type) => {
      return lines.find((x) => x['dataset'].index === type);
    };
    const components = this.componentDataService.componentData;
    const curComponentStyle = this.translateComponentStyle(
      this.componentDataService.curComponent.style
    );
    const curComponentHalfwidth = curComponentStyle.width / 2;
    const curComponentHalfHeight = curComponentStyle.height / 2;
    this.hideLine();
    components.forEach((component) => {
      if (component == this.componentDataService.curComponent) return;
      const componentStyle = this.translateComponentStyle(component.style);
      const { top, left, bottom, right } = componentStyle;
      const componentHalfwidth = componentStyle.width / 2;
      const componentHalfHeight = componentStyle.height / 2;
      const conditions = {
        top: [
          {
            isNearly: this.isNearly(curComponentStyle.top, top),
            lineNode: findnode('xt'), // xt
            line: 'xt',
            dragShift: top,
            lineShift: top,
          },
          {
            isNearly: this.isNearly(curComponentStyle.bottom, top),
            lineNode: findnode('xt'), // xt
            line: 'xt',
            dragShift: top - curComponentStyle.height,
            lineShift: top,
          },
          {
            // 组件与拖拽节点的中间是否对齐
            isNearly: this.isNearly(
              curComponentStyle.top + curComponentHalfHeight,
              top + componentHalfHeight
            ),
            lineNode: findnode('xc'), // xc
            line: 'xc',
            dragShift: top + componentHalfHeight - curComponentHalfHeight,
            lineShift: top + componentHalfHeight,
          },
          {
            isNearly: this.isNearly(curComponentStyle.top, bottom),
            lineNode: findnode('xb'), // xb
            line: 'xb',
            dragShift: bottom,
            lineShift: bottom,
          },
          {
            isNearly: this.isNearly(curComponentStyle.bottom, bottom),
            lineNode: findnode('xb'), // xb
            line: 'xb',
            dragShift: bottom - curComponentStyle.height,
            lineShift: bottom,
          },
        ],
        left: [
          {
            isNearly: this.isNearly(curComponentStyle.left, left),
            lineNode: findnode('yl'), // yl
            line: 'yl',
            dragShift: left,
            lineShift: left,
          },
          {
            isNearly: this.isNearly(curComponentStyle.right, left),
            lineNode: findnode('yl'), // yl
            line: 'yl',
            dragShift: left - curComponentStyle.width,
            lineShift: left,
          },
          {
            // 组件与拖拽节点的中间是否对齐
            isNearly: this.isNearly(
              curComponentStyle.left + curComponentHalfwidth,
              left + componentHalfwidth
            ),
            lineNode: findnode('yc'), // yc
            line: 'yc',
            dragShift: left + componentHalfwidth - curComponentHalfwidth,
            lineShift: left + componentHalfwidth,
          },
          {
            isNearly: this.isNearly(curComponentStyle.left, right),
            lineNode: findnode('yr'), // yr
            line: 'yr',
            dragShift: right,
            lineShift: right,
          },
          {
            isNearly: this.isNearly(curComponentStyle.right, right),
            lineNode: findnode('yr'), // yr
            line: 'yr',
            dragShift: right - curComponentStyle.width,
            lineShift: right,
          },
        ],
      };
      const needToShow = [];
      const { rotate } = this.componentDataService.curComponent.style;
      Object.keys(conditions).forEach((key) => {
        // 遍历符合的条件并处理
        conditions[key].forEach((condition) => {
          if (!condition.isNearly) return;
          // 修改当前组件位移
          this.componentDataService.setShapePosStyle({
            key,
            value:
              rotate != 0
                ? this.translatecurComponentShift(
                    key,
                    condition,
                    curComponentStyle
                  )
                : condition.dragShift,
          });

          condition.lineNode.style[key] = `${condition.lineShift}px`;
          needToShow.push(condition.line);
        });
      });

      // 同一方向上同时显示三条线可能不太美观，因此才有了这个解决方案
      // 同一方向上的线只显示一条，例如多条横条只显示一条横线
      if (needToShow.length) {
        this.chooseTheTureLine(needToShow, isDownward, isRightward);
      }
    });
  }

  translateComponentStyle(style) {
    style = { ...style };
    if (style.rotate != 0) {
      const newWidth =
        style.width * cos(style.rotate) + style.height * sin(style.rotate);
      const diffX = (style.width - newWidth) / 2;
      style.left += diffX;
      style.right = style.left + newWidth;

      const newHeight =
        style.height * cos(style.rotate) + style.width * sin(style.rotate);
      const diffY = (newHeight - style.height) / 2;
      style.top -= diffY;
      style.bottom = style.top + newHeight;

      style.width = newWidth;
      style.height = newHeight;
    } else {
      style.bottom = style.top + style.height;
      style.right = style.left + style.width;
    }

    return style;
  }

  hideLine() {
    Object.keys(this.lineStatus).forEach((line) => {
      this.lineStatus[line] = false;
    });
  }

  isNearly(dragValue, targetValue) {
    return Math.abs(dragValue - targetValue) <= this.diff;
  }

  translatecurComponentShift(key, condition, curComponentStyle) {
    const { width, height } = this.componentDataService.curComponent.style;
    if (key == 'top') {
      return Math.round(
        condition.dragShift - (height - curComponentStyle.height) / 2
      );
    }

    return Math.round(
      condition.dragShift - (width - curComponentStyle.width) / 2
    );
  }

  chooseTheTureLine(needToShow, isDownward, isRightward) {
    // 如果鼠标向右移动 则按从右到左的顺序显示竖线 否则按相反顺序显示
    // 如果鼠标向下移动 则按从下到上的顺序显示横线 否则按相反顺序显示
    if (isRightward) {
      if (needToShow.includes('yr')) {
        this.lineStatus.yr = true;
      } else if (needToShow.includes('yc')) {
        this.lineStatus.yc = true;
      } else if (needToShow.includes('yl')) {
        this.lineStatus.yl = true;
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (needToShow.includes('yl')) {
        this.lineStatus.yl = true;
      } else if (needToShow.includes('yc')) {
        this.lineStatus.yc = true;
      } else if (needToShow.includes('yr')) {
        this.lineStatus.yr = true;
      }
    }

    if (isDownward) {
      if (needToShow.includes('xb')) {
        this.lineStatus.xb = true;
      } else if (needToShow.includes('xc')) {
        this.lineStatus.xc = true;
      } else if (needToShow.includes('xt')) {
        this.lineStatus.xt = true;
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (needToShow.includes('xt')) {
        this.lineStatus.xt = true;
      } else if (needToShow.includes('xc')) {
        this.lineStatus.xc = true;
      } else if (needToShow.includes('xb')) {
        this.lineStatus.xb = true;
      }
    }
  }
}
