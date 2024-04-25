import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseUrlService {

  private origin: string;

  constructor() {
    this.origin = (environment.production && typeof window !== 'undefined')
      ? window.location.origin
      : environment.apiUrl;
  }

  getOrigin(): string {
    return this.origin;
  }
}
