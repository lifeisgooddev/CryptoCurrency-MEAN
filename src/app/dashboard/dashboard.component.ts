import { Component, OnInit, ViewChild } from '@angular/core';
import { PregledRacunaComponent } from './pregled-racuna/pregled-racuna.component';
import { PregledTransakcijaComponent } from './pregled-transakcija/pregled-transakcija.component';
import {MatTabChangeEvent} from "@angular/material";
import { NovaTransakcijaComponent } from './nova-transakcija/nova-transakcija.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild(PregledRacunaComponent) racuni: PregledRacunaComponent;
  @ViewChild(PregledTransakcijaComponent) transakcije: PregledTransakcijaComponent;
  @ViewChild(NovaTransakcijaComponent) novaTransakcija: NovaTransakcijaComponent;
  constructor() { }

  ngOnInit() {
  }

  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    this.racuni.getAccounts();
    this.transakcije.getTransactions();
    this.novaTransakcija.ngOnInit();
  }
}
