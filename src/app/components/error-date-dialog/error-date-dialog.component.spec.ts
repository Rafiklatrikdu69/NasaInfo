import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorDateDialogComponent } from './error-date-dialog.component';

describe('ErrorDateDialogComponent', () => {
  let component: ErrorDateDialogComponent;
  let fixture: ComponentFixture<ErrorDateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorDateDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ErrorDateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
