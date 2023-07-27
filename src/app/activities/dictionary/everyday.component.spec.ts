import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EverydayComponent } from './everyday.component';

describe('DictionaryComponent', () => {
  let component: EverydayComponent;
  let fixture: ComponentFixture<EverydayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EverydayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EverydayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
