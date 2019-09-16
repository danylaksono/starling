import { Component, OnInit, Inject } from '@angular/core';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import {  MAT_DIALOG_DEFAULT_OPTIONS, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-layerattribute',
  templateUrl: './layerattribute.component.html',
  styleUrls: ['./layerattribute.component.scss']
})


@NgModule({
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}
  ],
  imports: [
    MaterialModule
  ]
})


export class LayerattributeComponent implements OnInit {

   // modal dialog data
   modalTitle: string;
   modalArticle: string;

  constructor(
    public dialogRef: MatDialogRef<LayerattributeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.modalTitle = data.title;
    this.modalArticle = data.article;
  }


  
  closeDialog(){
    this.dialogRef.close();
    //console.log('buy');    
   }

  ngOnInit() {
  }

}
