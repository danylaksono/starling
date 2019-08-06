import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataitbxService {

  getITBX() {
    var parameter: {
      skrk: '4',
      kegiatan: 'I'
    };
    this.http.get("http://sitaru.jogjakota.go.id/api/intensitasruangs/query", { params: parameter })
      .subscribe((res) => {
        //console.log(res);
        return res;
      }

      )
  }

  constructor(private http: HttpClient) {



  }
}
