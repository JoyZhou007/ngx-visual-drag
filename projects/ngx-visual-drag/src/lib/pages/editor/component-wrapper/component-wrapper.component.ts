import {
  Component,
  ComponentFactoryResolver,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import {
  ComponentBaseData,
  ComponentBaseStyle,
  ComponentBasicInput,
} from '../../../types/component-type';
import getStyle from '../../../utils/style';
import { VButtonComponent } from '../../custom-component/v-button/v-button.component';

@Component({
  selector: 'Component-wrapper',
  templateUrl: './component-wrapper.component.html',
  styleUrls: ['./component-wrapper.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ComponentWrapperComponent implements OnInit, OnChanges {
  @Input() config: ComponentBaseData;
  @ViewChild('viewContainer', { read: ViewContainerRef, static: true })
  viewContainer: ViewContainerRef;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config && changes.config.currentValue) {
      // this.addComponent();
    }
  }

  addComponent() {
    // let cinstance;
    // switch (this.config.component) {
    //   case 'v-button':
    //     cinstance = VButtonComponent;
    //     break;
    //   default:
    //     break;
    // }
    // const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
    //   cinstance
    // );
    // const viewContainerRef = this.viewContainer;
    // const componentRef = viewContainerRef.createComponent(componentFactory);
    // (<ComponentBasicInput>(
    //   componentRef.instance
    // )).propValue = this.config.propValue;
    // (<ComponentBasicInput>componentRef.instance).vStyle = this.config.style;
    // debugger;
  }

  ngOnInit(): void {}

  handleClick() {}

  getComponentStyle(style: ComponentBaseStyle) {
    return getStyle(style);
  }
}
