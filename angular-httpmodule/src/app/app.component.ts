import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-httpmodule';
  users:any = [];
  isVisible=true;

  constructor(
    @Inject('apiUrl') private apiUrl:string,
    private http:HttpClient
  ){
    this.http.get(this.apiUrl)
    .subscribe({
      next: data => {
        this.users = data;
        
      },
      error: error => {
        console.log(error);
      }
    })
  }

  toggle(){
    this.isVisible = !this.isVisible;
  }
}
