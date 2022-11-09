import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { KwaliteitService } from 'src/app/services/kwaliteit.service';
import { KwaliteitFlat } from 'src/app/types/types';


@Component({
  selector: 'app-bar-definitie',
  templateUrl: './bar-definitie.component.html',
  styleUrls: ['./bar-definitie.component.css']
})
export class BarDefinitieComponent implements  OnChanges {

  constructor() { }

  @Input() flatjsonresult!: KwaliteitFlat[];
  @Input() yvariables!: []; 
  data: any = [];
  labels: any = [];
  shortLabels: any = [];
  aantalConcepten: any = [];
  aantalBegrippenZonderEenSkosDefinition: any = [];
  aantalBegrippenMetEenSkosDefinition: any = [];
  test: any = [];
  json: any = [];

  sortByNumber(a: any, b: any) {
    if (a.aantalConcepten > b.aantalConcepten) {
      return -1;
    }
    if (a.aantalConcepten < b.aantalConcepten) {
      return 1;
    }
    return 0;
  }

  ngOnChanges(event: any) {
    if (event.flatjsonresult.currentValue.length > 0) {
      this.json = event.flatjsonresult.currentValue
    } else { this.json = this.flatjsonresult }
    this.json.sort(this.sortByNumber)
    this.labels = []
    this.shortLabels = []
    this.aantalConcepten = []
    this.aantalBegrippenZonderEenSkosDefinition = []
    this.aantalBegrippenMetEenSkosDefinition = []
    this.json.map((result: any) => {
    this.data = result
    this.labels.push(result.label);
    this.shortLabels.push(result.shortLabel);
    this.aantalConcepten.push(result.aantalConcepten)
    this.aantalBegrippenZonderEenSkosDefinition.push(result.aantalBegrippenZonderEenSkosDefinition)
    this.aantalBegrippenMetEenSkosDefinition.push(result.aantalConcepten - result.aantalBegrippenZonderEenSkosDefinition)
    });

    this.barChartData = [
      { data: this.aantalBegrippenZonderEenSkosDefinition, label: '#Concepten zonder definition', barThickness: 20, stack: 'bar', order: 2 },
      { data: this.aantalBegrippenMetEenSkosDefinition, label: '#Concepten met definition', barThickness: 20, stack: 'bar', order: 1 },
      
    ];
    this.barChartLabels = this.labels
  }


  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        ticks: {
          callback: function (value) {
            return value.toString().substring(0, 10) + '...';
          },
        }
      }],
      yAxes: [{}]
    },
    tooltips: {
      enabled: true,
      mode: 'label',
      callbacks: {
        title: function (tooltipItems, barChartLabels) {
          var indexTooltip: any = tooltipItems[0].index
          //if(typeof(tooltipItems) == "undefined") {indexTooltip = 0 } else {indexTooltip = tooltipItems[0].index} 
          var test: string = '';
          if (typeof (barChartLabels.labels) != "undefined") { test = 'Begrippenkader: ' + barChartLabels.labels[indexTooltip].toString() };
          return test
        },

      }
    }
  };

  barChartLabels: Label[] = this.labels;
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: this.aantalBegrippenZonderEenSkosDefinition, label: '#Concepten zonder definition', barThickness: 20, stack: 'bar', order: 2 },
    { data: this.aantalBegrippenMetEenSkosDefinition, label: '#Concepten met definition', barThickness: 20, stack: 'bar', order: 1 },
    

  ];


}
