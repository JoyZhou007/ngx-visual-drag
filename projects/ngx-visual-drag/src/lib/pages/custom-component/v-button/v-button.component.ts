import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'v-button',
  templateUrl: './v-button.component.html',
  styleUrls: ['./v-button.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class VButtonComponent implements OnInit {
  @Input() propValue: string = '';
  @Input() vStyle = {};
  constructor() {}

  ngOnInit(): void {}
}
