
import { Injectable, ViewChild, ElementRef } from '@angular/core';

import { DaftarkegiatanService } from '../service/daftarkegiatan.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CekizinComponent } from '../dialog/cekizin/cekizin.component';
import { DialogIntensitasComponent } from '../dialog/dialog-intensitas/dialog-intensitas.component';



@Injectable({
  providedIn: 'root'
})

export class MainqueryService {
  
  list: any[];

  constructor(
    private daftarkegiatan: DaftarkegiatanService,
    public dialog: MatDialog,
  //  private highlight: HighlightfeatureService
  ) {

    this.daftarkegiatan.getKegiatan().subscribe(
      res => {
        this.list = res;
       // console.log(this.list);
      }
    );
  } //constructor


  //======dialog cek izin======
  openModalCekIzin(rdtr, bidang) {
    console.log('cek izin: rdtr = ', rdtr);
    console.log('cek izin: bidang = ', bidang);
    if (!this.list) {
      console.log('list belum ada');
      setTimeout(() => {
        console.log('loading');
      }, 2000
      ) //timeout
    } //check if list exist

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
      //if (result === 'A') {
        // handle A button close
        console.log('Cek intensitas', result);
        this.openModalCekIntensitas(bidang.luas, result);
      //}
    
      //this.highlight.clearHighlight();
      //console.log("Dialog closed")
      //console.log(result)
    });
  }


  //======dialog cek intensitas======
  openModalCekIntensitas(luas, itbx) {

    let dialogConfig = new MatDialogConfig();
    dialogConfig = {
      disableClose: true,
      autoFocus: true,
      //height : '500px',
      //width: '500px',
      hasBackdrop: false
    }
    dialogConfig.data = {
      id: 2,
      title: 'Cek Pemanfaatan',
      luas: luas,
      itbx: itbx
    };
    const dialogRef = this.dialog.open(DialogIntensitasComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      //console.log("Dialog closed")
      //console.log(result)
    });
  }





  ngOnInit() {


  }
}
