import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable()
export class FormGroupItemService {

  public group: FormGroup | null = null;

  constructor() { }
}
