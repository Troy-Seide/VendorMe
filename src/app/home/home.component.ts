import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';

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

  constructor(){

  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }
  
  login(){
    alert("user has logged in");
    
  }
}
