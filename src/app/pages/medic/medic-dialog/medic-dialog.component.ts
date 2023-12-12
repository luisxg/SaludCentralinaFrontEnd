import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import { Medic } from 'src/app/model/medic';
import { MedicService } from 'src/app/service/medic.service';

@Component({
  selector: 'app-medic-dialog',
  templateUrl: './medic-dialog.component.html',
  styleUrls: ['./medic-dialog.component.css']
})
export class MedicDialogComponent implements OnInit{

  status = true
  form : FormGroup
  accion:string

  constructor(
    public dialogRef: MatDialogRef<MedicDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Medic,

    private medicService: MedicService,

  ){  }

  ngOnInit(): void {
    this.form = new FormGroup({
      'idMedic' : new FormControl(0),
      'firstName': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'lastName': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'ci': new FormControl('', [Validators.required, Validators.minLength(10)]),
    })
                        //save        //update
    this.data == null ? this.status : this.status = false
    this.data != null ? this.initData() : '' 
    this.status ? this.accion = 'Agregar Medico' : this.accion = 'Editar Medico'
  }

  initData(){
    this.form = new FormGroup({
      'idMedic' : new FormControl(this.data.idMedic),
      'firstName': new FormControl(this.data.firstName, [Validators.required, Validators.minLength(3)]),
      'lastName': new FormControl(this.data.lastName, [Validators.required, Validators.minLength(3)]),
      'ci': new FormControl(this.data.ci, [Validators.required, Validators.minLength(10)]),
    })
  }getErrorMessage(s: string) {
    const fieldErrors = {
      f: 'firstName',
      l: 'lastName',
      d: 'ci',
    };

    const errorMessages = {
      firstName: 'Not a valid FirstName',
      lastName: 'Not a valid LastName',
      ci: 'Not a valid CI',
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
    let medic = new Medic

    medic.idMedic = this.form.value['idMedic']
    medic.firstName = this.form.value['firstName']
    medic.lastName = this.form.value['lastName']
    medic.ci = this.form.value['ci']

    if (this.status) {
      this.medicService.save(medic).pipe(switchMap(() => {
        return this.medicService.findAll()
      })).subscribe(data => {
        this.medicService.setMedicChange(data);
      })

    } else {
      console.log(medic)
      this.medicService.update(medic).pipe(switchMap(() => {
        return this.medicService.findAll()
      })).subscribe(data=>{
        this.medicService.setMedicChange(data);
      })
    }
    this.close()
  }

  close() {
    this.dialogRef.close();
  }


}