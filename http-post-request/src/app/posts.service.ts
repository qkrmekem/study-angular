import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { Subject, catchError, map, pipe, tap, throwError } from "rxjs";

@Injectable({providedIn: 'root'})
export class PostsService{
    error = new Subject<string>();

    constructor(private http: HttpClient){

    }

    createAndStorePost(title: string, content: string){
        const postData: Post = {title, content};
        this.http.post<{ name: string }>(
            'https://ng-complete-guide-60089-default-rtdb.firebaseio.com/posts.json',
             postData,
             {
                // 반환되는 데이터를 설정
                observe: 'response' // 리스폰스를 그대로 가져옴
             }
             )
            .subscribe({
                next: (d) => {
                    console.log(d);
                }, error: (e) => {
                    this.error.next(e.message);
                }
            });
    }

    fetchPosts(){
        let searchParams = new HttpParams();
        searchParams = searchParams.append('print', 'petty')
        searchParams = searchParams.append('custom', 'key')
        return this.http.get<{ [key: string]: Post }>('https://ng-complete-guide-60089-default-rtdb.firebaseio.com/posts.json',
        {
            headers: new HttpHeaders({'Custom-Header': 'Hello'}),
            // params: new HttpParams().set('print', 'pretty'),
            params: searchParams,
            responseType: 'json'
        
        })
            .pipe(
                map((responseData) => {
                const postsArray: Post[] = [];
                for (const key in responseData) {
                    if (responseData.hasOwnProperty(key)) {
                        postsArray.push({ ...responseData[key], id: key });
                    }
                }
                return postsArray;
            }),
            catchError(errorRes => {
                return throwError(() => new Error(errorRes))
            })
            )

    }

    deletePosts(){
        return this.http.delete(
            'https://ng-complete-guide-60089-default-rtdb.firebaseio.com/posts.json',
            {
                observe: 'events',
                responseType: 'text' // 반환타입을 설정
            }
        // tap : 데이터를 변경하지 않고 일부 코드를 수행
        ).pipe(tap(evnet => {
            console.log(evnet);
            if(evnet.type === HttpEventType.Sent){
                console.log('sent');
            }
            if(evnet.type === HttpEventType.Response){
                console.log(evnet.body);
                
            }
        }));
    }
     
}