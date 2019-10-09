import { CekintensitasService } from './../../service/cekintensitas.service';
import { DataitbxService } from './../../service/dataitbx.service';
import { Component, Inject, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-dialog-intensitas',
  templateUrl: './dialog-intensitas.component.html',
  styleUrls: ['./dialog-intensitas.component.scss']
})

@NgModule({
  imports: [
    MaterialModule
  ]
})


export class DialogIntensitasComponent implements OnInit {

  rencanaPemanfaatan = {
    luasTanah : 0,
    luasBangunan: 0,
    tinggiBangunan: 0,
    jmlLantai: 0
  }
  showRencana: Boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DialogIntensitasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { 

      this.rencanaPemanfaatan.luasTanah = data.luas;



      console.log(data);

    }

  ngOnInit() {
  }

}
