import { Component } from '@angular/core';
import { ComponentDataService } from '../../core/component/component-data.service';
export class AttrListComponent {
    constructor(componentDataService) {
        this.componentDataService = componentDataService;
        this.map = {
            left: 'x 坐标',
            top: 'y 坐标',
            height: '高',
            width: '宽',
            color: '颜色',
            backgroundColor: '背景色',
            borderWidth: '边框宽度',
            borderColor: '边框颜色',
            borderRadius: '边框半径',
            fontSize: '字体大小',
            fontWeight: '字体粗细',
            lineHeight: '行高',
            letterSpacing: '字间距',
            textAlign: '对齐方式',
            opacity: '透明度',
        };
        this.excludes = ['Picture']; // 这些组件不显示内容
        this.options = [
            {
                label: '左对齐',
                value: 'left',
            },
            {
                label: '居中',
                value: 'center',
            },
            {
                label: '右对齐',
                value: 'right',
            },
        ];
    }
    get styleKeys() {
        return this.componentDataService.curComponent
            ? Object.keys(this.componentDataService.curComponent.style).filter((item) => item != 'rotate')
            : [];
    }
    ngOnInit() { }
}
AttrListComponent.decorators = [
    { type: Component, args: [{
                selector: 'Attr-list',
                template: "<div class=\"attr-list\">\n    <div nz-row *ngFor=\"let key of styleKeys\" class=\"mb-10\">\n        <div nz-col nzSpan=\"24\" class=\"mb-10\">{{map[key]}}</div>\n        <div nz-col nzSpan=\"24\">\n            <div [ngSwitch]=\"key\">\n                <div *ngSwitchCase=\"'borderColor'\"><input type=\"color\"\n                        [(ngModel)]=\"componentDataService.curComponent.style[key]\"></div>\n                <div *ngSwitchCase=\"'color'\"><input type=\"color\"\n                        [(ngModel)]=\"componentDataService.curComponent.style[key]\"></div>\n                <div *ngSwitchCase=\"'backgroundColor'\"><input type=\"color\"\n                        [(ngModel)]=\"componentDataService.curComponent.style[key]\"></div>\n                <div *ngSwitchCase=\"'textAlign'\">\n                    <nz-select [(ngModel)]=\"componentDataService.curComponent.style[key]\" style=\"width: 100%;\">\n                        <nz-option [nzValue]=\"item.value\" [nzLabel]=\"item.label\" *ngFor=\"let item of options\">\n                        </nz-option>\n                    </nz-select>\n                </div>\n                <div *ngSwitchDefault>\n                    <input nz-input type=\"number\" [(ngModel)]=\"componentDataService.curComponent.style[key]\">\n                </div>\n            </div>\n        </div>\n    </div>\n    <div nz-row\n        *ngIf=\"componentDataService.curComponent && !excludes.includes(componentDataService.curComponent.component)\">\n        <div nz-col nzSpan=\"24\" class=\"mb-10\">\u5185\u5BB9</div>\n        <div nz-col nzSpan=\"24\">\n            <textarea nz-input [(ngModel)]=\"componentDataService.curComponent.propValue\"\n                [nzAutosize]=\"{ minRows: 2, maxRows: 6 }\"></textarea>\n        </div>\n    </div>\n</div>",
                styles: [".attr-list{height:100%;overflow:auto;padding:0 20px 20px}"]
            },] }
];
AttrListComponent.ctorParameters = () => [
    { type: ComponentDataService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0ci1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi9wcm9qZWN0cy9uZ3gtdmlzdWFsLWRyYWcvc3JjLyIsInNvdXJjZXMiOlsibGliL3BhZ2VzL2F0dHItbGlzdC9hdHRyLWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFPbkYsTUFBTSxPQUFPLGlCQUFpQjtJQXlDNUIsWUFBbUIsb0JBQTBDO1FBQTFDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUF4QzdELFFBQUcsR0FBRztZQUNKLElBQUksRUFBRSxNQUFNO1lBQ1osR0FBRyxFQUFFLE1BQU07WUFDWCxNQUFNLEVBQUUsR0FBRztZQUNYLEtBQUssRUFBRSxHQUFHO1lBQ1YsS0FBSyxFQUFFLElBQUk7WUFDWCxlQUFlLEVBQUUsS0FBSztZQUN0QixXQUFXLEVBQUUsTUFBTTtZQUNuQixXQUFXLEVBQUUsTUFBTTtZQUNuQixZQUFZLEVBQUUsTUFBTTtZQUNwQixRQUFRLEVBQUUsTUFBTTtZQUNoQixVQUFVLEVBQUUsTUFBTTtZQUNsQixVQUFVLEVBQUUsSUFBSTtZQUNoQixhQUFhLEVBQUUsS0FBSztZQUNwQixTQUFTLEVBQUUsTUFBTTtZQUNqQixPQUFPLEVBQUUsS0FBSztTQUNmLENBQUM7UUFDRixhQUFRLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFlBQVk7UUFDcEMsWUFBTyxHQUFHO1lBQ1I7Z0JBQ0UsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osS0FBSyxFQUFFLE1BQU07YUFDZDtZQUNEO2dCQUNFLEtBQUssRUFBRSxJQUFJO2dCQUNYLEtBQUssRUFBRSxRQUFRO2FBQ2hCO1lBQ0Q7Z0JBQ0UsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osS0FBSyxFQUFFLE9BQU87YUFDZjtTQUNGLENBQUM7SUFTOEQsQ0FBQztJQVBqRSxJQUFJLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxZQUFZO1lBQzNDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUM5RCxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxJQUFJLFFBQVEsQ0FDM0I7WUFDSCxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ1QsQ0FBQztJQUdELFFBQVEsS0FBVSxDQUFDOzs7WUFoRHBCLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsV0FBVztnQkFDckIsZ3hEQUF5Qzs7YUFFMUM7OztZQU5RLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21wb25lbnREYXRhU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvY29tcG9uZW50L2NvbXBvbmVudC1kYXRhLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdBdHRyLWxpc3QnLFxuICB0ZW1wbGF0ZVVybDogJy4vYXR0ci1saXN0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vYXR0ci1saXN0LmNvbXBvbmVudC5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIEF0dHJMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgbWFwID0ge1xuICAgIGxlZnQ6ICd4IOWdkOaghycsXG4gICAgdG9wOiAneSDlnZDmoIcnLFxuICAgIGhlaWdodDogJ+mrmCcsXG4gICAgd2lkdGg6ICflrr0nLFxuICAgIGNvbG9yOiAn6aKc6ImyJyxcbiAgICBiYWNrZ3JvdW5kQ29sb3I6ICfog4zmma/oibInLFxuICAgIGJvcmRlcldpZHRoOiAn6L655qGG5a695bqmJyxcbiAgICBib3JkZXJDb2xvcjogJ+i+ueahhuminOiJsicsXG4gICAgYm9yZGVyUmFkaXVzOiAn6L655qGG5Y2K5b6EJyxcbiAgICBmb250U2l6ZTogJ+Wtl+S9k+Wkp+WwjycsXG4gICAgZm9udFdlaWdodDogJ+Wtl+S9k+eyl+e7hicsXG4gICAgbGluZUhlaWdodDogJ+ihjOmrmCcsXG4gICAgbGV0dGVyU3BhY2luZzogJ+Wtl+mXtOi3nScsXG4gICAgdGV4dEFsaWduOiAn5a+56b2Q5pa55byPJyxcbiAgICBvcGFjaXR5OiAn6YCP5piO5bqmJyxcbiAgfTtcbiAgZXhjbHVkZXMgPSBbJ1BpY3R1cmUnXTsgLy8g6L+Z5Lqb57uE5Lu25LiN5pi+56S65YaF5a65XG4gIG9wdGlvbnMgPSBbXG4gICAge1xuICAgICAgbGFiZWw6ICflt6blr7npvZAnLFxuICAgICAgdmFsdWU6ICdsZWZ0JyxcbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAn5bGF5LitJyxcbiAgICAgIHZhbHVlOiAnY2VudGVyJyxcbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAn5Y+z5a+56b2QJyxcbiAgICAgIHZhbHVlOiAncmlnaHQnLFxuICAgIH0sXG4gIF07XG5cbiAgZ2V0IHN0eWxlS2V5cygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuY29tcG9uZW50RGF0YVNlcnZpY2UuY3VyQ29tcG9uZW50XG4gICAgICA/IE9iamVjdC5rZXlzKHRoaXMuY29tcG9uZW50RGF0YVNlcnZpY2UuY3VyQ29tcG9uZW50LnN0eWxlKS5maWx0ZXIoXG4gICAgICAgICAgKGl0ZW0pID0+IGl0ZW0gIT0gJ3JvdGF0ZSdcbiAgICAgICAgKVxuICAgICAgOiBbXTtcbiAgfVxuICBjb25zdHJ1Y3RvcihwdWJsaWMgY29tcG9uZW50RGF0YVNlcnZpY2U6IENvbXBvbmVudERhdGFTZXJ2aWNlKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge31cbn1cbiJdfQ==