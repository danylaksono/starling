import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule, 
    MatIconModule, 
    MatListModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule, 
    MatIconModule, 
    MatListModule
  ]
})
export class MaterialModule { }
