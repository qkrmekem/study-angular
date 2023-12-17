import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { Observable } from 'rxjs-compat';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObserverSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    // this.firstObserverSubscription = interval(1000).subscribe(count => {
    //     console.log(count);
    // });
    // 커스텀 옵저버블 생성하기
    const customIntervalObservable = new Observable(observer =>{
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if(count === 5){
          observer.complete();
        }
        if(count > 3){
          observer.error(new Error('3 넘음'));
        }
        count++;
      }, 1000);
    })

    // const transformedObservable = customIntervalObservable.pipe(
    //   map((data:number) => 'Round: ' + (data + 1))
    // );

    // transformedObservable.subscribe({
    //   next: (data) => console.log(data),
    //   error: (err) => console.error(err),
    //   complete: () => console.log('Completed')
    // });

    // pipe는 연산자로서 observerble과 observer사이에서 특정 연산을 실행하고,
    // 이 값을 observer가 받아서 사용하는 방식이다.
    this.firstObserverSubscription = customIntervalObservable.pipe(
      filter((data: number) => {
        return data > 0;
      }),
      map((data: number) => 'Round: ' + (data + 1))
    ).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
      alert(error.message)
      
    }, () => {
      console.log('comleted');
      
    })
  }

  ngOnDestroy(): void {
    this.firstObserverSubscription.unsubscribe();
  }

}
