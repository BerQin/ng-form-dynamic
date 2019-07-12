import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { FormCommonClass } from '../../class';
import { FormGroupsService, FormGroupItemService } from '../../service';

@Component({
  selector: 'fd-form-radio',
  templateUrl: './form-radio.component.html',
  styleUrls: ['./form-radio.component.less']
})
export class FormRadioComponent extends FormCommonClass implements OnInit {

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
