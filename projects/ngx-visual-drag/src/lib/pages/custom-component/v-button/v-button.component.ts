import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'v-button',
  template: `
    <button class="v-button" [ngStyle]="vStyle" [class.absoulte]="absoulte">
      {{ propValue }}
    </button>
  `,
  styleUrls: ['./v-button.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class VButtonComponent implements OnInit {
  @Input() propValue: string = '';
  @Input() vStyle = {};
  @Input() absoulte: boolean = false;
  constructor() {}

  ngOnInit(): void {}
}
