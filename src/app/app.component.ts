import {Component, OnDestroy, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Post} from './post.module';
import {environment} from '../environments/environment';
import {PostsService} from "./posts.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  private errorSub: Subscription;

  constructor(private http: HttpClient, private postService: PostsService) {}

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }

  ngOnInit() {

    this.errorSub = this.postService.error
      .subscribe(errorMsg => {
        this.error = errorMsg;
     });

    this.isFetching = true;
    this.postService.fetchPosts()
      .subscribe(posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      }, (error) => {
        this.error = error.message;
      });
  }

  onCreatePost(postData: { title: string; content: string }) {
   this.postService.createPost(postData.title, postData.content);
  }

  onFetchPosts() {
    this.isFetching = true;
    this.postService.fetchPosts()
      .subscribe(posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      }, (error => {
        this.error = error.message;
      }));
  }

  onClearPosts() {
    this.postService.deletePosts()
      .subscribe(() => {
        this.loadedPosts = [];
      });
  }

}
