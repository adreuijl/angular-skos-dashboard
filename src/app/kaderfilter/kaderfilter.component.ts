import { AfterViewInit, Component, ComponentFactoryResolver, OnChanges, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { KwaliteitService } from '../services/kwaliteit.service';

@Component({
  selector: 'app-kaderfilter',
  templateUrl: './kaderfilter.component.html',
  styleUrls: ['./kaderfilter.component.css']
})

export class KaderfilterComponent implements OnInit {

constructor(private kwaliteitService : KwaliteitService){}

filterLabels: any = [];

 ngOnInit() {
  this.kwaliteitService.getJSON().subscribe((result: any) => {
    result.map((element:any) =>   this.filterLabels.push(element.label) );
    console.log(this.selected)
  }
  )

 }

  public kaders = new FormControl();
  kadersList: string[] =this.filterLabels ;
  @Output() selectedKadersEmitter = new EventEmitter  < [] > () ; 
  
  
  selected: any = [];

  onKaderSelect(event:any) {
     this.selectedKadersEmitter.emit (event.value)
  }

}
