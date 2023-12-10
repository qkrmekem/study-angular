import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  users?: any = [];

  public async getUsers(){
    // console.log('getUsers');
    
    try {
      const data = await this.http.get('https://api.github.com/users').toPromise();
      this.users = data;
      return this.users;
    } catch (error) {
      console.log(error);
      // 에러 처리
    }
  }

  public async getUsersObservable() {
    // console.log('getUsers');

      return this.http.get('https://api.github.com/users');
  }
}
