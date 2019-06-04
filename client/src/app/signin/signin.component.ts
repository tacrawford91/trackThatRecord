import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthService,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angular-6-social-login';

import { UserService } from '../services/user.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})


export class SigninComponent implements OnInit {

  constructor(
    private socialAuthService: AuthService,
    private userSerice: UserService,
    private router: Router
    ) { }

  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform == "facebook") {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform == "google") {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    } 

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform + " sign in data : ", userData);
        
        this.signIn(userData, socialPlatform);

      }
    );
  }
  ngOnInit() {
  }



  signIn(userData, socialPlatform) {
    if (socialPlatform == "facebook") {

      this.userSerice.getByfaceBook(userData)
      .subscribe((res) => {
        // if (res._id) {
        // }
        this.router.navigateByUrl('/discover');
        localStorage.setItem('currentUser', JSON.stringify(res));
      })

    } else if (socialPlatform == "google") {
      this.userSerice.getByGoogle(userData)
        .subscribe((res) => { 
          // if(res){
          //   this.router.navigateByUrl('/discover');
          //   localStorage.setItem('currentUser', JSON.stringify(res));
          // }

          this.router.navigateByUrl('/discover');
          localStorage.setItem('currentUser', JSON.stringify(res));

         })
    } 
  }

  logout() {
    // remove user from local storage to log user out
    this.userSerice.logout();
    this.router.navigateByUrl('/');
  }



}