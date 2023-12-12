import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Medic } from 'src/app/model/medic';
import { MedicService } from 'src/app/service/medic.service';
import { MedicDialogComponent } from './medic-dialog/medic-dialog.component';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-medic',
  templateUrl: './medic.component.html',
  styleUrls: ['./medic.component.css']
})
export class MedicComponent implements OnInit{

  displayedColumns: string[] = ['firstName', 'lastName', 'ci', 'actions'];
  dataSource = new MatTableDataSource<Medic>;

  constructor(
    private medicService: MedicService,
    private dialog: MatDialog
  ){

  }
  ngOnInit(): void {
    this.initData()
    this.reloadPage()
  }

  initData(){
    this.medicService.findAll().subscribe(data=>this.createTable(data))
  }

  reloadPage(){
    this.medicService.getMedicChange().subscribe(data=>this.createTable(data))
  }


  createTable(data: Medic[]){
    this.dataSource = new MatTableDataSource(data)
  }

  openDialog(data?: Medic){
    this.dialog.open(MedicDialogComponent, {data: data})
  }

  delete(id: number){
    this.medicService.delete(id).pipe(switchMap(() => {
      return this.medicService.findAll()
    })).subscribe(data=>{
      this.medicService.setMedicChange(data);
    })
  }

}
