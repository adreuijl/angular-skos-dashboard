import { AfterViewInit, Component, ViewChild, OnInit, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { KwaliteitService } from '../services/kwaliteit.service';
import { KwaliteitBegrippenkader, KwaliteitFlat } from '../types/types';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit, AfterViewInit{
  tableDataSource= new MatTableDataSource<KwaliteitFlat>() ;
  displayedColumns= ["label", 
  "aantalConcepten",
   "aantalBegrippenDatNietVoldoetAanURIConventie", 
   "aantalBegrippenZonderEenSkosDefinition", 
   "aantalConceptenZonderBron", 
   "aantalBegrippenZonderEenSkosInScheme",
   "aantalBegrippenZonderEenStatus",
    "aantalOrphans", 
    "aantalBegrippenMetMeerDanEenDefinitie",
    "aantalBegrippenZonderSkosPrefLabel"
  ];

  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private kwaliteitservice: KwaliteitService) { }
  
  ngOnInit() {
   /*  this.kwaliteitservice.getJSON().subscribe(kwaliteit => {
      this.tableDataSource.data = kwaliteit; 
    }
      ) */
      this.kwaliteitservice.getFlatJSON([]).subscribe(result => {
        console.log(result)
        this.tableDataSource.data = result; 
      }
        )
   
  }


  ngAfterViewInit() {
  
    this.tableDataSource.paginator = this.paginator;
    this.tableDataSource.sort = this.sort
    console.log(this.sort)
  }


  
}
