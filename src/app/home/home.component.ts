import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { User } from '../models/user';
import { HelperService } from '../helper.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

//implement Google sign up later
export class HomeComponent implements OnInit{
  loginForm:FormGroup;
  loginFailed:false;
  errMessage:String;

  user: User;

  constructor(private helperService: HelperService, private router: Router, private route: ActivatedRoute){
    this.user = new User();
  }

  ngOnInit(): void {
    // this.loginForm = new FormGroup({
    //   username: new FormControl('', Validators.required),
    //   password: new FormControl('', Validators.required)
    // })
    //Here we subscribe for the parameters 
    this.route.params.subscribe(params => {
      let id = params.id; //here we get the parameter name we're having, so in our case it is the 'home/:edit' in the app-routing.module.ts file
      if(id !== undefined){
        this.helperService.getUser(id).subscribe(res => {
          this.user = res;
        });
      }
    });
  }
  
  login(){
    alert("user has logged in");
    
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
        });
      }
    }
  }
}
