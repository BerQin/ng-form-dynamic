import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormCommonClass } from '../../class/form.common.class';
import { FormGroupsService } from '../../service/form-groups.service';
import { FormGroupItemService } from '../../service/form-group-item.service';
import { FormOption } from '../../interface/form-option.interface';

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
    public groupService: FormGroupsService,
    public groupItemService: FormGroupItemService
  ) {
    super(groupService, groupItemService);
  }

  ngOnInit() {
  }
}
