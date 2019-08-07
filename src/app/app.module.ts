import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MainViewComponent } from './main-view/main-view.component';
import { LandingComponent } from './landing/landing.component';
import { MapsComponent } from './maps/maps.component';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatDialogModule } from "@angular/material";
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { CekizinComponent } from './dialog/cekizin/cekizin.component';




@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    LandingComponent,
    MapsComponent,
    NavComponent,
    HeaderComponent,
    SidenavListComponent,
    CekizinComponent
    
  ],
  entryComponents: [
    CekizinComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    LayoutModule,
    HttpClientModule,
    HttpClientJsonpModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
