import { Component, OnInit, Input } from '@angular/core';
import { FormCommonClass } from '../class/form.common.class';
import { FormGroupsService } from '../service/form-groups.service';
import { FormGroupItemService } from '../service/form-group-item.service';
import { FormOption } from '../interface/form-option.interface';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form-radio',
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
