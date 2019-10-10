import { Component, Inject, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { HalamanCetakComponent } from './../halaman-cetak/halaman-cetak.component';




@Component({
  selector: 'app-dialog-intensitas',
  templateUrl: './dialog-intensitas.component.html',
  styleUrls: ['./dialog-intensitas.component.scss']
})

@NgModule({
  imports: [
    MaterialModule
  ]
})


export class DialogIntensitasComponent implements OnInit {

  rencanaPemanfaatan = {
    luasTanah: 0.0,
    luasBangunan: 0,
    tinggiBangunan: 0,
    jmlLantai: 0
  }

  ketentuanPemanfaatan = {
    KDB: '',
    KDH: 0,
    KLB: '',
    Tinggi: '',
    Keterangan: ''
  }

  showRencana: Boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DialogIntensitasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private cetak: HalamanCetakComponent
  ) {
    this.rencanaPemanfaatan.luasTanah = Math.round(data.luas);
    //console.log('datanya', data);
  }

  cekIzinPemanfaatan(pemanfaatan) {
    this.showRencana = true;
    const kelas = this.cekKelas(pemanfaatan.luasTanah);
    const kode = this.data.itbx.kode;
    //console.log(kelas);
    //console.log(this.cekIntensitasRuang(kelas, this.data.itbx.kode).subscribe());

    this.cekIntensitasRuang(kelas, kode)
      .subscribe((data) =>
        //console.log(data[0].skrk[this.rdtr.kode]),
        this.cekKesesuaian(data, kode, pemanfaatan)
      )
    //console.log(this.ketentuanPemanfaatan);

  }


  cekKelas(luas) {
    //# pengkelasan sesuai /api/intensitasruangs
    if (luas < 40) {
      //this.ketentuanPemanfaatan.error = true;
      return "Luas tidak boleh < 40";
    } else if (luas <= 100) {
      return "1";
    } else if (luas <= 200) {
      return "2";
    } else if (luas <= 400) {
      return "3";
    } else if (luas <= 1000) {
      return "4";
    } else if (luas >= 1001) {
      return "5";
    };
  }

  cekIntensitasRuang(kelas, kode) {
    let params = new HttpParams().set('kelas', kelas).set('skrk', kode);
    var params2 = params.toString();
    return this.http.get("https://sitaru-arsip.jogjakota.go.id/api/intensitasruangs/query/", { params })
      //.subscribe((res) => {res})
      .pipe(
        tap(data => {
          //console.log(data);
        })
      )
  }

  cekKesesuaian(data, kode, pemanfaatan) {

    this.ketentuanPemanfaatan.Keterangan = data[0].Keterangan;
    //console.log(data);

    // periksa KDB
    var KDB = (pemanfaatan.luasTanah * data[0].KDB[kode]) / 100;
    if (pemanfaatan.luasBangunan > KDB) {
      this.ketentuanPemanfaatan.KDB = 'Melebihi Batas KDB (' + data[0].KDB[kode] + '%)';
    } else if (pemanfaatan.luasBangunan <= KDB) {
      this.ketentuanPemanfaatan.KDB = 'Sesuai Syarat KDB';
    } else {
      this.ketentuanPemanfaatan.KDB = 'Luas bangunan salah. Periksa masukan';
    };

    // periksa Tinggi
    var Tinggi = (data[0].Tinggi[kode]);
    if (pemanfaatan.tinggiBangunan > Tinggi) {
      this.ketentuanPemanfaatan.Tinggi = 'Melebihi Batas Tinggi Bangunan (' + data[0].Tinggi[kode] + ' m)';
    } else if (pemanfaatan.tinggiBangunan <= Tinggi) {
      this.ketentuanPemanfaatan.Tinggi = 'Sesuai Syarat Batas Tinggi Bangunan (' + data[0].Tinggi[kode] + ' m)';
    } else {
      this.ketentuanPemanfaatan.Tinggi = 'Tinggi bangunan salah. Periksa masukan';
    };

    // periksa KLB
    var KLB = (data[0].KLB[kode]);
    var hitungKLB = (pemanfaatan.jmlLantai * pemanfaatan.luasBangunan) / pemanfaatan.luasTanah;
    if (hitungKLB > KLB) {
      this.ketentuanPemanfaatan.KLB = 'Melebihi Batas KLB (' + data[0].KLB[kode] + '%)';
    } else if (hitungKLB <= KLB) {
      this.ketentuanPemanfaatan.KLB = 'Sesuai Syarat KLB (' + data[0].KLB[kode] + '%)';
    } else {
      this.ketentuanPemanfaatan.KLB = 'Hitungan KLB salah. Periksa masukan';
    };

    // Tampilkan KDH
    this.ketentuanPemanfaatan.KDH = (data[0].KDH[kode] * pemanfaatan.luasTanah) / 100;
  }


  ngOnInit() {
  }

}
