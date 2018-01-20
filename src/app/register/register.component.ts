import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DateAdapter} from "@angular/material";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  controller: FormGroup;
  register:any = {
    firstname: '',
    lastname: '',
    oib: '',
    birthdate: new Date(),
    address: '',
    email: '',
    mobile: '',
    password:'',
  };
  confirmPassword:'';
  constructor(private dateAdapter: DateAdapter<Date>,private fb:FormBuilder, private router: Router, private dataService: DataService) {
    this.dateAdapter.setLocale('hr-HR');
    this.createForm();
  }

  ngOnInit() {
  }

  back(){
    this.router.navigate(['']);
  }

  createForm(){
    this.controller = this.fb.group({
      firstname: ['',Validators.required],
      lastname: ['',Validators.required],
      oib: ['',Validators.compose([Validators.required,Validators.minLength(11),Validators.maxLength(11)])],
      birthdate: [new Date(),Validators.compose([Validators.required])],
      address: ['',Validators.required],
      email: ['',Validators.compose([Validators.required,Validators.email])],
      mobile: ['',Validators.compose([Validators.required,Validators.maxLength(12)])],
      password: ['',Validators.required],
      confirmPassword: ['',Validators.required],
    },{validator: PasswordValidation.MatchPassword})
  }

  registerUser(){
    console.log(this.register);
    this.dataService.registerUser(this.register);
  }
}

import {AbstractControl} from '@angular/forms';
import {Router} from "@angular/router";
import {DataService} from "../data.service";
export class PasswordValidation {

  static MatchPassword(AC: AbstractControl) {
    let password = AC.get('password').value;
    let confirmPassword = AC.get('confirmPassword').value;
    if(password != confirmPassword) {
      AC.get('confirmPassword').setErrors( {MatchPassword: true} )
    } else {
      return null
    }
  }
}
