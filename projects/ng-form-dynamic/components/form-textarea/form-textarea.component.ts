import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { FormCommonClass } from '../../class';
import { FormGroupsService, FormGroupItemService } from '../../service';

@Component({
  selector: 'fd-form-textarea',
  templateUrl: './form-textarea.component.html',
  styleUrls: ['./form-textarea.component.less']
})
export class FormTextareaComponent extends FormCommonClass implements OnInit {

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
