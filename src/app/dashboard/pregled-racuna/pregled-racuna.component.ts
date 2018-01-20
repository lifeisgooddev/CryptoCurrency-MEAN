import {Component, Inject, OnInit} from '@angular/core';
import {DataService} from "../../data.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";

import {Observable} from "rxjs/Observable";
import {DataSource} from "@angular/cdk/collections";
import 'rxjs/add/observable/of';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-pregled-racuna',
  templateUrl: './pregled-racuna.component.html',
  styleUrls: ['./pregled-racuna.component.css']
})
export class PregledRacunaComponent implements OnInit, AfterViewInit {
  accounts: any = [];
  transactions: any = [];

  displayedColumns = ['vrsta', 'brojRacuna', 'stanje', 'pregledTransakcija'];
  dataSource: TableSource;

  constructor(private dataService: DataService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getAccounts();
  }

  ngAfterViewInit(){
    this.getAccounts();
  }
  public getAccounts() {
    this.dataService.getAccountsForUser().subscribe(res => {
      this.accounts = res;
      this.dataSource = new TableSource(this.accounts);
    });
  }

  openDialog(row): void {
    let dialogRef;
    let trans;
    this.dataService.getTransactionsForAccount(row.brojRacuna).subscribe(res => {
      trans = res;
      dialogRef = this.dialog.open(TRDialog, {
        width: '75%',
        data: {brojRacuna: row.brojRacuna, trans: trans,}
      });

      dialogRef.afterClosed().subscribe(res => {
      });
    })
  }
}
export class TableSource extends DataSource<any> {
    constructor(private data: any){
      super();
    }
  connect(): Observable<Element[]> {
    return Observable.of(this.data);
  }

  disconnect() {}
}


@Component({
  selector:'transaction-dialog',
  templateUrl:'transactionDialog.html',
})
export class TRDialog {
  constructor(
    public dialogRef: MatDialogRef<TRDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
