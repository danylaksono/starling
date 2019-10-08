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
    return this.http.get <any[]>("https://sitaru-arsip.jogjakota.go.id/api/skrks/distinct")
      .pipe(
        map(response => response),
        tap(daftar => {
          this.daftarKegiatan = daftar
        }
        )
      )
  }

  constructor(private http: HttpClient) { }
}
