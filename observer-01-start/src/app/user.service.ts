import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({providedIn: 'root'})
export class UserService{
    // activatedEmitter = new EventEmitter<boolean>();
    // 서브젝트는 @Output을 이용하지 않는 컴포넌트간 데이터 전달 때만 작동함
    activatedEmitter = new Subject<boolean>();
}