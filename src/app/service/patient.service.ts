import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from '../model/patient';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private patientChange = new Subject<Patient[]>()
  protected url = 'http://localhost:7070/patients'

  constructor(
    protected http: HttpClient,
  ) { }

  getPatientChange(){
    return this.patientChange.asObservable()
  }
  setPatientChange(data: Patient[]){
    this.patientChange.next(data)
  }

  findAll(){
    return this.http.get<Patient[]>(this.url)
  }

  save(data: Patient){
    return this.http.post(this.url, data)
  }

  update(data: Patient){
    return this.http.put(this.url, data)
  }

  delete(id: number){
    return this.http.delete(`${this.url}/${id}`)
  }
}
