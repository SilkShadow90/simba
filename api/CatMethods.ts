import { ApiMethods } from './ApiMethods';
import { Cat } from './types';

class CatMethods extends ApiMethods<Cat> {
  readonly field = 'cats';
}

export default new CatMethods();
