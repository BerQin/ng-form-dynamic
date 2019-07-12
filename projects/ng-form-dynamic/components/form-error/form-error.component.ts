import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';

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
