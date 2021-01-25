import { OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ComponentDataService } from '../../core/component/component-data.service';
export declare class ToolbarComponent implements OnInit {
    componentDataService: ComponentDataService;
    private message;
    isShowPreview: boolean;
    constructor(componentDataService: ComponentDataService, message: NzMessageService);
    ngOnInit(): void;
    redo(): void;
    undo(): void;
    save(): void;
    clearCanvas(): void;
    preview(): void;
    closePreview(): void;
}
