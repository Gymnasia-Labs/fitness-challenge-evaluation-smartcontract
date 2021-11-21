import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionLoadingDialogComponent } from './transaction-loading-dialog.component';

describe('TransactionLoadingDialogComponent', () => {
  let component: TransactionLoadingDialogComponent;
  let fixture: ComponentFixture<TransactionLoadingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionLoadingDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionLoadingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
