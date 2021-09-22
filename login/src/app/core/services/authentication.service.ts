import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthenticationService
{
    private readonly url: string = 'http://127.0.0.1:8000/api/auth';

    constructor(private http: HttpClient) {}

    public login(body: Object): Observable<any> 
    {
        let url: string;
        url = this.url + '/login';

        return this.http.post(url, body);
    }

    public register(body: Object): Observable<any> 
    {
        let url: string;
        url = this.url + '/register';

        return this.http.post(url, body);
    }

    public logout(): Observable<any> 
    {
        let url: string;
        url = this.url + '/logout';

        return this.http.post(url, '');
    }

    public refresh(): Observable<any> 
    {
        let url: string;
        url = this.url + '/refresh';

        return this.http.post(url, '');
    }

    public getUserProfile(): Observable<any> {

        let url: string;
        url = this.url + '/user-profile';

        return this.http.get(url);
    }
    
}