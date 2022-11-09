import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashComponent } from './dash/dash.component';
import { TabComponent } from './tab/tab.component';
import { PraatplaatComponent } from './praatplaat/praatplaat.component';

const routes: Routes = [
  {path : '', component : DashComponent},
  {path : 'tabel', component : TabComponent},
  {path : 'praatplaat', component : PraatplaatComponent},
  { path: '**', redirectTo: '' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
