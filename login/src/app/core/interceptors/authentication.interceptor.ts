import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/localStorageService.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor 
{
    private AUTH_HEADER = 'Authorization';

    constructor(private readonly router: Router,
                private readonly localStorageService: LocalStorageService) 
    { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> 
    {

        if (this.isHeaderAuthKey(request)) 
        {
            return this.handleRequest(request, next);
        } 
        else 
        {
            request = request.clone({
                setHeaders: {
                    'Content-Type': 'application/json',
                    'Authorization': `${this.localStorageService.get('token')}`
                }
            });
            return this.handleRequest(request, next);
        }
    }

    public isHeaderAuthKey(request: HttpRequest<unknown>) 
    {
        const authKey = request.headers.keys().find((key: any) => key === this.AUTH_HEADER);

        return authKey ? true : false;
    }

    private handleRequest(request: HttpRequest<unknown>, next: HttpHandler) 
    {
        return next.handle(request).pipe(tap(() => { },
            (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status !== 401) {
                        return;
                    }
                    this.router.navigate(['login']);
                }
            }));
    }
}