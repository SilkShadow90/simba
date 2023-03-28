import { ApiMethods } from './ApiMethods';
import { Club } from './types';

class ClubMethods extends ApiMethods<Club> {
  readonly field = 'clubs';
}

export default new ClubMethods();
