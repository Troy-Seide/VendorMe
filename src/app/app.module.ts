import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './contact/contact.component';
import { MatToolbarModule, } from '@angular/material/toolbar';
import { MatButtonModule,} from '@angular/material/button'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServicesComponent } from './services/services.component';
import { HelperService } from './helper.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { VendorLoginComponent } from './vendor-login/vendor-login.component';
import { authGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
import { MatRadioModule } from '@angular/material/radio';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CustomeFilterPipePipe } from './custome-filter-pipe.pipe';
import { SettingsComponent } from './settings/settings.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { jwtDecode } from 'jwt-decode';
//import * as jwt_decode from 'jwt-decode'
// import { JwtHelperService } from '@auth0/angular-jwt';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    ContactComponent,
    ServicesComponent,
    VendorLoginComponent,
    CustomeFilterPipePipe,
    SettingsComponent,
    EditPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatRadioModule,
    //JwtHelperService
    
    //Ng2SearchPipeModule
  ],
  providers: [HelperService, authGuard, {
    //We have to create a new object that holds 3 properties inside the providers to pass the HTTP_Inteceptors 
    provide: HTTP_INTERCEPTORS,
    //We have to mention the class to be used as one of the properties which is the tokenInterceptorService class
    useClass: TokenInterceptorService,
    //We set multi as the 3rd property to be true so that we can use multiple interceptors if required
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
