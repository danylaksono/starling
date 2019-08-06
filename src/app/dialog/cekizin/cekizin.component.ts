import { Component, Inject, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

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

  modalTitle: string;
  modalArticle: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.modalTitle = data.title;
    this.modalArticle = data.article;
    console.log(data)
  }

  ngOnInit() {
  }

}

export class dialogCekIzin { }
