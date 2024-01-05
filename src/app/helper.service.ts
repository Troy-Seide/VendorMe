import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './models/user';
import { environment as env } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Vendor } from './models/vendor';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  headers: HttpHeaders;
  constructor(private client: HttpClient, private router: Router) {
    this.headers = new HttpHeaders({'content-type': 'application/json'});
   }

  getUsers():Observable<User[]> {
    //Here we pass the apiAddress which is localhost:3000 and then the api name we're willing to call which he called as "user" 
    return this.client.get<User[]>(env.apiAddress + '/user');

  }
  getUser(id: String):Observable<User> {
    return this.client.get<User>(env.apiAddress + '/user/' + id);

  }

  AddUser(user: User): Observable<HttpResponse<any>>{
    //Here we convert the JavaScript object into a JSON string. We're also returning the response so we observe the response
    //We also pass the headers because here we're passing the data as a JSON format so we need to tell the headers of the request
    return this.client.post<HttpResponse<any>>(env.apiAddress+'/user/register', JSON.stringify(user), {headers:this.headers, observe:'response'})
  }

  // AddUser(user: User){
  //   //Here we convert the JavaScript object into a JSON string. We're also returning the response so we observe the response
  //   //We also pass the headers because here we're passing the data as a JSON format so we need to tell the headers of the request
  //   return this.client.post<any>(env.apiAddress+'/user/register', JSON.stringify(user), {headers:this.headers, observe:'response'})
  // }

  UpdateUser(user: User): Observable<HttpResponse<any>> {
    return this.client.put(env.apiAddress + '/user/' + user._id, JSON.stringify(user), 
    {headers: this.headers, observe: 'response'});
  }

  DeleteUser(id:String): Observable<HttpResponse<any>> { 
    return this.client.delete<HttpResponse<any>>(env.apiAddress + '/user/' + id, {observe: 'response'});
  }

  loginUser(user:User): Observable<HttpResponse<any>>{
    return this.client.post<any>(env.apiAddress + '/user/login', user)
  }

  //Original loggedIn() function that works
  loggedIn(){
    if(localStorage.getItem('token')){
      return true;
    }
    else if(localStorage.getItem('vendortoken')){
      return true;
    }
    return false;
    //The double exclamation mark is a short way to cast a variable to be a Boolean value so this will return either true or false
    //return !!localStorage.getItem('token');
  }


  getToken() {
    return localStorage.getItem('token');
  }

  logoutUser(){
    localStorage.removeItem('token');
    localStorage.removeItem('vendortoken');
    this.router.navigate(['/home']);
  }

  AddVendor(vendor: Vendor): Observable<HttpResponse<any>>{
    //Here we convert the JavaScript object into a JSON string. We're also returning the response so we observe the response
    //We also pass the headers because here we're passing the data as a JSON format so we need to tell the headers of the request
    return this.client.post<HttpResponse<any>>(env.apiAddress+'/vendor/register', JSON.stringify(vendor), {headers:this.headers, observe:'response'})
  }

  loginVendor(vendor:Vendor): Observable<HttpResponse<any>>{
    return this.client.post<any>(env.apiAddress + '/vendor/login', vendor);
  }

  getVendors():Observable<Vendor[]> {
    //Here we pass the apiAddress which is localhost:3000 and then the api name we're willing to call which he called as "user" 
    return this.client.get<Vendor[]>(env.apiAddress + '/vendor');

  }
  getVendor(id: String):Observable<Vendor> {
    return this.client.get<Vendor>(env.apiAddress + '/vendor/' + id);
  }

  UpdateVendor(vendor: Vendor): Observable<HttpResponse<any>> {
    return this.client.put(env.apiAddress + '/vendor/' + vendor._id, JSON.stringify(vendor), 
    {headers: this.headers, observe: 'response'});
  }
  DeleteVendor(id:String): Observable<HttpResponse<any>> { 
    return this.client.delete<HttpResponse<any>>(env.apiAddress + '/vendor/' + id, {observe: 'response'});
  }
}
