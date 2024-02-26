import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as AuthActions from './auth.actions';
import { catchError, map, of, switchMap, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable()
export class AuthEffects {

    // authSignup$ = createEffect(() => 
    //     ofType(AuthActions.SIGNUP_START)
    // );

    authLogin$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.LOGIN_START),
            switchMap((authData: AuthActions.LoginStart) => {
                console.log('요청 생성');
                
                return this.http.post<AuthResponseData>(
                    'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + environment.firebaseAPIKey,
                    {
                        email: authData.payload.email,
                        password: authData.payload.password,
                        returnSecureToken: true
                    }
                ).pipe(
                    map(resData => {
                        const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
                        return new AuthActions.AuthenticateSuccess({
                            email: resData.email,
                            userId: resData.localId,
                            token: resData.idToken,
                            expirationDate: expirationDate
                        });
                    }),
                    catchError(errorRes => {
                        let errorMessage = 'An unknown error occurred!';
                        if (!errorRes.error || !errorRes.error.error) {
                            return of(new AuthActions.AuthenticateFail(errorMessage));
                        }
                        switch (errorRes.error.error.message) {
                            case 'EMAIL_EXISTS':
                                errorMessage = 'This email exists already';
                                break;
                            case 'EMAIL_NOT_FOUND':
                                errorMessage = 'This email does not exist.';
                                break;
                            case 'INVALID_PASSWORD':
                                errorMessage = 'This password is not correct.';
                                break;
                        }
                        // 예: return of(new AuthActions.LoginFail(error));
                        return of(new AuthActions.AuthenticateFail(errorMessage));
                    })
                )
            }),
        )
    );

    authSuccess$ = createEffect(() => 
        this.actions$.pipe(
            ofType(AuthActions.AUTHENTICATE_SUCCESS),
            tap(() => {
                this.router.navigate(['/']);
            })
        ),
        {dispatch: false} // 이펙트에서 새로운 액션을 발생시키지 않을 때 사용
    )
    

    constructor(private actions$: Actions, private http: HttpClient, private router: Router){}
}