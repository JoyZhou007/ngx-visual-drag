import { TestBed } from '@angular/core/testing';

import { NgxVisualDragService } from './ngx-visual-drag.service';

describe('NgxVisualDragService', () => {
  let service: NgxVisualDragService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxVisualDragService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
