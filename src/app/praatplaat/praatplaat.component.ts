import { AfterViewInit, Component, ViewChild, OnInit, Input } from '@angular/core';
import { KwaliteitService } from '../services/kwaliteit.service';
import { GraphqlService } from '../services/graphql/graphql.service';
import { SparqlService } from '../services/sparql/sparql-angular.service';
import { saveAs } from 'file-saver';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-praatplaat',
  templateUrl: './praatplaat.component.html',
  styleUrls: ['./praatplaat.component.css']
})
export class PraatplaatComponent implements OnInit, AfterViewInit{
  

  constructor(
    private graphqlservice: GraphqlService,
    private sparqlservice: SparqlService
    
    ) { }
  
  ngOnInit() {
  
/*    this.graphqlservice.getDossiers().subscribe(result => {
    console.log(result)
  }) */

  }

  selectedPraatplaat = "" ;
  selectedPraatplaatTitle= ""
  visible = false;
  visibleAlt = true;

  haalSelectieOp(event:any){
    this.selectedPraatplaat = event.profiel;
    this.selectedPraatplaatTitle = event.label;
    //console.log(this.selectedPraatplaat)
     //this.sparqlservice.getPraatplaat(event).subscribe(result => {
    console.log(event)
    //})
  }

  downloadTurtle () {
    this.visible = true;
    this.visibleAlt = false ;
    
    this.sparqlservice.getPraatplaat(this.selectedPraatplaat).subscribe(result => {
      console.log(result)
      return this.maakTurtleFile(result)
    })
   // this.downloadXML() ;
  }

 downloadXML () {
    this.visible = true;
    this.visibleAlt = false ;

    this.sparqlservice.getPraatplaatXML(this.selectedPraatplaat).subscribe(result => {
      console.log(result)
      return this.maakXMLFile(result)
    })

    
  }


  maakXMLFile(data :any) {
    var blobxml = new Blob([data], {type: 'text/xml' })
    saveAs(blobxml, "Praatplaat"+ " " + this.selectedPraatplaatTitle  +".xml"); 
  }



  maakTurtleFile(data: any) {
    let ttl = [];
    //let uriregex = /http:/
    let htmlregex = /</
    //Omdat er soms een tekst of html gedeelte als Object kant kan worden aangeboden, wordt de gekozen manier om de triple op te bouwen iets anders, onderstaande
    //if -then statements bepalen dit met een kleine regrx check.
    for (let i = 0; i < data.results.bindings.length; i++) {

      let s ;
      let p ;
      let o;

      if(data.results.bindings[i].s.type == "bnode") {
        s = '<' + "http://blanknodes.politie.nl#"+ data.results.bindings[i].s.value + '>'
        } 
        else {s = '<' + data.results.bindings[i].s.value + '>' }

      p = '<' + data.results.bindings[i].p.value + '>'
      
      if(data.results.bindings[i].o.type == "bnode") {
        o = '<' + "http://blanknodes.politie.nl#"+ data.results.bindings[i].o.value + '>'
        } 
        else 
          if (data.results.bindings[i].o.type == "uri") 
          { o = '<' + data.results.bindings[i].o.value + '>'}
        else 
          if(data.results.bindings[i].o.type == "literal" && htmlregex.test(data.results.bindings[i].o.value)) 
          {o = '\'\'\'' + data.results.bindings[i].o.value + '\'\'\'' } 
          else 
          {o =  '"' + data.results.bindings[i].o.value + '"'}
        
      
        ttl.push(s + " " + p + " " + o + "." + '\r\n' )

    }

    var blob = new Blob(ttl, {type: 'text/csv' })
    saveAs(blob, "Praatplaat"+ " " + this.selectedPraatplaatTitle  +".ttl"); 
    this.visible = false;
    this.visibleAlt = true ;
  }

  

  ngAfterViewInit() {
  
  }


  
}
