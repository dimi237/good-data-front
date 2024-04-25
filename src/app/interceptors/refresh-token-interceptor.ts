
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { catchError, switchMap, filter, take, tap } from 'rxjs/operators';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../demo/service/auth.service';
import { StorageService } from '../demo/service/storage.service';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(
        private authSvr: AuthService,
        private storageSrv: StorageService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
            
        return next.handle(req).pipe(tap((evt: HttpEvent<any>) => {
            if (evt.type === 0) { return null; }
            this.authSvr.postponeTimeoutSession();
        }), catchError((error) => {
    
            if (error.error.type === 'TokenExpired') {
                return this.getNewToken(req, next);
            }                        
            // this.authSvr.signout();
            return throwError(error);


        }));
    }

    getNewToken(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.isRefreshing) {
            return this.refreshTokenSubject.pipe(
                filter(token => token != null),
                take(1),
                switchMap(tokenString => {
                    return next.handle(this.addToken(req, tokenString));
                }));
        }

        this.isRefreshing = true;
        this.refreshTokenSubject.next(null);

        return this.authSvr.refreshToken().pipe(
            switchMap((token: any) => {
                this.isRefreshing = false;
                this.storageSrv.setObject('oauth', token);
                this.refreshTokenSubject.next(token.access_token);
                return next.handle(this.addToken(req, token.access_token));
            }));
    }

    private addToken(req: HttpRequest<any>, token: string): any {
        return req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
    }
}
