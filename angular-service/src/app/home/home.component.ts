import { Component, Inject } from '@angular/core';
import { LogService } from '../log.service';
import { FactoryService } from '../factory.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  // providers: [
  //   LogService
  // ]
})
export class HomeComponent {
  constructor(
    private logService: LogService
    @Inject('apiUrl') private apiUrl: string,
    @Inject('factory') private factoryService:FactoryService
    ){
    this.logService.info('Home');
  }
}
