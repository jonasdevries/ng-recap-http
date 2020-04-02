import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Post} from './post.module';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {
    console.log(environment.firebaseUrl);
  }

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.http
      .post<{name: string}>(
        environment.firebaseUrl + '/posts.json',
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });

  }

  onFetchPosts() {
    this.fetchPosts();
  }

  private fetchPosts() {
    this.http.get<{ [key: string]: Post}>(environment.firebaseUrl + '/posts.json')
      .pipe(map(responseData => {
        const postsArray: Post[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postsArray.push({...responseData[key], id: key});
          }
        }
        return postsArray;
      }))
      .subscribe(posts => {
        console.log(posts);
      });
  }

  onClearPosts() {
    // Send Http request
  }

}
