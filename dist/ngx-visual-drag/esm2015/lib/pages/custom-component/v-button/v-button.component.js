import { Component, Input, ViewEncapsulation } from '@angular/core';
export class VButtonComponent {
    constructor() {
        this.propValue = '';
        this.vStyle = {};
        this.absoulte = false;
    }
    ngOnInit() { }
}
VButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'v-button',
                template: `
    <button class="v-button" [ngStyle]="vStyle" [class.absoulte]="absoulte">
      {{ propValue }}
    </button>
  `,
                encapsulation: ViewEncapsulation.None,
                styles: [".v-button{-webkit-appearance:none;background:#fff;border:1px solid #dcdfe6;box-sizing:border-box;color:#606266;cursor:pointer;display:inline-block;font-size:14px;font-weight:500;height:100%;line-height:1;margin:0;outline:0;text-align:center;transition:.1s;white-space:nowrap;width:100%}.v-button:active{border-color:#3a8ee6;color:#3a8ee6;outline:0}.v-button:hover{background-color:#ecf5ff;color:#3a8ee6}"]
            },] }
];
VButtonComponent.ctorParameters = () => [];
VButtonComponent.propDecorators = {
    propValue: [{ type: Input }],
    vStyle: [{ type: Input }],
    absoulte: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidi1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uL3Byb2plY3RzL25neC12aXN1YWwtZHJhZy9zcmMvIiwic291cmNlcyI6WyJsaWIvcGFnZXMvY3VzdG9tLWNvbXBvbmVudC92LWJ1dHRvbi92LWJ1dHRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFZNUUsTUFBTSxPQUFPLGdCQUFnQjtJQUkzQjtRQUhTLGNBQVMsR0FBVyxFQUFFLENBQUM7UUFDdkIsV0FBTSxHQUFHLEVBQUUsQ0FBQztRQUNaLGFBQVEsR0FBWSxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUVoQixRQUFRLEtBQVUsQ0FBQzs7O1lBaEJwQixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLFFBQVEsRUFBRTs7OztHQUlUO2dCQUVELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOzthQUN0Qzs7Ozt3QkFFRSxLQUFLO3FCQUNMLEtBQUs7dUJBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndi1idXR0b24nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxidXR0b24gY2xhc3M9XCJ2LWJ1dHRvblwiIFtuZ1N0eWxlXT1cInZTdHlsZVwiIFtjbGFzcy5hYnNvdWx0ZV09XCJhYnNvdWx0ZVwiPlxuICAgICAge3sgcHJvcFZhbHVlIH19XG4gICAgPC9idXR0b24+XG4gIGAsXG4gIHN0eWxlVXJsczogWycuL3YtYnV0dG9uLmNvbXBvbmVudC5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIFZCdXR0b25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBwcm9wVmFsdWU6IHN0cmluZyA9ICcnO1xuICBASW5wdXQoKSB2U3R5bGUgPSB7fTtcbiAgQElucHV0KCkgYWJzb3VsdGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge31cbn1cbiJdfQ==