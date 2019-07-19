import { Component, OnInit } from '@angular/core';

import { FormCommonClass } from '../../class/form.common.class';
import { FormGroupsService } from '../../service/form-groups.service';
import { FormGroupItemService } from '../../service/form-group-item.service';

@Component({
  selector: 'fd-form-date',
  templateUrl: './form-date.component.html',
  styleUrls: [
    '../../style/index.less',
    './form-date.component.less'
  ]
})
export class FormDateComponent extends FormCommonClass implements OnInit {

  constructor(
    public groupService: FormGroupsService,
    public groupItemService: FormGroupItemService
  ) {
    super(groupService, groupItemService);
  }

  ngOnInit() {
  }
}
