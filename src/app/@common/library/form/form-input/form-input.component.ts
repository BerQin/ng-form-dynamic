import { Component, OnInit, Input } from '@angular/core';
import { FormCommonClass } from '../class/form.common.class';
import { FormGroupsService } from '../service/form-groups.service';
import { FormOption } from '../interface/form-option.interface';
import { FormGroupItemService } from '../service/form-group-item.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form-input',
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
