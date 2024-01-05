import { CanActivateFn, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router';
import { HelperService } from './helper.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// export const authGuard: CanActivateFn = (route, state) => {
//   //return true;

// };

@Injectable()
export class authGuard implements CanActivate{
  constructor(private HelperService: HelperService, private router: Router){

  }

  //Basically this says if the user is logged in it returns true so they can continue navigating
  // else they are redirected to the login route or home in your case
  canActivate():boolean {
    if(this.HelperService.loggedIn()){
      return true;
    }
    else{
      this.router.navigate(['/home']);
      return false;
    }
  }
}
