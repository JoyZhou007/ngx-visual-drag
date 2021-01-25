import { OnInit } from '@angular/core';
import { ComponentDataService } from '../../core/component/component-data.service';
export declare class AttrListComponent implements OnInit {
    componentDataService: ComponentDataService;
    map: {
        left: string;
        top: string;
        height: string;
        width: string;
        color: string;
        backgroundColor: string;
        borderWidth: string;
        borderColor: string;
        borderRadius: string;
        fontSize: string;
        fontWeight: string;
        lineHeight: string;
        letterSpacing: string;
        textAlign: string;
        opacity: string;
    };
    excludes: string[];
    options: {
        label: string;
        value: string;
    }[];
    get styleKeys(): string[];
    constructor(componentDataService: ComponentDataService);
    ngOnInit(): void;
}
