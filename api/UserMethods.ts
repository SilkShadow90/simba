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

  getExhibitionWinners = async (id: string): Promise<User[]> => {
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

  getExhibitionReferees = async (id: string): Promise<User[]> => {
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

  getUser = async (id: string): Promise<User | null> => {
    try {
      if (this.useMock) {
        return this.getMock('users', true, id);
      }
      return await DB.getApi<User>(`users/${id}`);
    } catch (error) {
      console.log('getUsers error');
    }

    return null;
  };

  createUser = async (user: User, callback?: () => void): Promise<void> => {
    try {
      if (this.useMock) {
        return;
      }

      await DB.postApi<User>(`users`, user, callback);
    } catch (error) {
      console.log('createUser error');
    }
  };

  updateUser = async (user: User, callback?: () => void): Promise<void> => {
    try {
      if (this.useMock) {
        return;
      }

      await DB.updateApi<User>(`users`, user, callback);
    } catch (error) {
      console.log('updateUser error');
    }
  };

  deleteUser = async (id: string, callback?: () => void): Promise<void> => {
    try {
      if (this.useMock) {
        return;
      }

      await DB.deleteApi(`users`, id, callback);
    } catch (error) {
      console.log('deleteUser error');
    }
  };

  multiDeleteUser = async (ids: string[], callback?: () => void): Promise<void> => {
    try {
      if (this.useMock) {
        return;
      }

      await DB.multiDeleteApi(`users`, ids, callback);
    } catch (error) {
      console.log('multiDeleteUser error');
    }
  };
}

export default new UserMethods();
