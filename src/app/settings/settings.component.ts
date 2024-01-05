import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../models/user';
import { HelperService } from '../helper.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Vendor } from '../models/vendor';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  users:User[];
  user:User;
  ans:any;
  id:any;
  vendors:Vendor[];
  loggedInUser;
  loggedInVendor;
  checkUser = localStorage.getItem('token');
  checkVendor = localStorage.getItem('vendortoken');

  constructor(private helperService: HelperService, private router: Router, private route: ActivatedRoute){
    //this.user = helperService.getUsers();
    this.user = new User();
  }
  ngOnInit(): void {
    this.helperService.getUsers().subscribe(res=> {
      this.users = res;
    });
    this.helperService.getVendors().subscribe(res=>{
      this.vendors = res;
    })
    if(this.checkUser !== null){
    const tokenInfo = jwtDecode(localStorage.getItem('token'));
    var id = tokenInfo['subject'];
    this.helperService.getUser(id).subscribe(res =>{
          this.loggedInUser = res;
          //alert(res.password);
      });
    }

    else if(this.checkVendor !== null){
      const vendortokenInfo = jwtDecode(localStorage.getItem('vendortoken'));
      var vendorId = vendortokenInfo['subject'];
      //console.log(this.checkVendor);
      //console.log(vendorId)
      //alert(vendorId);
      this.helperService.getVendor(vendorId).subscribe(ans =>{
            this.loggedInVendor = ans;
              //alert(res.password);
      })
    }
    //}

    // this.loginForm = new FormGroup({
    //   username: new FormControl('', Validators.required),
    //   password: new FormControl('', Validators.required)
    // })
    //Here we subscribe for the parameters 
    // this.route.params.subscribe(params => {
    //   let id = params.id; //here we get the parameter name we're having, so in our case it is the 'home/:edit' in the app-routing.module.ts file
    //   if(id !== undefined){
    //     this.helperService.getUser(id).subscribe(res => {
    //       this.user = res;
    //     });
    //   }
    // });
    
  }

  // findUser(){
  //   //var id = atob(localStorage.getItem('token').split('.')[1]);
  //   const tokenInfo = jwtDecode(localStorage.getItem('token'));
  //   //const tokenInfo = jwtDecode();
  //   var id = tokenInfo['subject'];
  //   //alert(tokenInfo['subject'])
  //   console.log(tokenInfo)
  //   //alert(id.);
  //   for(var i= 0; i<this.users.length; i++){
  //     if(this.users[i]._id === id ){
  //       this.helperService.getUser(this.users[i]._id).subscribe(res =>{
  //         res = this.loggedInUser;
  //         //alert(res.password);
  //       })
  //     }
      // if(localStorage.get('token') === this.users[i]['token']){
      //   alert(this.users[i].firstName);
      // }
   // }
    // this.helperService.getUser(this.user._id).subscribe(res =>{
    //   this.ans = res;
    // })
    //alert(this.ans.firstName);
  //}

  saveData(form: NgForm){
    console.log(this.user.firstName);
    if(form.valid){
      if(this.user._id !== undefined){
        alert("got here");
        this.helperService.UpdateUser(this.user).subscribe(res => {
          if(res.status === 200){
            this.router.navigate(['/login']);
          }
        });
      }
      // else{
      //   this.helperService.AddUser(this.user).subscribe(res => {
      //     if(res.status === 201){
      //       this.router.navigate(['/login']);
      //     }
      //   });
      }
    }

  //   editUser(id){
  //     for(let i = 0; i<this.users.length; i++){
  //       if(id === this.users[i]._id){
  //         this.helperService.UpdateUser(this.users[i]).subscribe(res => {
  //           if(res.status === 200){
  //             this.router.navigate(['/login']);
  //         }
  //       })
  //     }
  //   }
  // }

    deleteUser(id){
      if(confirm('Are you sure you want to delete your account?')){
        if(this.checkUser!==null){
          this.helperService.DeleteUser(id).subscribe(res => {
            if(res.status === 200){
              for(let i = 0; i<this.users.length; i++){
                if(id === this.users[i]._id){
                  //The splice method takes the index number from where you want to delete it and the number of records you want deleted. 
                  this.users.splice(i, 1);
                  this.router.navigate(['/login']);
                  this.helperService.logoutUser();
                  break;
                }
              }
            }
          });
        }

      else if(this.checkVendor!==null){
        this.helperService.DeleteVendor(id).subscribe(res => {
          if(res.status === 200){
            for(let i = 0; i<this.vendors.length; i++){
              if(id === this.vendors[i]._id){
                //The splice method takes the index number from where you want to delete it and the number of records you want deleted. 
                this.vendors.splice(i, 1);
                this.router.navigate(['/login']);
                this.helperService.logoutUser();
                break;
              }
            }
          }
        });
      }
    }
  }
}
