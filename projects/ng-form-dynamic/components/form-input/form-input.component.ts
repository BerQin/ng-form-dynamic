import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { FormCommonClass } from '../../class';
import { FormGroupsService, FormGroupItemService } from '../../service';

@Component({
  selector: 'fd-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.less']
})
export class FormInputComponent extends FormCommonClass implements OnInit {

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
