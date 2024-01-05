import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HelperService } from '../helper.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  })

  users:User[];
  loginUser: User;

  constructor(private helperService: HelperService, private router: Router){
    this.loginUser = new User();
    //old stuff you wrote
    this.loginForm.valueChanges.subscribe(value => {
      console.log(value);
    });

  }
  ngOnInit(): void {
    this.helperService.getUsers().subscribe(res=> {
      this.users = res;
    });
  }

  deleteUser(id){
    if(confirm('Are you sure you want to delete?')){
      this.helperService.DeleteUser(id).subscribe(res => {
        if(res.status === 200){
          for(let i = 0; i<this.users.length; i++){
            if(id === this.users[i]._id){
              //The splice method takes the index number from where you want to delete it and the number of records you want deleted. 
              this.users.splice(i, 1);
              break;
            }
          }
        }
      });
    }
  }

  login(){
    // alert("This user has signed in");
    console.log(this.loginUser);
    this.helperService.loginUser(this.loginUser).subscribe(res =>{
      //console.log(res.ok);
      //console.log('Token is:' + res.body.token.token);
      // alert(res.status);
      //if(res.status === 200){
        localStorage.setItem('token', res['token']);
        //sessionStorage.setItem('id', )
        //alert("This user has signed in");
        alert('Sign in successful')
        this.router.navigate(['/services']);
      //}
    })
    // if(localStorage.getItem('token') === null){
    //   alert('Incorrect email or password')
    // }
    
  }
  // login(id){
  //   this.helperService.getUser(id).subscribe(res =>{
  //     if(res._id !== null){
  //       alert(res.firstName);
  //     }
  //   })
  //}
}
