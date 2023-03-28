import { ApiMethods } from './ApiMethods';
import { Feedback } from './types';

class FeedbackMethods extends ApiMethods<Feedback> {
  readonly field = 'feedbacks';

  readonly apiName = 'Обратная связь';
}

export default new FeedbackMethods();
