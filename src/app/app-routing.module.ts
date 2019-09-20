
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//components to route into
import { MainViewComponent } from './main-view/main-view.component';
import { SipertaComponent } from './siperta/siperta.component';
import { LandingComponent } from './landing/landing.component';
import { SignUpComponent } from './Auth/sign-up/sign-up.component';
import { LoginComponent } from './Auth/login/login.component';

const routes: Routes = [
  { 
    path: 'home', 
    component: MainViewComponent,
    children: [] // put children route here { path: '', component: LoginComponent },
  },
  { 
    path: 'siperta', 
    component: SipertaComponent
  },
  { 
    path: 'login', 
    component: LoginComponent
  },
  { 
    path: 'signup', 
    component: SignUpComponent
  },
  { path: '', component: LandingComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



//https://blog.angularindepth.com/angular-routing-reusing-common-layout-for-pages-from-different-modules-440a23f86b57