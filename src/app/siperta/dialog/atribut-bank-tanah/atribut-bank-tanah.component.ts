import { Component, OnInit, Inject, ViewChild, EventEmitter } from '@angular/core';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/material/material.module';
import { MAT_DIALOG_DEFAULT_OPTIONS, MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource, MatPaginator, MatPaginatorModule } from '@angular/material';
import { WarningSnackbarService } from 'src/app/dialog/warning-snackbar.service';
import { BankTanahDataService } from '../../services/bank-tanah-data.service';



export interface dataAtribut {
  no;
  kodeberkas: string;
  tanggalpermohonan: any;
  pemohon: any;
  kodekategori;
  kategori: any;
  kodesubkategori;
  subkategori: any;
  namapemiliktanah: any;
  telppemilik;
  alamattanah;
  kodekelurahan;
  kelurahan;
  kodekecamatan;
  kecamatan;
  luassertifikatpenawaran;
  luaspembebasanpenawaran;
  hargatanahpenawaran;
  hargabangunanpenawaran;
  totalhargapenawaran;
  nomorsertifikat;
  nomorsugs;
  keterangan;
  penganggaran;
  kodestatus;
  status;
  luasukurulang;
  hargarealisasi;
  hargabangunan;
  totalhargarealisasi;
  nomorsertifikatpemkot;
  lat;
  long;
}


@NgModule({
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } }
  ],
  imports: [
    MaterialModule,
    MatPaginatorModule
  ]
})

@Component({
  selector: 'app-atribut-bank-tanah',
  templateUrl: './atribut-bank-tanah.component.html',
  styleUrls: ['./atribut-bank-tanah.component.scss']
})

export class AtributBankTanahComponent implements OnInit {


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  atribut;
  datasource;

  onZoom = new EventEmitter;

  dataAtribut: dataAtribut[];
  displayedColumns: string[] = 
  ['kodeberkas',
   'tanggalpermohonan',
   'kodekategori',
   'kategori',
   'subkategori',
   'namapemiliktanah', 
   'telppemilik', 
   'alamattanah', 
   'kodekelurahan', 
   'kelurahan', 
   'kodekecamatan', 
   'kecamatan', 
   'luassertifikatpenawaran', 
   'luaspembebasanpenawaran', 
   'hargatanahpenawaran', 
   'hargabangunanpenawaran', 
   'totalhargapenawaran', 
   'nomorsertifikat', 
   'nomorsugs', 
   'keterangan', 
   'penganggaran', 
   'kodestatus', 
   'status', 
   'luasukurulang', 
   'hargarealisasi', 
   'hargabangunan', 
   'totalhargarealisasi', 
   'nomorsertifikatpemkot', 
   'action'];
  list: {};

  constructor(
    public dialogRef: MatDialogRef<AtributBankTanahComponent>,
    private warning: WarningSnackbarService,
    private dataBankTanah: BankTanahDataService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.atribut = data;
    const ELEMENT_DATA: dataAtribut[] = [
      //{ atribut: 'Alamat', keterangan: this.atribut }

    ];

    this.dataAtribut = ELEMENT_DATA;

  }

  applyFilter(filterValue: string){
    this.datasource.filter = filterValue.trim().toLowerCase();
    if (this.datasource.paginator) {
      this.datasource.paginator.firstPage();
    }
  }

  zoomTo(lat, long){
    console.log('zoomTo');
    this.onZoom.emit({lat:lat, long: long});



  }

  ngOnInit() {
    this.dataBankTanah.getDataBT()
      .subscribe(
        (res:dataAtribut[]) => {
          this.list = res;
          this.datasource = new MatTableDataSource(res);
          this.datasource.paginator = this.paginator;
          //console.log(this.list);
        }
      );
  }

}
