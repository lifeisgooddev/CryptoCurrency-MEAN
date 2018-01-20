import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {DateAdapter} from "@angular/material";
import {DataService} from "../../data.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {UserService} from "../../user.service";
import {PregledRacunaComponent} from "../pregled-racuna/pregled-racuna.component";

@Component({
  selector: 'app-postavke',
  templateUrl: './postavke.component.html',
  styleUrls: ['./postavke.component.css']
})
export class PostavkeComponent implements OnInit {

  controller: FormGroup;
  update:any = {
    firstname: '',
    lastname: '',
    oib: '',
    birthdate: new Date(),
    address: '',
    email: '',
    mobile: '',
  };
  accounts: any = [];
  constructor(private dateAdapter: DateAdapter<Date>,public dialog:MatDialog,private fb:FormBuilder, private router: Router, public dataService: DataService, private user:UserService) {
    this.dateAdapter.setLocale('hr-HR');
    this.createForm();
  }

  ngOnInit() {
    this.dataService.getUserInfo().subscribe(res => {
      this.update = res[0];
    });
    this.getAccounts();
  }

  private getAccounts() {
    this.dataService.getAccountsForUser().subscribe(res => {
      this.accounts = res;
    });
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
    })
  }

  updateUser(){
    this.dataService.updateUserInfo(this.update);
  }
  addAccount(){
    let dialogRef;
      let rand = Math.floor(100000000000 + Math.random() * 900000000000);
      dialogRef = this.dialog.open(addAccount, {
        width: '500px',
        data: { vrsta:'',brojRacuna:rand.toString(), valuta:'' }
      });

      dialogRef.afterClosed().subscribe(result => {
        let addAcc = result;
        addAcc.aktivan = true;
        addAcc.stanje = 0.00;
        addAcc.oib = this.user.oib;
        this.dataService.setAccountForUser(addAcc);
        this.getAccounts();
      });
  }
  removeAccount(brojRacuna){
    let dialogRef;
    dialogRef = this.dialog.open(removeAccount, {
      width: '500px',
      data: ''
    });

    dialogRef.afterClosed().subscribe(res => {
      this.dataService.deleteAccountForUser(brojRacuna);
      this.getAccounts();
    });
  }
}

@Component({
  selector:'add-account',
  templateUrl:'addAccount.html'
})
export class addAccount {
  controller: FormGroup;
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<addAccount>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.createForm();
  }
  types: any = ['VISA','AMEX','Maestro','Diners','MasterCard','VISA Electron','BlockChain','Prepaid'];
  valute: any = ['BTC', 'LTC', 'MIOTA', 'XRC', 'REP', 'XLM', 'BCH', 'ETH'];

  onNoClick(): void {
    this.dialogRef.close();
  }

  createForm(){
    this.controller = this.fb.group({
      vrsta: ['',Validators.required],
      brRacuna:[{value:'',disabled:true},Validators.required],
      valuta:['',Validators.required]
    })
  }

}


@Component({
  selector:'remove-account',
  templateUrl:'removeAccount.html'
})
export class removeAccount {
  constructor(
    public dialogRef: MatDialogRef<removeAccount>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}

