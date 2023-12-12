import { Injectable } from '@angular/core';
import { Medic } from '../model/medic';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicService {
  private medicChange = new Subject<Medic[]>()
  protected url = 'http://localhost:7070/medics'

  constructor(
    protected http: HttpClient,
  ) { }

  getMedicChange(){
    return this.medicChange.asObservable()
  }
  setMedicChange(data: Medic[]){
    this.medicChange.next(data)
  }

  findAll(){
    return this.http.get<Medic[]>(this.url)
  }

  save(data: Medic){
    return this.http.post(this.url, data)
  }

  update(data: Medic){
    return this.http.put(this.url, data)
  }

  delete(id: number){
    return this.http.delete(`${this.url}/${id}`)
  }
}
