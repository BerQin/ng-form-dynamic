import { FormGroupsService } from '../service/form-groups.service';
import { FormGroupItemService } from '../service/form-group-item.service';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { FormOption } from '../interface';
import { Input } from '@angular/core';

export class FormCommonClass {

  @Input() option: FormOption = null;
  @Input() groupName: any = null;

  public get FormGroup(): FormGroup | null {
    return this.groupItemService.group;
  }

  public get isHorizontal(): boolean {
    return this.groupService.isHorizontal;
  }

  public ObjectKeys = Object.keys;

  constructor(
    public fb: FormBuilder,
    public groupService: FormGroupsService,
    public groupItemService: FormGroupItemService
  ) {}
}
