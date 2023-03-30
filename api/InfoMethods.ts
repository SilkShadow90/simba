import { ApiNoCRUDMethods } from './ApiNoCRUDMethods';
import { Info } from './types';

// use only getRecord api
class InfoMethods extends ApiNoCRUDMethods<Info> {
  readonly field = 'info';

  readonly apiName = 'Общая информация';
}

export default new InfoMethods();
