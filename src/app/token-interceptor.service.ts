import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor( private injector: Injector) { }

  intercept(req, next){
    let authService = this.injector.get(HelperService)
    //Here we're making a clone of the request
    let tokenizedReq = req.clone({
      //setHeaders is an object and Authorization is the key
      setHeaders: {
        //The value here is the token but in a convention called the Bearer token
        // the format is the word Bearer followed by a space then the actual token value
        //Authorization: 'Bearer xx.yy.zz'
        Authorization: `Bearer ${authService.getToken()}`
      }
    })
    return next.handle(tokenizedReq)
  }
}
