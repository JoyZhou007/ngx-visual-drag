# NgxVisualDrag

This library was a visual drag component develop by angular

# Installation

    npm i ngx-visual-drag

## Params

- [data] 传入组件的数据

        StorageData {
            canvasData: {
                component: string; // 组件名称
                label: string; // 左侧组件列表中显示的名字
                propValue: string; // 组件所使用的值
                icon: string; // 左侧组件列表中显示的名字
                animations: any[]; // 动画列表
                events: Object; // 事件列表
                id: number;
                style: {
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
                    };
               }[];
            canvasStyle:   // 页面全局数据
                width: number;
                height: number;;
        }

- (onDataSave) 画布保存时的回调 `EventEmitter<StorageData>`

## Import Module

    @NgModule({
        declarations: [AppComponent],
        imports: [
            ....,
            NgxVisualDragModule,
        ],
        providers: [],
        })
    export class AppModule {}

## Usage

    <lib-ngx-visual-drag [data]="data" (onDataSave)="onDataSave($event)"></lib-ngx-visual-drag>
