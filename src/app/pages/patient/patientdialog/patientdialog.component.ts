import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import { Patient } from 'src/app/model/patient';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-patientdialog',
  templateUrl: './patientdialog.component.html',
  styleUrls: ['./patientdialog.component.css']
})
export class PatientdialogComponent implements OnInit{

  status = true
  form : FormGroup
  accion:string

  constructor(
    public dialogRef: MatDialogRef<PatientdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Patient,

    private patientService: PatientService,

  ){  }

  ngOnInit(): void {
    this.form = new FormGroup({
      'idPatient' : new FormControl(0),
      'firstName': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'lastName': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'phone': new FormControl('', [Validators.required, Validators.minLength(10)]),
      'ci': new FormControl('', [Validators.required, Validators.minLength(10)]),
      'address': new FormControl('', [Validators.required]),
    })
                        //save        //update
    this.data == null ? this.status : this.status = false
    this.data != null ? this.initData() : '' 
    this.status ? this.accion = 'Agregar Paciente' : this.accion = 'Editar Paciente'
  }

  initData(){
    this.form = new FormGroup({
      'idPatient' : new FormControl(this.data.idPatient),
      'firstName': new FormControl(this.data.firstName, [Validators.required, Validators.minLength(3)]),
      'lastName': new FormControl(this.data.lastName, [Validators.required, Validators.minLength(3)]),
      'phone': new FormControl(this.data.phone, [Validators.required, Validators.minLength(10)]),
      'address': new FormControl(this.data.address, [Validators.required]),
      'ci': new FormControl(this.data.ci, [Validators.required, Validators.minLength(10)]),
    })
  }getErrorMessage(s: string) {
    const fieldErrors = {
      f: 'firstName',
      l: 'lastName',
      d: 'ci',
      a: 'address',
      p: 'phone',
    };

    const errorMessages = {
      firstName: 'Not a valid FirstName',
      lastName: 'Not a valid LastName',
      ci: 'Not a valid CI',
      address: 'Not a valid Address',
      phone: 'Not a valid Phone',
    };
    const fieldName = fieldErrors[s];
    const errorMessage = errorMessages[fieldName];
    return this.f[fieldName].errors ? errorMessage : 'Not a valid';
  }
  
  get f(){
    return this.form.controls;
  }

  operate(){
    if(this.form.invalid){return}
    let patient = new Patient

    patient.idPatient = this.form.value['idPatient']
    patient.firstName = this.form.value['firstName']
    patient.lastName = this.form.value['lastName']
    patient.ci = this.form.value['ci']
    patient.address = this.form.value['address']
    patient.phone = this.form.value['phone']

    if (this.status) {
      this.patientService.save(patient).pipe(switchMap(() => {
        return this.patientService.findAll()
      })).subscribe(data => {
        this.patientService.setPatientChange(data);
      })

    } else {
      console.log(patient)
      this.patientService.update(patient).pipe(switchMap(() => {
        return this.patientService.findAll()
      })).subscribe(data=>{
        this.patientService.setPatientChange(data);
      })
    }
    this.close()
  }

  close() {
    this.dialogRef.close();
  }


}