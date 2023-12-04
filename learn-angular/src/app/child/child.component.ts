import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, AfterViewInit, AfterContentChecked, AfterViewChecked } from '@angular/core';
import { NgZone } from '@angular/core';
import { error } from 'console';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls:[ './child.component.css']
})
export class ChildComponent implements OnInit, OnChanges, AfterViewInit, AfterContentChecked, AfterViewChecked{
  @Input() name:any;
  @Input() age:any;
  
  @Output() nextAge = new EventEmitter();

  click(e:any, event:any){
    console.log(e);
    console.log(event);
    
  }

  constructor(private zone: NgZone) {
    console.error('constuctor');
    
   }
  ngAfterViewChecked(): void {
    console.error('ngAfterViewChecked');
    ;
  }
  ngAfterContentChecked(): void {
    console.error('ngAfterContentChecked');
  }
  ngAfterViewInit(): void {
    console.error('ngAfterViewInit');
  }

  ngOnInit(): void {
    console.error('ngOninit');
    this.zone.runOutsideAngular(() => {
      
      setInterval(() => {
        this.zone.run(() => {
          if (this.nextAge) {
            this.nextAge.emit();
          }
        });
      }, 3000);
    });
  }


  // ngOnInit(): void {
  //   setInterval(() => {
  //     this.nextAge.emit();
  //   }, 1000);

  // }

  ngOnChanges(changes: SimpleChanges): void {
      console.error('ngOnchanges');
      
      
  }
}
