import { FirebaseApp } from 'firebase/app';
import { ref, FirebaseStorage, uploadBytes, StorageReference, getStorage, UploadResult } from '@firebase/storage';

export default class StorageService {
  private static storage: FirebaseStorage;

  private static _instance: StorageService;

  public static get instance(): StorageService {
    return StorageService._instance;
  }

  public static init(app: FirebaseApp): void {
    StorageService.storage = getStorage(app);
    StorageService._instance = new StorageService();
  }

  private createFile(name: string): StorageReference {
    // const mountainsRef = ref(this.storage!, `${name}.jpg`);
    // const mountainImagesRef = ref(this.storage, `images/${name}.jpg`);

    return ref(StorageService.storage, `images/${name}`);
  }

  async uploadFile(name: string, file: Blob): Promise<string | null> {
    try {
      const storageRef = this.createFile(name);
      const snapshot: UploadResult = await uploadBytes(storageRef, file);

      return snapshot.ref.fullPath;
    } catch (e) {
      console.error(e);

      return null;
    }
  }
}
