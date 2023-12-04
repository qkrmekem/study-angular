import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.css'
})
export class ParentComponent implements OnInit {
  @Input() age:any;
  @Output() up = new EventEmitter();

  nextAge() {
    this.up.emit();
  }

  ngOnInit(): void {
      
  }
}
