import { Component, OnInit } from '@angular/core';
import {DataService} from "../../../data.service";
import {single,multi} from "../data";

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.component.html',
  styleUrls: ['./tab2.component.css']
})
export class Tab2Component implements OnInit {

  constructor(private dataService:DataService) {
    Object.assign(this,{single, multi});
  }
  data = [];
  chartXRC = {
    name: '',
    series:[]
  };
  ngOnInit() {
    this.dataService.exterChartRateRippleAPIcall().subscribe(res =>{
      this.chartXRC.name = res.coin.name;
      res.data.forEach(x => {
        let  seriesXRC = {
          name:'',
          value: 0
        };
        seriesXRC.name = x.date;
        seriesXRC.value = x.price;
        this.chartXRC.series.push(seriesXRC);
      });
      this.data.push(this.chartXRC);
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
