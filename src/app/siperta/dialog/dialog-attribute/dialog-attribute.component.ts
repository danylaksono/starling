import { Component, OnInit, Inject } from '@angular/core';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/material/material.module';
import { MAT_DIALOG_DEFAULT_OPTIONS, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
  fotoSRTK: string;

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
      { atribut: 'Luas (m2)', keterangan: this.atribut.LUAS },
      { atribut: 'Jenis 2018', keterangan: this.atribut.JENIS_2018 },
      { atribut: 'Kategori ', keterangan: this.atribut.KATEGORI },
      { atribut: 'Kelurahan ', keterangan: this.atribut.KEL },
      { atribut: 'Kecamatan ', keterangan: this.atribut.KEC },
      { atribut: 'Keterangan', keterangan: this.atribut.KET },
      { atribut: 'Kesesuaian', keterangan: this.atribut.KET_2 },
      { atribut: 'No. SRTK', keterangan: this.atribut.NMSRTK },
      { atribut: 'NM Data', keterangan: this.atribut.NMDATA },
      { atribut: 'No. ID', keterangan: this.atribut.NMRID },
      { atribut: 'No. ID Lama', keterangan: this.atribut.NMRID_LAMA },
      { atribut: 'Perubahan', keterangan: this.atribut.PRBHN },
      { atribut: 'ITBX', keterangan: this.atribut.RDTR_ITBX },
      { atribut: 'Tanggal Akhir', keterangan: this.atribut.TGLAKHIR },
      { atribut: 'Tanggal Awal', keterangan: this.atribut.TGLAWAL }
    ];
    //console.log(this.atribut);

    this.fotoDepan = this.urlFoto + this.atribut.FOTO_DPN;
    this.fotoBelakang = this.urlFoto + this.atribut.FOTO_BLKG;
    this.fotoSamping = this.urlFoto + this.atribut.FOTO_SMPG;
    this.fotoSRTK = this.urlFoto + this.atribut.SRTK_1;

    this.dataAtribut = ELEMENT_DATA;

    
  }

  openFoto(foto){
    window.open(foto, '_blank','heigth=250,width=250')
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
      case 'srtk':
        this.showFoto = this.fotoSRTK;
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


  checkFixPhoto(fotourl) {
    const extension = fotourl.substr(-3);

    if (extension != 'jpg') {
      if (fotourl.substr(-1) == '/') {
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
