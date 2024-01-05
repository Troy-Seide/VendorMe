import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from '../helper.service';
import { NgForm } from '@angular/forms';
import { User } from '../models/user';
import { MatRadioModule } from '@angular/material/radio'
import { Vendor } from '../models/vendor';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  userForm: FormGroup;
  //check if user is a vendor or not before login to determine which div
  // they see

  user: User;
  vendor: Vendor;
  // registerForm = new FormGroup({
  //   firstName: new FormControl('', Validators.required),
  //   lastName: new FormControl('', Validators.required),
  //   phoneNumber: new FormControl('', Validators.required),
  //   email: new FormControl('', [Validators.required, Validators.email]),
  //   password: new FormControl('', Validators.required),
  //   phone: new FormControl('', Validators.required)
  // })

  check = false;

  buttonSelection:any;
  constructor(private router: Router, private route: ActivatedRoute, private helperService: HelperService){
    this.user = new User();
    this.vendor = new Vendor();
  }

  ngOnInit(): void {
    
    
  }

  vendorCheck(value){
    // if(confirm('Are you a vendor?')){

    // }
    if(value == 1){
      return true;
    }
    
    return false;
  }

  register(){
    //alert(this.registerForm.value.firstName + ', you have registered successfully');
    //alert("hello");
    //alert(this.registerForm.value);
      this.helperService.AddUser(this.user).subscribe(ans => {
        console.log(ans.body.token);
        //here the key is token and the value is ans.token
        localStorage.setItem('token', ans.body.token);
        //sessionStorage.setItem('id', ans.body.id);
        this.router.navigate(['/services']);
      })
      console.log(this.user);

  }

  registerVendor(){
    this.helperService.AddVendor(this.vendor).subscribe(ans => {
      console.log(ans.body.token);
      //here the key is token and the value is ans.token
      localStorage.setItem('vendortoken', ans.body.token);
      this.router.navigate(['/services']);
    })
    console.log(this.user);

  }

  saveData(form: NgForm){
    if(form.valid){
      if(this.user._id !== undefined){
        this.helperService.UpdateUser(this.user).subscribe(res => {
          if(res.status === 200){
            this.router.navigate(['/login']);
          }
        });
      }
      else{
        this.helperService.AddUser(this.user).subscribe(res => {
          if(res.status === 201){
            this.router.navigate(['/login']);
          }
        })
      }
    }//);
  }

  handler(event: any){
    this.buttonSelection = event.value;
  }
}
//}
