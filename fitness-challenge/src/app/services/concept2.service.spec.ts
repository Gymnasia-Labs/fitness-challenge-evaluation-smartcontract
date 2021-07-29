import { TestBed } from '@angular/core/testing';

import { Concept2Service } from './concept2.service';

describe('Concept2Service', () => {
  let service: Concept2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Concept2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
