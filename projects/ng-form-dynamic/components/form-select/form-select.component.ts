import { Component, OnInit } from '@angular/core';

import { FormCommonClass } from '../../class/form.common.class';
import { FormGroupsService } from '../../service/form-groups.service';
import { FormGroupItemService } from '../../service/form-group-item.service';

@Component({
  selector: 'fd-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: [
    '../../style/index.less',
    './form-select.component.less'
  ]
})
export class FormSelectComponent extends FormCommonClass implements OnInit {

  constructor(
    public groupService: FormGroupsService,
    public groupItemService: FormGroupItemService
  ) {
    super(groupService, groupItemService);
  }

  ngOnInit() {
  }

}
