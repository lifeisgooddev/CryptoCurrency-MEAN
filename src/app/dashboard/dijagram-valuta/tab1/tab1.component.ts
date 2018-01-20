import { Component, OnInit } from '@angular/core';
import {DataService} from "../../../data.service";
import {single,multi} from ".././data";
@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.component.html',
  styleUrls: ['./tab1.component.css']
})
export class Tab1Component implements OnInit {

  constructor(private dataService:DataService) {
    Object.assign(this,{single, multi});
  }
  data = [];
  chartBTC = {
    name: '',
    series:[]
  };
  ngOnInit() {
    this.dataService.exterChartRateBitCoinAPIcall().subscribe(res =>{
      this.chartBTC.name = res.coin.name;
      res.data.forEach(x => {
        let  seriesBTC = {
          name:'',
          value: 0
        };
        seriesBTC.name = x.date;
        seriesBTC.value = x.price;
        this.chartBTC.series.push(seriesBTC);
      });
      this.data.push(this.chartBTC);
      this.multi = this.data;
    });
  }
  single: any[];
  multi: any[];
  view: any[] = [1000, 600];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Protekli tjedan';
  showYAxisLabel = true;
  yAxisLabel = 'Vrijednost (USD)';
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  autoScale = true;
  onSelect(event) {
    console.log(event);
  }

}
