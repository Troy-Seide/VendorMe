import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HelperService } from '../helper.service';
import { Vendor } from '../models/vendor';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-vendor-login',
  templateUrl: './vendor-login.component.html',
  styleUrls: ['./vendor-login.component.scss']
})
export class VendorLoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  })

  loginVendor: Vendor;

  constructor(private helperService: HelperService, private router: Router){
    this.loginVendor = new Vendor();
  }
  ngOnInit(): void {
    
  }

  login(){
    //alert("This user has signed in");
    console.log(this.loginVendor);
    this.helperService.loginVendor(this.loginVendor).subscribe(res =>{
      console.log(res);
      //console.log('Token is:' + res.body.token.token);
      alert('Sign in successful')
      localStorage.setItem('vendortoken', res['token']);
      this.router.navigate(['/services']);
    })
  }
}
