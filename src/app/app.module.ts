import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ChartsModule } from 'ng2-charts';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { DashComponent } from './dash/dash.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { TabComponent } from './tab/tab.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CardComponent } from './card/card.component';
import { BarDefinitieComponent } from './charts/bar-definitie/bar-definitie.component';
import { KaderfilterComponent } from './kaderfilter/kaderfilter.component';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { BarBronnenComponent } from './charts/bar-bronnen/bar-bronnen.component';
import { GaugeUriconventieComponent } from './charts/gauge-uriconventie/gauge-uriconventie.component';
import { GaugeChartModule } from 'angular-gauge-chart';
import { GaugeStatusComponent } from './charts/gauge-status/gauge-status.component';
import { GaugeInschemeComponent } from './charts/gauge-inscheme/gauge-inscheme.component';
import { GaugeBronnenComponent } from './charts/gauge-bronnen/gauge-bronnen.component';
import { GraphQLModule } from './services/graphql/graphql.module';
import { PraatplaatSelectComponent } from './praatplaat-select/praatplaat-select.component';
import { PraatplaatComponent } from './praatplaat/praatplaat.component';
import { DownloadTurtleButtonComponent } from './download-turtle-button/download-turtle-button.component';
import { SpinnersAngularModule } from 'spinners-angular';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    DashComponent,
    TabComponent,
    CardComponent,
    BarDefinitieComponent,
    KaderfilterComponent,
    BarBronnenComponent,
    GaugeUriconventieComponent,
    GaugeStatusComponent,
    GaugeInschemeComponent,
    GaugeBronnenComponent,
    PraatplaatSelectComponent,
    PraatplaatComponent,
    DownloadTurtleButtonComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ChartsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    RouterModule,
    AppRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    ReactiveFormsModule,
    GaugeChartModule,
    GraphQLModule,
    SpinnersAngularModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
