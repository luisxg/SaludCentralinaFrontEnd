import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientComponent } from './pages/patient/patient.component';
import { MedicComponent } from './pages/medic/medic.component';
import { ConsultComponent } from './pages/consult/consult.component';
import { ConsultListComponent } from './pages/consult/consult-list/consult-list.component';

const routes: Routes = [
  { path: 'pages/patients', component: PatientComponent },
  { path: 'pages/medics', component: MedicComponent },
  { path: 'pages/consults', component: ConsultComponent },
  { path: 'pages/consults-list', component: ConsultListComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
