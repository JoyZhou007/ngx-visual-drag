import { calculateRotatedPointCoordinate, getCenterPoint } from './translate';
const funcs = {
    lt: calculateLeftTop,
    t: calculateTop,
    rt: calculateRightTop,
    r: calculateRight,
    rb: calculateRightBottom,
    b: calculateBottom,
    lb: calculateLeftBottom,
    l: calculateLeft,
};
function calculateLeftTop(style, curPositon, pointInfo) {
    const { symmetricPoint } = pointInfo;
    const newCenterPoint = getCenterPoint(curPositon, symmetricPoint);
    const newTopLeftPoint = calculateRotatedPointCoordinate(curPositon, newCenterPoint, -style.rotate);
    const newBottomRightPoint = calculateRotatedPointCoordinate(symmetricPoint, newCenterPoint, -style.rotate);
    const newWidth = newBottomRightPoint.x - newTopLeftPoint.x;
    const newHeight = newBottomRightPoint.y - newTopLeftPoint.y;
    if (newWidth > 0 && newHeight > 0) {
        style.width = Math.round(newWidth);
        style.height = Math.round(newHeight);
        style.left = Math.round(newTopLeftPoint.x);
        style.top = Math.round(newTopLeftPoint.y);
    }
}
function calculateTop(style, curPositon, pointInfo) {
    const { symmetricPoint, curPoint } = pointInfo;
    const rotatedcurPositon = calculateRotatedPointCoordinate(curPositon, curPoint, -style.rotate);
    const rotatedTopMiddlePoint = calculateRotatedPointCoordinate({
        x: curPoint.x,
        y: rotatedcurPositon.y,
    }, curPoint, style.rotate);
    // 勾股定理
    const newHeight = Math.sqrt(Math.pow((rotatedTopMiddlePoint.x - symmetricPoint.x), 2) +
        Math.pow((rotatedTopMiddlePoint.y - symmetricPoint.y), 2));
    if (newHeight > 0) {
        const newCenter = {
            x: rotatedTopMiddlePoint.x -
                (rotatedTopMiddlePoint.x - symmetricPoint.x) / 2,
            y: rotatedTopMiddlePoint.y +
                (symmetricPoint.y - rotatedTopMiddlePoint.y) / 2,
        };
        style.height = Math.round(newHeight);
        style.top = Math.round(newCenter.y - newHeight / 2);
        style.left = Math.round(newCenter.x - style.width / 2);
    }
}
function calculateRight(style, curPositon, pointInfo) {
    const { symmetricPoint, curPoint } = pointInfo;
    const rotatedcurPositon = calculateRotatedPointCoordinate(curPositon, curPoint, -style.rotate);
    const rotatedRightMiddlePoint = calculateRotatedPointCoordinate({
        x: rotatedcurPositon.x,
        y: curPoint.y,
    }, curPoint, style.rotate);
    const newWidth = Math.sqrt(Math.pow((rotatedRightMiddlePoint.x - symmetricPoint.x), 2) +
        Math.pow((rotatedRightMiddlePoint.y - symmetricPoint.y), 2));
    if (newWidth > 0) {
        const newCenter = {
            x: rotatedRightMiddlePoint.x -
                (rotatedRightMiddlePoint.x - symmetricPoint.x) / 2,
            y: rotatedRightMiddlePoint.y +
                (symmetricPoint.y - rotatedRightMiddlePoint.y) / 2,
        };
        style.width = Math.round(newWidth);
        style.top = Math.round(newCenter.y - style.height / 2);
        style.left = Math.round(newCenter.x - newWidth / 2);
    }
}
function calculateBottom(style, curPositon, pointInfo) {
    const { symmetricPoint, curPoint } = pointInfo;
    const rotatedcurPositon = calculateRotatedPointCoordinate(curPositon, curPoint, -style.rotate);
    const rotatedBottomMiddlePoint = calculateRotatedPointCoordinate({
        x: curPoint.x,
        y: rotatedcurPositon.y,
    }, curPoint, style.rotate);
    const newHeight = Math.sqrt(Math.pow((rotatedBottomMiddlePoint.x - symmetricPoint.x), 2) +
        Math.pow((rotatedBottomMiddlePoint.y - symmetricPoint.y), 2));
    if (newHeight > 0) {
        const newCenter = {
            x: rotatedBottomMiddlePoint.x -
                (rotatedBottomMiddlePoint.x - symmetricPoint.x) / 2,
            y: rotatedBottomMiddlePoint.y +
                (symmetricPoint.y - rotatedBottomMiddlePoint.y) / 2,
        };
        style.height = Math.round(newHeight);
        style.top = Math.round(newCenter.y - newHeight / 2);
        style.left = Math.round(newCenter.x - style.width / 2);
    }
}
function calculateLeft(style, curPositon, pointInfo) {
    const { symmetricPoint, curPoint } = pointInfo;
    const rotatedcurPositon = calculateRotatedPointCoordinate(curPositon, curPoint, -style.rotate);
    const rotatedLeftMiddlePoint = calculateRotatedPointCoordinate({
        x: rotatedcurPositon.x,
        y: curPoint.y,
    }, curPoint, style.rotate);
    const newWidth = Math.sqrt(Math.pow((rotatedLeftMiddlePoint.x - symmetricPoint.x), 2) +
        Math.pow((rotatedLeftMiddlePoint.y - symmetricPoint.y), 2));
    if (newWidth > 0) {
        const newCenter = {
            x: rotatedLeftMiddlePoint.x -
                (rotatedLeftMiddlePoint.x - symmetricPoint.x) / 2,
            y: rotatedLeftMiddlePoint.y +
                (symmetricPoint.y - rotatedLeftMiddlePoint.y) / 2,
        };
        style.width = Math.round(newWidth);
        style.top = Math.round(newCenter.y - style.height / 2);
        style.left = Math.round(newCenter.x - newWidth / 2);
    }
}
function calculateRightTop(style, curPositon, pointInfo) {
    const { symmetricPoint } = pointInfo;
    const newCenterPoint = getCenterPoint(curPositon, symmetricPoint);
    const newTopRightPoint = calculateRotatedPointCoordinate(curPositon, newCenterPoint, -style.rotate);
    const newBottomLeftPoint = calculateRotatedPointCoordinate(symmetricPoint, newCenterPoint, -style.rotate);
    const newWidth = newTopRightPoint.x - newBottomLeftPoint.x;
    const newHeight = newBottomLeftPoint.y - newTopRightPoint.y;
    if (newWidth > 0 && newHeight > 0) {
        style.width = Math.round(newWidth);
        style.height = Math.round(newHeight);
        style.left = Math.round(newBottomLeftPoint.x);
        style.top = Math.round(newTopRightPoint.y);
    }
}
function calculateRightBottom(style, curPositon, pointInfo) {
    const { symmetricPoint } = pointInfo;
    const newCenterPoint = getCenterPoint(curPositon, symmetricPoint);
    const newTopLeftPoint = calculateRotatedPointCoordinate(symmetricPoint, newCenterPoint, -style.rotate);
    const newBottomRightPoint = calculateRotatedPointCoordinate(curPositon, newCenterPoint, -style.rotate);
    const newWidth = newBottomRightPoint.x - newTopLeftPoint.x;
    const newHeight = newBottomRightPoint.y - newTopLeftPoint.y;
    if (newWidth > 0 && newHeight > 0) {
        style.width = Math.round(newWidth);
        style.height = Math.round(newHeight);
        style.left = Math.round(newTopLeftPoint.x);
        style.top = Math.round(newTopLeftPoint.y);
    }
}
function calculateLeftBottom(style, curPositon, pointInfo) {
    const { symmetricPoint } = pointInfo;
    const newCenterPoint = getCenterPoint(curPositon, symmetricPoint);
    const newTopRightPoint = calculateRotatedPointCoordinate(symmetricPoint, newCenterPoint, -style.rotate);
    const newBottomLeftPoint = calculateRotatedPointCoordinate(curPositon, newCenterPoint, -style.rotate);
    const newWidth = newTopRightPoint.x - newBottomLeftPoint.x;
    const newHeight = newBottomLeftPoint.y - newTopRightPoint.y;
    if (newWidth > 0 && newHeight > 0) {
        style.width = Math.round(newWidth);
        style.height = Math.round(newHeight);
        style.left = Math.round(newBottomLeftPoint.x);
        style.top = Math.round(newTopRightPoint.y);
    }
}
export default function calculateComponentPositonAndSize(name, style, curPositon, pointInfo) {
    funcs[name](style, curPositon, pointInfo);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsY3VsYXRlQ29tcG9uZW50UG9zaXRvbkFuZFNpemUuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vcHJvamVjdHMvbmd4LXZpc3VhbC1kcmFnL3NyYy8iLCJzb3VyY2VzIjpbImxpYi91dGlscy9jYWxjdWxhdGVDb21wb25lbnRQb3NpdG9uQW5kU2l6ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsK0JBQStCLEVBQUUsY0FBYyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRTlFLE1BQU0sS0FBSyxHQUFHO0lBQ1osRUFBRSxFQUFFLGdCQUFnQjtJQUNwQixDQUFDLEVBQUUsWUFBWTtJQUNmLEVBQUUsRUFBRSxpQkFBaUI7SUFDckIsQ0FBQyxFQUFFLGNBQWM7SUFDakIsRUFBRSxFQUFFLG9CQUFvQjtJQUN4QixDQUFDLEVBQUUsZUFBZTtJQUNsQixFQUFFLEVBQUUsbUJBQW1CO0lBQ3ZCLENBQUMsRUFBRSxhQUFhO0NBQ2pCLENBQUM7QUFFRixTQUFTLGdCQUFnQixDQUFDLEtBQUssRUFBRSxVQUFVLEVBQUUsU0FBUztJQUNwRCxNQUFNLEVBQUUsY0FBYyxFQUFFLEdBQUcsU0FBUyxDQUFDO0lBQ3JDLE1BQU0sY0FBYyxHQUFHLGNBQWMsQ0FBQyxVQUFVLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDbEUsTUFBTSxlQUFlLEdBQUcsK0JBQStCLENBQ3JELFVBQVUsRUFDVixjQUFjLEVBQ2QsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUNkLENBQUM7SUFDRixNQUFNLG1CQUFtQixHQUFHLCtCQUErQixDQUN6RCxjQUFjLEVBQ2QsY0FBYyxFQUNkLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FDZCxDQUFDO0lBRUYsTUFBTSxRQUFRLEdBQUcsbUJBQW1CLENBQUMsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUM7SUFDM0QsTUFBTSxTQUFTLEdBQUcsbUJBQW1CLENBQUMsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUM7SUFDNUQsSUFB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K0IsQ0FDeEQsVUFBVSxFQUNWLGNBQWMsRUFDZCxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQ2QsQ0FBQztJQUVGLE1BQU0sUUFBUSxHQUFHLGdCQUFnQixDQUFDLENBQUMsR0FBRyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7SUFDM0QsTUFBTSxTQUFTLEdBQUcsa0JBQWtCLENBQUMsQ0FBQyxHQUFHLGdCQUFnQixDQUFDLENBQUMsQ0FBQztJQUM1RCxJQUFJLFFBQVEsR0FBRyxDQUFDLElBQUksU0FBUyxHQUFHLENBQUMsRUFBRTtRQUNqQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3JDLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5QyxLQUFLLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDNUM7QUFDSCxDQUFDO0FBRUQsTUFBTSxDQUFDLE9BQU8sVUFBVSxnQ0FBZ0MsQ0FDdEQsSUFBSSxFQUNKLEtBQUssRUFDTCxVQUFVLEVBQ1YsU0FBUztJQUVULEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQzVDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjYWxjdWxhdGVSb3RhdGVkUG9pbnRDb29yZGluYXRlLCBnZXRDZW50ZXJQb2ludCB9IGZyb20gJy4vdHJhbnNsYXRlJztcclxuXHJcbmNvbnN0IGZ1bmNzID0ge1xyXG4gIGx0OiBjYWxjdWxhdGVMZWZ0VG9wLFxyXG4gIHQ6IGNhbGN1bGF0ZVRvcCxcclxuICBydDogY2FsY3VsYXRlUmlnaHRUb3AsXHJcbiAgcjogY2FsY3VsYXRlUmlnaHQsXHJcbiAgcmI6IGNhbGN1bGF0ZVJpZ2h0Qm90dG9tLFxyXG4gIGI6IGNhbGN1bGF0ZUJvdHRvbSxcclxuICBsYjogY2FsY3VsYXRlTGVmdEJvdHRvbSxcclxuICBsOiBjYWxjdWxhdGVMZWZ0LFxyXG59O1xyXG5cclxuZnVuY3Rpb24gY2FsY3VsYXRlTGVmdFRvcChzdHlsZSwgY3VyUG9zaXRvbiwgcG9pbnRJbmZvKSB7XHJcbiAgY29uc3QgeyBzeW1tZXRyaWNQb2ludCB9ID0gcG9pbnRJbmZvO1xyXG4gIGNvbnN0IG5ld0NlbnRlclBvaW50ID0gZ2V0Q2VudGVyUG9pbnQoY3VyUG9zaXRvbiwgc3ltbWV0cmljUG9pbnQpO1xyXG4gIGNvbnN0IG5ld1RvcExlZnRQb2ludCA9IGNhbGN1bGF0ZVJvdGF0ZWRQb2ludENvb3JkaW5hdGUoXHJcbiAgICBjdXJQb3NpdG9uLFxyXG4gICAgbmV3Q2VudGVyUG9pbnQsXHJcbiAgICAtc3R5bGUucm90YXRlXHJcbiAgKTtcclxuICBjb25zdCBuZXdCb3R0b21SaWdodFBvaW50ID0gY2FsY3VsYXRlUm90YXRlZFBvaW50Q29vcmRpbmF0ZShcclxuICAgIHN5bW1ldHJpY1BvaW50LFxyXG4gICAgbmV3Q2VudGVyUG9pbnQsXHJcbiAgICAtc3R5bGUucm90YXRlXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgbmV3V2lkdGggPSBuZXdCb3R0b21SaWdodFBvaW50LnggLSBuZXdUb3BMZWZ0UG9pbnQueDtcclxuICBjb25zdCBuZXdIZWlnaHQgPSBuZXdCb3R0b21SaWdodFBvaW50LnkgLSBuZXdUb3BMZWZ0UG9pbnQueTtcclxuICBpZiAobmV3V2lkdGggPiAwICYmIG5ld0hlaWdodCA+IDApIHtcclxuICAgIHN0eWxlLndpZHRoID0gTWF0aC5yb3VuZChuZXdXaWR0aCk7XHJcbiAgICBzdHlsZS5oZWlnaHQgPSBNYXRoLnJvdW5kKG5ld0hlaWdodCk7XHJcbiAgICBzdHlsZS5sZWZ0ID0gTWF0aC5yb3VuZChuZXdUb3BMZWZ0UG9pbnQueCk7XHJcbiAgICBzdHlsZS50b3AgPSBNYXRoLnJvdW5kKG5ld1RvcExlZnRQb2ludC55KTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNhbGN1bGF0ZVRvcChzdHlsZSwgY3VyUG9zaXRvbiwgcG9pbnRJbmZvKSB7XHJcbiAgY29uc3QgeyBzeW1tZXRyaWNQb2ludCwgY3VyUG9pbnQgfSA9IHBvaW50SW5mbztcclxuICBjb25zdCByb3RhdGVkY3VyUG9zaXRvbiA9IGNhbGN1bGF0ZVJvdGF0ZWRQb2ludENvb3JkaW5hdGUoXHJcbiAgICBjdXJQb3NpdG9uLFxyXG4gICAgY3VyUG9pbnQsXHJcbiAgICAtc3R5bGUucm90YXRlXHJcbiAgKTtcclxuICBjb25zdCByb3RhdGVkVG9wTWlkZGxlUG9pbnQgPSBjYWxjdWxhdGVSb3RhdGVkUG9pbnRDb29yZGluYXRlKFxyXG4gICAge1xyXG4gICAgICB4OiBjdXJQb2ludC54LFxyXG4gICAgICB5OiByb3RhdGVkY3VyUG9zaXRvbi55LFxyXG4gICAgfSxcclxuICAgIGN1clBvaW50LFxyXG4gICAgc3R5bGUucm90YXRlXHJcbiAgKTtcclxuXHJcbiAgLy8g5Yu+6IKh5a6a55CGXHJcbiAgY29uc3QgbmV3SGVpZ2h0ID0gTWF0aC5zcXJ0KFxyXG4gICAgKHJvdGF0ZWRUb3BNaWRkbGVQb2ludC54IC0gc3ltbWV0cmljUG9pbnQueCkgKiogMiArXHJcbiAgICAgIChyb3RhdGVkVG9wTWlkZGxlUG9pbnQueSAtIHN5bW1ldHJpY1BvaW50LnkpICoqIDJcclxuICApO1xyXG5cclxuICBpZiAobmV3SGVpZ2h0ID4gMCkge1xyXG4gICAgY29uc3QgbmV3Q2VudGVyID0ge1xyXG4gICAgICB4OlxyXG4gICAgICAgIHJvdGF0ZWRUb3BNaWRkbGVQb2ludC54IC1cclxuICAgICAgICAocm90YXRlZFRvcE1pZGRsZVBvaW50LnggLSBzeW1tZXRyaWNQb2ludC54KSAvIDIsXHJcbiAgICAgIHk6XHJcbiAgICAgICAgcm90YXRlZFRvcE1pZGRsZVBvaW50LnkgK1xyXG4gICAgICAgIChzeW1tZXRyaWNQb2ludC55IC0gcm90YXRlZFRvcE1pZGRsZVBvaW50LnkpIC8gMixcclxuICAgIH07XHJcblxyXG4gICAgc3R5bGUuaGVpZ2h0ID0gTWF0aC5yb3VuZChuZXdIZWlnaHQpO1xyXG4gICAgc3R5bGUudG9wID0gTWF0aC5yb3VuZChuZXdDZW50ZXIueSAtIG5ld0hlaWdodCAvIDIpO1xyXG4gICAgc3R5bGUubGVmdCA9IE1hdGgucm91bmQobmV3Q2VudGVyLnggLSBzdHlsZS53aWR0aCAvIDIpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2FsY3VsYXRlUmlnaHQoc3R5bGUsIGN1clBvc2l0b24sIHBvaW50SW5mbykge1xyXG4gIGNvbnN0IHsgc3ltbWV0cmljUG9pbnQsIGN1clBvaW50IH0gPSBwb2ludEluZm87XHJcbiAgY29uc3Qgcm90YXRlZGN1clBvc2l0b24gPSBjYWxjdWxhdGVSb3RhdGVkUG9pbnRDb29yZGluYXRlKFxyXG4gICAgY3VyUG9zaXRvbixcclxuICAgIGN1clBvaW50LFxyXG4gICAgLXN0eWxlLnJvdGF0ZVxyXG4gICk7XHJcbiAgY29uc3Qgcm90YXRlZFJpZ2h0TWlkZGxlUG9pbnQgPSBjYWxjdWxhdGVSb3RhdGVkUG9pbnRDb29yZGluYXRlKFxyXG4gICAge1xyXG4gICAgICB4OiByb3RhdGVkY3VyUG9zaXRvbi54LFxyXG4gICAgICB5OiBjdXJQb2ludC55LFxyXG4gICAgfSxcclxuICAgIGN1clBvaW50LFxyXG4gICAgc3R5bGUucm90YXRlXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgbmV3V2lkdGggPSBNYXRoLnNxcnQoXHJcbiAgICAocm90YXRlZFJpZ2h0TWlkZGxlUG9pbnQueCAtIHN5bW1ldHJpY1BvaW50LngpICoqIDIgK1xyXG4gICAgICAocm90YXRlZFJpZ2h0TWlkZGxlUG9pbnQueSAtIHN5bW1ldHJpY1BvaW50LnkpICoqIDJcclxuICApO1xyXG4gIGlmIChuZXdXaWR0aCA+IDApIHtcclxuICAgIGNvbnN0IG5ld0NlbnRlciA9IHtcclxuICAgICAgeDpcclxuICAgICAgICByb3RhdGVkUmlnaHRNaWRkbGVQb2ludC54IC1cclxuICAgICAgICAocm90YXRlZFJpZ2h0TWlkZGxlUG9pbnQueCAtIHN5bW1ldHJpY1BvaW50LngpIC8gMixcclxuICAgICAgeTpcclxuICAgICAgICByb3RhdGVkUmlnaHRNaWRkbGVQb2ludC55ICtcclxuICAgICAgICAoc3ltbWV0cmljUG9pbnQueSAtIHJvdGF0ZWRSaWdodE1pZGRsZVBvaW50LnkpIC8gMixcclxuICAgIH07XHJcblxyXG4gICAgc3R5bGUud2lkdGggPSBNYXRoLnJvdW5kKG5ld1dpZHRoKTtcclxuICAgIHN0eWxlLnRvcCA9IE1hdGgucm91bmQobmV3Q2VudGVyLnkgLSBzdHlsZS5oZWlnaHQgLyAyKTtcclxuICAgIHN0eWxlLmxlZnQgPSBNYXRoLnJvdW5kKG5ld0NlbnRlci54IC0gbmV3V2lkdGggLyAyKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNhbGN1bGF0ZUJvdHRvbShzdHlsZSwgY3VyUG9zaXRvbiwgcG9pbnRJbmZvKSB7XHJcbiAgY29uc3QgeyBzeW1tZXRyaWNQb2ludCwgY3VyUG9pbnQgfSA9IHBvaW50SW5mbztcclxuICBjb25zdCByb3RhdGVkY3VyUG9zaXRvbiA9IGNhbGN1bGF0ZVJvdGF0ZWRQb2ludENvb3JkaW5hdGUoXHJcbiAgICBjdXJQb3NpdG9uLFxyXG4gICAgY3VyUG9pbnQsXHJcbiAgICAtc3R5bGUucm90YXRlXHJcbiAgKTtcclxuICBjb25zdCByb3RhdGVkQm90dG9tTWlkZGxlUG9pbnQgPSBjYWxjdWxhdGVSb3RhdGVkUG9pbnRDb29yZGluYXRlKFxyXG4gICAge1xyXG4gICAgICB4OiBjdXJQb2ludC54LFxyXG4gICAgICB5OiByb3RhdGVkY3VyUG9zaXRvbi55LFxyXG4gICAgfSxcclxuICAgIGN1clBvaW50LFxyXG4gICAgc3R5bGUucm90YXRlXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgbmV3SGVpZ2h0ID0gTWF0aC5zcXJ0KFxyXG4gICAgKHJvdGF0ZWRCb3R0b21NaWRkbGVQb2ludC54IC0gc3ltbWV0cmljUG9pbnQueCkgKiogMiArXHJcbiAgICAgIChyb3RhdGVkQm90dG9tTWlkZGxlUG9pbnQueSAtIHN5bW1ldHJpY1BvaW50LnkpICoqIDJcclxuICApO1xyXG4gIGlmIChuZXdIZWlnaHQgPiAwKSB7XHJcbiAgICBjb25zdCBuZXdDZW50ZXIgPSB7XHJcbiAgICAgIHg6XHJcbiAgICAgICAgcm90YXRlZEJvdHRvbU1pZGRsZVBvaW50LnggLVxyXG4gICAgICAgIChyb3RhdGVkQm90dG9tTWlkZGxlUG9pbnQueCAtIHN5bW1ldHJpY1BvaW50LngpIC8gMixcclxuICAgICAgeTpcclxuICAgICAgICByb3RhdGVkQm90dG9tTWlkZGxlUG9pbnQueSArXHJcbiAgICAgICAgKHN5bW1ldHJpY1BvaW50LnkgLSByb3RhdGVkQm90dG9tTWlkZGxlUG9pbnQueSkgLyAyLFxyXG4gICAgfTtcclxuICAgIHN0eWxlLmhlaWdodCA9IE1hdGgucm91bmQobmV3SGVpZ2h0KTtcclxuICAgIHN0eWxlLnRvcCA9IE1hdGgucm91bmQobmV3Q2VudGVyLnkgLSBuZXdIZWlnaHQgLyAyKTtcclxuICAgIHN0eWxlLmxlZnQgPSBNYXRoLnJvdW5kKG5ld0NlbnRlci54IC0gc3R5bGUud2lkdGggLyAyKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNhbGN1bGF0ZUxlZnQoc3R5bGUsIGN1clBvc2l0b24sIHBvaW50SW5mbykge1xyXG4gIGNvbnN0IHsgc3ltbWV0cmljUG9pbnQsIGN1clBvaW50IH0gPSBwb2ludEluZm87XHJcbiAgY29uc3Qgcm90YXRlZGN1clBvc2l0b24gPSBjYWxjdWxhdGVSb3RhdGVkUG9pbnRDb29yZGluYXRlKFxyXG4gICAgY3VyUG9zaXRvbixcclxuICAgIGN1clBvaW50LFxyXG4gICAgLXN0eWxlLnJvdGF0ZVxyXG4gICk7XHJcbiAgY29uc3Qgcm90YXRlZExlZnRNaWRkbGVQb2ludCA9IGNhbGN1bGF0ZVJvdGF0ZWRQb2ludENvb3JkaW5hdGUoXHJcbiAgICB7XHJcbiAgICAgIHg6IHJvdGF0ZWRjdXJQb3NpdG9uLngsXHJcbiAgICAgIHk6IGN1clBvaW50LnksXHJcbiAgICB9LFxyXG4gICAgY3VyUG9pbnQsXHJcbiAgICBzdHlsZS5yb3RhdGVcclxuICApO1xyXG5cclxuICBjb25zdCBuZXdXaWR0aCA9IE1hdGguc3FydChcclxuICAgIChyb3RhdGVkTGVmdE1pZGRsZVBvaW50LnggLSBzeW1tZXRyaWNQb2ludC54KSAqKiAyICtcclxuICAgICAgKHJvdGF0ZWRMZWZ0TWlkZGxlUG9pbnQueSAtIHN5bW1ldHJpY1BvaW50LnkpICoqIDJcclxuICApO1xyXG4gIGlmIChuZXdXaWR0aCA+IDApIHtcclxuICAgIGNvbnN0IG5ld0NlbnRlciA9IHtcclxuICAgICAgeDpcclxuICAgICAgICByb3RhdGVkTGVmdE1pZGRsZVBvaW50LnggLVxyXG4gICAgICAgIChyb3RhdGVkTGVmdE1pZGRsZVBvaW50LnggLSBzeW1tZXRyaWNQb2ludC54KSAvIDIsXHJcbiAgICAgIHk6XHJcbiAgICAgICAgcm90YXRlZExlZnRNaWRkbGVQb2ludC55ICtcclxuICAgICAgICAoc3ltbWV0cmljUG9pbnQueSAtIHJvdGF0ZWRMZWZ0TWlkZGxlUG9pbnQueSkgLyAyLFxyXG4gICAgfTtcclxuXHJcbiAgICBzdHlsZS53aWR0aCA9IE1hdGgucm91bmQobmV3V2lkdGgpO1xyXG4gICAgc3R5bGUudG9wID0gTWF0aC5yb3VuZChuZXdDZW50ZXIueSAtIHN0eWxlLmhlaWdodCAvIDIpO1xyXG4gICAgc3R5bGUubGVmdCA9IE1hdGgucm91bmQobmV3Q2VudGVyLnggLSBuZXdXaWR0aCAvIDIpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2FsY3VsYXRlUmlnaHRUb3Aoc3R5bGUsIGN1clBvc2l0b24sIHBvaW50SW5mbykge1xyXG4gIGNvbnN0IHsgc3ltbWV0cmljUG9pbnQgfSA9IHBvaW50SW5mbztcclxuICBjb25zdCBuZXdDZW50ZXJQb2ludCA9IGdldENlbnRlclBvaW50KGN1clBvc2l0b24sIHN5bW1ldHJpY1BvaW50KTtcclxuICBjb25zdCBuZXdUb3BSaWdodFBvaW50ID0gY2FsY3VsYXRlUm90YXRlZFBvaW50Q29vcmRpbmF0ZShcclxuICAgIGN1clBvc2l0b24sXHJcbiAgICBuZXdDZW50ZXJQb2ludCxcclxuICAgIC1zdHlsZS5yb3RhdGVcclxuICApO1xyXG4gIGNvbnN0IG5ld0JvdHRvbUxlZnRQb2ludCA9IGNhbGN1bGF0ZVJvdGF0ZWRQb2ludENvb3JkaW5hdGUoXHJcbiAgICBzeW1tZXRyaWNQb2ludCxcclxuICAgIG5ld0NlbnRlclBvaW50LFxyXG4gICAgLXN0eWxlLnJvdGF0ZVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IG5ld1dpZHRoID0gbmV3VG9wUmlnaHRQb2ludC54IC0gbmV3Qm90dG9tTGVmdFBvaW50Lng7XHJcbiAgY29uc3QgbmV3SGVpZ2h0ID0gbmV3Qm90dG9tTGVmdFBvaW50LnkgLSBuZXdUb3BSaWdodFBvaW50Lnk7XHJcbiAgaWYgKG5ld1dpZHRoID4gMCAmJiBuZXdIZWlnaHQgPiAwKSB7XHJcbiAgICBzdHlsZS53aWR0aCA9IE1hdGgucm91bmQobmV3V2lkdGgpO1xyXG4gICAgc3R5bGUuaGVpZ2h0ID0gTWF0aC5yb3VuZChuZXdIZWlnaHQpO1xyXG4gICAgc3R5bGUubGVmdCA9IE1hdGgucm91bmQobmV3Qm90dG9tTGVmdFBvaW50LngpO1xyXG4gICAgc3R5bGUudG9wID0gTWF0aC5yb3VuZChuZXdUb3BSaWdodFBvaW50LnkpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2FsY3VsYXRlUmlnaHRCb3R0b20oc3R5bGUsIGN1clBvc2l0b24sIHBvaW50SW5mbykge1xyXG4gIGNvbnN0IHsgc3ltbWV0cmljUG9pbnQgfSA9IHBvaW50SW5mbztcclxuICBjb25zdCBuZXdDZW50ZXJQb2ludCA9IGdldENlbnRlclBvaW50KGN1clBvc2l0b24sIHN5bW1ldHJpY1BvaW50KTtcclxuICBjb25zdCBuZXdUb3BMZWZ0UG9pbnQgPSBjYWxjdWxhdGVSb3RhdGVkUG9pbnRDb29yZGluYXRlKFxyXG4gICAgc3ltbWV0cmljUG9pbnQsXHJcbiAgICBuZXdDZW50ZXJQb2ludCxcclxuICAgIC1zdHlsZS5yb3RhdGVcclxuICApO1xyXG4gIGNvbnN0IG5ld0JvdHRvbVJpZ2h0UG9pbnQgPSBjYWxjdWxhdGVSb3RhdGVkUG9pbnRDb29yZGluYXRlKFxyXG4gICAgY3VyUG9zaXRvbixcclxuICAgIG5ld0NlbnRlclBvaW50LFxyXG4gICAgLXN0eWxlLnJvdGF0ZVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IG5ld1dpZHRoID0gbmV3Qm90dG9tUmlnaHRQb2ludC54IC0gbmV3VG9wTGVmdFBvaW50Lng7XHJcbiAgY29uc3QgbmV3SGVpZ2h0ID0gbmV3Qm90dG9tUmlnaHRQb2ludC55IC0gbmV3VG9wTGVmdFBvaW50Lnk7XHJcbiAgaWYgKG5ld1dpZHRoID4gMCAmJiBuZXdIZWlnaHQgPiAwKSB7XHJcbiAgICBzdHlsZS53aWR0aCA9IE1hdGgucm91bmQobmV3V2lkdGgpO1xyXG4gICAgc3R5bGUuaGVpZ2h0ID0gTWF0aC5yb3VuZChuZXdIZWlnaHQpO1xyXG4gICAgc3R5bGUubGVmdCA9IE1hdGgucm91bmQobmV3VG9wTGVmdFBvaW50LngpO1xyXG4gICAgc3R5bGUudG9wID0gTWF0aC5yb3VuZChuZXdUb3BMZWZ0UG9pbnQueSk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjYWxjdWxhdGVMZWZ0Qm90dG9tKHN0eWxlLCBjdXJQb3NpdG9uLCBwb2ludEluZm8pIHtcclxuICBjb25zdCB7IHN5bW1ldHJpY1BvaW50IH0gPSBwb2ludEluZm87XHJcbiAgY29uc3QgbmV3Q2VudGVyUG9pbnQgPSBnZXRDZW50ZXJQb2ludChjdXJQb3NpdG9uLCBzeW1tZXRyaWNQb2ludCk7XHJcbiAgY29uc3QgbmV3VG9wUmlnaHRQb2ludCA9IGNhbGN1bGF0ZVJvdGF0ZWRQb2ludENvb3JkaW5hdGUoXHJcbiAgICBzeW1tZXRyaWNQb2ludCxcclxuICAgIG5ld0NlbnRlclBvaW50LFxyXG4gICAgLXN0eWxlLnJvdGF0ZVxyXG4gICk7XHJcbiAgY29uc3QgbmV3Qm90dG9tTGVmdFBvaW50ID0gY2FsY3VsYXRlUm90YXRlZFBvaW50Q29vcmRpbmF0ZShcclxuICAgIGN1clBvc2l0b24sXHJcbiAgICBuZXdDZW50ZXJQb2ludCxcclxuICAgIC1zdHlsZS5yb3RhdGVcclxuICApO1xyXG5cclxuICBjb25zdCBuZXdXaWR0aCA9IG5ld1RvcFJpZ2h0UG9pbnQueCAtIG5ld0JvdHRvbUxlZnRQb2ludC54O1xyXG4gIGNvbnN0IG5ld0hlaWdodCA9IG5ld0JvdHRvbUxlZnRQb2ludC55IC0gbmV3VG9wUmlnaHRQb2ludC55O1xyXG4gIGlmIChuZXdXaWR0aCA+IDAgJiYgbmV3SGVpZ2h0ID4gMCkge1xyXG4gICAgc3R5bGUud2lkdGggPSBNYXRoLnJvdW5kKG5ld1dpZHRoKTtcclxuICAgIHN0eWxlLmhlaWdodCA9IE1hdGgucm91bmQobmV3SGVpZ2h0KTtcclxuICAgIHN0eWxlLmxlZnQgPSBNYXRoLnJvdW5kKG5ld0JvdHRvbUxlZnRQb2ludC54KTtcclxuICAgIHN0eWxlLnRvcCA9IE1hdGgucm91bmQobmV3VG9wUmlnaHRQb2ludC55KTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNhbGN1bGF0ZUNvbXBvbmVudFBvc2l0b25BbmRTaXplKFxyXG4gIG5hbWUsXHJcbiAgc3R5bGUsXHJcbiAgY3VyUG9zaXRvbixcclxuICBwb2ludEluZm9cclxuKSB7XHJcbiAgZnVuY3NbbmFtZV0oc3R5bGUsIGN1clBvc2l0b24sIHBvaW50SW5mbyk7XHJcbn1cclxuIl19