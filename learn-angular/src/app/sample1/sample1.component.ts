import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sample1',
  templateUrl: './sample1.component.html',
  styleUrl: './sample1.component.css'
})
export class Sample1Component implements OnInit{
  name = 'mark';

  ngOnInit(): void {
    setTimeout(() => {
      this.name = 'anna';
    }, 2000);
    setTimeout(() => {
      this.disabled = false;
      this.custom.emit();
    }, 5000);
  }

  click(e: any){
    console.log(e);
    
    this.name='aaa';
  }

  @Input() test:any;
  @Output() custom = new EventEmitter();

  disabled = true;
}
