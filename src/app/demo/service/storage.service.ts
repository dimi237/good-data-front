import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  isBrowser: boolean;

  constructor() { }

  async setString(key: string, value: string): Promise<void> {
    key = this.encryptUsingAES256(key);
    value = this.encryptUsingAES256(value);
    localStorage.setItem(key, value);
  }

  getString(key: string): any {
    key = this.encryptUsingAES256(key);
    const data = localStorage.getItem(key);
    if (data) { return JSON.parse(this.decryptUsingAES256(data)); }
    return null;
  }

  setObject(key: string, value: any): void {
    key = this.encryptUsingAES256(key);
    value = this.encryptUsingAES256(value);
    localStorage.setItem(key, value);
  }

  getObject(key: string): any {
    key = this.encryptUsingAES256(key);
    const data = localStorage.getItem(key);
    if (data) { return JSON.parse(this.decryptUsingAES256(data)); }
    return null;
  }

  removeItem(key: string): void {
    key = key = this.encryptUsingAES256(key);
    localStorage.removeItem(key);
  }

  clear(): void { localStorage.clear(); }

  private encryptUsingAES256(data: any): string {
    const KEY = CryptoJS.enc.Utf8.parse(environment.secretKey);
    const IV = CryptoJS.enc.Utf8.parse(environment.secretKey);
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(data), KEY, {
      keySize: 16,
      iv: IV,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.toString();
  }

  private decryptUsingAES256(encrypted: any): string {
    if (!encrypted) { return null; }
    const KEY = CryptoJS.enc.Utf8.parse(environment.secretKey);
    const IV = CryptoJS.enc.Utf8.parse(environment.secretKey);

    const decrypted = CryptoJS.AES.decrypt(
      encrypted, KEY, {
      keySize: 16,
      iv: IV,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }).toString(CryptoJS.enc.Utf8);

    return decrypted;
  }
}
