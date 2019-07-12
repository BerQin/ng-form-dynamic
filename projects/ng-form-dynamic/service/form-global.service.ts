import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable()
export class FormGlobalService {

  public formGroups: {
    [key: string]: FormGroup
  } = {};

  constructor() { }
}
