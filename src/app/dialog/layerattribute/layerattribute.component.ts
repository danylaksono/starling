import { Component, OnInit, Inject } from '@angular/core';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { MAT_DIALOG_DEFAULT_OPTIONS, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AuthService } from '../../service/auth.service';



export interface dataPolaBidang {
  atribut: string;
  keterangan: any;
}


@Component({
  selector: 'app-layerattribute',
  templateUrl: './layerattribute.component.html',
  styleUrls: ['./layerattribute.component.scss']
})



@NgModule({
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } }
  ],
  imports: [
    MaterialModule
  ]
})


export class LayerattributeComponent implements OnInit {

  // modal dialog data
  modalTitle: string;
  modalRDTR: any;
  modalBidang: any;
  isLoggedIn: Boolean = false;
  displayedColumns: string[] = ['position', 'name'];
  dataSource: dataPolaBidang[];



  constructor(
    public dialogRef: MatDialogRef<LayerattributeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public auth: AuthService
  ) {
    const ELEMENT_DATA: dataPolaBidang[] = [
      {atribut: 'Zona RDTR', keterangan: data.dataRDTR.zona},
      {atribut: 'Sub-Zona RDTR', keterangan: data.dataRDTR.sub_zona},
      {atribut: 'Status Kawasan', keterangan: data.dataRDTR.pola_ruang},
      {atribut: 'Jenis Hak', keterangan: data.dataBidang.TIPE},
      {atribut: 'Luas Bidang Tanah (m2)', keterangan: Math.round(data.dataBidang.luas)}
    ];
    
    this.modalTitle = data.title;
    this.modalRDTR = data.dataRDTR;
    this.modalBidang = data.dataBidang;
    this.isLoggedIn = auth.isSignedIn();
    this.dataSource =  ELEMENT_DATA;
    
  }


  closeA() {
    this.closeDialog('A')
  }

  closeB() {
    this.closeDialog('B');
  }

  closeDialog(button: 'A' | 'B') {
    this.dialogRef.close(button);
  }



  //closeDialog(){
  //this.dialogRef.close();
  //console.log('buy');    
  //this.onTriggered.emit(true);
  // }

  ngOnInit() {
  }

}
