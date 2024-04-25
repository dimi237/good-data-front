import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { HttpClient } from '@angular/common/http';
import { BaseUrlService } from './base-url.service';

@Injectable({
  providedIn: 'root'
})
export class PayService extends CrudService<any> {

  constructor(
    http: HttpClient,
    baseUrlSrv: BaseUrlService) {
    super(http, baseUrlSrv, 'pay')
  }

  generateFormDataWithFiles(data: any, file: File) {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    })
    formData.append('file', file, file.name);
    return formData;
  }

}
