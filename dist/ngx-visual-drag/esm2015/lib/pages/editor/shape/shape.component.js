import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ComponentDataService } from '../../../core/component/component-data.service';
import calculateComponentPositonAndSize from '../../../utils/calculateComponentPositonAndSize';
export class ShapeComponent {
    constructor(componentDataService) {
        this.componentDataService = componentDataService;
        this.active = false;
        this.cursors = {};
        this.pointList = ['lt', 't', 'rt', 'r', 'rb', 'b', 'lb', 'l']; // 八个方向
        this.initialAngle = {
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
        this.angleToCursor = [
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
    }
    ngOnInit() { }
    getShapeStyle(style) {
        const result = Object.assign({}, style);
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
        const pos = Object.assign({}, this.defaultStyle);
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
    handleRotate() { }
    handleMouseDownOnPoint(point, e) {
        const downEvent = window.event;
        downEvent.stopPropagation();
        downEvent.preventDefault();
        const style = Object.assign({}, this.defaultStyle);
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
    getPointStyle(point) {
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
        }
        else {
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
ShapeComponent.decorators = [
    { type: Component, args: [{
                selector: 'shape',
                template: "<div class=\"shape\" [ngStyle]=\"getShapeStyle(defaultStyle)\" [class.active]=\"active\" (click)=\"selectCurComponent($event)\"\n    (mousedown)=\"handleMouseDownOnShape($event)\">\n    <i class=\"el-icon-refresh-right\" *ngIf=\"active\" (mousedown)=\"handleRotate()\"></i>\n    <div class=\"shape-point\" *ngFor=\"let item of (active? pointList : [])\"\n        (mousedown)=\"handleMouseDownOnPoint(item, $event)\" [ngStyle]=\"getPointStyle(item)\">\n    </div>\n    <ng-content></ng-content>\n</div>",
                encapsulation: ViewEncapsulation.None,
                styles: [".shape{position:absolute}.shape:hover{cursor:move}.active{-webkit-user-select:none;outline:1px solid #70c0ff;user-select:none}.shape-point{background:#fff;border:1px solid #59c7f9;border-radius:50%;height:8px;position:absolute;width:8px}.el-icon-refresh-right{color:#59c7f9;cursor:grab;font-size:18px;font-size:22px;font-weight:600;font-weight:400;left:50%;position:absolute;top:-30px;transform:translateX(-50%)}.el-icon-refresh-right:active{cursor:grabbing}"]
            },] }
];
ShapeComponent.ctorParameters = () => [
    { type: ComponentDataService }
];
ShapeComponent.propDecorators = {
    active: [{ type: Input }],
    element: [{ type: Input }],
    defaultStyle: [{ type: Input }],
    index: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uL3Byb2plY3RzL25neC12aXN1YWwtZHJhZy9zcmMvIiwic291cmNlcyI6WyJsaWIvcGFnZXMvZWRpdG9yL3NoYXBlL3NoYXBlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUt0RixPQUFPLGdDQUFnQyxNQUFNLGlEQUFpRCxDQUFDO0FBUS9GLE1BQU0sT0FBTyxjQUFjO0lBNkJ6QixZQUFtQixvQkFBMEM7UUFBMUMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQTVCcEQsV0FBTSxHQUFZLEtBQUssQ0FBQztRQUlqQyxZQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2IsY0FBUyxHQUFhLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTztRQUMzRSxpQkFBWSxHQUFHO1lBQ2IsYUFBYTtZQUNiLEVBQUUsRUFBRSxDQUFDO1lBQ0wsQ0FBQyxFQUFFLEVBQUU7WUFDTCxFQUFFLEVBQUUsRUFBRTtZQUNOLENBQUMsRUFBRSxHQUFHO1lBQ04sRUFBRSxFQUFFLEdBQUc7WUFDUCxDQUFDLEVBQUUsR0FBRztZQUNOLEVBQUUsRUFBRSxHQUFHO1lBQ1AsQ0FBQyxFQUFFLEdBQUc7U0FDUCxDQUFDO1FBQ0Ysa0JBQWEsR0FBRztZQUNkLGVBQWU7WUFDZixFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ3JDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFF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LElBQUksS0FBSyxHQUFHLFVBQVUsQ0FBQyxHQUFHLEVBQUU7b0JBQ3ZELE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztvQkFDOUMsT0FBTztpQkFDUjthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDOzs7WUF4UUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxPQUFPO2dCQUNqQixpZ0JBQXFDO2dCQUVyQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7YUFDdEM7OztZQVpRLG9CQUFvQjs7O3FCQWMxQixLQUFLO3NCQUNMLEtBQUs7MkJBQ0wsS0FBSztvQkFDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc3RyaW5naWZ5IH0gZnJvbSAnQGFuZ3VsYXIvY29tcGlsZXIvc3JjL3V0aWwnO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tcG9uZW50RGF0YVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2NvbXBvbmVudC9jb21wb25lbnQtZGF0YS5zZXJ2aWNlJztcbmltcG9ydCB7XG4gIENvbXBvbmVudEJhc2VTdHlsZSxcbiAgQ29tcG9uZW50QmFzZURhdGEsXG59IGZyb20gJy4uLy4uLy4uL3R5cGVzL2NvbXBvbmVudC10eXBlJztcbmltcG9ydCBjYWxjdWxhdGVDb21wb25lbnRQb3NpdG9uQW5kU2l6ZSBmcm9tICcuLi8uLi8uLi91dGlscy9jYWxjdWxhdGVDb21wb25lbnRQb3NpdG9uQW5kU2l6ZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NoYXBlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3NoYXBlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vc2hhcGUuY29tcG9uZW50LnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgU2hhcGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBhY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgZWxlbWVudDogQ29tcG9uZW50QmFzZURhdGE7XG4gIEBJbnB1dCgpIGRlZmF1bHRTdHlsZTogQ29tcG9uZW50QmFzZVN0eWxlO1xuICBASW5wdXQoKSBpbmRleDogbnVtYmVyO1xuICBjdXJzb3JzID0ge307XG4gIHBvaW50TGlzdDogc3RyaW5nW10gPSBbJ2x0JywgJ3QnLCAncnQnLCAncicsICdyYicsICdiJywgJ2xiJywgJ2wnXTsgLy8g5YWr5Liq5pa55ZCRXG4gIGluaXRpYWxBbmdsZSA9IHtcbiAgICAvLyDmr4/kuKrngrnlr7nlupTnmoTliJ3lp4vop5LluqZcbiAgICBsdDogMCxcbiAgICB0OiA0NSxcbiAgICBydDogOTAsXG4gICAgcjogMTM1LFxuICAgIHJiOiAxODAsXG4gICAgYjogMjI1LFxuICAgIGxiOiAyNzAsXG4gICAgbDogMzE1LFxuICB9O1xuICBhbmdsZVRvQ3Vyc29yID0gW1xuICAgIC8vIOavj+S4quiMg+WbtOeahOinkuW6puWvueW6lOeahOWFieagh1xuICAgIHsgc3RhcnQ6IDMzOCwgZW5kOiAyMywgY3Vyc29yOiAnbncnIH0sXG4gICAgeyBzdGFydDogMjMsIGVuZDogNjgsIGN1cnNvcjogJ24nIH0sXG4gICAgeyBzdGFydDogNjgsIGVuZDogMTEzLCBjdXJzb3I6ICduZScgfSxcbiAgICB7IHN0YXJ0OiAxMTMsIGVuZDogMTU4LCBjdXJzb3I6ICdlJyB9LFxuICAgIHsgc3RhcnQ6IDE1OCwgZW5kOiAyMDMsIGN1cnNvcjogJ3NlJyB9LFxuICAgIHsgc3RhcnQ6IDIwMywgZW5kOiAyNDgsIGN1cnNvcjogJ3MnIH0sXG4gICAgeyBzdGFydDogMjQ4LCBlbmQ6IDI5MywgY3Vyc29yOiAnc3cnIH0sXG4gICAgeyBzdGFydDogMjkzLCBlbmQ6IDMzOCwgY3Vyc29yOiAndycgfSxcbiAgXTtcbiAgY29uc3RydWN0b3IocHVibGljIGNvbXBvbmVudERhdGFTZXJ2aWNlOiBDb21wb25lbnREYXRhU2VydmljZSkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHt9XG5cbiAgZ2V0U2hhcGVTdHlsZShzdHlsZTogQ29tcG9uZW50QmFzZVN0eWxlKSB7XG4gICAgY29uc3QgcmVzdWx0ID0geyAuLi5zdHlsZSB9O1xuICAgIGlmIChyZXN1bHQud2lkdGgpIHtcbiAgICAgIHJlc3VsdC53aWR0aCArPSAncHgnO1xuICAgIH1cblxuICAgIGlmIChyZXN1bHQuaGVpZ2h0KSB7XG4gICAgICByZXN1bHQuaGVpZ2h0ICs9ICdweCc7XG4gICAgfVxuXG4gICAgaWYgKHJlc3VsdC50b3ApIHtcbiAgICAgIHJlc3VsdC50b3AgKz0gJ3B4JztcbiAgICB9XG5cbiAgICBpZiAocmVzdWx0LmxlZnQpIHtcbiAgICAgIHJlc3VsdC5sZWZ0ICs9ICdweCc7XG4gICAgfVxuXG4gICAgaWYgKHJlc3VsdC5yb3RhdGUpIHtcbiAgICAgIHJlc3VsdFsndHJhbnNmb3JtJ10gPSAncm90YXRlKCcgKyByZXN1bHQucm90YXRlICsgJ2RlZyknO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBoYW5kbGVNb3VzZURvd25PblNoYXBlKGUpIHtcbiAgICBpZiAodGhpcy5lbGVtZW50LmNvbXBvbmVudCAhPSAndi10ZXh0Jykge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdGhpcy5jb21wb25lbnREYXRhU2VydmljZS5jdXJDb21wb25lbnQgPSB0aGlzLmVsZW1lbnQ7XG4gICAgdGhpcy5jb21wb25lbnREYXRhU2VydmljZS5jdXJDb21wb25lbnRJbmRleCA9IHRoaXMuaW5kZXg7XG4gICAgdGhpcy5jdXJzb3JzID0gdGhpcy5nZXRDdXJzb3IoKTsgLy8g5qC55o2u5peL6L2s6KeS5bqm6I635Y+W5YWJ5qCH5L2N572uXG4gICAgY29uc3QgcG9zID0geyAuLi50aGlzLmRlZmF1bHRTdHlsZSB9O1xuICAgIGNvbnN0IHN0YXJ0WSA9IGUuY2xpZW50WTtcbiAgICBjb25zdCBzdGFydFggPSBlLmNsaWVudFg7XG4gICAgLy8g5aaC5p6c55u05o6l5L+u5pS55bGe5oCn77yM5YC855qE57G75Z6L5Lya5Y+Y5Li65a2X56ym5Liy77yM5omA5Lul6KaB6L2s5Li65pWw5YC85Z6LXG4gICAgY29uc3Qgc3RhcnRUb3AgPSBOdW1iZXIocG9zLnRvcCk7XG4gICAgY29uc3Qgc3RhcnRMZWZ0ID0gTnVtYmVyKHBvcy5sZWZ0KTtcblxuICAgIC8vIOWmguaenOWFg+e0oOayoeacieenu+WKqO+8jOWImeS4jeS/neWtmOW/q+eFp1xuICAgIGxldCBoYXNNb3ZlID0gZmFsc2U7XG4gICAgY29uc3QgbW92ZSA9IChtb3ZlRXZlbnQpID0+IHtcbiAgICAgIGhhc01vdmUgPSB0cnVlO1xuICAgICAgY29uc3QgY3VyWCA9IG1vdmVFdmVudC5jbGllbnRYO1xuICAgICAgY29uc3QgY3VyWSA9IG1vdmVFdmVudC5jbGllbnRZO1xuICAgICAgcG9zLnRvcCA9IGN1clkgLSBzdGFydFkgKyBzdGFydFRvcDtcbiAgICAgIHBvcy5sZWZ0ID0gY3VyWCAtIHN0YXJ0WCArIHN0YXJ0TGVmdDtcblxuICAgICAgLy8g5L+u5pS55b2T5YmN57uE5Lu25qC35byPXG4gICAgICB0aGlzLmNvbXBvbmVudERhdGFTZXJ2aWNlLiRzaGFwZVN0eWxlLm5leHQocG9zKTtcbiAgICAgIC8vIOetieabtOaWsOWujOW9k+WJjee7hOS7tueahOagt+W8j+W5tue7mOWItuWIsOWxj+W5leWQjuWGjeWIpOaWreaYr+WQpumcgOimgeWQuOmZhFxuICAgICAgLy8g5aaC5p6c5LiN5L2/55SoICRuZXh0VGlja++8jOWQuOmZhOWQjuWwhuaXoOazleenu+WKqFxuICAgICAgLy8gdGhpcy4kbmV4dFRpY2soKCkgPT4ge1xuICAgICAgLy8gICAvLyDop6blj5HlhYPntKDnp7vliqjkuovku7bvvIznlKjkuo7mmL7npLrmoIfnur/jgIHlkLjpmYTlip/og71cbiAgICAgIC8vICAgLy8g5ZCO6Z2i5Lik5Liq5Y+C5pWw5Luj6KGo6byg5qCH56e75Yqo5pa55ZCRXG4gICAgICAvLyAgIC8vIGN1clkgLSBzdGFydFkgPiAwIHRydWUg6KGo56S65ZCR5LiL56e75YqoIGZhbHNlIOihqOekuuWQkeS4iuenu+WKqFxuICAgICAgLy8gICAvLyBjdXJYIC0gc3RhcnRYID4gMCB0cnVlIOihqOekuuWQkeWPs+enu+WKqCBmYWxzZSDooajnpLrlkJHlt6bnp7vliqhcbiAgICAgIC8vICAgZXZlbnRCdXMuJGVtaXQoJ21vdmUnLCBjdXJZIC0gc3RhcnRZID4gMCwgY3VyWCAtIHN0YXJ0WCA+IDApO1xuICAgICAgLy8gfSlcbiAgICAgIHRoaXMuY29tcG9uZW50RGF0YVNlcnZpY2Uubm90aWZpY2F0aW9uLm5leHQoe1xuICAgICAgICBldmVudDogJ21vdmUnLFxuICAgICAgICB2YWx1ZTogW2N1clkgLSBzdGFydFkgPiAwLCBjdXJYIC0gc3RhcnRYID4gMF0sXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgY29uc3QgdXAgPSAoKSA9PiB7XG4gICAgICBoYXNNb3ZlICYmIHRoaXMuY29tcG9uZW50RGF0YVNlcnZpY2UucmVjb3JkU25hcHNob3QoKTtcbiAgICAgIC8vIOinpuWPkeWFg+e0oOWBnOatouenu+WKqOS6i+S7tu+8jOeUqOS6jumakOiXj+agh+e6v1xuICAgICAgLy8gZXZlbnRCdXMuJGVtaXQoJ3VubW92ZScpXG4gICAgICB0aGlzLmNvbXBvbmVudERhdGFTZXJ2aWNlLm5vdGlmaWNhdGlvbi5uZXh0KHtcbiAgICAgICAgZXZlbnQ6ICd1bm1vdmUnLFxuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3ZlKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB1cCk7XG4gICAgfTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG1vdmUpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB1cCk7XG4gIH1cblxuICBzZWxlY3RDdXJDb21wb25lbnQoZSkge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuY29tcG9uZW50RGF0YVNlcnZpY2UuaGlkZUNvbnRleHRNZW51KCk7XG4gIH1cblxuICBoYW5kbGVSb3RhdGUoKSB7fVxuXG4gIGhhbmRsZU1vdXNlRG93bk9uUG9pbnQocG9pbnQ6IHN0cmluZywgZSkge1xuICAgIGNvbnN0IGRvd25FdmVudCA9IHdpbmRvdy5ldmVudDtcbiAgICBkb3duRXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZG93bkV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBjb25zdCBzdHlsZSA9IHsgLi4udGhpcy5kZWZhdWx0U3R5bGUgfTtcbiAgICBjb25zdCBjZW50ZXIgPSB7XG4gICAgICB4OiBzdHlsZS5sZWZ0ICsgc3R5bGUud2lkdGggLyAyLFxuICAgICAgeTogc3R5bGUudG9wICsgc3R5bGUuaGVpZ2h0IC8gMixcbiAgICB9O1xuXG4gICAgLy8g6I635Y+W55S75biD5L2N56e75L+h5oGvXG4gICAgY29uc3QgZWRpdG9yUmVjdEluZm8gPSBkb2N1bWVudFxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoJyNlZGl0b3InKVxuICAgICAgLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgLy8g5b2T5YmN54K55Ye75Z2Q5qCHXG4gICAgY29uc3QgY3VyUG9pbnQgPSB7XG4gICAgICB4OiBlLmNsaWVudFggLSBlZGl0b3JSZWN0SW5mby5sZWZ0LFxuICAgICAgeTogZS5jbGllbnRZIC0gZWRpdG9yUmVjdEluZm8udG9wLFxuICAgIH07XG5cbiAgICAvLyDojrflj5blr7nnp7DngrnnmoTlnZDmoIdcbiAgICBjb25zdCBzeW1tZXRyaWNQb2ludCA9IHtcbiAgICAgIHg6IGNlbnRlci54IC0gKGN1clBvaW50LnggLSBjZW50ZXIueCksXG4gICAgICB5OiBjZW50ZXIueSAtIChjdXJQb2ludC55IC0gY2VudGVyLnkpLFxuICAgIH07XG5cbiAgICAvLyDmmK/lkKbpnIDopoHkv53lrZjlv6vnhadcbiAgICBsZXQgbmVlZFNhdmUgPSBmYWxzZTtcbiAgICBsZXQgaXNGaXJzdCA9IHRydWU7XG4gICAgY29uc3QgbW92ZSA9IChtb3ZlRXZlbnQpID0+IHtcbiAgICAgIC8vIOesrOS4gOasoeeCueWHu+aXtuS5n+S8muinpuWPkSBtb3Zl77yM5omA5Lul5Lya5pyJ4oCc5Yia54K55Ye757uE5Lu25L2G5pyq56e75Yqo77yM57uE5Lu255qE5aSn5bCP5Y205pS55Y+Y5LqG4oCd55qE5oOF5Ya15Y+R55SfXG4gICAgICAvLyDlm6DmraTnrKzkuIDmrKHngrnlh7vml7bkuI3op6blj5EgbW92ZSDkuovku7ZcbiAgICAgIGlmIChpc0ZpcnN0KSB7XG4gICAgICAgIGlzRmlyc3QgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBuZWVkU2F2ZSA9IHRydWU7XG4gICAgICBjb25zdCBjdXJQb3NpdG9uID0ge1xuICAgICAgICB4OiBtb3ZlRXZlbnQuY2xpZW50WCAtIGVkaXRvclJlY3RJbmZvLmxlZnQsXG4gICAgICAgIHk6IG1vdmVFdmVudC5jbGllbnRZIC0gZWRpdG9yUmVjdEluZm8udG9wLFxuICAgICAgfTtcblxuICAgICAgY2FsY3VsYXRlQ29tcG9uZW50UG9zaXRvbkFuZFNpemUocG9pbnQsIHN0eWxlLCBjdXJQb3NpdG9uLCB7XG4gICAgICAgIGNlbnRlcixcbiAgICAgICAgY3VyUG9pbnQsXG4gICAgICAgIHN5bW1ldHJpY1BvaW50LFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuY29tcG9uZW50RGF0YVNlcnZpY2UuJHNoYXBlU3R5bGUubmV4dChzdHlsZSk7XG4gICAgfTtcblxuICAgIGNvbnN0IHVwID0gKCkgPT4ge1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbW92ZSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdXApO1xuICAgICAgbmVlZFNhdmUgJiYgdGhpcy5jb21wb25lbnREYXRhU2VydmljZS5yZWNvcmRTbmFwc2hvdCgpO1xuICAgIH07XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3ZlKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdXApO1xuICB9XG5cbiAgZ2V0UG9pbnRTdHlsZShcbiAgICBwb2ludDogc3RyaW5nXG4gICk6IHtcbiAgICBtYXJnaW5MZWZ0OiBzdHJpbmc7XG4gICAgbWFyZ2luVG9wOiBzdHJpbmc7XG4gICAgbGVmdDogc3RyaW5nO1xuICAgIHRvcDogc3RyaW5nO1xuICAgIGN1cnNvcjogc3RyaW5nO1xuICB9IHtcbiAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IHRoaXMuZGVmYXVsdFN0eWxlO1xuICAgIGNvbnN0IGhhc1QgPSAvdC8udGVzdChwb2ludCk7XG4gICAgY29uc3QgaGFzQiA9IC9iLy50ZXN0KHBvaW50KTtcbiAgICBjb25zdCBoYXNMID0gL2wvLnRlc3QocG9pbnQpO1xuICAgIGNvbnN0IGhhc1IgPSAvci8udGVzdChwb2ludCk7XG4gICAgbGV0IG5ld0xlZnQgPSAwO1xuICAgIGxldCBuZXdUb3AgPSAwO1xuXG4gICAgLy8g5Zub5Liq6KeS55qE54K5XG4gICAgaWYgKHBvaW50Lmxlbmd0aCA9PT0gMikge1xuICAgICAgbmV3TGVmdCA9IGhhc0wgPyAwIDogd2lkdGg7XG4gICAgICBuZXdUb3AgPSBoYXNUID8gMCA6IGhlaWdodDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8g5LiK5LiL5Lik54K555qE54K577yM5a695bqm5bGF5LitXG4gICAgICBpZiAoaGFzVCB8fCBoYXNCKSB7XG4gICAgICAgIG5ld0xlZnQgPSB3aWR0aCAvIDI7XG4gICAgICAgIG5ld1RvcCA9IGhhc1QgPyAwIDogaGVpZ2h0O1xuICAgICAgfVxuXG4gICAgICAvLyDlt6blj7PkuKTovrnnmoTngrnvvIzpq5jluqblsYXkuK1cbiAgICAgIGlmIChoYXNMIHx8IGhhc1IpIHtcbiAgICAgICAgbmV3TGVmdCA9IGhhc0wgPyAwIDogd2lkdGg7XG4gICAgICAgIG5ld1RvcCA9IE1hdGguZmxvb3IoaGVpZ2h0IC8gMik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qgc3R5bGUgPSB7XG4gICAgICBtYXJnaW5MZWZ0OiBoYXNSID8gJy00cHgnIDogJy00cHgnLFxuICAgICAgbWFyZ2luVG9wOiAnLTRweCcsXG4gICAgICBsZWZ0OiBgJHtuZXdMZWZ0fXB4YCxcbiAgICAgIHRvcDogYCR7bmV3VG9wfXB4YCxcbiAgICAgIGN1cnNvcjogdGhpcy5jdXJzb3JzW3BvaW50XSxcbiAgICB9O1xuXG4gICAgcmV0dXJuIHN0eWxlO1xuICB9XG5cbiAgZ2V0Q3Vyc29yKCkge1xuICAgIGNvbnN0IHsgYW5nbGVUb0N1cnNvciwgaW5pdGlhbEFuZ2xlLCBwb2ludExpc3QgfSA9IHRoaXM7XG4gICAgY29uc3QgY3VyQ29tcG9uZW50ID0gdGhpcy5jb21wb25lbnREYXRhU2VydmljZS5jdXJDb21wb25lbnQ7XG4gICAgY29uc3Qgcm90YXRlID0gKGN1ckNvbXBvbmVudC5zdHlsZS5yb3RhdGUgKyAzNjApICUgMzYwOyAvLyDpmLLmraLop5LluqbmnInotJ/mlbDvvIzmiYDku6UgKyAzNjBcbiAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICBsZXQgbGFzdE1hdGNoSW5kZXggPSAtMTsgLy8g5LuO5LiK5LiA5Liq5ZG95Lit55qE6KeS5bqm55qE57Si5byV5byA5aeL5Yy56YWN5LiL5LiA5Liq77yM6ZmN5L2O5pe26Ze05aSN5p2C5bqmXG4gICAgcG9pbnRMaXN0LmZvckVhY2goKHBvaW50KSA9PiB7XG4gICAgICBjb25zdCBhbmdsZSA9IChpbml0aWFsQW5nbGVbcG9pbnRdICsgcm90YXRlKSAlIDM2MDtcbiAgICAgIGNvbnN0IGxlbiA9IGFuZ2xlVG9DdXJzb3IubGVuZ3RoO1xuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgbGFzdE1hdGNoSW5kZXggPSAobGFzdE1hdGNoSW5kZXggKyAxKSAlIGxlbjtcbiAgICAgICAgY29uc3QgYW5nbGVMaW1pdCA9IGFuZ2xlVG9DdXJzb3JbbGFzdE1hdGNoSW5kZXhdO1xuICAgICAgICBpZiAoYW5nbGUgPCAyMyB8fCBhbmdsZSA+PSAzMzgpIHtcbiAgICAgICAgICByZXN1bHRbcG9pbnRdID0gJ253LXJlc2l6ZSc7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGFuZ2xlTGltaXQuc3RhcnQgPD0gYW5nbGUgJiYgYW5nbGUgPCBhbmdsZUxpbWl0LmVuZCkge1xuICAgICAgICAgIHJlc3VsdFtwb2ludF0gPSBhbmdsZUxpbWl0LmN1cnNvciArICctcmVzaXplJztcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn1cbiJdfQ==