import { Component, Inject, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


@Component({
  selector: 'app-cekizin',
  templateUrl: './cekizin.component.html',
  styleUrls: ['./cekizin.component.scss']
})

@NgModule({
  imports: [
    MaterialModule
  ]
})


export class CekizinComponent implements OnInit {

  // modal dialog data
  modalTitle: string;
  modalArticle: string;
  modalList: string[];
  rdtr: any;
  bidang: any;

  //form autocomplete
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.modalTitle = data.title;
    this.modalArticle = data.article;
    this.modalList = data.list;
    this.rdtr = data.rdtr;
    this.bidang = data.bidang;
    //console.log(this.modalList);
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.modalList.filter(option => option.toLowerCase().includes(filterValue));
  }

}

export class dialogCekIzin { }
