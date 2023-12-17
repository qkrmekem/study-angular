import { Component, OnInit } from '@angular/core';
import { ServersService } from './servers.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  public servers: {id: number, name: string, status: string}[] = [];

  constructor(private serversService: ServersService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.servers = this.serversService.getServers();
  }

  onReload(){
    // 기본적으로 navigate는 현재의 경로를 알지 못한다
    // 따라서 상대경로를 사용하더라도 경로 시작위치를 파악하지 못한다.
    // 이 때는 앵귤러에서 제공하는 ActivatedRoute를 사용한다.
    this.router.navigate(['servers'], {relativeTo: this.route});
  }

}
