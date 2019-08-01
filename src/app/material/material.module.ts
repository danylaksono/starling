import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule, MatTabsModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    MatSidenavModule, 
    MatIconModule, 
    MatListModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    MatSidenavModule, 
    MatIconModule, 
    MatListModule
  ]
})
export class MaterialModule { }
