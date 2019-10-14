import { Component, OnInit, Inject } from '@angular/core';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/material/material.module';
import { MAT_DIALOG_DEFAULT_OPTIONS, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';




export interface dataAtribut {
  atribut: string;
  keterangan: any;
}


@Component({
  selector: 'app-dialog-attribute',
  templateUrl: './dialog-attribute.component.html',
  styleUrls: ['./dialog-attribute.component.scss']
})



@NgModule({
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } }
  ],
  imports: [
    MaterialModule
  ]
})


export class DialogAttributeComponent implements OnInit {

  atribut: any;
  dataAtribut: dataAtribut[];
  displayedColumns: string[] = ['position', 'name'];

  constructor(
    public dialogRef: MatDialogRef<DialogAttributeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { 
    this.atribut = data.atribut.features[0].properties;
    const ELEMENT_DATA: dataAtribut[] = [
      {atribut: 'Alamat', keterangan: this.atribut.ALAMAT},
      {atribut: 'Alas Hak', keterangan: this.atribut.ALASHAK},
      {atribut: 'Jenis 2018', keterangan: this.atribut.JENIS_2018},
      {atribut: 'Kategori ', keterangan: this.atribut.KATEGORI},
      {atribut: 'Keterangan', keterangan: this.atribut.KET},
      {atribut: 'Foto Depan', keterangan: this.atribut.FOTO_DPN}
    ];
    //console.log(this.atribut);


    this.dataAtribut =  ELEMENT_DATA;

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



  ngOnInit() {
  }

}
