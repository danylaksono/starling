import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule, MatTabsModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    MatSidenavModule, 
    MatIconModule, 
    MatListModule,
    MatDialogModule,
    DragDropModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    MatSidenavModule, 
    MatIconModule, 
    MatListModule,
    MatDialogModule,
    DragDropModule
  ]
})
export class MaterialModule { }
