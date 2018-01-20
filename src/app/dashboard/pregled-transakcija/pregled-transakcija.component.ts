import { Component, OnInit } from '@angular/core';
import {DataService} from "../../data.service";
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import {DataSource} from "@angular/cdk/collections";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-pregled-transakcija',
  templateUrl: './pregled-transakcija.component.html',
  styleUrls: ['./pregled-transakcija.component.css']
})
export class PregledTransakcijaComponent implements OnInit,AfterViewInit {
  transactions: any = [];
  constructor(private dataService: DataService) {
  }

  displayedColumns = ['vrsta', 'brojRacuna', 'brojAutorizacije', 'iznos', 'odobreno'];
  dataSource: TableSource;


  ngOnInit() {
    this.getTransactions();
  }

  ngAfterViewInit(){
    this.getTransactions();
  }

  public getTransactions(){
    this.dataService.getTransactionsForUser().subscribe(res=>{
      this.transactions = res;
      this.dataSource = new TableSource(this.transactions);
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
