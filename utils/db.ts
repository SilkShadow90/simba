import { initializeApp } from 'firebase/app';
import { Auth, getAuth, signInAnonymously, signInWithEmailAndPassword } from 'firebase/auth';

import {
  child, Database, DatabaseReference, get, getDatabase, orderByChild, push, Query, query, ref, remove, update,
} from 'firebase/database';

import { delay, devLog } from './common';
import { IDObject } from '../api/types';
import serverConfig from '../serverConfig.json';

// Initialize Firebase
const app = initializeApp(serverConfig);

export class DB {
  private static readonly delay = 300;

  private static readonly database: Database = getDatabase(app);

  private static readonly dbRef: DatabaseReference = ref(DB.database);

  static readonly auth: Auth = getAuth(app);

  static getQuery = (url: string, key?: string): Query => {
    const defaultQuery = child(DB.dbRef, url);

    return key ? query(defaultQuery, orderByChild(key)) : defaultQuery;
  } ;

  static getApi = async <T extends {}, U = T>(
    url: string,
    key?: string,
    callback: () => void = () => {},
    errorCallback: () => void = () => {},
  ): Promise<U | null> => {
    try {
      await delay(DB.delay);
      const snapshot = await get(DB.getQuery(url, key));

      if (snapshot.exists()) {
        callback();
        return snapshot.val();
      }

      devLog('No data available');
    } catch (error) {
      devLog(error);
      errorCallback();
    }

    return null;
  };

  static postApi = async <T extends {}>(
    url: string,
    data: T,
    callback: () => void = () => {},
    errorCallback: () => void = () => {},
  ): Promise<void> => {
    try {
      await delay(DB.delay);
      const newPostKey = push(child(DB.dbRef, url)).key;

      const updates = {
        [`/${url}/${newPostKey}`]: { ...data, id: newPostKey }
      };

      update(DB.dbRef, updates).then(callback).catch(errorCallback);
    } catch (error) {
      devLog(error);
      errorCallback();
    }
  };

  static updateApi = async <T extends IDObject>(
    url: string,
    data: T,
    callback: () => void = () => {},
    errorCallback: () => void = () => {},
  ): Promise<void> => {
    try {
      await delay(DB.delay);
      const updates = {
        [`/${url}/${data.id}`]: data
      };

      update(DB.dbRef, updates)
        .then(callback)
        .catch(errorCallback);
    } catch (error) {
      devLog(error);
      errorCallback();
    }
  };

  static deleteApi = async (
    url: string,
    id: string,
    callback: () => void = () => {},
    errorCallback: () => void = () => {},
  ): Promise<void> => {
    try {
      await delay(DB.delay);
      if (id) {
        const dbRef = ref(DB.database, `${url}/${id}`);

        remove(dbRef).then(callback).catch(errorCallback);
      }
    } catch (error) {
      devLog(error);
      errorCallback();
    }
  };

  static multiDeleteApi = async (
    url: string,
    ids: string[],
    callback: () => void = () => {},
    errorCallback: () => void = () => {},
  ): Promise<void> => {
    try {
      await delay(DB.delay);

      const updates = ids.reduce<Record<string, null>>((acc, id) => {
        acc[`/${url}/${id}`] = null;

        return acc;
      }, {});

      update(DB.dbRef, updates).then(callback).catch(errorCallback);
    } catch (error) {
      devLog(error);
      errorCallback();
    }
  };

  static emailPassAuth = (email: string, password: string): Promise<void> => {
    return signInWithEmailAndPassword(DB.auth, email, password)
      .then((userCredential) => {
        devLog(JSON.stringify(userCredential.user.toJSON()));
      })
      .catch(devLog);
  };

  static anonymouslyAuth = () => {
    signInAnonymously(DB.auth)
      .then(() => {
        // Signed in..
      })
      .catch(devLog);
  };
}

