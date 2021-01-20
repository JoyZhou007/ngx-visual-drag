import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxVisualDragComponent } from './ngx-visual-drag.component';

describe('NgxVisualDragComponent', () => {
  let component: NgxVisualDragComponent;
  let fixture: ComponentFixture<NgxVisualDragComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxVisualDragComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxVisualDragComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
