import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Consult } from '../model/consult';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultService {
  private consultChange = new Subject<Consult[]>()
  protected url = 'http://localhost:7070/consults'

  constructor(
    protected http: HttpClient,
  ) { }

  getConsultChange(){
    return this.consultChange.asObservable()
  }
  setConsultChange(data: Consult[]){
    this.consultChange.next(data)
  }

  findAll(){
    return this.http.get<Consult[]>(this.url)
  }

  save(data: Consult){
    return this.http.post(this.url, data)
  }

  delete(id: number){
    return this.http.delete(`${this.url}/${id}`)
  }
}
