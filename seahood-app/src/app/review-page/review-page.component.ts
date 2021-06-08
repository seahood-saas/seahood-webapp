import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.css'],
})
export class ReviewPageComponent implements OnInit {
  parentData: any;

  constructor() {}

  sendBeatForReview(event: any): void {
    this.parentData = event;
  }

  ngOnInit() {}
}
