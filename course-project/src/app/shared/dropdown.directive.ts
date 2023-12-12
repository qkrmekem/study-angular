import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;
  // 메뉴를 클릭할 때만 열고 닫음
  // @HostListener('click') toggleOpen(){
  //   this.isOpen = !this.isOpen;
  // }
  // 다른 곳 클릭해도 닫힘
  @HostListener('document:click',['$event']) toggleOpen(event:Event){
    this.isOpen = this.elRef.nativeElement.contains(event.target)? !this.isOpen : false;
  }

  constructor(private elRef: ElementRef) { }

}
