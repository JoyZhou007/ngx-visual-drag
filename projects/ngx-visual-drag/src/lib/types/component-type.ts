export interface ComponentDataType {
  component: string; // 组件名称
  label: string; // 左侧组件列表中显示的名字
  propValue: string; // 组件所使用的值
  icon: string; // 左侧组件列表中显示的名字
  animations: any[]; // 动画列表
  events: Object; // 事件列表
  style: ComponentDataStyleType;
  id: number;
}

export interface ComponentDataStyleType {
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

export interface canvasStyleData {
  // 页面全局数据
  width: number;
  height: number;
}
