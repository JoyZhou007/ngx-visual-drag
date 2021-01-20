import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VButtonComponent } from './v-button.component';

describe('VButtonComponent', () => {
  let component: VButtonComponent;
  let fixture: ComponentFixture<VButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
