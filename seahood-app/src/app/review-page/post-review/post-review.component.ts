import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import IUserModel from 'src/app/interfaces/IUserModel';
import IHoodModel from '../../interfaces/IHoodModel';
import { SeahoodServiceService } from '../../seahood-service.service';

@Component({
  selector: 'app-post-review',
  templateUrl: './post-review.component.html',
  styleUrls: ['./post-review.component.css'],
})
export class PostReviewComponent implements OnInit {
  beat: string;
  name: string;
  review: string;
  owner: string;
  ownerName: string = '';
  userId: number = 0;
  hoodFromDataBase: IHoodModel[];
  sh_service: SeahoodServiceService;
  viewFiltred: boolean = false;
  @Output() redirect = new EventEmitter<any>();
  // userProfile: IUserModel;

  constructor(
    private sh_serviceInput: SeahoodServiceService,
    private router: Router
  ) {
    this.sh_service = sh_serviceInput;
    this.beat = 'all';
    this.name = 'all';
    this.review = '';
    this.owner = '';
    this.hoodFromDataBase = [];

    this.sh_service.getCurrentUserInfo().subscribe((result) => {
      // this.userProfile = result;
      console.log(result);
      console.log(result.emails[0].value);
      this.owner = result.emails[0].value;
      this.ownerName = result.displayName;
      this.userId = result.id;
    });
  }

  ngOnInit() {
    this.sh_service.getAllHoods().subscribe(
      (result) => {
        this.hoodFromDataBase = result;
      },
      () => {},
      () => {}
    );
  }

  filterReview() {
    this.viewFiltred = !this.viewFiltred;
    if (this.beat != null || this.beat != 'all') {
      this.redirect.emit([this.beat, 0]);
    }
  }

  filterPersonalReview() {
    this.viewFiltred = !this.viewFiltred;
    if (this.beat != null || this.beat != 'all') {
      this.redirect.emit([this.beat, this.owner]);
    } else {
      if (this.beat == null || this.beat == 'all' || this.beat == 'none') {
        alert('Please Select a Neighborhood for your post');
      } else {
        this.redirect.emit([undefined, this.owner]);
      }
    }
  }

  onSubmit() {
    if (this.review.length == 0) {
      alert('Cannot Submit Empty Review');
    }
    if (this.beat == null || this.beat == 'all' || this.beat == 'none') {
      alert('Please Select a Neighborhood for your post');
    } else if (this.ownerName === '') {
      alert('Please Log in With your Google Account');
    } else {
      let selecthood = this.hoodFromDataBase
        .filter((hood) => hood.beat === this.beat)
        .pop();
      this.name = selecthood != undefined ? selecthood.name : '';
      this.sh_service
        .postNewReview(this.review, this.beat, this.name, this.owner)
        .subscribe((data) => {
          console.log(data);
        });
      // this.filterReview();
      window.location.reload();
      // this.router.navigate(['/']);
    }
  }
}
