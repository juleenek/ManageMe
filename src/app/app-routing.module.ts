import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/form/register/register.component';
import { authGuard } from './guards/auth.guard';
import { authPagesGuard } from './guards/auth-pages.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [authPagesGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [authPagesGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
