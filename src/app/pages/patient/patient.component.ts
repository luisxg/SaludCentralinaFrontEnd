import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs';
import { Patient } from 'src/app/model/patient';
import { PatientService } from 'src/app/service/patient.service';
import { PatientdialogComponent } from './patientdialog/patientdialog.component';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit{

  displayedColumns: string[] = ['firstName', 'lastName', 'phone', 'address', 'ci', 'actions'];
  dataSource = new MatTableDataSource<Patient>;

  constructor(
    private patientService: PatientService,
    private dialog: MatDialog
  ){

  }
  ngOnInit(): void {
    this.initData()
    this.reloadPage()
  }

  initData(){
    this.patientService.findAll().subscribe(data=>this.createTable(data))
  }

  reloadPage(){
    this.patientService.getPatientChange().subscribe(data=>this.createTable(data))
  }


  createTable(data: Patient[]){
    this.dataSource = new MatTableDataSource(data)
  }

  openDialog(data?: Patient){
    this.dialog.open(PatientdialogComponent, {data: data})
  }

  delete(id: number){
    this.patientService.delete(id).pipe(switchMap(() => {
      return this.patientService.findAll()
    })).subscribe(data=>{
      this.patientService.setPatientChange(data);
    })
  }

}
