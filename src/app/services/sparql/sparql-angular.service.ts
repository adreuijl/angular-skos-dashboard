import { Injectable, OnInit } from '@angular/core';
import { concat, Observable, of } from 'rxjs';
import { HttpParams, HttpHeaders, HttpClient,HttpInterceptor,HttpRequest,HttpHandler,HttpEvent,HttpParameterCodec, HttpResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { saveAs } from 'file-saver';

export class RDFData {
  s: string = "";
  p: string = "";
  o: string = "";
}


export class Profiel {
  profiel: string = "";
  label: string = ""
}




// ---------------------------------------Oplossing om plus sign in de query mee te kunnen geven
@Injectable()

export class EncodeHttpParamsInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const params = new HttpParams({encoder: new CustomEncoder(), fromString: req.params.toString()});
    return next.handle(req.clone({params}));
  }
}

class CustomEncoder implements HttpParameterCodec {
  encodeKey(key: string): string {
    return encodeURIComponent(key);
  }

  encodeValue(value: string): string {
    return encodeURIComponent(value);
  }

  decodeKey(key: string): string {
    return decodeURIComponent(key);
  }

  decodeValue(value: string): string {
    return decodeURIComponent(value);
  }
}

// ---------------------------------------EINDE Oplossing om plus sign in de query mee te kunnen geven


