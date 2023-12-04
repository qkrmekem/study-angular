import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CompanyComponent } from './company/company.component';
import { LogService } from './log.service';
import { FactoryService } from './factory.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CompanyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration(),
    LogService,
    {
      provide: 'log',
      // useClass: LogService, // LogService가 등록되지 않았을 때
      useExisting: LogService // 이미 등록된 LogService가 있을 때
    },
    {
      provide: 'apiUrl',
      useValue: 'http://api.github.com/users'
    },
    {
      provide: 'factory',
      useFactory: (logService: LogService) => {
        return new FactoryService(logService);
      },
      // userFactory에서 logService를 참조하고 있으므로 deps에 LogService를 입력해야함
      deps: [
        LogService
      ]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
