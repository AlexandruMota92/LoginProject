import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alerts } from 'src/app/core/services/alerts.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit 
{
    registerForm: FormGroup = new FormGroup
    ({
        username: new FormControl('', [Validators.minLength(6), Validators.required]),
        password: new FormControl('', [Validators.minLength(6), Validators.required]),
        email:    new FormControl('', [Validators.email])
    });

    constructor(private alerts: Alerts,
                private router: Router,
                private authService: AuthenticationService)
    {
        //
    }

    ngOnInit(): void 
    {
        //
    }

    public register()
    {
        let body: Object = {
            'name': this.registerForm.controls.username.value,
            'password': this.registerForm.controls.password.value,
            'password_confirmation': this.registerForm.controls.password.value,
            'email': this.registerForm.controls.email.value
        };

        this.authService.register(body).subscribe(
            (result: any) =>
            {
                this.alerts.openSnackBar(result.message, 'Close', 'blue');
                this.router.navigate(['login']);
            },
            (error: any) =>
            {
                error = JSON.parse(error.error);
                if(typeof error.username !== 'undefined')
                {
                    this.alerts.openSnackBar(error.username, 'Close', 'blue');
                }
                if(typeof error.password !== 'undefined')
                {
                    this.alerts.openSnackBar(error.password, 'Close', 'blue');
                }
                if(typeof error.email !== 'undefined')
                {
                    this.alerts.openSnackBar(error.email, 'Close', 'blue');
                }
            }
        )
    }

}
