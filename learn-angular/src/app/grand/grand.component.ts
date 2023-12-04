import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grand',
  templateUrl: './grand.component.html',
  styleUrl: './grand.component.css'
})
export class GrandComponent implements OnInit {
  age = 29;

  upAge(){
    this.age = this.age + 1;
  }

  ngOnInit(): void {
      
  }
}
