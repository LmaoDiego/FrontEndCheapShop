import { Component, OnInit } from '@angular/core';
import {CommentsApiService} from "../../services/comments-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Comment} from "../../models/comment/comment"
import * as _ from "lodash";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  comments:any=[];
  dataSource = new MatTableDataSource();
  commentData: Comment={} as Comment;
  isFiltering = false;

  constructor(private commentsApi: CommentsApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.commentsApi.getAllCommentsByProduct(this.route.snapshot.url[1].path)
      .subscribe((response: Comment) => {
        this.commentData = {} as Comment;
        this.commentData = _.cloneDeep(response);
        console.log(response);
        console.log(this.commentData);
        this.comments=response;
      });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.isFiltering = !!filterValue;
  }

  deleteComment(id: number): void {
    this.commentsApi.deleteComment(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((o: any) => {
        return o.id !== id ? o : false;
      });
    });
  }

}
