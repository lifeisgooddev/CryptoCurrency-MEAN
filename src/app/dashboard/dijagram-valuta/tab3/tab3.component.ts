import { Component, OnInit } from '@angular/core';
import {DataService} from "../../../data.service";
import{single,multi} from "../data";

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.component.html',
  styleUrls: ['./tab3.component.css']
})
export class Tab3Component implements OnInit {

  constructor(private dataService:DataService) {
    Object.assign(this,{single, multi});
  }
  data = [];
  chartETH = {
    name: '',
    series:[]
  };
  ngOnInit() {
    this.dataService.exterChartRateEtheriumAPIcall().subscribe(res =>{
      this.chartETH.name = res.coin.name;
      res.data.forEach(x => {
        let  seriesETH = {
          name:'',
          value: 0
        };
        seriesETH.name = x.date;
        seriesETH.value = x.price;
        this.chartETH.series.push(seriesETH);
      });
      this.data.push(this.chartETH);
      this.multi = this.data;
    });
  }
  single: any[];
  multi: any[];
  view: any[] = [1000,600];
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
