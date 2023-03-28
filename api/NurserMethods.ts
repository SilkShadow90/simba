import { ApiMethods } from './ApiMethods';
import { Nurser } from './types';

class NurserMethods extends ApiMethods<Nurser> {
  readonly field = 'nurseries';

  readonly apiName = 'Питомник';
}

export default new NurserMethods();
