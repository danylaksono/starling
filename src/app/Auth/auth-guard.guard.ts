import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { first } from 'rxjs/operators';





@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  isLoggedIn: Boolean;
  //returnUrl: string;



  constructor(
    private router: Router,
    //private route: ActivatedRoute,
    private auth: AuthService
  ) { }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.auth.isLoggedIn()
      .pipe(first())
      .subscribe(
        res => {
          //this.isLoggedIn = res;
          console.log(res);
          if (!res) {
            //console.log('inside', res);
            // not logged in
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;
          }
        }
      );

    //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    //this.router.navigateByUrl(this.returnUrl);
    return true;

  } //canActivate

}
