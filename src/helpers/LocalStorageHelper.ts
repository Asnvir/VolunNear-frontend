import ls from 'localstorage-slim';
import {LocalStorageHelper} from './types';

export class LocalStorageHelperImpl implements LocalStorageHelper {
  private static instance: LocalStorageHelperImpl | null = null;

  private constructor() {}

  public static getInstance(): LocalStorageHelperImpl {
    if (!LocalStorageHelperImpl.instance) {
      LocalStorageHelperImpl.instance = new LocalStorageHelperImpl();
    }
    return LocalStorageHelperImpl.instance;
  }

  public setItem(key: string, value: string) {
    try {
      ls.set(key, value);
    } catch (error) {
      console.error(`Error setting item in local storage: ${error}`);
    }
  }

  public getItem(key: string): string | null {
    try {
      return ls.get(key);
    } catch (error) {
      console.error(`Error getting item from local storage: ${error}`);
      return null;
    }
  }

  public removeItem(key: string) {
    try {
      ls.remove(key);
    } catch (error) {
      console.error(`Error removing item from local storage: ${error}`);
    }
  }
}
