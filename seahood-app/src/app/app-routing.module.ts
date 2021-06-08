import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './about-page/about-page.component';
import { AppComponent } from './app.component';
import { CrimeTableComponent } from './crime-table/crime-table.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ReviewPageComponent } from './review-page/review-page.component';
import { ViewMapComponent } from './view-map/view-map.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

const routes: Routes = [
  { path: '', component: WelcomePageComponent },
  { path: 'home', component: WelcomePageComponent },
  { path: 'map', component: LandingPageComponent },
  //{ path: 'table/:crimeType', component: CrimeTableComponent },
  { path: 'about', component: AboutPageComponent },
  { path: 'review', component: ReviewPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
