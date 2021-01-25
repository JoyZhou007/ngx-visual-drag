import { AfterContentInit, OnInit, QueryList } from '@angular/core';
import { ComponentDataService } from '../../../core/component/component-data.service';
export declare class MarklineComponent implements OnInit, AfterContentInit {
    componentDataService: ComponentDataService;
    lines: string[];
    diff: number;
    lineStatus: {
        xt: boolean;
        xc: boolean;
        xb: boolean;
        yl: boolean;
        yc: boolean;
        yr: boolean;
    };
    $refs: QueryList<any>;
    constructor(componentDataService: ComponentDataService);
    ngAfterContentInit(): void;
    ngOnInit(): void;
    showLine(isDownward: any, isRightward: any): void;
    translateComponentStyle(style: any): any;
    hideLine(): void;
    isNearly(dragValue: any, targetValue: any): boolean;
    translatecurComponentShift(key: any, condition: any, curComponentStyle: any): number;
    chooseTheTureLine(needToShow: any, isDownward: any, isRightward: any): void;
}
