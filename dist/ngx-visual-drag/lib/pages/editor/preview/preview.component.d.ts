import { EventEmitter, OnInit } from '@angular/core';
import { ComponentDataService } from '../../../core/component/component-data.service';
export declare class PreviewComponent implements OnInit {
    componentDataService: ComponentDataService;
    isShowPreview: boolean;
    OutClose: EventEmitter<any>;
    constructor(componentDataService: ComponentDataService);
    ngOnInit(): void;
    close(): void;
}
