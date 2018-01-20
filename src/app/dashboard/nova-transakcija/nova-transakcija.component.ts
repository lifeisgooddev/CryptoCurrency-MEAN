import { Component, OnInit, ViewChild } from '@angular/core';
import {DataService} from "../../data.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DateAdapter} from "@angular/material";
import { UserService } from '../../user.service';
import { PregledTransakcijaComponent } from '../pregled-transakcija/pregled-transakcija.component';

@Component({
  selector: 'app-nova-transakcija',
  templateUrl: './nova-transakcija.component.html',
  styleUrls: ['./nova-transakcija.component.css']
})
export class NovaTransakcijaComponent implements OnInit {

  controller: FormGroup;
  types: any = ['UPLATA','ISPLATA','TRAJNI NALOG'];
  transaction: any;
  accounts = [];
  showValuta = false;
  constructor(private dataService:DataService,private dateAdapter:DateAdapter<Date>, private fb:FormBuilder, private user: UserService) {
    this.dateAdapter.setLocale('hr-HR');
    this.createForm();
    this.transaction = {
      brojRacuna: '',
      iznos: 0.00,
      datum: new Date(),
      brojAutorizacije: '',
      vrsta: '',
      valuta: '',
      odobreno: false,
      oib: this.user.oib
    }
  }

  ngOnInit() {
    this.dataService.getAccountsForUser().subscribe(res => {
      this.accounts = res;
    })
  }

  createForm(){
    this.controller = this.fb.group({
      brojRacuna: ['',Validators.required],
      vrsta: ['',Validators.required],
      brojAutorizacije: ['',Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(20)])],
      datum: [new Date(),Validators.compose([Validators.required])],
      iznos: [0.00,Validators.required],
    })
  }

  createTransaction(){
      this.dataService.setTransactionForUser(this.transaction);
      this.createForm();
      this.controller.markAsUntouched();
      this.controller.markAsPristine();
      this.transaction = {
        brojRacuna: '',
        iznos: 0.00,
        datum: new Date(),
        brojAutorizacije: '',
        vrsta: '',
        valuta: '',
        odobreno: false,
        oib: this.user.oib
      };
      this.showValuta = false;
  }

  getValuta(){
    console.log("test");
    this.dataService.getAccountInfo(this.transaction.brojRacuna).subscribe(res => {
      this.transaction.valuta = res[0].valuta;
      this.showValuta = true;
    })
  }
}
