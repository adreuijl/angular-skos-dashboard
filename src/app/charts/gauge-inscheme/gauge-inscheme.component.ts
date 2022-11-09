import { Component, OnInit, Input } from '@angular/core';
import { KwaliteitAggregated } from 'src/app/types/types';

@Component({
  selector: 'app-gauge-inscheme',
  templateUrl: './gauge-inscheme.component.html',
  styleUrls: ['./gauge-inscheme.component.css']
})
export class GaugeInschemeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() aggregatedresult!: KwaliteitAggregated;

  public canvasWidth = 170
  public needleValue = 50
  public centralLabel = '0' + "%"
  public name = 'Percentage met inScheme relatie'
  public bottomLabel = ''
  

  public options = {
      hasNeedle: true,
      outerNeedle: true,
      needleColor: 'gray',
      needleUpdateSpeed: 1000,
      arcColors: ['rgb(255,84,84)','rgb(239,214,19)','rgb(61,204,91)'],
      arcDelimiters: [70,90],
      arcLabels: [70,90],
      rangeLabel: ['0', '100'],
      needleStartValue: 0,
  }

  
  ngOnChanges(event: any) {
    if (event && event.aggregatedresult.currentValue.percentageMetInScheme != undefined) {
      this.needleValue= Math.round(event.aggregatedresult.currentValue.percentageMetInScheme)
      this.centralLabel = Math.round(event.aggregatedresult.currentValue.percentageMetInScheme).toString() + "%"
    } else { 
      this.needleValue = 5
      this.centralLabel = '5' + "%"
    }
   
 
}


}
