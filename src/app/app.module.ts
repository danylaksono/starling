
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPaginatorModule } from '@angular/material/paginator'


import { CookieService } from 'ngx-cookie-service';

import { MainViewComponent } from './main-view/main-view.component';
import { LandingComponent } from './landing/landing.component';
import { MapsComponent } from './maps/maps.component';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatDialogModule } from "@angular/material";
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { CekizinComponent } from './dialog/cekizin/cekizin.component';
import { SipertaComponent } from './siperta/siperta.component';
import { SipertaMapsComponent } from './siperta/siperta-maps/siperta-maps.component';
import { LoginComponent } from './Auth/login/login.component';
import { SignUpComponent } from './Auth/sign-up/sign-up.component';
import { YesnoComponent } from './dialog/yesno/yesno.component';
import { LayerattributeComponent } from './dialog/layerattribute/layerattribute.component';
import { DialogIntensitasComponent } from './dialog/dialog-intensitas/dialog-intensitas.component';
import { HalamanCetakComponent } from './dialog/halaman-cetak/halaman-cetak.component';
import { DialogAttributeComponent } from './siperta/dialog/dialog-attribute/dialog-attribute.component';
import { AtributBankTanahComponent } from './siperta/dialog/atribut-bank-tanah/atribut-bank-tanah.component';





@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    LandingComponent,
    MapsComponent,
    NavComponent,
    HeaderComponent,
    SidenavListComponent,
    CekizinComponent,
    SipertaComponent,
    SipertaMapsComponent,
    LoginComponent,
    SignUpComponent,
    YesnoComponent,
    LayerattributeComponent,
    DialogIntensitasComponent,
    HalamanCetakComponent,
    DialogAttributeComponent,
    AtributBankTanahComponent
    
    
    
    
  ],
  entryComponents: [
    CekizinComponent,
    YesnoComponent,
    LayerattributeComponent,
    DialogIntensitasComponent,
    DialogAttributeComponent,
    AtributBankTanahComponent

    
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
    ReactiveFormsModule,
    FlexLayoutModule,
    MatPaginatorModule
    
    

  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
