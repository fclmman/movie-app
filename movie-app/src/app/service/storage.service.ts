import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storageInstance: Storage | null = null;

  constructor(private storage: Storage) {
    this.init().then();
  }

  async init() {
    this.storageInstance = await this.storage.create();
  }

  public async set(key: string, value: string) {
    await this.storageInstance?.set(key, value);
  }

  public async remove(key: string) {
    await this.storageInstance?.remove(key);
  }

  public async get(key: string): Promise<string> {
    return await this.storageInstance?.get(key);
  }
}
