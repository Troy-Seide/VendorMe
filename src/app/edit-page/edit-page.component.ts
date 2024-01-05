import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { User } from '../models/user';
import { HelperService } from '../helper.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Vendor } from '../models/vendor';


@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})

export class EditPageComponent {
  loginForm:FormGroup;
  loginFailed:false;
  errMessage:String;

  user: User;
  vendor: Vendor;
  checkUser = localStorage.getItem('token');
  checkVendor = localStorage.getItem('vendortoken')

  constructor(private helperService: HelperService, private router: Router, private route: ActivatedRoute){
    this.user = new User();
  }

  ngOnInit(): void {
    // this.loginForm = new FormGroup({
    //   username: new FormControl('', Validators.required),
    //   password: new FormControl('', Validators.required)
    // })
    //Here we subscribe for the parameters
    //alert(this.checkUser)
    if(this.checkUser!== null){
      this.route.params.subscribe(params => {
        let id = params.id; //here we get the parameter name we're having, so in our case it is the 'home/:edit' in the app-routing.module.ts file
        console.log(id);
        if(id !== undefined){
          this.helperService.getUser(id).subscribe(res => {
            this.user = res;
          });
        }
      });
    }
    else if(this.checkVendor!== null){
      this.route.params.subscribe(vparams => {
        let vendorId = vparams.id; //here we get the parameter name we're having, so in our case it is the 'home/:edit' in the app-routing.module.ts file
        console.log(vendorId);
        if(vendorId !== undefined){
          this.helperService.getVendor(vendorId).subscribe(ans => {
            this.vendor = ans;
          });
        }
      });
    }
  }

  saveData(form: NgForm){
    alert('first check')
    if(form.valid){
      alert('check here')
      if(this.user._id !== undefined){
        this.helperService.UpdateUser(this.user).subscribe(res => {
          if(res.status === 200){
            console.log(this.user)
            this.router.navigate(['/login']);
            this.helperService.logoutUser();
          }
        });
      }

      else if(this.vendor._id !== undefined){
        alert('got here');
        this.helperService.UpdateVendor(this.vendor).subscribe(res => {
          if(res.status === 200){
            console.log(this.vendor)
            this.router.navigate(['/login']);
            this.helperService.logoutUser();
          }
        }
      )}
    }
  }
}


