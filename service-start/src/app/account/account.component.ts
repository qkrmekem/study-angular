import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoggingService } from '../logging.service';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  // providers: [LoggingService]
})
export class AccountComponent {
  @Input() account: {name: string, status: string};
  @Input() id: number;

  // private loggingService:LoggingService

  // 1. 생성자의 인자로 받는 방법
  constructor(private loggingService:LoggingService, private accountService: AccountService){
    // 2. inject()로 주입받는 방법(필드에 loggingService 선언해줘야함)
    // this.loggingService = inject(LoggingService);
  }

  onSetTo(status: string) {
    this.accountService.updateStatus(this.id, status);
    // this.loggingService.logStatusChange(status);
    this.accountService.statusUpdated.emit(status);
  }
}
