import { initializeApp, deleteApp } from 'firebase/app';
import {
  child, Database, DatabaseReference, get, getDatabase, onValue, orderByChild, push, Query, query, ref, remove, update,
} from 'firebase/database';
import { refFromURL } from '@firebase/database';
import { IDObject } from '../components/adminPanel/AdminInputTab';

export const firebaseConfig = {
  apiKey: 'AIzaSyBJF0gEYSjKHrDki0Pzw-GjGXNHVlytErQ',
  authDomain: 'ulsimba.firebaseapp.com',
  databaseURL: 'https://ulsimba-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'ulsimba',
  storageBucket: 'ulsimba.appspot.com',
  messagingSenderId: '711515657136',
  appId: '1:711515657136:web:7b36e3a5123d4f4034fc75',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

const dbRef = ref(database);

export class DB {
  static database: Database = database;

  static dbRef: DatabaseReference = dbRef;

  static getQuery = <T extends {}>(url: string, key?: string): Query => {
    const defaultQuery = child(DB.dbRef, url);

    return key ? query(defaultQuery, orderByChild(key)) : defaultQuery;
  } ;

  static getApi = async <T extends {}, U = T>(url: string, key?: string): Promise<U | null> => {
    try {
      const snapshot = await get(DB.getQuery<T>(url, key));

      if (snapshot.exists()) {
        return snapshot.val();
      }

      console.log('No data available');
    } catch (error) {
      console.error(error);
    }

    return null;
  };

  static postApi = async <T extends {}>(url: string, data: T, callback: () => void = () => {}): Promise<void> => {
    try {
      const newPostKey = push(child(DB.dbRef, url)).key;

      const updates = {
        [`/${url}/${newPostKey}`]: { ...data, id: newPostKey }
      };

      update(DB.dbRef, updates).then(callback).catch(console.error);
    } catch (error) {
      console.error(error);
    }
  };

  static updateApi = async <T extends IDObject>(url: string, data: T, callback: () => void = () => {}): Promise<void> => {
    try {
      const updates = {
        [`/${url}/${data.id}`]: data
      };

      update(DB.dbRef, updates).then(callback).catch(console.error);
    } catch (error) {
      console.error(error);
    }
  };

  static deleteApi = async (url: string, id: string, callback: () => void = () => {}): Promise<void> => {
    try {
      if (id) {
        const dbRef = ref(DB.database, `${url}/${id}`);

        remove(dbRef).then(callback).catch(console.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  static multiDeleteApi = async (url: string, ids: string[], callback: () => void = () => {}): Promise<void> => {
    try {
      const updates = ids.reduce<Record<string, null>>((acc, id) => {
        acc[`/${url}/${id}`] = null;

        return acc;
      }, {});
      update(DB.dbRef, updates).then(callback).catch(console.error);
    } catch (error) {
      console.error(error);
    }
  };

  static subscribeApi = <T>(url: string, callback: (data: T) => void, key?: string): void => {
    onValue(DB.getQuery(url, key), (snapshot) => {
      const data = snapshot.val();
      callback(data);
    });
  };
}

