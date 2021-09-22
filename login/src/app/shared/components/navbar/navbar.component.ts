import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alerts } from 'src/app/core/services/alerts.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { LocalStorageService } from 'src/app/core/services/localStorageService.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    public auth: boolean;

    constructor(private alerts: Alerts,
                private router: Router,
                private authService: AuthenticationService,
                private localStorageService: LocalStorageService)
    { }

    ngOnInit(): void 
    {
        this.authService.authenticated$.subscribe((value: boolean) => this.auth = value);
    }

    public logout(): void 
    {
        this.authService.logout().subscribe
        (
            (result: any) => 
            {
                this.authService.setAuthenticationStatus(false);
                this.localStorageService.remove('token');
                this.alerts.openSnackBar(result.message, 'Close', 'success-snackbar');
                this.router.navigate(['login']);
            },
            (error: any) => 
            {
                this.authService.setAuthenticationStatus(false);
                this.localStorageService.remove('token');
                this.alerts.openSnackBar(error.error.error, 'Close', 'error-snackbar');
            }
        );
    }

}
