import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Post } from '../models/post.model';
import { UserMe } from '../models/userme.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://217.76.60.62:3000/';
  //private apiUrl='http://localhost:3000/';
  userPosts = signal<Post[]>([]);
  allPosts = signal<Post[]>([]);

  constructor(private http: HttpClient) {}

 

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}posts`)
      .pipe(tap(posts => this.allPosts.set(posts)));
  }
  getMePosts():Observable<any>{
    return this.http.get<UserMe>(`${this.apiUrl}users/me`)
    .pipe(tap(posts => this.userPosts.set(posts.posts)));
  }
}