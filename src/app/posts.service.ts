import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Post} from './post.module';
import {environment} from '../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {pipe, Subject, throwError} from 'rxjs';

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
        postData
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
        headers: new HttpHeaders({ 'custom-Header': 'hello' })
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
    return this.http.delete(environment.firebaseUrl + '/posts.json');
  }
}
