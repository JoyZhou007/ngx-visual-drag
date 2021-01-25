import { Component, ViewChildren, ViewEncapsulation, } from '@angular/core';
import { ComponentDataService } from '../../../core/component/component-data.service';
import { cos, sin } from '../../../utils/translate';
export class MarklineComponent {
    constructor(componentDataService) {
        this.componentDataService = componentDataService;
        this.lines = ['xt', 'xc', 'xb', 'yl', 'yc', 'yr']; // 分别对应三条横线和三条竖线
        this.diff = 3; // 相距 dff 像素将自动吸附
        this.lineStatus = {
            xt: false,
            xc: false,
            xb: false,
            yl: false,
            yc: false,
            yr: false,
        };
    }
    ngAfterContentInit() { }
    ngOnInit() {
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
        const curComponentStyle = this.translateComponentStyle(this.componentDataService.curComponent.style);
        const curComponentHalfwidth = curComponentStyle.width / 2;
        const curComponentHalfHeight = curComponentStyle.height / 2;
        this.hideLine();
        components.forEach((component) => {
            if (component == this.componentDataService.curComponent)
                return;
            const componentStyle = this.translateComponentStyle(component.style);
            const { top, left, bottom, right } = componentStyle;
            const componentHalfwidth = componentStyle.width / 2;
            const componentHalfHeight = componentStyle.height / 2;
            const conditions = {
                top: [
                    {
                        isNearly: this.isNearly(curComponentStyle.top, top),
                        lineNode: findnode('xt'),
                        line: 'xt',
                        dragShift: top,
                        lineShift: top,
                    },
                    {
                        isNearly: this.isNearly(curComponentStyle.bottom, top),
                        lineNode: findnode('xt'),
                        line: 'xt',
                        dragShift: top - curComponentStyle.height,
                        lineShift: top,
                    },
                    {
                        // 组件与拖拽节点的中间是否对齐
                        isNearly: this.isNearly(curComponentStyle.top + curComponentHalfHeight, top + componentHalfHeight),
                        lineNode: findnode('xc'),
                        line: 'xc',
                        dragShift: top + componentHalfHeight - curComponentHalfHeight,
                        lineShift: top + componentHalfHeight,
                    },
                    {
                        isNearly: this.isNearly(curComponentStyle.top, bottom),
                        lineNode: findnode('xb'),
                        line: 'xb',
                        dragShift: bottom,
                        lineShift: bottom,
                    },
                    {
                        isNearly: this.isNearly(curComponentStyle.bottom, bottom),
                        lineNode: findnode('xb'),
                        line: 'xb',
                        dragShift: bottom - curComponentStyle.height,
                        lineShift: bottom,
                    },
                ],
                left: [
                    {
                        isNearly: this.isNearly(curComponentStyle.left, left),
                        lineNode: findnode('yl'),
                        line: 'yl',
                        dragShift: left,
                        lineShift: left,
                    },
                    {
                        isNearly: this.isNearly(curComponentStyle.right, left),
                        lineNode: findnode('yl'),
                        line: 'yl',
                        dragShift: left - curComponentStyle.width,
                        lineShift: left,
                    },
                    {
                        // 组件与拖拽节点的中间是否对齐
                        isNearly: this.isNearly(curComponentStyle.left + curComponentHalfwidth, left + componentHalfwidth),
                        lineNode: findnode('yc'),
                        line: 'yc',
                        dragShift: left + componentHalfwidth - curComponentHalfwidth,
                        lineShift: left + componentHalfwidth,
                    },
                    {
                        isNearly: this.isNearly(curComponentStyle.left, right),
                        lineNode: findnode('yr'),
                        line: 'yr',
                        dragShift: right,
                        lineShift: right,
                    },
                    {
                        isNearly: this.isNearly(curComponentStyle.right, right),
                        lineNode: findnode('yr'),
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
                    if (!condition.isNearly)
                        return;
                    // 修改当前组件位移
                    this.componentDataService.setShapePosStyle({
                        key,
                        value: rotate != 0
                            ? this.translatecurComponentShift(key, condition, curComponentStyle)
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
        style = Object.assign({}, style);
        if (style.rotate != 0) {
            const newWidth = style.width * cos(style.rotate) + style.height * sin(style.rotate);
            const diffX = (style.width - newWidth) / 2;
            style.left += diffX;
            style.right = style.left + newWidth;
            const newHeight = style.height * cos(style.rotate) + style.width * sin(style.rotate);
            const diffY = (newHeight - style.height) / 2;
            style.top -= diffY;
            style.bottom = style.top + newHeight;
            style.width = newWidth;
            style.height = newHeight;
        }
        else {
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
            return Math.round(condition.dragShift - (height - curComponentStyle.height) / 2);
        }
        return Math.round(condition.dragShift - (width - curComponentStyle.width) / 2);
    }
    chooseTheTureLine(needToShow, isDownward, isRightward) {
        // 如果鼠标向右移动 则按从右到左的顺序显示竖线 否则按相反顺序显示
        // 如果鼠标向下移动 则按从下到上的顺序显示横线 否则按相反顺序显示
        if (isRightward) {
            if (needToShow.includes('yr')) {
                this.lineStatus.yr = true;
            }
            else if (needToShow.includes('yc')) {
                this.lineStatus.yc = true;
            }
            else if (needToShow.includes('yl')) {
                this.lineStatus.yl = true;
            }
        }
        else {
            // eslint-disable-next-line no-lonely-if
            if (needToShow.includes('yl')) {
                this.lineStatus.yl = true;
            }
            else if (needToShow.includes('yc')) {
                this.lineStatus.yc = true;
            }
            else if (needToShow.includes('yr')) {
                this.lineStatus.yr = true;
            }
        }
        if (isDownward) {
            if (needToShow.includes('xb')) {
                this.lineStatus.xb = true;
            }
            else if (needToShow.includes('xc')) {
                this.lineStatus.xc = true;
            }
            else if (needToShow.includes('xt')) {
                this.lineStatus.xt = true;
            }
        }
        else {
            // eslint-disable-next-line no-lonely-if
            if (needToShow.includes('xt')) {
                this.lineStatus.xt = true;
            }
            else if (needToShow.includes('xc')) {
                this.lineStatus.xc = true;
            }
            else if (needToShow.includes('xb')) {
                this.lineStatus.xb = true;
            }
        }
    }
}
MarklineComponent.decorators = [
    { type: Component, args: [{
                selector: 'Markline',
                template: "<div class=\"mark-line\">\n    <ng-container *ngFor=\"let line of lines\">\n        <div class=\"line \" #lines [ngClass]=\"{\n             'xline': line.includes('x'),\n             'yline': line.includes('y')\n        }\" [attr.data-index]=\"line\" [hidden]=\"!lineStatus[line]\"></div>\n    </ng-container>\n\n</div>",
                encapsulation: ViewEncapsulation.None,
                styles: [".mark-line{height:100%}.line{background:#59c7f9;position:absolute;z-index:1000}.xline{height:1px;width:100%}.yline{height:100%;width:1px}"]
            },] }
];
MarklineComponent.ctorParameters = () => [
    { type: ComponentDataService }
];
MarklineComponent.propDecorators = {
    $refs: [{ type: ViewChildren, args: ['lines',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2xpbmUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uL3Byb2plY3RzL25neC12aXN1YWwtZHJhZy9zcmMvIiwic291cmNlcyI6WyJsaWIvcGFnZXMvZWRpdG9yL21hcmtsaW5lL21hcmtsaW5lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsU0FBUyxFQUlULFlBQVksRUFDWixpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDdEYsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQVFwRCxNQUFNLE9BQU8saUJBQWlCO0lBWTVCLFlBQW1CLG9CQUEwQztRQUExQyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBWDdELFVBQUssR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxnQkFBZ0I7UUFDOUQsU0FBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLGlCQUFpQjtRQUMzQixlQUFVLEdBQUc7WUFDWCxFQUFFLEVBQUUsS0FBSztZQUNULEVBQUUsRUFBRSxLQUFLO1lBQ1QsRUFBRSxFQUFFLEtBQUs7WUFDVCxFQUFFLEVBQUUsS0FBSztZQUNULEVBQUUsRUFBRSxLQUFLO1lBQ1QsRUFBRSxFQUFFLEtBQUs7U0FDVixDQUFDO0lBRThELENBQUM7SUFFakUsa0JBQWtCLEtBQVUsQ0FBQztJQUU3QixRQUFRO1FBQ04sSUFBSSxDQUFDLG9CQUFvQixDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNyRCxJQUFJLENBQUMsQ0FBQyxLQUFLLEtBQUssTUFBTSxFQUFFO2dCQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMs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Q29udGVudEluaXQsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgT25Jbml0LFxuICBRdWVyeUxpc3QsXG4gIFZpZXdDaGlsZHJlbixcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tcG9uZW50RGF0YVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2NvbXBvbmVudC9jb21wb25lbnQtZGF0YS5zZXJ2aWNlJztcbmltcG9ydCB7IGNvcywgc2luIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvdHJhbnNsYXRlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnTWFya2xpbmUnLFxuICB0ZW1wbGF0ZVVybDogJy4vbWFya2xpbmUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9tYXJrbGluZS5jb21wb25lbnQuc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBNYXJrbGluZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJDb250ZW50SW5pdCB7XG4gIGxpbmVzID0gWyd4dCcsICd4YycsICd4YicsICd5bCcsICd5YycsICd5ciddOyAvLyDliIbliKvlr7nlupTkuInmnaHmqKrnur/lkozkuInmnaHnq5bnur9cbiAgZGlmZiA9IDM7IC8vIOebuOi3nSBkZmYg5YOP57Sg5bCG6Ieq5Yqo5ZC46ZmEXG4gIGxpbmVTdGF0dXMgPSB7XG4gICAgeHQ6IGZhbHNlLFxuICAgIHhjOiBmYWxzZSxcbiAgICB4YjogZmFsc2UsXG4gICAgeWw6IGZhbHNlLFxuICAgIHljOiBmYWxzZSxcbiAgICB5cjogZmFsc2UsXG4gIH07XG4gIEBWaWV3Q2hpbGRyZW4oJ2xpbmVzJykgJHJlZnM6IFF1ZXJ5TGlzdDxhbnk+O1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgY29tcG9uZW50RGF0YVNlcnZpY2U6IENvbXBvbmVudERhdGFTZXJ2aWNlKSB7fVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5jb21wb25lbnREYXRhU2VydmljZS5ub3RpZmljYXRpb24uc3Vic2NyaWJlKCh4KSA9PiB7XG4gICAgICBpZiAoeC5ldmVudCA9PT0gJ21vdmUnKSB7XG4gICAgICAgIHRoaXMuc2hvd0xpbmUoeC52YWx1ZVswXSwgeC52YWx1ZVsxXSk7XG4gICAgICB9XG4gICAgICBpZiAoeC5ldmVudCA9PT0gJ3VubW92ZScpIHtcbiAgICAgICAgdGhpcy5oaWRlTGluZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc2hvd0xpbmUoaXNEb3dud2FyZCwgaXNSaWdodHdhcmQpIHtcbiAgICBjb25zdCBsaW5lcyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxpbmUnKSk7XG4gICAgY29uc3QgZmluZG5vZGUgPSAodHlwZSkgPT4ge1xuICAgICAgcmV0dXJuIGxpbmVzLmZpbmQoKHgpID0+IHhbJ2RhdGFzZXQnXS5pbmRleCA9PT0gdHlwZSk7XG4gICAgfTtcbiAgICBjb25zdCBjb21wb25lbnRzID0gdGhpcy5jb21wb25lbnREYXRhU2VydmljZS5jb21wb25lbnREYXRhO1xuICAgIGNvbnN0IGN1ckNvbXBvbmVudFN0eWxlID0gdGhpcy50cmFuc2xhdGVDb21wb25lbnRTdHlsZShcbiAgICAgIHRoaXMuY29tcG9uZW50RGF0YVNlcnZpY2UuY3VyQ29tcG9uZW50LnN0eWxlXG4gICAgKTtcbiAgICBjb25zdCBjdXJDb21wb25lbnRIYWxmd2lkdGggPSBjdXJDb21wb25lbnRTdHlsZS53aWR0aCAvIDI7XG4gICAgY29uc3QgY3VyQ29tcG9uZW50SGFsZkhlaWdodCA9IGN1ckNvbXBvbmVudFN0eWxlLmhlaWdodCAvIDI7XG4gICAgdGhpcy5oaWRlTGluZSgpO1xuICAgIGNvbXBvbmVudHMuZm9yRWFjaCgoY29tcG9uZW50KSA9PiB7XG4gICAgICBpZiAoY29tcG9uZW50ID09IHRoaXMuY29tcG9uZW50RGF0YVNlcnZpY2UuY3VyQ29tcG9uZW50KSByZXR1cm47XG4gICAgICBjb25zdCBjb21wb25lbnRTdHlsZSA9IHRoaXMudHJhbnNsYXRlQ29tcG9uZW50U3R5bGUoY29tcG9uZW50LnN0eWxlKTtcbiAgICAgIGNvbnN0IHsgdG9wLCBsZWZ0LCBib3R0b20sIHJpZ2h0IH0gPSBjb21wb25lbnRTdHlsZTtcbiAgICAgIGNvbnN0IGNvbXBvbmVudEhhbGZ3aWR0aCA9IGNvbXBvbmVudFN0eWxlLndpZHRoIC8gMjtcbiAgICAgIGNvbnN0IGNvbXBvbmVudEhhbGZIZWlnaHQgPSBjb21wb25lbnRTdHlsZS5oZWlnaHQgLyAyO1xuICAgICAgY29uc3QgY29uZGl0aW9ucyA9IHtcbiAgICAgICAgdG9wOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgaXNOZWFybHk6IHRoaXMuaXNOZWFybHkoY3VyQ29tcG9uZW50U3R5bGUudG9wLCB0b3ApLFxuICAgICAgICAgICAgbGluZU5vZGU6IGZpbmRub2RlKCd4dCcpLCAvLyB4dFxuICAgICAgICAgICAgbGluZTogJ3h0JyxcbiAgICAgICAgICAgIGRyYWdTaGlmdDogdG9wLFxuICAgICAgICAgICAgbGluZVNoaWZ0OiB0b3AsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpc05lYXJseTogdGhpcy5pc05lYXJseShjdXJDb21wb25lbnRTdHlsZS5ib3R0b20sIHRvcCksXG4gICAgICAgICAgICBsaW5lTm9kZTogZmluZG5vZGUoJ3h0JyksIC8vIHh0XG4gICAgICAgICAgICBsaW5lOiAneHQnLFxuICAgICAgICAgICAgZHJhZ1NoaWZ0OiB0b3AgLSBjdXJDb21wb25lbnRTdHlsZS5oZWlnaHQsXG4gICAgICAgICAgICBsaW5lU2hpZnQ6IHRvcCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIC8vIOe7hOS7tuS4juaLluaLveiKgueCueeahOS4remXtOaYr+WQpuWvuem9kFxuICAgICAgICAgICAgaXNOZWFybHk6IHRoaXMuaXNOZWFybHkoXG4gICAgICAgICAgICAgIGN1ckNvbXBvbmVudFN0eWxlLnRvcCArIGN1ckNvbXBvbmVudEhhbGZIZWlnaHQsXG4gICAgICAgICAgICAgIHRvcCArIGNvbXBvbmVudEhhbGZIZWlnaHRcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBsaW5lTm9kZTogZmluZG5vZGUoJ3hjJyksIC8vIHhjXG4gICAgICAgICAgICBsaW5lOiAneGMnLFxuICAgICAgICAgICAgZHJhZ1NoaWZ0OiB0b3AgKyBjb21wb25lbnRIYWxmSGVpZ2h0IC0gY3VyQ29tcG9uZW50SGFsZkhlaWdodCxcbiAgICAgICAgICAgIGxpbmVTaGlmdDogdG9wICsgY29tcG9uZW50SGFsZkhlaWdodCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlzTmVhcmx5OiB0aGlzLmlzTmVhcmx5KGN1ckNvbXBvbmVudFN0eWxlLnRvcCwgYm90dG9tKSxcbiAgICAgICAgICAgIGxpbmVOb2RlOiBmaW5kbm9kZSgneGInKSwgLy8geGJcbiAgICAgICAgICAgIGxpbmU6ICd4YicsXG4gICAgICAgICAgICBkcmFnU2hpZnQ6IGJvdHRvbSxcbiAgICAgICAgICAgIGxpbmVTaGlmdDogYm90dG9tLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgaXNOZWFybHk6IHRoaXMuaXNOZWFybHkoY3VyQ29tcG9uZW50U3R5bGUuYm90dG9tLCBib3R0b20pLFxuICAgICAgICAgICAgbGluZU5vZGU6IGZpbmRub2RlKCd4YicpLCAvLyB4YlxuICAgICAgICAgICAgbGluZTogJ3hiJyxcbiAgICAgICAgICAgIGRyYWdTaGlmdDogYm90dG9tIC0gY3VyQ29tcG9uZW50U3R5bGUuaGVpZ2h0LFxuICAgICAgICAgICAgbGluZVNoaWZ0OiBib3R0b20sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgICAgbGVmdDogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlzTmVhcmx5OiB0aGlzLmlzTmVhcmx5KGN1ckNvbXBvbmVudFN0eWxlLmxlZnQsIGxlZnQpLFxuICAgICAgICAgICAgbGluZU5vZGU6IGZpbmRub2RlKCd5bCcpLCAvLyB5bFxuICAgICAgICAgICAgbGluZTogJ3lsJyxcbiAgICAgICAgICAgIGRyYWdTaGlmdDogbGVmdCxcbiAgICAgICAgICAgIGxpbmVTaGlmdDogbGVmdCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlzTmVhcmx5OiB0aGlzLmlzTmVhcmx5KGN1ckNvbXBvbmVudFN0eWxlLnJpZ2h0LCBsZWZ0KSxcbiAgICAgICAgICAgIGxpbmVOb2RlOiBmaW5kbm9kZSgneWwnKSwgLy8geWxcbiAgICAgICAgICAgIGxpbmU6ICd5bCcsXG4gICAgICAgICAgICBkcmFnU2hpZnQ6IGxlZnQgLSBjdXJDb21wb25lbnRTdHlsZS53aWR0aCxcbiAgICAgICAgICAgIGxpbmVTaGlmdDogbGVmdCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIC8vIOe7hOS7tuS4juaLluaLveiKgueCueeahOS4remXtOaYr+WQpuWvuem9kFxuICAgICAgICAgICAgaXNOZWFybHk6IHRoaXMuaXNOZWFybHkoXG4gICAgICAgICAgICAgIGN1ckNvbXBvbmVudFN0eWxlLmxlZnQgKyBjdXJDb21wb25lbnRIYWxmd2lkdGgsXG4gICAgICAgICAgICAgIGxlZnQgKyBjb21wb25lbnRIYWxmd2lkdGhcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBsaW5lTm9kZTogZmluZG5vZGUoJ3ljJyksIC8vIHljXG4gICAgICAgICAgICBsaW5lOiAneWMnLFxuICAgICAgICAgICAgZHJhZ1NoaWZ0OiBsZWZ0ICsgY29tcG9uZW50SGFsZndpZHRoIC0gY3VyQ29tcG9uZW50SGFsZndpZHRoLFxuICAgICAgICAgICAgbGluZVNoaWZ0OiBsZWZ0ICsgY29tcG9uZW50SGFsZndpZHRoLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgaXNOZWFybHk6IHRoaXMuaXNOZWFybHkoY3VyQ29tcG9uZW50U3R5bGUubGVmdCwgcmlnaHQpLFxuICAgICAgICAgICAgbGluZU5vZGU6IGZpbmRub2RlKCd5cicpLCAvLyB5clxuICAgICAgICAgICAgbGluZTogJ3lyJyxcbiAgICAgICAgICAgIGRyYWdTaGlmdDogcmlnaHQsXG4gICAgICAgICAgICBsaW5lU2hpZnQ6IHJpZ2h0LFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgaXNOZWFybHk6IHRoaXMuaXNOZWFybHkoY3VyQ29tcG9uZW50U3R5bGUucmlnaHQsIHJpZ2h0KSxcbiAgICAgICAgICAgIGxpbmVOb2RlOiBmaW5kbm9kZSgneXInKSwgLy8geXJcbiAgICAgICAgICAgIGxpbmU6ICd5cicsXG4gICAgICAgICAgICBkcmFnU2hpZnQ6IHJpZ2h0IC0gY3VyQ29tcG9uZW50U3R5bGUud2lkdGgsXG4gICAgICAgICAgICBsaW5lU2hpZnQ6IHJpZ2h0LFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9O1xuICAgICAgY29uc3QgbmVlZFRvU2hvdyA9IFtdO1xuICAgICAgY29uc3QgeyByb3RhdGUgfSA9IHRoaXMuY29tcG9uZW50RGF0YVNlcnZpY2UuY3VyQ29tcG9uZW50LnN0eWxlO1xuICAgICAgT2JqZWN0LmtleXMoY29uZGl0aW9ucykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIC8vIOmBjeWOhuespuWQiOeahOadoeS7tuW5tuWkhOeQhlxuICAgICAgICBjb25kaXRpb25zW2tleV0uZm9yRWFjaCgoY29uZGl0aW9uKSA9PiB7XG4gICAgICAgICAgaWYgKCFjb25kaXRpb24uaXNOZWFybHkpIHJldHVybjtcbiAgICAgICAgICAvLyDkv67mlLnlvZPliY3nu4Tku7bkvY3np7tcbiAgICAgICAgICB0aGlzLmNvbXBvbmVudERhdGFTZXJ2aWNlLnNldFNoYXBlUG9zU3R5bGUoe1xuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgdmFsdWU6XG4gICAgICAgICAgICAgIHJvdGF0ZSAhPSAwXG4gICAgICAgICAgICAgICAgPyB0aGlzLnRyYW5zbGF0ZWN1ckNvbXBvbmVudFNoaWZ0KFxuICAgICAgICAgICAgICAgICAgICBrZXksXG4gICAgICAgICAgICAgICAgICAgIGNvbmRpdGlvbixcbiAgICAgICAgICAgICAgICAgICAgY3VyQ29tcG9uZW50U3R5bGVcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICA6IGNvbmRpdGlvbi5kcmFnU2hpZnQsXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBjb25kaXRpb24ubGluZU5vZGUuc3R5bGVba2V5XSA9IGAke2NvbmRpdGlvbi5saW5lU2hpZnR9cHhgO1xuICAgICAgICAgIG5lZWRUb1Nob3cucHVzaChjb25kaXRpb24ubGluZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIOWQjOS4gOaWueWQkeS4iuWQjOaXtuaYvuekuuS4ieadoee6v+WPr+iDveS4jeWkque+juingu+8jOWboOatpOaJjeacieS6hui/meS4quino+WGs+aWueahiFxuICAgICAgLy8g5ZCM5LiA5pa55ZCR5LiK55qE57q/5Y+q5pi+56S65LiA5p2h77yM5L6L5aaC5aSa5p2h5qiq5p2h5Y+q5pi+56S65LiA5p2h5qiq57q/XG4gICAgICBpZiAobmVlZFRvU2hvdy5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5jaG9vc2VUaGVUdXJlTGluZShuZWVkVG9TaG93LCBpc0Rvd253YXJkLCBpc1JpZ2h0d2FyZCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICB0cmFuc2xhdGVDb21wb25lbnRTdHlsZShzdHlsZSkge1xuICAgIHN0eWxlID0geyAuLi5zdHlsZSB9O1xuICAgIGlmIChzdHlsZS5yb3RhdGUgIT0gMCkge1xuICAgICAgY29uc3QgbmV3V2lkdGggPVxuICAgICAgICBzdHlsZS53aWR0aCAqIGNvcyhzdHlsZS5yb3RhdGUpICsgc3R5bGUuaGVpZ2h0ICogc2luKHN0eWxlLnJvdGF0ZSk7XG4gICAgICBjb25zdCBkaWZmWCA9IChzdHlsZS53aWR0aCAtIG5ld1dpZHRoKSAvIDI7XG4gICAgICBzdHlsZS5sZWZ0ICs9IGRpZmZYO1xuICAgICAgc3R5bGUucmlnaHQgPSBzdHlsZS5sZWZ0ICsgbmV3V2lkdGg7XG5cbiAgICAgIGNvbnN0IG5ld0hlaWdodCA9XG4gICAgICAgIHN0eWxlLmhlaWdodCAqIGNvcyhzdHlsZS5yb3RhdGUpICsgc3R5bGUud2lkdGggKiBzaW4oc3R5bGUucm90YXRlKTtcbiAgICAgIGNvbnN0IGRpZmZZID0gKG5ld0hlaWdodCAtIHN0eWxlLmhlaWdodCkgLyAyO1xuICAgICAgc3R5bGUudG9wIC09IGRpZmZZO1xuICAgICAgc3R5bGUuYm90dG9tID0gc3R5bGUudG9wICsgbmV3SGVpZ2h0O1xuXG4gICAgICBzdHlsZS53aWR0aCA9IG5ld1dpZHRoO1xuICAgICAgc3R5bGUuaGVpZ2h0ID0gbmV3SGVpZ2h0O1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZS5ib3R0b20gPSBzdHlsZS50b3AgKyBzdHlsZS5oZWlnaHQ7XG4gICAgICBzdHlsZS5yaWdodCA9IHN0eWxlLmxlZnQgKyBzdHlsZS53aWR0aDtcbiAgICB9XG5cbiAgICByZXR1cm4gc3R5bGU7XG4gIH1cblxuICBoaWRlTGluZSgpIHtcbiAgICBPYmplY3Qua2V5cyh0aGlzLmxpbmVTdGF0dXMpLmZvckVhY2goKGxpbmUpID0+IHtcbiAgICAgIHRoaXMubGluZVN0YXR1c1tsaW5lXSA9IGZhbHNlO1xuICAgIH0pO1xuICB9XG5cbiAgaXNOZWFybHkoZHJhZ1ZhbHVlLCB0YXJnZXRWYWx1ZSkge1xuICAgIHJldHVybiBNYXRoLmFicyhkcmFnVmFsdWUgLSB0YXJnZXRWYWx1ZSkgPD0gdGhpcy5kaWZmO1xuICB9XG5cbiAgdHJhbnNsYXRlY3VyQ29tcG9uZW50U2hpZnQoa2V5LCBjb25kaXRpb24sIGN1ckNvbXBvbmVudFN0eWxlKSB7XG4gICAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0IH0gPSB0aGlzLmNvbXBvbmVudERhdGFTZXJ2aWNlLmN1ckNvbXBvbmVudC5zdHlsZTtcbiAgICBpZiAoa2V5ID09ICd0b3AnKSB7XG4gICAgICByZXR1cm4gTWF0aC5yb3VuZChcbiAgICAgICAgY29uZGl0aW9uLmRyYWdTaGlmdCAtIChoZWlnaHQgLSBjdXJDb21wb25lbnRTdHlsZS5oZWlnaHQpIC8gMlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gTWF0aC5yb3VuZChcbiAgICAgIGNvbmRpdGlvbi5kcmFnU2hpZnQgLSAod2lkdGggLSBjdXJDb21wb25lbnRTdHlsZS53aWR0aCkgLyAyXG4gICAgKTtcbiAgfVxuXG4gIGNob29zZVRoZVR1cmVMaW5lKG5lZWRUb1Nob3csIGlzRG93bndhcmQsIGlzUmlnaHR3YXJkKSB7XG4gICAgLy8g5aaC5p6c6byg5qCH5ZCR5Y+z56e75YqoIOWImeaMieS7juWPs+WIsOW3pueahOmhuuW6j+aYvuekuuerlue6vyDlkKbliJnmjInnm7jlj43pobrluo/mmL7npLpcbiAgICAvLyDlpoLmnpzpvKDmoIflkJHkuIvnp7vliqgg5YiZ5oyJ5LuO5LiL5Yiw5LiK55qE6aG65bqP5pi+56S65qiq57q/IOWQpuWImeaMieebuOWPjemhuuW6j+aYvuekulxuICAgIGlmIChpc1JpZ2h0d2FyZCkge1xuICAgICAgaWYgKG5lZWRUb1Nob3cuaW5jbHVkZXMoJ3lyJykpIHtcbiAgICAgICAgdGhpcy5saW5lU3RhdHVzLnlyID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAobmVlZFRvU2hvdy5pbmNsdWRlcygneWMnKSkge1xuICAgICAgICB0aGlzLmxpbmVTdGF0dXMueWMgPSB0cnVlO1xuICAgICAgfSBlbHNlIGlmIChuZWVkVG9TaG93LmluY2x1ZGVzKCd5bCcpKSB7XG4gICAgICAgIHRoaXMubGluZVN0YXR1cy55bCA9IHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1sb25lbHktaWZcbiAgICAgIGlmIChuZWVkVG9TaG93LmluY2x1ZGVzKCd5bCcpKSB7XG4gICAgICAgIHRoaXMubGluZVN0YXR1cy55bCA9IHRydWU7XG4gICAgICB9IGVsc2UgaWYgKG5lZWRUb1Nob3cuaW5jbHVkZXMoJ3ljJykpIHtcbiAgICAgICAgdGhpcy5saW5lU3RhdHVzLnljID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAobmVlZFRvU2hvdy5pbmNsdWRlcygneXInKSkge1xuICAgICAgICB0aGlzLmxpbmVTdGF0dXMueXIgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpc0Rvd253YXJkKSB7XG4gICAgICBpZiAobmVlZFRvU2hvdy5pbmNsdWRlcygneGInKSkge1xuICAgICAgICB0aGlzLmxpbmVTdGF0dXMueGIgPSB0cnVlO1xuICAgICAgfSBlbHNlIGlmIChuZWVkVG9TaG93LmluY2x1ZGVzKCd4YycpKSB7XG4gICAgICAgIHRoaXMubGluZVN0YXR1cy54YyA9IHRydWU7XG4gICAgICB9IGVsc2UgaWYgKG5lZWRUb1Nob3cuaW5jbHVkZXMoJ3h0JykpIHtcbiAgICAgICAgdGhpcy5saW5lU3RhdHVzLnh0ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWxvbmVseS1pZlxuICAgICAgaWYgKG5lZWRUb1Nob3cuaW5jbHVkZXMoJ3h0JykpIHtcbiAgICAgICAgdGhpcy5saW5lU3RhdHVzLnh0ID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAobmVlZFRvU2hvdy5pbmNsdWRlcygneGMnKSkge1xuICAgICAgICB0aGlzLmxpbmVTdGF0dXMueGMgPSB0cnVlO1xuICAgICAgfSBlbHNlIGlmIChuZWVkVG9TaG93LmluY2x1ZGVzKCd4YicpKSB7XG4gICAgICAgIHRoaXMubGluZVN0YXR1cy54YiA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=