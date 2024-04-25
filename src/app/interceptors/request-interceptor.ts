import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { encode } from 'js-base64';
import * as _ from 'lodash';
import { AuthService } from '../demo/service/auth.service';
import { StorageService } from '../demo/service/storage.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    constructor(
        private authSrv: AuthService,
        private storageSrv: StorageService,
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authSrv.hasSessionExpired() && this.storageSrv.getObject('oauth')) {            
            this.authSrv.signout();
        }

        // Allow CORS for all
        let headers = req.headers.append('Access-Control-Allow-Origin', '*');
        // Add authorization token in header

        if (!req.url.includes('/auth/register')) {
            try {

                const oauth = this.storageSrv.getObject('oauth');
                if (!oauth) {
                    throw new Error('empty oauth');
                }
                headers = headers.append('Authorization', `Bearer ${oauth.access_token}`);
            } catch (error) { }
        }        
        return next.handle(req.clone({ headers }));
    }
}
