import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        // new FormControl(초기값, validator, 비동기 validator) -> 배열형태로 validator 설정 가능,
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
    // form데이터가 변경될 때마다 실행
    this.signupForm.valueChanges.subscribe(
      (value) => {console.log(value);
      }
    );
    // form의 상태가 변할 때마다 실행
    this.signupForm.valueChanges.subscribe(
      (value) => {
        console.log(value);
      }
    );
    // 폼에 값 설정하기
    this.signupForm.setValue({
      'userData': {
        'username': 'Max',
        'email': 'max@test.com'
      },
      'gender': 'male',
      'hobbies': []
    });
    // 폼에 값 패칭하기
    this.signupForm.patchValue({
      'userData': {
        'username': 'Anna'
      }
    });
  }

  onSubmit(){
    console.log(this.signupForm);
    this.signupForm.reset();
  }

  onAddHobby(){
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  getControls(){
    return (<FormArray>this.signupForm.get('hobbies')).controls
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if(this.forbiddenUsernames.indexOf(control.value) !== -1){
      return {'nameIsForbidden' : true};
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any>{
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if(control.value === 'test@test.com'){
          resolve({'emailIsForbidden' : true});
        }else{
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
