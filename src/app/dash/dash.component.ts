import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { KwaliteitService } from '../services/kwaliteit.service';
import { KaderfilterComponent } from '../kaderfilter/kaderfilter.component';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements  OnInit {
  cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 1,
          miniCard: { cols: 1, rows: 1 },
          chart: { cols: 2, rows: 3 }
        };
      }

      return {
        columns: 4,
        miniCard: { cols: 1, rows: 1 },
        chart: { cols: 2, rows: 3}

      };
    })
  );

  constructor(private breakpointObserver: BreakpointObserver, private kwaliteitservice: KwaliteitService
  ) { }

  filteredresults: any = [];
  dataset = [];
  title: string = "Kwaliteit begrippenkaders"
  flatjsonresult: any = [];
  aggregatedresult: any = []  

  ngOnInit() {
    this.kwaliteitservice.getFlatJSON([]).subscribe(result => {
      this.flatjsonresult = result
    })

    this.kwaliteitservice.getAggregatedJSON([]).subscribe((result: any) => {
     this.aggregatedresult = result
    })
  }

  haalFilterOp(event:any){ console.log(event)
    this.kwaliteitservice.getFlatJSON(event).subscribe(result => {
    this.flatjsonresult = [] 
    this.flatjsonresult = result
    })

    this.kwaliteitservice.getAggregatedJSON(event).subscribe((result: any) => {
      this.aggregatedresult = [] 
      this.aggregatedresult = result
      })
  }

}
