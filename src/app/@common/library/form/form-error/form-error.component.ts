import { Component, OnInit, Input } from '@angular/core';
import { FormCommonClass } from '../class/form.common.class';
import { FormGroupsService } from '../service/form-groups.service';
import { FormOption } from '../interface/form-option.interface';
import { FormGroupItemService } from '../service/form-group-item.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form-error',
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
