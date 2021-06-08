import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import IUserModel from 'src/app/interfaces/IUserModel';
import IHoodModel from '../../interfaces/IHoodModel';
import IReviewModel from '../../interfaces/IReviewModel';
import { SeahoodServiceService } from '../../seahood-service.service';
@Component({
  selector: 'app-view-reviews',
  templateUrl: './view-reviews.component.html',
  styleUrls: ['./view-reviews.component.css'],
})
export class ViewReviewsComponent implements OnInit {
  beat: string;
  name: string;
  review: string;
  hoodFromDataBase: IHoodModel[];
  allReviews: IReviewModel[];
  allUsers: IUserModel[];
  sh_service: SeahoodServiceService;
  filterTag: any;
  @Input() filter: any;

  constructor(private sh_serviceInput: SeahoodServiceService) {
    this.sh_service = sh_serviceInput;
    this.beat = 'all';
    this.name = 'all';
    this.review = '';
    this.hoodFromDataBase = [];
    this.allReviews = [];
    this.allUsers = [];

    this.sh_service.getAllUsers().subscribe(
      (result) => {
        this.allUsers = result;
      },
      () => {},
      () => {}
    );
  }

  ngOnInit() {
    this.sh_service.getAllReviews().subscribe(
      (result) => {
        this.allReviews = result;
      },
      () => {},
      () => {}
    );
    this.sh_service.getAllUsers().subscribe(
      (result) => {
        this.allUsers = result;
      },
      () => {},
      () => {}
    );
  }

  getUserName(email: string) {
    let obj = this.allUsers.filter((usr) => usr.email === email);
    return obj.length > 0 ? obj.pop()?.name : '';
  }

  ngOnChanges(changes: SimpleChanges) {
    this.filter = changes.filter.currentValue;
    if (this.filter != undefined) {
      this.beat = this.filter[0];
      this.filterTag = this.filter[1];
      console.log(this.beat);
      if (this.beat != undefined && this.filterTag === 0) {
        this.sh_service.getAllReviews().subscribe(
          (result) => {
            this.allReviews = result;
            this.beat !== 'none'
              ? (this.allReviews = this.allReviews.filter(
                  (hood) => hood.beat == this.beat
                ))
              : {};
            // console.log(this.allReviews);
          },
          () => {},
          () => {}
        );
      } else if (this.beat == undefined) {
        console.log('QWERTY');
        this.sh_service.getAllReviews().subscribe(
          (result) => {
            this.allReviews = result;
            this.allReviews = this.allReviews.filter(
              (review) => review.owner == this.filterTag
            );
          },
          () => {},
          () => {}
        );
      } else if (this.beat != undefined) {
        this.sh_service.getAllReviews().subscribe(
          (result) => {
            this.allReviews = result;
            this.beat !== 'none'
              ? (this.allReviews = this.allReviews.filter(
                  (review) =>
                    review.owner == this.filterTag && review.beat == this.beat
                ))
              : (this.allReviews = this.allReviews.filter(
                  (review) => review.owner == this.filterTag
                ));
          },
          () => {},
          () => {}
        );
      } else {
        this.sh_service.getAllReviews().subscribe(
          (result) => {
            this.allReviews = result;
          },
          () => {},
          () => {}
        );
      }
    }
  }
}
