import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JwtAuthorizationGuardGuard } from './core/guards/jwt-authorization-guard.guard';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

const routes: Routes = 
[
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [JwtAuthorizationGuardGuard] 
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
