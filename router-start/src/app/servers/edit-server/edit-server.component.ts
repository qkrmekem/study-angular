import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CanComponentDeactivate } from './can-deactivate-guard.service';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router) { }

  canDeactivate(){
    if (!this.allowEdit) {
      return true;
    }
    if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved) {
      // const deactivateSubject = new Subject<boolean>();
      // deactivateSubject.next(confirm('페이지를 이동하시겠습니까?'));
      // return deactivateSubject;
      return confirm('수정사항을 버리겠습니까?');
    } else {
      return true;
    }
  }

  ngOnInit() {
    // ActivatedRoute객체에서 쿼리파라미터와 프래그먼트를 가져올 수 있지만
    // 이렇게 가져올 경우 각 값들이 변경되었을 때 이 값들을 리액티브하게 가져올 수 없음
    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);
    // 따라서 아래처럼 observagble을 지원하는 프로퍼티를 활용하여 리액티브하게 값을 갱신할 수 있음
    this.route.queryParams.subscribe((queryParams: Params) => {
      this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
    });
    this.route.fragment.subscribe();
    const id = +this.route.snapshot.params['id']
    this.server = this.serversService.getServer(id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'], {relativeTo: this.route})
  }



}
