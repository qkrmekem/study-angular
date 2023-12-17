import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService, private route: ActivatedRoute, private router:Router) { }

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(id);
    this.route.params.subscribe((params:Params) => {
      this.server = this.serversService.getServer(+params['id']);
    })
  }

  onEdit(){
    // 절대경로
    // this.router.navigate(['servers',this.server.id,'edit'])
    // 상대경로
    // queryParamsHandling: 'preserve': 현재 넘어온 쿼리파라미터를 유지, merge는 이전의 파라미터를 새것으로 덮어씀
    this.router.navigate(['edit'], { relativeTo: this.route, queryParamsHandling: 'preserve' })
  }

}
