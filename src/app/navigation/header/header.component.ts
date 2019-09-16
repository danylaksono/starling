import { YesnoComponent } from './../../dialog/yesno/yesno.component';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule, } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog, MatDialogConfig } from '@angular/material';


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

  isLoggedIn: Boolean = false;
  currentUser: String;

  @Output() public sidenavToggle = new EventEmitter();

  constructor(
    private cookie: CookieService,
    public dialog: MatDialog,
    private auth: AuthService
  ) { }


  openModal(list) {
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
    this.isLoggedIn = false;
  }

  checkLogin = () => {
    const signedIn = this.auth.isSignedIn();
    //this.currentUser = this.cookie.get('currentUser');
    if (signedIn) {
      this.isLoggedIn = true;
    }

  }



  ngOnInit() {
    setTimeout(() => {
      this.isLoggedIn = this.auth.isSignedIn();
      console.log(this.isLoggedIn);
      this.checkLogin();
    }, 1000
    )

  }

  ngAfterContentInit() {

  }

}

