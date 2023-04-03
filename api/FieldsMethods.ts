import { ApiNoCRUDMethods } from './ApiNoCRUDMethods';
import { RecordCRUD } from './types';

// use only getRecord api
class FieldsMethods extends ApiNoCRUDMethods<RecordCRUD> {
  readonly field = 'fieldsCRUD';

  readonly apiName = 'CRUD Таблицы';
}

export default new FieldsMethods();
