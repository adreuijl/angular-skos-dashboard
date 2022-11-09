import { Component, OnInit, Input } from '@angular/core';
import { KwaliteitAggregated } from 'src/app/types/types';

@Component({
  selector: 'app-gauge-uriconventie',
  templateUrl: './gauge-uriconventie.component.html',
  styleUrls: ['./gauge-uriconventie.component.css']
})
export class GaugeUriconventieComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() aggregatedresult!: KwaliteitAggregated;

  public canvasWidth = 170
  public needleValue = 50
  public centralLabel = '0' + "%"
  public name = 'Percentage met Uri Conventie'
  public bottomLabel = ''
  

  public options = {
      hasNeedle: true,
      outerNeedle: true,
      needleColor: 'gray',
      needleUpdateSpeed: 1000,
      arcColors: ['rgb(244,84,84)','rgb(239,214,19)','rgb(61,204,91)'],
      arcDelimiters: [70,90],
      arcLabels: [70,90],
      rangeLabel: ['0', '100'],
      needleStartValue: 0,
  }

  
  ngOnChanges(event: any) {
    if (event && event.aggregatedresult.currentValue.percentageMetURIConventie != undefined) {

      console.log(typeof(event.aggregatedresult.currentValue.percentageMetURIConventie))

      this.needleValue= Math.round(event.aggregatedresult.currentValue.percentageMetURIConventie)
      this.centralLabel = Math.round(event.aggregatedresult.currentValue.percentageMetURIConventie).toString() + "%"
    } else { 
      this.needleValue = 5
      this.centralLabel = '5' + "%"
    }
   
 
}


}
