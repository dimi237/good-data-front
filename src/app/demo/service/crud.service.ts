import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BaseUrlService } from './base-url.service';

@Injectable({
  providedIn: 'root'
})
export abstract class CrudService<T> {
  BASE_URL: string;



  constructor(
    private http: HttpClient,
    private baseUrlSrv: BaseUrlService,
    private BASE_PATH: string) {
    this.BASE_URL = `${this.baseUrlSrv.getOrigin()}${environment.basePath}/${this.BASE_PATH}`;
  }

  async create(data: T, headers?: any): Promise<any> {
    return await this.http.post(`${this.BASE_URL}/`, data, { headers }).toPromise();
  }

  async update(id: string, data: T): Promise<any> {
    return await this.http.put(`${this.BASE_URL}/${id}`, data).toPromise();
  }

  async request(method: string, url: string, body: any): Promise<any> {    
    return await this.http.request(method, `${this.BASE_URL}/${url}`, { body }).toPromise();
  }

  async enable(id: string): Promise<any> {
    return await this.http.put(`${this.BASE_URL}/enable/${id}`, {}).toPromise();
  }

  async disable(id: string): Promise<any> {
    return await this.http.put(`${this.BASE_URL}/disable/${id}`, {}).toPromise();
  }

  async findAll(parameter?: any): Promise<any> {
    let params = this.setParams(parameter);
    return this.http.get<any>(`${this.BASE_URL}/`, { params }).toPromise();
  }

  async findOne(parameter?: any): Promise<any> {
    let params = this.setParams(parameter);
    return this.http.get<T[]>(`${this.BASE_URL}/one`, { params }).toPromise();
  }

  async findById(id: string): Promise<any> {
    return await this.http.get(`${this.BASE_URL}/${id}`).toPromise();
  }

  async deleteById(id: string): Promise<any> {
    return await this.http.delete(`${this.BASE_URL}/${id}`).toPromise();
  }

  async count(): Promise<any> {
    return await this.http.get(`${this.BASE_URL}/count`).toPromise();
  }

  setParams = (options: any) => {

    let params = new HttpParams();
    for (const key in options) {
      if (options[key]) { params = params.append(key, `${options[key]}`); }
    }

    return params;
  }


}
