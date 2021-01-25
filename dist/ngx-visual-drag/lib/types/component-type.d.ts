export interface ComponentBaseData {
    component: string;
    label: string;
    propValue: string;
    icon: string;
    animations: any[];
    events: Object;
    style: ComponentBaseStyle;
    id: number;
}
export interface ComponentBaseStyle {
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
}
export interface CanvasStyleData {
    width: number;
    height: number;
}
export interface ComponentBasicInput {
    vStyle: Object;
    propValue: string;
}
export interface CopyData {
    data: ComponentBaseData;
    index: number;
}
export declare type EditModeType = 'read' | 'edit';
export interface StorageData {
    canvasData: ComponentBaseData[];
    canvasStyle: CanvasStyleData;
}
