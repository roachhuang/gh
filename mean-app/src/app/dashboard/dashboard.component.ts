import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  posts: any = [];
  constructor(private postService: PostsService) { }

  ngOnInit() {
    // Retrieve posts from the API
    this.postService.getAllPosts().subscribe(posts => {
      this.posts = posts.slice(1, 5);
    });
  }

}
