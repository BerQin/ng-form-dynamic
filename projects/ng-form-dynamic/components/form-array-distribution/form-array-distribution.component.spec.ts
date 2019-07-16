import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormArrayDistributionComponent } from './form-array-distribution.component';

describe('FormArrayDistributionComponent', () => {
  let component: FormArrayDistributionComponent;
  let fixture: ComponentFixture<FormArrayDistributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormArrayDistributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormArrayDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
