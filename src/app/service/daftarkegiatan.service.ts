import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DaftarkegiatanService {

  public daftarKegiatan: any = [];

  getKegiatan(): Observable <any[]> {
    return this.http.get <any[]>("http://sitaru.jogjakota.go.id/api/skrks/distinct")
      .pipe(
        map(response => response),
        tap(daftar => {
          //console.log("users array", daftar);
          this.daftarKegiatan = daftar
        }
        )
      )

    //return this.daftarKegiatan;
  }

  constructor(private http: HttpClient) { }
}
