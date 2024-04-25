import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { HttpClient } from '@angular/common/http';
import { BaseUrlService } from './base-url.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends CrudService<any> {

  constructor(
    http: HttpClient,
    baseUrlSrv: BaseUrlService) {
    super(http, baseUrlSrv, 'users')
  }



}
