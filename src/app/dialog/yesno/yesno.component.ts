import { Component, OnInit, Inject } from '@angular/core';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-yesno',
  templateUrl: './yesno.component.html',
  styleUrls: ['./yesno.component.scss']
})


@NgModule({
  imports: [
    MaterialModule
  ]
})


export class YesnoComponent implements OnInit {
  
  // modal dialog data
  modalTitle: string;
  modalArticle: string;

  constructor(
    public dialogRef: MatDialogRef<YesnoComponent>,
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
