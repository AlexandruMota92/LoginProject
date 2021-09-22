import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalStorageService } from '../services/localStorageService.service';

@Injectable({
    providedIn: 'root'
})
export class JwtAuthorizationGuardGuard implements CanActivate 
{
    constructor(private router: Router,
                private localStorageService: LocalStorageService) 
    {
        //
    }

    public canActivate(): boolean
    {
        if(!this.localStorageService.get('token'))
        {
            this.router.navigate(['login']);
            return false;
        }

        return true;
    }

}
