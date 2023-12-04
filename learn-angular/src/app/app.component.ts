import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'learn-angular';
  names =[
    'qkrdmlals',
    'qkrmekem',
    'qkr'
  ]

  custom(){
    console.log('custom active');
    
  }
}
