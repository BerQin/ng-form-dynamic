import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { FormCommonClass } from '../../class';
import { FormGroupsService, FormGroupItemService } from '../../service';

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
    public fb: FormBuilder,
    public groupService: FormGroupsService,
    public groupItemService: FormGroupItemService
  ) {
    super(fb, groupService, groupItemService);
  }

  ngOnInit() {
  }

}
