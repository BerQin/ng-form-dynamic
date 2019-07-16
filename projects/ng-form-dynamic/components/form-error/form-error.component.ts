import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { FormCommonClass } from '../../class';
import { FormOption } from '../../interface';
import { FormGroupsService, FormGroupItemService } from '../../service';

@Component({
  selector: 'fd-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.less']
})
export class FormErrorComponent extends FormCommonClass implements OnInit {

  @Input() option: FormOption = null;
  @Input() groupKey: string = null;
  @Input() arrayKey: string = null;

  get itemControl(): FormGroup {
    if (this.arrayKey) {
      return ((this.FormGroup.get(this.arrayKey) as FormGroup).controls[this.groupKey] as FormGroup).controls[this.option.key] as FormGroup;
    } else if (this.groupKey) {
      return (this.FormGroup.get(this.groupKey) as FormGroup).controls[this.option.key] as FormGroup;
    } else {
      return this.FormGroup.get(this.option.key) as FormGroup;
    }
  }

  constructor(
    public fb: FormBuilder,
    public groupService: FormGroupsService,
    public groupItemService: FormGroupItemService
  ) {
    super(fb, groupService, groupItemService);
  }

  ngOnInit() {
  }
}
