import { Component, OnInit } from '@angular/core';
import { Vendor } from '../models/vendor';
import { HelperService } from '../helper.service';
import { CustomeFilterPipePipe } from '../custome-filter-pipe.pipe';
import { User } from '../models/user';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit{
  vendors:Vendor[];
  words:String;
  users: User[];
  checkUser = localStorage.getItem('token');
  checkVendor = localStorage.getItem('vendortoken');
  constructor(private helperService: HelperService){


  }

  ngOnInit(): void {
    this.helperService.getVendors().subscribe(res=> {
      this.vendors = res;
    });

    this.helperService.getUsers().subscribe(res => {
      this.users = res;
    })
    
  }
  search(){
    this.helperService.getVendors().subscribe(res =>{
      this.vendors = res;
    })
    this.vendors.forEach(obj => {
      if(obj.name.toLowerCase() === this.words.toLowerCase()){
        alert(obj);
      }
      else if(obj.email.toLowerCase() === this.words.toLowerCase()){
        alert("searched by email " + obj);

      }
      else if(obj.description.toLowerCase() === this.words.toLowerCase()){
        alert("searched by description " + obj);
      }
      
    })
  }
}
