import { ApiMethods } from './ApiMethods';
import { Exhibition, IDObject, User } from './types';
import { devLog } from '../utils';

class UserMethods extends ApiMethods<User> {
  readonly field = 'users';

  readonly apiName = 'Пользователь';

  getReferees = async (): Promise<User[]> => {
    return this.getAllByKey('isReferee');
  };

  getExhibitionReferees = async (id?: Exhibition[keyof IDObject]): Promise<User[]> => {
    try {
      if (this.useMock) {
        return this.getMock('users');
      }

      const users = await this.getReferees();

      return users.filter((user: User) => user.exhibitionRefereeIds?.includes(id as string));
    } catch (error) {
      devLog('getUserReferees error');
    }

    return [];
  };
}

export default new UserMethods();
