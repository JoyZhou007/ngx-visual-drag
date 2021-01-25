import { OnInit } from '@angular/core';
import { ComponentDataService } from '../../../core/component/component-data.service';
import { ComponentBaseStyle, ComponentBaseData } from '../../../types/component-type';
export declare class ShapeComponent implements OnInit {
    componentDataService: ComponentDataService;
    active: boolean;
    element: ComponentBaseData;
    defaultStyle: ComponentBaseStyle;
    index: number;
    cursors: {};
    pointList: string[];
    initialAngle: {
        lt: number;
        t: number;
        rt: number;
        r: number;
        rb: number;
        b: number;
        lb: number;
        l: number;
    };
    angleToCursor: {
        start: number;
        end: number;
        cursor: string;
    }[];
    constructor(componentDataService: ComponentDataService);
    ngOnInit(): void;
    getShapeStyle(style: ComponentBaseStyle): {
        width: any;
        height: any;
        fontSize: number;
        fontWeight: number;
        lineHeight: string;
        letterSpacing: number;
        textAlign: string;
        color: string;
        backgroundColor: string;
        borderColor: string;
        borderRadius: string;
        borderWidth: string;
        left: any;
        opacity: number;
        rotate: any;
        top: any;
    };
    handleMouseDownOnShape(e: any): void;
    selectCurComponent(e: any): void;
    handleRotate(): void;
    handleMouseDownOnPoint(point: string, e: any): void;
    getPointStyle(point: string): {
        marginLeft: string;
        marginTop: string;
        left: string;
        top: string;
        cursor: string;
    };
    getCursor(): {};
}
