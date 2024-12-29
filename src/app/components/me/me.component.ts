import { Component, inject, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { AsyncPipe, DatePipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-me',
  imports: [DatePipe],
  templateUrl: './me.component.html',
  styleUrl: './me.component.css'
})
export class MeComponent implements OnInit{
  postService= inject(PostService)
  apiUrl='http://217.76.60.62:3000/uploads/'
    //apiUrl='http://localhost:3000/uploads/'

  ngOnInit(): void {
this.postService.getMePosts().subscribe(data=>{
  console.log(data)
})

}


}
