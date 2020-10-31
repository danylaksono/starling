import { CekintensitasService } from './../../service/cekintensitas.service';
import { DataitbxService } from './../../service/dataitbx.service';
import { Component, Inject, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


@Component({
  selector: 'app-cekizin',
  templateUrl: './cekizin.component.html',
  styleUrls: ['./cekizin.component.scss']
})

/*
@NgModule({
  imports: [
    MaterialModule
  ]
})
*/

export class CekizinComponent implements OnInit {

  // modal dialog data
  modalTitle: string;
  modalArticle: string;
  modalList: string[];
  rdtr: any;
  bidang: any;
  luas: number;
  kegiatan: string;
  selected: any;
  kesimpulan: string = 'Klik Cek Perizinan';
  showKesimpulan = false;
  styleKesimpulan = {
    itbx: '',
    color: '',
    icon: '',
    gambar: ''
  }
  pemanfaatan = {
    luasTanah: 0
  }
  //form autocomplete
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;

  constructor(
    public dialogRef: MatDialogRef<CekizinComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private itbx: DataitbxService,
    private cekintensitas: CekintensitasService
  ) {
    this.modalTitle = data.title;
    this.modalArticle = data.article;
    this.modalList = data.list;
    this.rdtr = data.rdtr;
    this.bidang = data.bidang;
    this.luas = Math.round(this.bidang.luas);
    //console.log('RDTRRRR', this.rdtr);
  }

  //cek izin using rest API skrk
  cekPerizinan(kegiatan) {
    this.showKesimpulan = true;
    //console.log(kegiatan);
    //console.log(this.itbx.getITBX(this.rdtr.kode, kegiatan));
    this.itbx.getITBX(this.rdtr.kode, kegiatan)
      .subscribe((data) =>
        //console.log(data[0].skrk[this.rdtr.kode]),
        this.hasilITBX(data[0].skrk[this.rdtr.kode])
      )
  }

  resetPencarian() {
    this.showKesimpulan = false;
    this.kesimpulan = 'Klik Cek Perizinan';
    this.kegiatan = '';
    this.styleKesimpulan = {
      itbx: '',
      color: '',
      icon: '',
      gambar: ''
    }
  }

  onChange(event) {
    //console.log(event.option.value);
    this.cekPerizinan(event.option.value);
  }


  cek = (kode) => {
    console.log('kodeeee', kode)
    this.pemanfaatan = {
      luasTanah: 100
    }
    //this.cekintensitas.cekIntensitas(this.pemanfaatan, kode);
  }

  //function for returning class of ITBX
  hasilITBX(hasil) {
    //console.log(hasil);
    switch (hasil) {
      case 'I':
        //console.log('Pemanfaatan Diizinkan');
        this.kesimpulan = 'Pemanfaatan Diizinkan';
        this.styleKesimpulan = {
          itbx: 'I',
          color: 'green',
          icon: 'check',
          gambar: 'assets/images/diizinkan.svg'
        }
        break;
      case 'T':
        //console.log('Pemanfaatan Diizinkan Secara Terbatas');
        this.kesimpulan = 'Pemanfaatan Diizinkan Secara Terbatas';
        this.styleKesimpulan = {
          itbx: 'T',
          color: 'yellow',
          icon: 'fullscreen',
          gambar: 'assets/images/diizinkanterbatas.svg'
        }
        break;
      case 'B':
        //console.log('Pemanfaatan Memerlukan Izin Penggunaan Bersyarat');
        this.kesimpulan = 'Pemanfaatan Memerlukan Izin Penggunaan Bersyarat';
        this.styleKesimpulan = {
          itbx: 'B',
          color: 'aqua',
          icon: 'info',
          gambar: 'assets/images/diizinkanbersyarat.svg'
        }
        break;
      case 'X':
        //console.log('Pemanfaatan Tidak Diizinkan');
        this.kesimpulan = 'Pemanfaatan Tidak Diizinkan';
        this.styleKesimpulan = {
          itbx: 'X',
          color: 'red',
          icon: 'block',
          gambar: 'assets/images/tidakdiizinkan.svg'
        }
        break;

      default:
        this.kesimpulan = 'Klik Cek Perizinan';
        break;
    }
  } //hasil itbx


  

  closeA(kegiatan, kesimpulan) {
    let hasilCekIzin = {
      kegiatan: kegiatan,
      kesimpulan: kesimpulan,
      kode: this.data.rdtr.kode
    }
    this.closeDialog('A', hasilCekIzin)
  }


  closeDialog(button: 'A' | 'B', hasilCekIzin) {
    if (button == 'A'){
      this.dialogRef.close(hasilCekIzin);
    } else {
      this.dialogRef.close(button);
    }

    
  }




  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    //console.log(this.filteredOptions);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.modalList.filter(option => option.toLowerCase().includes(filterValue));
  }

}

export class dialogCekIzin { }
