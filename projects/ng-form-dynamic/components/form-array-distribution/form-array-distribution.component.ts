import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormOption } from '../../interface/form-option.interface';
import { FormGroupItemService } from '../../service/form-group-item.service';

@Component({
  selector: 'fd-form-array-distribution',
  templateUrl: './form-array-distribution.component.html',
  styleUrls: ['./form-array-distribution.component.less'],
  providers: [
    FormGroupItemService
  ]
})
export class FormArrayDistributionComponent implements OnInit {

  @Input() set group(value: FormGroup | null) {
    console.log(value);
    this.groupItemService.group = value;
  }
  get group(): FormGroup | null {
    return this.groupItemService.group;
  }

  @Input() arrayName: string = null;

  @Input() options: FormOption[] = [];

  constructor(
    public groupItemService: FormGroupItemService
  ) { }

  ngOnInit() {
  }

}
