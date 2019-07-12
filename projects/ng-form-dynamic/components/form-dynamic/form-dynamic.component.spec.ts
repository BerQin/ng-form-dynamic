import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDynamicComponent } from './form-dynamic.component';

describe('FormDynamicComponent', () => {
  let component: FormDynamicComponent;
  let fixture: ComponentFixture<FormDynamicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDynamicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
