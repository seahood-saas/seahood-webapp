import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/*Component*/
import { SearchCriteriaComponent } from './search-criteria/search-criteria.component';
import { ViewMapComponent } from './view-map/view-map.component';
import { GoogleMapComponent } from './google-map/google-map.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CrimeTableComponent } from './crime-table/crime-table.component';
import { MatTableModule } from '@angular/material/table';
import { AdsSectionComponent } from './ads-section/ads-section.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { ReviewPageComponent } from './review-page/review-page.component';

/*Services*/
import { SeahoodServiceService } from './seahood-service.service';

/*Materials*/
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PostReviewComponent } from './review-page/post-review/post-review.component';
import { ViewReviewsComponent } from './review-page/view-reviews/view-reviews.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchCriteriaComponent,
    ViewMapComponent,
    GoogleMapComponent,
    CrimeTableComponent,
    AdsSectionComponent,
    WelcomePageComponent,
    LandingPageComponent,
    AboutPageComponent,
    ReviewPageComponent,
    PostReviewComponent,
    ViewReviewsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
  ],
  providers: [MatDatepickerModule, MatNativeDateModule, SeahoodServiceService],
  bootstrap: [AppComponent],
})
export class AppModule {}
