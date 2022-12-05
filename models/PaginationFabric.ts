import { IPagination, Pagination } from './Pagination';
import { BasicFabric, FabricMixins, staticImplements } from './BasicFabric';

@staticImplements<FabricMixins<Pagination>>()
export class PaginationFabric extends BasicFabric<Pagination, IPagination> {
  static _instance?: PaginationFabric;

  Model = Pagination;

  interfaceValidateModelProperties: Array<keyof IPagination> = ['per_page', 'total_pages', 'total', 'page'];

  private static get instance(): PaginationFabric {
    if (!this._instance) {
      this._instance = new PaginationFabric();
    }

    return this._instance;
  }

  public static create(data: unknown): Pagination | void {
    return PaginationFabric.instance.generate(data) as Pagination | void;
  }

  public static checkInterface(data: unknown): data is IPagination {
    return PaginationFabric.instance.initialValidate(data);
  }

  public static checkModel(data: unknown): data is Pagination {
    return PaginationFabric.instance.endValidate(data);
  }
}
