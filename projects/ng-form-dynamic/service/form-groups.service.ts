import { Injectable, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ListenComponetDestroyedType } from '../interface/form-service.interface';
import { FormOption } from '../interface/form-option.interface';

@Injectable()
export class FormGroupsService implements OnDestroy {

  public options: FormOption[] = [];
  // tslint:disable-next-line:variable-name
  public _layout: 'horizontal' | 'vertical' | 'inline' = 'horizontal';
  public FormGroup: FormGroup | null = null;
  public FormGroupOption: {
    [key: string]: FormOption
  } = {};
  public groupOptions: {
    [key: string]: FormOption
  } = {};
  public listenComponetDestroyeds$: ListenComponetDestroyedType = {};

  public get isHorizontal(): boolean {
    return this._layout && this._layout === 'horizontal';
  }

  constructor() { }

  ngOnDestroy() {
    for (const key in this.listenComponetDestroyeds$) {
      if (key) {
        this.listenComponetDestroyeds$[key].next();
        this.listenComponetDestroyeds$[key].unsubscribe();
      }
    }
  }
}
