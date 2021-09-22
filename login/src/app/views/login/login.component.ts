import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alerts } from 'src/app/core/services/alerts.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { LocalStorageService } from 'src/app/core/services/localStorageService.service';
import { isThisTypeNode } from 'typescript';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit
{
    loginForm: FormGroup = new FormGroup
    ({
        email: new FormControl('', [Validators.minLength(6), Validators.required, Validators.email]),
        password: new FormControl('', [Validators.minLength(6), Validators.required])
    });

    constructor(private router: Router,
                private alerts: Alerts,      
                private authService: AuthenticationService,
                private localStorageService: LocalStorageService)
    {
    };

    ngOnInit(): void
    {
        //
    }

    public login(): void
    {
        const body: Object = 
        {
            'email': this.loginForm.controls.email.value,
            'password': this.loginForm.controls.password.value
        };

        this.authService.login(body).subscribe
        (
            (result: any) =>
            {
                this.authService.setAuthenticationStatus(true);
                this.localStorageService.set('token', `Bearer ${result.access_token}`);
                this.router.navigate(['home']);
            },
            (error: any) =>
            {
                this.authService.setAuthenticationStatus(false);
                this.alerts.openSnackBar(error.error.error, 'Close', 'error-snackbar');
            }
        )
    }

}
