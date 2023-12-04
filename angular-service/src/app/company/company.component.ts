import { Component, Inject } from '@angular/core';
import { LogService } from '../log.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrl: './company.component.css',
  // providers: [
  //   LogService
  // ]
})
export class CompanyComponent {
  constructor(@Inject('log') private logService: LogService){
    this.logService.info('Company');
  }
}
