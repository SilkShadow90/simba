import { ApiMethods } from './ApiMethods';


// use only getRecord api
class InfoMethods extends ApiMethods<any> {
  readonly field = 'info';

  readonly apiName = 'Общая информация';
}

export default new InfoMethods();
