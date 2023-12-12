import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Consult } from 'src/app/model/consult';
import { ConsultDetail } from 'src/app/model/consultDetail';
import { Medic } from 'src/app/model/medic';
import { Patient } from 'src/app/model/patient';
import { ConsultService } from 'src/app/service/consult.service';
import { MedicService } from 'src/app/service/medic.service';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.css']
})
export class ConsultComponent implements OnInit{

  patients: Patient[]
  idPatientSelected: number

  medics$: Observable<Medic[]>
  idMedicSelected: number

  maxDate: Date = new Date()
  dateSelected: Date

  diagnosis: string
  treatment: string

  listDetails: ConsultDetail[] = []

 constructor(
   private patientService: PatientService,
   private medicService: MedicService,
   private consultService: ConsultService,
   private snackBar: MatSnackBar,
 ){

 }

 ngOnInit(): void {
   this.getPatients()
   this.getMedic()
 }

 getPatients(){
   this.patientService.findAll().subscribe(data => this.patients = data)
 }

 getMedic(){
   this.medics$ = this.medicService.findAll()
 }

 addDetail(){
   let d = new ConsultDetail()
   d.diagnosis = this.diagnosis
   d.treatment = this.treatment

   this.listDetails.push(d)
   this.diagnosis = null
   this.treatment = null
 }

 removeDetail(i: number){
   this.listDetails.splice(i, 1)
 }

 saveConsult(){
   let patient = new Patient()
   patient.idPatient = this.idPatientSelected
   
   let medic = new Medic()
   medic.idMedic=this.idMedicSelected

   let consult = new Consult()
   consult.patient = patient
   consult.medic = medic
   let tzoffset = (new Date()).getTimezoneOffset() * 60000
   let localISOTime = (new Date(this.dateSelected.getTime() - tzoffset)).toISOString()
   consult.consultDate = localISOTime
   consult.details = this.listDetails

   this.consultService.save(consult).subscribe(()=>{
     this.snackBar.open('CONSULTA CREADA','INFO',{duration: 2000})

     setTimeout(()=>{
       this.cleanControls()
     }), 20000
   })
 }

 cleanControls(){
   this.idPatientSelected = 0
   this.idMedicSelected = 0
   this.dateSelected = null
   this.diagnosis = null
   this.treatment = null
   this.listDetails = []
 }
}