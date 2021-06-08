import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  parentData:any;
  constructor() { }

  ngOnInit(): void {
  }
  TransferDataFromComponents(event:any):void{
    this.parentData = event;
    console.log("In landing page: "+ this.parentData);
  }
}
