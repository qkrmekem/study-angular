import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  loggedIn = false;

  canActivate() {
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          resolve(this.loggedIn)
        }, 800);
      }
    );
    return promise;
  }

  login() { 
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
  }

  toHome(){
    this.router.navigate(['']);
  }
}
