import { IUser, User } from './User';
import { BasicFabric, FabricMixins, staticImplements } from './BasicFabric';

@staticImplements<FabricMixins<User>>()
export class UserFabric extends BasicFabric<User, IUser> {
  static _instance?: UserFabric;

  Model: Object = User;

  interfaceValidateModelProperties: Array<keyof IUser> = ['first_name', 'last_name'];

  private static get instance(): UserFabric {
    if (!this._instance) {
      this._instance = new UserFabric();
    }

    return this._instance;
  }

  public static create(data: unknown): User | User[] | void {
    return UserFabric.instance.generate(data);
  }

  public static checkInterface(data: unknown): data is IUser | IUser[] {
    return UserFabric.instance.initialValidate(data);
  }

  public static checkModel(data: unknown): data is User | User[] {
    return UserFabric.instance.endValidate(data);
  }
}
