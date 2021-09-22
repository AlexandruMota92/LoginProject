import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alerts } from 'src/app/core/services/alerts.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit 
{
    public user: any = {};

    constructor(private alerts: Alerts,
                private router: Router,
                private authService: AuthenticationService) 
    {
        //
    }

    ngOnInit(): void 
    {
        this.getUserData();
    }

    public getUserData(): void
    {
        this.authService.getUserProfile().subscribe
        (
            (result: any) =>
            {
                this.user = result;
            },
            (error: any) =>
            {
                this.alerts.openSnackBar(error.error.error, 'Close', 'red');
            }
        )
    }

    public logout(): void
    {
        this.authService.logout().subscribe
        (
            (result: any) =>
            {
                this.alerts.openSnackBar(result.message, 'Close', 'red');
                this.router.navigate(['login']);
                
            },
            (error: any) =>
            {
                this.alerts.openSnackBar(error.error.error, 'Close', 'red');
            }
        );
    }

}
