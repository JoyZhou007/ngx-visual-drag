export interface ComponentBaseData {
  component: string; // 组件名称
  label: string; // 左侧组件列表中显示的名字
  propValue: string; // 组件所使用的值
  icon: string; // 左侧组件列表中显示的名字
  animations: any[]; // 动画列表
  events: Object; // 事件列表
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
  // 页面全局数据
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

export type EditModeType = 'read' | 'edit';

export interface StorageData {
  canvasData: ComponentBaseData[];
  canvasStyle: CanvasStyleData;
}
