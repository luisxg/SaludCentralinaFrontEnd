import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PatientComponent } from './pages/patient/patient.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { HttpClientModule } from '@angular/common/http';
import { PatientdialogComponent } from './pages/patient/patientdialog/patientdialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MedicComponent } from './pages/medic/medic.component';
import { MedicDialogComponent } from './pages/medic/medic-dialog/medic-dialog.component';
import { ConsultComponent } from './pages/consult/consult.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatNativeDateModule} from '@angular/material/core';
import { ConsultListComponent } from './pages/consult/consult-list/consult-list.component';
@NgModule({
  declarations: [
    AppComponent,
    PatientComponent,
    PatientdialogComponent,
    MedicComponent,
    MedicDialogComponent,
    ConsultComponent,
    ConsultListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatListModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
