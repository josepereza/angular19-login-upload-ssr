import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-4">
    
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>My Posts</h2>
        <button class="btn btn-primary" (click)="router.navigate(['/create-post'])">
          Create New Post
        </button>
      </div>
      <h2 class="mt-5">All Posts</h2>
      <div class="row">
        @for (post of postService.allPosts(); track post.id) {
          <div class="col-md-4 mb-4">
            <div class="card">

              @if (post.imageUrl) {
                <img [src]="apiUrl + post.imageUrl" class="card-img-top" alt="Post image">
              }
              <div class="card-body">
                <h5 class="card-title">{{ post.title }}</h5>
                <p class="card-text">{{ post.content }}</p>
                <p class="card-text"><small class="text-muted">{{ post.createdAt | date }}</small></p>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class PostsComponent implements OnInit {
  apiUrl='http://217.76.60.62:3000/uploads/'
  //apiUrl='http://localhost:3000/uploads/'

  
  constructor(public postService: PostService,    public router: Router
  ) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.getAllPosts().subscribe();
  }
}