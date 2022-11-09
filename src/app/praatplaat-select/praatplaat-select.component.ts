import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GraphqlService } from '../services/graphql/graphql.service';
import { SparqlService } from '../services/sparql/sparql-angular.service';
import { Profiel } from '../services/sparql/sparql-angular.service';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-praatplaat-select',
  templateUrl: './praatplaat-select.component.html',
  styleUrls: ['./praatplaat-select.component.css']
})


export class PraatplaatSelectComponent implements OnInit {
  profielen: Profiel[] = []
  
  constructor(
    private graphqlservice: GraphqlService,
    private sparqlservice: SparqlService
    
    ) { }
  
  ngOnInit() {
  this.sparqlservice.getProfielLijst().subscribe(result => {
    console.log(result)
    this.profielen = result
  })
  }

  public profielFormControl = new FormControl();

  @Output() selectedProfielsEmitter = new EventEmitter  < [] > () ; 
  
  
  selected: any = [];

  onProfielSelect(event:any) {
     this.selectedProfielsEmitter.emit (event.value)
     console.log(event.value)
  }

}
