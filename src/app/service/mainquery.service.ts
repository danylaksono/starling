import { Injectable } from '@angular/core';

import { DaftarkegiatanService } from '../service/daftarkegiatan.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CekizinComponent } from '../dialog/cekizin/cekizin.component';


@Injectable({
  providedIn: 'root'
})
export class MainqueryService {


  list: any[];

  constructor(
    private daftarkegiatan: DaftarkegiatanService,
    public dialog: MatDialog
  ) {

    this.daftarkegiatan.getKegiatan().subscribe(
      res => {
        this.list = res;
       // console.log(this.list);
      }
    );

  } //constructor



  openModal(rdtr, bidang) {
    if (!this.list) {
      console.log('list belum ada');
      setTimeout(() => {
        console.log('loading');
      }, 2000
      ) //timeout
    } //if

    let dialogConfig = new MatDialogConfig();
    dialogConfig = {
      disableClose: true,
      autoFocus: true,
      //height : '500px',
      width: '600px',
      hasBackdrop: false
    }
    dialogConfig.data = {
      id: 1,
      title: 'Jenis Kegiatan',
      list: this.list,
      rdtr: rdtr,
      bidang: bidang
    };
    const dialogRef = this.dialog.open(CekizinComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      //console.log("Dialog closed")
      //console.log(result)
    });

  }



  ngOnInit() {


  }
}
