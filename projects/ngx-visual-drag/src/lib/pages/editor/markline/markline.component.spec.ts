import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarklineComponent } from './markline.component';

describe('MarklineComponent', () => {
  let component: MarklineComponent;
  let fixture: ComponentFixture<MarklineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarklineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarklineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