@Injectable({
  providedIn: 'root'
})
export class SparqlService implements OnInit {

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
  }

  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console

      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string, data?: any) {
    console.log(`SparqlService: ${message}`, data);
  }


  static PREFIXES = `
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX owl: <http://www.w3.org/2002/07/owl#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX sh: <http://www.w3.org/ns/shacl#>
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX sh: <http://www.w3.org/ns/shacl#>`;


  static PROFIEL = `
  <http://ontologie.politie.nl/def/profiel-autorisatie>
  `

  //serviceURL = 'https://definities.ontwikkel.local/edg/tbl/sparql';
  serviceURL = 'http://localhost:4200/sparql';


  getRDF(query: string): Observable<any[]> {
    const options = {
      headers: new HttpHeaders()
      .set ('Content-Type', 'application/sparql-results+json')
      ,
      params: new HttpParams()
        .set('query', query)
        .set('format', 'json')
    };
    return this.http.get<any>(this.serviceURL, options).pipe(
      catchError(this.handleError('getRDF', []))
    );
  }

  getRDFForPraatplaat(query: string): Observable<any[]> {
    const options = {
      headers: new HttpHeaders()
      .set ('Content-Type', 'application/sparql-results+json')
      ,
      params: new HttpParams()
        .set('query', query)
        .set('format', 'json')
    };
    return this.http.get<any>(this.serviceURL, options).pipe(
      catchError(this.handleError('getRDFForPraatplaat', []))
    );
  }



  getRDFXML(query: string): Observable<any[]> {
    const options = {
      headers: new HttpHeaders()
      .set ('Content-Type', 'application/rdf+xml')
      //.set('responseType', 'text')
      ,
      params: new HttpParams()
        .set('query', query)
        .set('format', 'xml') ,
      
        'responseType': 'text' as 'json'
  
    };
    return this.http.get<any>(this.serviceURL, options).pipe(
      catchError(this.handleError('getRDFXML', []))
    );
  }


  protected parseResults(results: any): Array<RDFData> {
    let resultData: any;
    const tempDict: { [uri: string]: RDFData } = {};
    //const itemsDict: { [uri: string]: RDFData } = {};
    const items: RDFData[] = [];
    let rdfdata: RDFData;
    let s: string;
    let p: string;
    let o: string;
    for (resultData of results.results.bindings) {
      s = resultData.s ? resultData.s.value : null;
      p = resultData.p ? resultData.p.value : null;
      o = resultData.o ? resultData.o.value : null;

      if (null == tempDict[s]) {
        rdfdata = new RDFData();
        tempDict[s] = rdfdata;
      } else {
        rdfdata = tempDict[s];
      }
      rdfdata.s = s;
      rdfdata.p = p;
      rdfdata.o = o;
      items.push(rdfdata);

    }
    console.log('?s?p?o resultaat: ', results);
    return items;
  }

  
  protected parseProfielResults(results: any): Array<Profiel> {
    let resultData: any;
    const tempDict: { [profiel: string]: Profiel } = {};
    //const itemsDict: { [uri: string]: RDFData } = {};
    const items: Profiel[] = [];
    let rdfdata: Profiel;
    let profiel: string;
    let label: string;

    for (resultData of results.results.bindings) {
      profiel = resultData.profiel ? resultData.profiel.value : null;
      label = resultData.label ? resultData.label.value : null;
     

      if (null == tempDict[profiel]) {
        rdfdata = new Profiel();
        tempDict[profiel] = rdfdata;
      } else {
        rdfdata = tempDict[profiel];
      }
      rdfdata.profiel = profiel;
      rdfdata.label = label
   
      items.push(rdfdata);

    }
    console.log('profielen: ', results);
    return items;
  }

  

  getPraatplaat(ProfielUri: any): Observable<RDFData[]> {
    
   /*  ProfielUri.subscribe((result: any) => {
      console.log(result)
    }) */

    let uri = "<" + ProfielUri + '>'
    console.log(uri)
    
    const query = `
        ${SparqlService.PREFIXES}

          CONSTRUCT {
            ?class ?cp ?co .
            ?class sh:property ?prop .
           ?prop ?propp ?propo .
      }

           WHERE {
            BIND(${uri} AS ?profile)
             GRAPH ?profile {
               
               {
                 ?profileshape sh:targetClass ?class .
                 OPTIONAL { ?profileshape sh:property ?prop . { GRAPH ?profile { ?prop ?propp ?propo } } UNION { GRAPH ?imports { ?prop ?propp ?propo }} }
               }
               UNION
               {
                 ?class a owl:Class . FILTER NOT EXISTS { ?class sh:targetClass ?x }
                 OPTIONAL { ?class sh:property ?prop { GRAPH ?profile { ?prop ?propp ?propo } } UNION { GRAPH ?imports { ?prop ?propp ?propo }} }
               }
             }
             GRAPH ?imports { ?class ?cp ?co . FILTER (!SAMETERM(?cp, sh:property)) }
           }
          `;

    //const defaultgraphuri = `${ProfielUri}`

    return this.getRDFForPraatplaat(query).pipe(
      map((res: any )=> {
        console.log(res.results.bindings);
        //this.downloadFile(res)
        //return this.parseResults(res);
        return (res)
      }));
  }

  
  getProfielLijst (): Observable<Profiel[]> {
      const query = `
          ${SparqlService.PREFIXES}
          SELECT ?profiel ?label
          WHERE {Graph ?x {
          ?profiel rdf:type    owl:Ontology ;
          OPTIONAL {?profiel rdfs:label ?label}
            }
            FILTER( REGEX (str(?profiel), 'profiel.int.politie', "i" ))
          }
          
            `;
  
      return this.getRDF(query).pipe(
        map((res: any) => {
          return this.parseProfielResults(res);
        }));
      
  }


  getPraatplaatXML(ProfielUri: any): Observable<RDFData[]> {
    
    /*  ProfielUri.subscribe((result: any) => {
       console.log(result)
     }) */
 
     let uri = "<" + ProfielUri + '>'
     console.log(uri)
     
     const query = `
         ${SparqlService.PREFIXES}
 
        
             CONSTRUCT {
                 ?class ?cp ?co .
                 ?class sh:property ?prop .
                 ?prop ?propp ?propo .
             }
 
             WHERE {
               BIND(${uri} AS ?profile)
               GRAPH ?profile 
                 {
                   ?profileshape sh:targetClass ?class .
                   OPTIONAL { ?profileshape sh:property ?prop . { GRAPH ?profile { ?prop ?propp ?propo } } UNION { GRAPH ?imports { ?prop ?propp ?propo }} }
                 }
                 UNION
                 {
                   ?class a sh:NodeShape . FILTER NOT EXISTS { ?class sh:targetClass ?x }
                   OPTIONAL { ?class sh:property ?prop { GRAPH ?profile { ?prop ?propp ?propo } } UNION { GRAPH ?imports { ?prop ?propp ?propo }} }
                 }
               }
               GRAPH ?imports { ?class ?cp ?co . FILTER (!SAMETERM(?cp, sh:property)) }
             }
           `;
 
           
 
     return this.getRDFXML(query).pipe(
       map((res: any )=> {
         console.log(res);
         //this.downloadFile(res)
         //return this.parseResults(res);
         return (res)
       }));
   }

}