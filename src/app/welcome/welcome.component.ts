import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {DataService} from "../data.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  controller: FormGroup;
  cryptoRate: any = [];
  exchangeRate: any = [];
  login: any ={
    email: '',
    password:''
  };
  constructor(private http:HttpClient,private fb:FormBuilder, public dataService: DataService) {
    this.createForm();
  }

  ngOnInit() {
    this.dataService.externCryptoCurrencyAPIcall().subscribe(res => {
      this.cryptoRate = res;
    });
    this.dataService.externExchangeRateCurrencyAPIcall().subscribe(res =>{
      this.exchangeRate = res;
      this.exchangeRate.forEach(ex => {
       ex.srednji_tecaj = ex.srednji_tecaj.replace(',','.');
      })
    })
  }

  createForm(){
    this.controller = this.fb.group({
      username: ['',Validators.compose([Validators.required,Validators.email])],
      password: ['',Validators.required]
    })
  }
  loginUser() {
    this.dataService.loginUser(this.login);
  }
}
