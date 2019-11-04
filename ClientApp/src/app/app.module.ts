import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { LogoutComponent } from './logout/logout.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { AppRoutingModule } from './app-routing.module';
//import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PanelModule } from 'primeng/panel';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { LabelModule } from './Shared/label/label.module';
import { ValidationMessageModule } from './Shared/validation-message/validation-message.module';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { AlphaInterceptor } from 'src/Helper/http.interceptor';
import { CommonHelper } from 'src/Helper/CommonHelper';
import { DynamicDialogRef, ConfirmationService, MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import {ToastModule} from 'primeng/toast';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    LogoutComponent,
    ChangepasswordComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
    ]),
    AppRoutingModule,
    //ToastrModule.forRoot(),
    NgxSpinnerModule,
    PanelModule,
    DynamicDialogModule,
    LabelModule,
    ValidationMessageModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
    ProgressSpinnerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AlphaInterceptor,
      multi: true
    },
    CommonHelper,
    DynamicDialogRef,
    ConfirmationService,
    CookieService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
