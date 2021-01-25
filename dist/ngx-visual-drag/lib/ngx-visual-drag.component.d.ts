import { EventEmitter, OnInit } from '@angular/core';
import { ComponentDataService } from './core/component/component-data.service';
import { StorageData } from './types/component-type';
export declare class NgxVisualDragComponent implements OnInit {
    private componentDataService;
    data: StorageData;
    onDataSave: EventEmitter<StorageData>;
    constructor(componentDataService: ComponentDataService);
    ngOnInit(): void;
}
