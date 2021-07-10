import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class ClientHttpInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
        if (localStorage.getItem("JWT token") !== null) {
            const authToken = localStorage.getItem("JWT token") as string;
            const authReq = req.clone({
                headers: req.headers.set('Authorization', authToken)
            });
            return next.handle(authReq);
        }
        return next.handle(req);

    }
}