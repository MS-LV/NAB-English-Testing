import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingDialogComponent } from './testing-dialog.component';

describe('TestingDialogComponent', () => {
  let component: TestingDialogComponent;
  let fixture: ComponentFixture<TestingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestingDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
