import { ApiMethods } from './ApiMethods';
import { Nurser } from './types';

class NurserMethods extends ApiMethods<Nurser> {
  readonly field = 'nurseries';
}

export default new NurserMethods();
