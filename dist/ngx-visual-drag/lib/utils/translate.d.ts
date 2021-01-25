/**
 * 计算根据圆心旋转后的点的坐标
 * @param   {Object}  point  旋转前的点坐标
 * @param   {Object}  center 旋转中心
 * @param   {Number}  rotate 旋转的角度
 * @return  {Object}         旋转后的坐标
 * https://www.zhihu.com/question/67425734/answer/252724399 旋转矩阵公式
 */
export declare function calculateRotatedPointCoordinate(point: any, center: any, rotate: any): {
    x: any;
    y: any;
};
/**
 * 获取旋转后的点坐标（八个点之一）
 * @param  {Object} style  样式
 * @param  {Object} center 组件中心点
 * @param  {String} name   点名称
 * @return {Object}        旋转后的点坐标
 */
export declare function getRotatedPointCoordinate(style: any, center: any, name: any): {
    x: any;
    y: any;
};
export declare function getCenterPoint(p1: any, p2: any): {
    x: any;
    y: any;
};
export declare function sin(rotate: any): number;
export declare function cos(rotate: any): number;
