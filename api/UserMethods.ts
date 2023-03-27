import { ApiMethods } from './ApiMethods';
import { User } from './types';
import { DB } from '../utils/db';

class UserMethods extends ApiMethods {
  getUsers = async (): Promise<User[]> => {
    try {
      if (this.useMock) {
        return this.getMock('users');
      }

      const userRecord = await DB.getApi<Record<string, User>>('users') || {};

      return Object.values(userRecord) || [];
    } catch (error) {
      console.log('getUsers error');
    }

    return [];
  };

  getReferees = async (): Promise<User[]> => {
    try {
      if (this.useMock) {
        return this.getMock('users');
      }

      const users = await this.getUsers();

      return users.filter((user: User) => user.isReferee);
    } catch (error) {
      console.log('getUsers error');
    }

    return [];
  };

  getExhibitionWinners = async (id?: string): Promise<User[]> => {
    try {
      if (this.useMock) {
        return this.getMock('users');
      }

      const users = await this.getUsers();

      return users.filter((user: User) => user.exhibitionsWinner.includes(id as string));
    } catch (error) {
      console.log('getUserWinners error');
    }

    return [];
  };

  getExhibitionReferees = async (id?: string): Promise<User[]> => {
    try {
      if (this.useMock) {
        return this.getMock('users');
      }

      const users = await this.getUsers();

      return users.filter((user: User) => user.isReferee && user.exhibitions.includes(id as string));
    } catch (error) {
      console.log('getUserReferees error');
    }

    return [];
  };

  getUser = async (id?: string): Promise<User | null> => {
    try {
      if (this.useMock) {
        return this.getMock('users', true, id);
      }

      if (id) {
        return await DB.getApi<User>(`users/${id}`);
      }
      console.log('getUsers id is undefined');
    } catch (error) {
      console.log('getUsers error');
    }

    return null;
  };

  createUser = async (user?: Partial<User>, callback?: () => void, errorCallback?: () => void): Promise<void> => {
    try {
      if (this.useMock) {
        return;
      }

      if (user) {
        await DB.postApi<Partial<User>>(`users`, user, callback, errorCallback);
      } else {
        console.log('createUser user is undefined');
      }
    } catch (error) {
      console.log('createUser error');
    }
  };

  updateUser = async (user?: User, callback?: () => void, errorCallback?: () => void): Promise<void> => {
    try {
      if (this.useMock) {
        return;
      }

      if (user) {
        await DB.updateApi<User>(`users`, user, callback, errorCallback);
      } else {
        console.log('updateUser user is undefined');
      }
    } catch (error) {
      console.log('updateUser error');
    }
  };

  deleteUser = async (id?: string, callback?: () => void, errorCallback?: () => void): Promise<void> => {
    try {
      if (this.useMock) {
        return;
      }

      if (id) {
        await DB.deleteApi(`users`, id, callback, errorCallback);
      } else {
        console.log('deleteUser id is undefined');
      }
    } catch (error) {
      console.log('deleteUser error');
    }
  };

  multiDeleteUser = async (ids?: string[], callback?: () => void, errorCallback?: () => void): Promise<void> => {
    try {
      if (this.useMock) {
        return;
      }

      if (ids?.length) {
        await DB.multiDeleteApi(`users`, ids, callback, errorCallback);
      } else {
        console.log('multiDeleteUser ids is undefined');
      }
    } catch (error) {
      console.log('multiDeleteUser error');
    }
  };
}

export default new UserMethods();
