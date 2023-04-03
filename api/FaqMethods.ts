import { ApiMethods } from './ApiMethods';
import { Faq } from './types';

class FaqMethods extends ApiMethods<Faq> {
  readonly field = 'faqs';

  readonly apiName = 'Частые вопросы';
}

export default new FaqMethods();
