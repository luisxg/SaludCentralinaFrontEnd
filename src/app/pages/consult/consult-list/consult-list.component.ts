import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs';
import { Consult } from 'src/app/model/consult';
import { ConsultService } from 'src/app/service/consult.service';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-consult-list',
  templateUrl: './consult-list.component.html',
  styleUrls: ['./consult-list.component.css']
})
export class ConsultListComponent implements OnInit{

  displayedColumns: string[] = ['idConsult', 'patient', 'medic','consultDate', 'details', 'actions'];
  dataSource = new MatTableDataSource<Consult>;

  constructor(
    private consultService: ConsultService,
  ){

  }
  ngOnInit(): void {
    this.initData()
    this.reloadPage()
  }

  initData(){
    this.consultService.findAll().subscribe(data=>this.createTable(data))
  }

  reloadPage(){
    this.consultService.getConsultChange().subscribe(data=>this.createTable(data))
  }

  createTable(data: Consult[]){
    this.dataSource = new MatTableDataSource(data)
  }

  delete(id: number){
    this.consultService.delete(id).pipe(switchMap(() => {
      return this.consultService.findAll()
    })).subscribe(data=>{
      this.consultService.setConsultChange(data);
    })
  }

}
