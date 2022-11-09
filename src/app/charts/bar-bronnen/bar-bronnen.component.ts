import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { KwaliteitService } from 'src/app/services/kwaliteit.service';
import { KwaliteitFlat } from 'src/app/types/types';


@Component({
  selector: 'app-bar-bronnen',
  templateUrl: './bar-bronnen.component.html',
  styleUrls: ['./bar-bronnen.component.css']
})
export class BarBronnenComponent implements OnChanges {

  constructor() { }

  @Input() flatjsonresult!: KwaliteitFlat[];

  data: any = [];
  labels: any = [];
  aantalConcepten: any = [];
  aantalConceptenZonderBron: any = [];
  aantalConceptenMetBron: any = [];
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
    this.aantalConcepten = []
    this.aantalConceptenZonderBron = []
    this.aantalConceptenMetBron = []

    this.json.map((result: any) => {
      this.data = result
      this.labels.push(result.label);
      this.aantalConcepten.push(result.aantalConcepten)
      this.aantalConceptenZonderBron.push(result.aantalConceptenZonderBron)
      this.aantalConceptenMetBron.push(result.aantalConcepten - result.aantalConceptenZonderBron)
    });

    this.barChartData = [
      { data: this.aantalConceptenZonderBron, label: '#Concepten zonder bron', barThickness: 20, stack: 'bar', order: 2 },
      { data: this.aantalConceptenMetBron, label: '#Concepten met bron', barThickness: 20, stack: 'bar', order: 1 },
      
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
    { data: this.aantalConceptenZonderBron, label: '#Concepten zonder bron', barThickness: 20, stack: 'bar', order: 2 },
    { data: this.aantalConceptenMetBron, label: '#Concepten met bron', barThickness: 20, stack: 'bar', order: 1 },
    
  ];


}
