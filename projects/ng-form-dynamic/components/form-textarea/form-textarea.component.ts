import { Component, OnInit } from '@angular/core';

import { FormCommonClass } from '../../class/form.common.class';
import { FormGroupsService } from '../../service/form-groups.service';
import { FormGroupItemService } from '../../service/form-group-item.service';

@Component({
  selector: 'fd-form-textarea',
  templateUrl: './form-textarea.component.html',
  styleUrls: [
    '../../style/index.less',
    './form-textarea.component.less'
  ]
})
export class FormTextareaComponent extends FormCommonClass implements OnInit {

  constructor(
    public groupService: FormGroupsService,
    public groupItemService: FormGroupItemService
  ) {
    super(groupService, groupItemService);
  }

  ngOnInit() {
  }
}
