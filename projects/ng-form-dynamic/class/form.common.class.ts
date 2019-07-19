import { Input } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

import { FormGroupsService } from '../service/form-groups.service';
import { FormGroupItemService } from '../service/form-group-item.service';
import { FormOption, SelectOption } from '../interface/form-option.interface';

export class FormCommonClass {

  // tslint:disable-next-line:variable-name
  public _option: FormOption = null;
  public isWeb: boolean = false;
  public selectOptions: SelectOption[] = [];
  public selectOptions$: Observable<SelectOption[]> = new Observable();
  @Input() set option(value: FormOption) {
    this._option = value;
    if (value && value.selectOptions) {
      if ((value.selectOptions as Array<SelectOption>).length ) {
        this.selectOptions = value.selectOptions as Array<SelectOption>;
      } else {
        this.isWeb = true;
        this.selectOptions$ =  value.selectOptions as Observable<SelectOption[]>;
      }
    }
  }

  get option(): FormOption {
    return this._option;
  }

  @Input() groupName: any = null;
  @Input() arrayName: any = null;

  public get FormGroup(): FormGroup | null {
    return this.groupItemService.group;
  }

  public get isHorizontal(): boolean {
    return this.groupService.isHorizontal;
  }

  public ObjectKeys: any = Object.keys;

  constructor(
    public groupService: FormGroupsService,
    public groupItemService: FormGroupItemService
  ) {}
}
