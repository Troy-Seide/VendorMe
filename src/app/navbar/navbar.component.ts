import { Component } from '@angular/core';
import { HelperService } from '../helper.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(public helperService: HelperService){
    //let check = this.helperService.loggedIn();
  }
  vendorCheck(){
    // if(confirm('Are you a vendor?')){

    // }
  }
}
