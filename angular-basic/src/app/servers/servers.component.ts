import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowServer = false;
  serverCreateionStatus = 'No server was created';
  serverName = 'testserver';
  serverCreated = false;
  servers = ['Testserver', 'Testserver 2']

  constructor() {
    setTimeout(()=>{
      this.allowServer = !this.allowServer;
    },2000)
   }

  ngOnInit(): void {
  }

  onCreateServer(){
    this.serverCreated = !this.serverCreated;
    this.servers.push(this.serverName);
    this.serverCreateionStatus = 'New Server was Created ' + this.serverName
  }

  onUpdateServerName(event: any){
    this.serverName = (<HTMLInputElement>event.target).value;
    
  }

}
