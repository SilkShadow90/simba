import { ApiMethods } from './ApiMethods';
import { Feedback } from './types';
import { DB } from '../utils/db';

class FeedbackMethods extends ApiMethods {
  getFeedbacks = async (): Promise<Feedback[]> => {
    try {
      if (this.useMock) {
        return this.getMock('feedbacks');
      }

      const feedbackRecord = await DB.getApi<Record<string, Feedback>>('feedbacks') || {};

      return Object.values(feedbackRecord) || [];
    } catch (error) {
      console.log('getFeedbacks error');
    }

    return [];
  };

  getFeedback = async (id?: string): Promise<Feedback | null> => {
    try {
      if (this.useMock) {
        return this.getMock('feedbacks', true, id);
      }

      if (id) {
        return await DB.getApi<Feedback>(`feedbacks/${id}`) || null;
      }
      console.log('getFeedback id is undefined');
    } catch (error) {
      console.log('getFeedback error');
    }

    return null;
  };

  createFeedback = async (feedback?: Partial<Feedback>, callback?: () => void, errorCallback?: () => void): Promise<void> => {
    try {
      if (this.useMock) {
        return;
      }

      if (feedback) {
        console.warn(feedback);
        await DB.postApi<Partial<Feedback>>(`feedbacks`, feedback, callback, errorCallback);
      } else {
        console.log('createFeedback feedback is undefined');
      }
    } catch (error) {
      console.log('createFeedback error');
    }
  };

  updateFeedback = async (feedback?: Feedback, callback?: () => void, errorCallback?: () => void): Promise<void> => {
    try {
      if (this.useMock) {
        return;
      }

      if (feedback) {
        await DB.updateApi<Feedback>(`feedbacks`, feedback, callback, errorCallback);
      } else {
        console.log('updateFeedback feedback is undefined');
      }
    } catch (error) {
      console.log('updateFeedback error');
    }
  };

  deleteFeedback = async (id?: string, callback?: () => void, errorCallback?: () => void): Promise<void> => {
    try {
      if (this.useMock) {
        return;
      }

      if (id) {
        await DB.deleteApi(`feedbacks`, id, callback, errorCallback);
      } else {
        console.log('deleteFeedback id is undefined');
      }
    } catch (error) {
      console.log('deleteFeedback error');
    }
  };

  multiDeleteFeedback = async (ids?: string[], callback?: () => void, errorCallback?: () => void): Promise<void> => {
    try {
      if (this.useMock) {
        return;
      }

      if (ids?.length) {
        await DB.multiDeleteApi(`feedbacks`, ids, callback, errorCallback);
      } else {
        console.log('multiDeleteFeedback id is undefined');
      }
    } catch (error) {
      console.log('multiDeleteFeedback error');
    }
  };
}

export default new FeedbackMethods();
