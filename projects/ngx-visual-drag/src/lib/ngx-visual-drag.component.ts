import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'lib-ngx-visual-drag',
  template: `
      <lib-home></lib-home>
  `,
  styleUrls: ['./index.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NgxVisualDragComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
