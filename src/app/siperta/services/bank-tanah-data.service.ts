import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class BankTanahDataService {

  public daftarKegiatan: any = [];

  constructor(
    private http: HttpClient
  ) { }

  getDataBT(): Observable <any[]>  {
    //console.log(kode, kegiatan);

    //let params = new HttpParams().set('skrk', kode).set('kegiatan', kegiatan);

    //console.log(params.toString());
    return this.http.get<any[]>("../../assets/json/banktanah2.json")
      //.subscribe((res) => {
      .pipe(
        tap(data => { 
          this.daftarKegiatan = data;
      //  console.log(data);
        })
      )
    //console.log(res);

  }
}
