import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class DataitbxService {





  constructor(private http: HttpClient) {
  }

  getITBX(kode, kegiatan) {
    console.log(kode, kegiatan);

    let params = new HttpParams().set('skrk', kode).set('kegiatan', kegiatan);

    //console.log(params.toString());
    return this.http.get("http://sitaru.jogjakota.go.id/api/skrks/query", { params })
      //.subscribe((res) => {
      .pipe(
        tap(data => { data })
      )
    //console.log(res);

  }


}

