import { ApiMethods } from './ApiMethods';
import { Feedback } from './types';

class FeedbackMethods extends ApiMethods<Feedback> {
  readonly field = 'feedbacks';
}

export default new FeedbackMethods();
