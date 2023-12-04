import { Injectable } from '@angular/core';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class FactoryService {

  constructor(private logService: LogService) { 
    
  }
}
