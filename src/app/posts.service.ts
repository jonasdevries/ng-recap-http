import {HttpClient, HttpEventType, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Subject, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {environment} from '../environments/environment';
import {Post} from './post.module';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  error = new Subject<string>();

  constructor(private http: HttpClient) { }

  createPost(title: string, content: string) {
    const postData: Post = { title, content};
    this.http
      .post<{name: string}>(
        environment.firebaseUrl + '/posts.json',
        postData,
        {
          observe: 'response'
        }
      )
      .subscribe(responseData => {
        console.log(responseData);
      }, error => {
        this.error.next(error.message);
      });
  }

  fetchPosts() {
    return this.http.get<{ [key: string]: Post}>(
      environment.firebaseUrl + '/posts.json',
      {
        headers: new HttpHeaders({ 'custom-Header': 'hello' }),
        params: new HttpParams().set('print', 'pretty')
      })
      .pipe(
        map(responseData => {
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({...responseData[key], id: key});
            }
          }
          return postsArray;
        }),
        catchError( err => {
          // send err to analytics server
          return throwError(err);
        })
      );
  }

  deletePosts() {
    return this.http.delete(environment.firebaseUrl + '/posts.json',
      {
        observe: 'events'
      })
      .pipe(
        tap(event => {
          console.log(event);
          if (event.type === HttpEventType.Sent) {
            // ...
          }
          if (event.type === HttpEventType.Response) {
            console.log(event.body);
          }
        })
      );
  }
}
