import { OnInit } from '@angular/core';
import { ComponentDataService } from '../../../core/component/component-data.service';
export declare class ContextMenuComponent implements OnInit {
    componentDataService: ComponentDataService;
    get menuShow(): boolean;
    get menuTop(): number;
    get menuLeft(): number;
    constructor(componentDataService: ComponentDataService);
    ngOnInit(): void;
    copy(): void;
    paste(): void;
    cut(): void;
    deleteComponent(): void;
    topComponent(): void;
    bottomComponent(): void;
    upComponent(): void;
    downComponent(): void;
}
