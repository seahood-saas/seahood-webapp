import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { response } from 'express';
//npm i @angular/http
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';

@Injectable()
export class SeahoodServiceService {
  baseUrl: string;
  reviewPostId: number;

  constructor(private http: Http) {
    this.baseUrl = 'http://localhost:8080';
    this.reviewPostId = 555;
  }

  getAllCrimes() {
    return this.http
      .get('/app/crime/')
      .pipe(map((response: any) => response.json()));
    // .forEach((response: any) => response.json());
  }

  getAllCrimesBytype(crimetype: string) {
    return this.http
      .get(
        '/app/crime/hood/all/crimeType/' + crimetype + '/from/2020-01-05/to/'
      )
      .pipe(map((response: any) => response.json()));
    // .forEach((response: any) => response.json());
  }

  getCrimeByFilter(
    hood: string,
    crimeType: string,
    fromDate: string,
    toDate: string
  ) {
    return this.http
      .get(
        '/app/crime/hood/' +
          hood +
          '/crimeType/' +
          crimeType +
          '/from/' +
          fromDate +
          '/to/' +
          toDate
      )
      .pipe(map((response: any) => response.json()));
  }


  getAllHoods() {
    return this.http
      .get('/app/hood/')
      .pipe(map((response: any) => response.json()));
  }

  getCrimeType(){
    return this.http
      .get('/app/CrimeType/')
      .pipe(map((response: any)=> response.json()));
  }


  getAllReviews() {
    return this.http
      .get('/app/review/')
      .pipe(map((response: any) => response.json()));
  }

  getAllUsers() {
    return this.http
      .get('/app/users/')
      .pipe(map((response: any) => response.json()));
  }

  getUserName(email: string) {
    return this.http
      .get('/app/user/' + email)
      .pipe(map((response: any) => response.json()));
  }

  getCurrentUserInfo() {
    return this.http
      .get('/app/getCurrentUser')
      .pipe(map((response: any) => response.json()));
  }

  postNewReview(review: string, beat: string, name: string, owner: string) {
    // construct the body for the post
    this.reviewPostId++;
    const newPost = {
      reviewId: this.reviewPostId,
      review: review,
      beat: beat,
      name: name,
      owner: owner,
    };
    return this.http
      .post('/app/review/', newPost)
      .pipe(map((res: any) => res.json()));
  }

}
