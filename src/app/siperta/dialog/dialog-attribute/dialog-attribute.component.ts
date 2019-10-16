import { Component, OnInit, Inject } from '@angular/core';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/material/material.module';
import { MAT_DIALOG_DEFAULT_OPTIONS, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { WarningSnackbarService } from 'src/app/dialog/warning-snackbar.service';




 


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

  fotoDepan: string;
  fotoBelakang: string;
  fotoSamping: string;

  showFoto: string;

  urlFoto = 'https://sitaru.jogjakota.go.id/assets/images/foto/';

  constructor(
    public dialogRef: MatDialogRef<DialogAttributeComponent>,
    private warning: WarningSnackbarService,
    
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.atribut = data.atribut.features[0].properties;
    const ELEMENT_DATA: dataAtribut[] = [
      { atribut: 'Alamat', keterangan: this.atribut.ALAMAT },
      { atribut: 'Alas Hak', keterangan: this.atribut.ALASHAK },
      { atribut: 'Jenis 2018', keterangan: this.atribut.JENIS_2018 },
      { atribut: 'Kategori ', keterangan: this.atribut.KATEGORI },
      { atribut: 'Keterangan', keterangan: this.atribut.KET },
      { atribut: 'SRTK 1', keterangan: this.atribut.SRTK_1 },
      { atribut: 'NM Data', keterangan: this.atribut.NMDATA }
    ];
    //console.log(this.atribut);

    this.fotoDepan = this.urlFoto + this.atribut.FOTO_DPN;
    this.fotoBelakang = this.urlFoto + this.atribut.FOTO_BLKG;
    this.fotoSamping = this.urlFoto + this.atribut.FOTO_SMPG;

    this.dataAtribut = ELEMENT_DATA;

  }

  onValChange(value) {
    switch (value) {
      case 'depan':
        this.showFoto = this.fotoDepan;
        
        break;
      case 'belakang':
        this.showFoto = this.fotoBelakang;
        //console.log(this.showFoto);
        break;
      case 'samping':
        this.showFoto = this.fotoSamping;
        //console.log(this.showFoto);
        break;
    }
    //console.log(this.showFoto);
    this.checkFixPhoto(this.showFoto);

  }

  /*
    showFotoDepan() {
      this.showFoto = this.fotoDepan;
    }
    showFotoBelakang() {
      this.showFoto = this.fotoBelakang;
    }
    showFotoSamping() {
      this.showFoto = this.fotoSamping;
    }
  
    */


    checkFixPhoto(fotourl){
      const extension = fotourl.substr(-3);

      if (extension != 'jpg') {
        if(fotourl.substr(-1) == '/') {
          this.warning.open('Foto Tidak Ditemukan!');
          console.log('foto tidak ditemukan');
          this.showFoto = this.fotoDepan;
        } else {
          this.showFoto = fotourl + '.jpg';
        }
      }
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
    this.showFoto = this.fotoDepan;

    
  }

}
