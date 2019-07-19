import { Component, OnInit } from '@angular/core';

import { FormCommonClass } from '../../class/form.common.class';
import { FormGroupsService } from '../../service/form-groups.service';
import { FormGroupItemService } from '../../service/form-group-item.service';

@Component({
  selector: 'fd-form-checkbox',
  templateUrl: './form-checkbox.component.html',
  styleUrls: [
    '../../style/index.less',
    './form-checkbox.component.less'
  ]
})
export class FormCheckboxComponent extends FormCommonClass implements OnInit {

  constructor(
    public groupService: FormGroupsService,
    public groupItemService: FormGroupItemService
  ) {
    super(groupService, groupItemService);
  }

  ngOnInit() {
  }
}
