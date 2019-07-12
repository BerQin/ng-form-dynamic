import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormItemDistributionComponent } from './form-item-distribution.component';

describe('FormItemDistributionComponent', () => {
  let component: FormItemDistributionComponent;
  let fixture: ComponentFixture<FormItemDistributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormItemDistributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormItemDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
