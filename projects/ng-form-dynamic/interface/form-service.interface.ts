import { Subject } from 'rxjs';

export interface ListenComponetDestroyedType {
  [key: string]: Subject<any>;
}
