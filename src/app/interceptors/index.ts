import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { RequestInterceptor } from './request-interceptor';
import { RefreshTokenInterceptor } from './refresh-token-interceptor';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true },
];
