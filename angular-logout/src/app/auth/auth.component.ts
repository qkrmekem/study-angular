import { Component, OnDestroy, ViewChild, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { AuthService, AuthResponseData } from './auth.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  /*
  static: true:
  이 옵션을 사용하면 Angular는 변경 감지가 발생하기 전에 뷰 쿼리를 해결합니다. 
  즉, ngOnInit 생명주기 훅 이전에 요소나 디렉티브에 대한 참조가 필요할 때 사용됩니다.
  정적 쿼리는 주로 템플릿에서 변하지 않는 요소(예: *ngIf 디렉티브에 의해 생성되거나 삭제되지 않는 요소)에 사용됩니다.
  컴포넌트 또는 디렉티브가 초기화될 때 항상 DOM에 존재하는 요소에 접근할 필요가 있을 때 유용합니다.

  static: false:
  이 옵션은 Angular가 첫 번째 변경 감지 사이클 이후에 뷰 쿼리를 해결하도록 합니다. 
  즉, ngAfterViewInit 생명주기 훅 이후에 요소나 디렉티브에 접근할 수 있습니다.
  동적 쿼리는 템플릿 내에서 조건부로 생성되는 요소(예: *ngIf, *ngFor 디렉티브를 사용하는 요소)에 적합합니다.
  이 옵션을 사용하면, 컴포넌트의 초기화 시점에는 요소가 존재하지 않을 수 있으므로, ngOnInit에서는 해당 요소에 접근할 수 없습니다.
  */
  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;
  
  private closeSub: Subscription;

  constructor(
    private authService: AuthService, 
    private router: Router) {}


  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      }
    );

    form.reset();
  }

  onHandleError(){
    this.error = null;
  }

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe()
    }
  }

  private showErrorAlert(message: string){
    // const alertCmp = new AlertComponent();
    // viewContainerRef는 DOM에서 해당 위치와 상호작용할 수 있게 하는 객체
    this.alertHost.viewContainerRef.clear(); // 혹시 렌더린되어 있을지 모르는 모든 angular컴포넌트를 지움

    const componentRef = this.alertHost.viewContainerRef.createComponent(AlertComponent);

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      this.alertHost.viewContainerRef.clear();
    })
  }
}
