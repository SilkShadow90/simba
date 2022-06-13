import { isObject } from '../utils';

export function staticImplements<T>() {
  return <U extends T>(constructor: U) => {
    constructor;
  };
}

export interface FabricMixins<P> {
  create(data: unknown): P | P[] | void;
  checkModel(data: unknown): boolean;
  checkInterface(data: unknown): boolean;
}

export abstract class BasicFabric<T, P> {
  protected abstract Model: any; // todo add class type
  protected abstract interfaceValidateModelProperties: Array<keyof P>;

  private generateModel(data: P): T {
    return new this.Model(data);
  }

  private validateInterface(model: unknown): model is P {
    return isObject(model) && this.interfaceValidateModelProperties.every(prop => model.hasOwnProperty(prop));
  }

  private validateModel(model: unknown): model is T {
    return (
      isObject(model) &&
      model instanceof this.Model &&
      Object.keys(this.Model.prototype).every(property => model.hasOwnProperty(property))
    );
  }

  protected initialValidate(model: unknown): model is P | P[] {
    if (Array.isArray(model)) {
      return this.validateInterfaces(model);
    }

    return this.validateInterface(model);
  }

  protected endValidate(model: unknown): model is P | P[] {
    if (Array.isArray(model)) {
      return this.validateModels(model);
    }

    return this.validateModel(model);
  }

  private validateModels(models: unknown[]): models is T[] {
    return models.every(model => this.validateModel(model));
  }

  private validateInterfaces(models: unknown[]): models is P[] {
    return models.every(model => this.validateInterface(model));
  }

  protected generate(models: unknown): T | T[] | void {
    if (this.initialValidate(models)) {
      if (Array.isArray(models)) {
        return models.map(model => this.generateModel(model));
      }

      return this.generateModel(models);
    }
  }
}
