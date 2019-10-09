import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CekintensitasService {



  intensitas = {
    error: false,
    kelas: '',
    keterangan: '',
    KDB: '',
    Tinggi: '',
    KLB: '',
    KDH: ''
  };

  constructor() { }

  cekIntensitas (pemanfaatan, kodeRuang) {
    //# pengkelasan sesuai /api/intensitasruangs
    if (pemanfaatan.luasTanah < 40) {
      this.intensitas.error = true;
    } else if (pemanfaatan.luasTanah <= 100) {
      this.intensitas.kelas = "1";
      this.intensitas.error = false;
    } else if (pemanfaatan.luasTanah <= 200) {
      this.intensitas.kelas = "2";
      this.intensitas.error = false;
    } else if (pemanfaatan.luasTanah <= 400) {
      this.intensitas.kelas = "3";
      this.intensitas.error = false;
    } else if (pemanfaatan.luasTanah <= 1000) {
      this.intensitas.kelas = "4";
      this.intensitas.error = false;
    } else if (pemanfaatan.luasTanah >= 1001) {
      this.intensitas.kelas = "5";
      this.intensitas.error = false;
    };

    console.log('cek kelas ===================', this.intensitas.kelas);



  }










}
