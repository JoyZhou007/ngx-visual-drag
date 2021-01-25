import { OnInit } from '@angular/core';
import { ComponentDataService } from '../../core/component/component-data.service';
import { StorageData } from '../../types/component-type';
export declare class HomeComponent implements OnInit {
    componentDataService: ComponentDataService;
    data: StorageData;
    constructor(componentDataService: ComponentDataService);
    ngOnInit(): void;
    handleDrop(e: any): void;
    handleDragOver(e: any): void;
    deselectCurComponent(): void;
}
