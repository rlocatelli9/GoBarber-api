import IStorageProvider from '../models/interfaces/IStorageProvider';

export default class FakeStorageProvider implements IStorageProvider {
  private storage: string[] = [];

  public async saveFile(file: string): Promise<string> {
    this.storage.push(file);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const indexFile = this.storage.findIndex(element => element === file);

    this.storage.splice(indexFile, 1);
  }
}
