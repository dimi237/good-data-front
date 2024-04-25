import { environment } from 'src/environments/environment';
import { BaseUrlService } from './base-url.service';
import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  moduleName = '';
  BASE_URL: string;
  formStatus: any;
  currentEmail: string;
  passwordData: any;
  credentials: any;
  isNotCustomer: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
    private storageSrv: StorageService,
    private baseUrlSrv: BaseUrlService,
  ) {
    this.formStatus = { isActive: false };
    this.BASE_URL = `${this.baseUrlSrv.getOrigin()}${environment.basePath}`;
  }


  async signin(credentials: any): Promise<any> {
    this.credentials = credentials;
    return await this.http.post(`${this.BASE_URL}/auth/login`, credentials).toPromise();
  }

  async register(user: any): Promise<any> {
    return await this.http.post(`${this.BASE_URL}/auth/register`, user).toPromise();
  }



  async resetPwrd(param): Promise<any> {

    const { userCode, newPwd, confirmPwd, currentPwd, otp } = param;

    let body: any = { userCode, newPwd, confirmPwd };

    if (param.currentPwd) {
      body = { ...body, currentPwd };
    }

    if (param.otp) {
      body = { ...body, otp };
    }

    try {
      await this.http.post(`${this.BASE_URL}/auth/reset-default-pwd`, body).toPromise();
      this.storageSrv.removeItem('email');
    } catch (error) {
      return error;
    }
  }

  signout(): void {
    this.storageSrv.clear();
    this.router.navigate(['auth/login']);
  }

  isUserConnected(): boolean {
    return !!this.storageSrv.getObject('user');
  }

  getUser() {
    let user: any = {};
    try {
      user = this.storageSrv.getObject('user');
    } catch (error) { }
    return user;
  }


  isAdmin() {
    return this.getUser()?.category === 100;
  }


  postponeTimeoutSession(): void {
    const timeout = moment().add(environment.sessionTTL, 'minutes').valueOf();
    this.storageSrv.setString('timeout', `${timeout}`);
  }

  hasSessionExpired(): boolean {
    const timeoutSession = this.storageSrv.getString('timeout') || '0';
    const currTime = moment().valueOf();
    return currTime >= +timeoutSession;
  }

  refreshToken(): any {
    const oauth = this.storageSrv.getObject('oauth');
    if (!oauth) {
      this.router.navigate(['home']);
      return throwError(new Error('empty oauth object'));
    }

    return this.http.post(`${this.BASE_URL}/auth/refresh`, {
      refresh_token: oauth.refresh_token
    });
  }

  validateEmail(email: string): any {
    const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regularExpression.test(String(email).toLowerCase());
  }


}
