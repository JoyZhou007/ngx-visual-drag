import { NzMessageService } from 'ng-zorro-antd/message';
import { Subject } from 'rxjs';
import { CanvasStyleData, ComponentBaseStyle, ComponentBaseData, CopyData, EditModeType, StorageData } from '../../types/component-type';
export declare class ComponentDataService {
    private message;
    componentData: ComponentBaseData[];
    canvasStyleData: CanvasStyleData;
    curComponent: ComponentBaseData;
    curComponentIndex: number;
    $shapeStyle: Subject<ComponentBaseStyle>;
    contextmenu: {
        show: boolean;
        top: number;
        left: number;
    };
    snapshotData: Array<ComponentBaseData[]>;
    snapshotIndex: number;
    notification: Subject<{
        event: string;
        value?: any;
    }>;
    copyData: CopyData;
    editMode: EditModeType;
    $storageData: Subject<StorageData>;
    constructor(message: NzMessageService);
    initData(): void;
    deleteCurComponent(): void;
    hideContextMenu(): void;
    upComponent(): void;
    downComponent(): void;
    topComponent(): void;
    bottomComponent(): void;
    recordSnapshot(): void;
    undo(): void;
    redo(): void;
    setShapePosStyle({ key, value }: {
        key: any;
        value: any;
    }): void;
    copy(): void;
    paste(isMouse: any): void;
    addComponent(component: ComponentBaseData, index?: number): void;
    cut(): void;
    clearCanvas(): void;
    restore(data?: StorageData): void;
    save(): void;
    resetID(data: any): any;
    setEditMode(type: EditModeType): void;
}
