import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ServicesComponent } from './services/services.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { RegisterComponent } from './register/register.component';
import { VendorLoginComponent } from './vendor-login/vendor-login.component';
import { authGuard } from './auth.guard';
import { SettingsComponent } from './settings/settings.component';
import { EditPageComponent } from './edit-page/edit-page.component';

const routes: Routes = [
  //{path: '', redirectTo: '/listings', pathMatch:'full'},
  {path: 'home', component:HomeComponent, pathMatch:'full'},
  {path: 'home/:id', component:HomeComponent},
  {path: 'login', component:LoginComponent},
  {path: 'services', component:ServicesComponent, canActivate:[authGuard]},
  {path: 'about', component:AboutComponent},
  //{path: 'about/:id', component:HomeComponent},
  {path: 'vendorLogin', component: VendorLoginComponent},
  {path: 'contact', component:ContactComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'settings', component:SettingsComponent},
  {path: 'edit/:id', component: EditPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
