import { ComponentFactoryResolver, OnChanges, OnInit, SimpleChanges, ViewContainerRef } from '@angular/core';
import { ComponentBaseData, ComponentBaseStyle } from '../../../types/component-type';
export declare class ComponentWrapperComponent implements OnInit, OnChanges {
    private componentFactoryResolver;
    config: ComponentBaseData;
    viewContainer: ViewContainerRef;
    constructor(componentFactoryResolver: ComponentFactoryResolver);
    ngOnChanges(changes: SimpleChanges): void;
    addComponent(): void;
    ngOnInit(): void;
    handleClick(): void;
    getComponentStyle(style: ComponentBaseStyle): {};
}
