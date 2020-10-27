import { YesnoComponent } from './../../dialog/yesno/yesno.component';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule, } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

@NgModule({
  imports: [
    MaterialModule,
    FlexLayoutModule
  ]
})

export class HeaderComponent implements OnInit {

  isLoggedIn : Observable<boolean>;
  currentUser: String;

  @Output() public sidenavToggle = new EventEmitter();

  constructor(
    private cookie: CookieService,
    public dialog: MatDialog,
    private auth: AuthService,
    private router: Router
  ) { 
    this.isLoggedIn = auth.isLoggedIn();
  }


  openModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      title: 'Log Out Admin',
      article: 'Keluar dari Mode Administator?'

    };
    const dialogRef = this.dialog.open(YesnoComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.logOut();
        this.router.navigateByUrl('');
      }
    });
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onClicked() {
    //console.log('clicked');
    this.sidenavToggle.emit();
  }

  logOut() {
    this.auth.logOut();
    
  }

  ngOnInit() {
  }


}

