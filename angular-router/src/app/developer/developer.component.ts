import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs'

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrl: './developer.component.css'
})
export class DeveloperComponent {
  name:Observable<any>;
  constructor(private route: ActivatedRoute) { // 라우터 주입 받기
    // snapshot은 동기
    // this.name = this.route.snapshot.paramMap.get('name');
    // rx는 비동기
    this.name = this.route.params.pipe(map(p => p['name']));
  }
}
