import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChildFn, CanActivateFn, Router, RouterModule, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "./auth.service";

// @Injectable({providedIn:'root'})
// export class AuthGuard implements CanActivate {

//     constructor(private authService: AuthService, private state: Router){}

//     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
//         return this.authService.canActivate()
//             .then(
//                 (authenticated: boolean) => {
//                     if (authenticated) {
//                         return true;
//                     } else {
//                         // inject(Router).navigate(['/']);
//                         return false;
//                     }
//                 }
//             )
//     }

// } 
export const authGuard: CanActivateFn =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        const router = inject(Router);
        return inject(AuthService).canActivate()
        .then(
            (authenticated: boolean) => {
                if(authenticated){
                    return true;
                }else{
                    console.log("false 실행");
                    
                    // inject(AuthService).toHome();
                    router.navigate(['']);
                    return false;
                }
            }
        )
    }

export const authGuardChild: CanActivateChildFn =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        const router = inject(Router);
        return inject(AuthService).canActivate()
            .then(
                (authenticated: boolean) => {
                    if (authenticated) {
                        return true;
                    } else {
                        console.log("false 실행");
                        // inject(AuthService).toHome();
                        // promise함수 내부에서는 inject가 이뤄지지 않음 따라서
                        // 함수 내부에 따로 변수로 클래스를 inject받아 사용해야함
                        router.navigate(['']);
                        return false;
                    }
                }
            )
    }