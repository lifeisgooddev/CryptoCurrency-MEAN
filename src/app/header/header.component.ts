import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {DataService} from "../data.service";
import {UserService} from "../user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  img: any = './assets/imgs/crypto.png';
  userLoggedIn: any = this.user.userLoggedIn;
  constructor(private http:HttpClient, private service:DataService, private user:UserService, public router:Router) { }
  ngOnInit() {
  }

  logout(){
    this.service.logoutUser();
  }

}
