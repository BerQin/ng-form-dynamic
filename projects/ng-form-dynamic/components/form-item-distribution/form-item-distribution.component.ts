import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormGroupItemService } from '../../service';
import { FormOption } from '../../interface';

@Component({
  selector: 'fd-form-item-distribution',
  templateUrl: './form-item-distribution.component.html',
  styleUrls: ['./form-item-distribution.component.less'],
  providers: [
    FormGroupItemService
  ]
})
export class FormItemDistributionComponent implements OnInit {

  @Input() set group(value: FormGroup | null) {
    this.groupItemService.group = value;
  }
  get group(): FormGroup | null {
    return this.groupItemService.group;
  }

  @Input() options: FormOption[] = [];
  @Input() groupName: string = null;

  constructor(
    public groupItemService: FormGroupItemService
  ) { }

  ngOnInit() {
  }

}
