import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { SeahoodServiceService } from '../seahood-service.service';
import IHoodModel from '../interfaces/IHoodModel';
import ICrimeTypeModel from '../interfaces/ICrimeTypeModel';

@Component({
  selector: 'app-search-criteria',
  templateUrl: './search-criteria.component.html',
  styleUrls: ['./search-criteria.component.css'],
  providers: [SeahoodServiceService],
})
export class SearchCriteriaComponent implements OnInit {
  hood: string;
  hoodFromDataBase: IHoodModel[];
  CrimeTypeFromDataBase: ICrimeTypeModel[];
  crimeType: string;
  startDate: string = '';
  toDate: string = '';
  sh_service: SeahoodServiceService;
  @Output() redirect = new EventEmitter<any>();

  maxDate: Date;

  constructor(private sh_serviceInput: SeahoodServiceService,
    private route: ActivatedRoute) {
    
    this.sh_service = sh_serviceInput;
    this.maxDate = new Date();
    this.hood = 'all';
    this.crimeType = 'all';
    this.hoodFromDataBase = [];
    this.CrimeTypeFromDataBase = [];
  }

  ngOnInit() { 
    this.sh_service.getAllHoods().subscribe(
      (result)=>{
        this.hoodFromDataBase=result;
      },
      () => { },
      () => { }
    );

    this.sh_service.getCrimeType().subscribe(
      (result) =>{
        this.CrimeTypeFromDataBase = result;
      },
      ()=>{},
      ()=>{}
    );
  }

  filterButtonHandler() {
  
    if(this.hood == null) this.hood = "all";
    if(this.crimeType == null) this.crimeType = "all";
    if(this.toDate =="" || this.toDate==null) this.toDate = new Date().toString();
    if(this.startDate =="" || this.startDate==null) this.startDate = new Date(2020,0).toString();
    this.redirect.emit([this.hood, this.crimeType, this.startDate, this.toDate]);
  }

  startDateHandler(event: any) {
    this.startDate = new Date(event.value).toISOString();
  }

  endDateHandler(event: any) {
    this.toDate = new Date(event.value).toISOString();
  }

}
