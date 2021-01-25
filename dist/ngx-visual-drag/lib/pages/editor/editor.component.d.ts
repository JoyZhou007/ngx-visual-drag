import { OnInit } from '@angular/core';
import { ComponentDataService } from '../../core/component/component-data.service';
import { ComponentBaseStyle } from '../../types/component-type';
export declare class EditorComponent implements OnInit {
    componentDataService: ComponentDataService;
    isEdit: boolean;
    constructor(componentDataService: ComponentDataService);
    ngOnInit(): void;
    handleContextMenu(e: any): void;
    getComponentStyle(style: ComponentBaseStyle): {};
}
