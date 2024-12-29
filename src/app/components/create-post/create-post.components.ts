import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container mt-4">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card">
            <div class="card-body">
              <h2 class="card-title text-center mb-4">Create New Post</h2>
              
              <form [formGroup]="postForm" (ngSubmit)="onSubmit()">
                <div class="mb-3">
                  <label for="title" class="form-label">Title</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="title" 
                    formControlName="title"
                    [class.is-invalid]="postForm.get('title')?.invalid && postForm.get('title')?.touched"
                  >
                  @if (postForm.get('title')?.invalid && postForm.get('title')?.touched) {
                    <div class="invalid-feedback">
                      Title is required
                    </div>
                  }
                </div>

                <div class="mb-3">
                  <label for="content" class="form-label">Content</label>
                  <textarea 
                    class="form-control" 
                    id="content" 
                    rows="6" 
                    formControlName="content"
                    [class.is-invalid]="postForm.get('content')?.invalid && postForm.get('content')?.touched"
                  ></textarea>
                  @if (postForm.get('content')?.invalid && postForm.get('content')?.touched) {
                    <div class="invalid-feedback">
                      Content is required
                    </div>
                  }
                </div>

                <div class="mb-3">
                  <label for="image" class="form-label">Image</label>
                  <input 
                    type="file" 
                    class="form-control" 
                    id="image" 
                    (change)="onFileSelected($event)"
                    accept="image/*"
                  >
                </div>

                @if (selectedImage) {
                  <div class="mb-3">
                    <img [src]="previewUrl" class="img-thumbnail" style="max-height: 200px;">
                  </div>
                }

                <div class="d-grid gap-2">
                  <button 
                    type="submit" 
                    class="btn btn-primary"
                    [disabled]="postForm.invalid || isSubmitting"
                  >
                    @if (isSubmitting) {
                      <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Creating Post...
                    } @else {
                      Create Post
                    }
                  </button>
                  <button 
                    type="button" 
                    class="btn btn-secondary"
                    (click)="onCancel()"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CreatePostComponent {
  postForm: FormGroup;
  selectedImage: File | null = null;
  previewUrl: string | null = null;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router
  ) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]]
    });
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedImage = file;
      // Create preview URL
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      this.isSubmitting = true;
      const formData = new FormData();
      formData.append('title', this.postForm.get('title')?.value);
      formData.append('content', this.postForm.get('content')?.value);
      if (this.selectedImage) {
        formData.append('image', this.selectedImage);
      }

      this.postService.createPost(formData).subscribe({
        next: () => {
          this.router.navigate(['/posts']);
        },
        error: (error) => {
          console.error('Error creating post:', error);
          this.isSubmitting = false;
          // Aquí podrías añadir un mensaje de error para el usuario
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/posts']);
  }
}