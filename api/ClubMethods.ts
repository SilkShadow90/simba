import { ApiMethods } from './ApiMethods';
import { Club } from './types';

class ClubMethods extends ApiMethods<Club> {
  readonly field = 'clubs';

  readonly apiName = 'Клуб';
}

export default new ClubMethods();
