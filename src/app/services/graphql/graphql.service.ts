import { Injectable } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { GET_NodeShapes} from './graphql_queries'
import {Query, NodeShape} from '../../types/types'
import { Apollo, gql } from 'apollo-angular';


@Injectable({
  providedIn: 'root'
})
export class GraphqlService  implements OnInit {
  
  loading$ = new BehaviorSubject(true);
  dossiersObservable!: Observable<NodeShape[]>;
  

  constructor(private apollo: Apollo) {}

  ngOnInit() {
  }

  getDossiers(): Observable <NodeShape []> {
    return this.dossiersObservable = this.apollo
      .watchQuery<Query>({
        query: GET_NodeShapes,
        variables: {},
      })
      .valueChanges.pipe(map(result => {
        this.loading$.next(result.loading);
        console.log("nodeshapes nu:", result.data );
        return result.data.nodeShapes
      }));
  }
  
}