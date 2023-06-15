import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { RegisterComponent } from './pages/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormErrorMessageComponent } from './components/forms/form-error-message/form-error-message.component';
import { HttpClientModule } from '@angular/common/http';
import { BacklogComponent } from './pages//backlog/backlog.component';
import { FunctionalityFormComponent } from './components/forms/functionality-form/functionality-form.component';
import { StatusComponent } from './components/status/status.component';
import { FunctionalityDetailsComponent } from './components/functionality-details/functionality-details.component';
import { TaskFormComponent } from './components/forms/task-form/task-form.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    AuthenticationComponent,
    RegisterComponent,
    FormErrorMessageComponent,
    BacklogComponent,
    FunctionalityFormComponent,
    StatusComponent,
    FunctionalityDetailsComponent,
    TaskFormComponent,
    TaskDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
