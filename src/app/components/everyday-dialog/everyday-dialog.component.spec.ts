import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EverydayDialogComponent } from './everyday-dialog.component';

describe('DictionaryDialogComponent', () => {
  let component: EverydayDialogComponent;
  let fixture: ComponentFixture<EverydayDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EverydayDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EverydayDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
