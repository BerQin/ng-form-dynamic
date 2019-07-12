import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormItemArrayDistributionComponent } from './form-item-array-distribution.component';

describe('FormItemArrayDistributionComponent', () => {
  let component: FormItemArrayDistributionComponent;
  let fixture: ComponentFixture<FormItemArrayDistributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormItemArrayDistributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormItemArrayDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
