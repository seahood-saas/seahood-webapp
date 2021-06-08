import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import ICrimeModel from '../interfaces/ICrimeModel';
import { SeahoodServiceService } from '../seahood-service.service';

export interface CrimeTable {
  ReportID: any;
  Date: any;
  Area: any;
  Offense: string;
}

@Component({
  selector: 'app-crime-table',
  templateUrl: './crime-table.component.html',
  styleUrls: ['./crime-table.component.css'],
  providers: [SeahoodServiceService],
})
export class CrimeTableComponent implements OnInit {
  crimes: ICrimeModel[] = [];
  displayedColumns: string[] = ['ReportID', 'Date', 'Area', 'Offense'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  data: CrimeTable[] = [];
  sh_service: SeahoodServiceService;
  isDataAvailable: boolean = false;
  crimetype: string;
  @Input() localCrimeType?: string;
  @Input() filter: any;
  constructor(
    private sh_serviceInput: SeahoodServiceService,
    private route: ActivatedRoute
  ) {
    this.sh_service = sh_serviceInput;
    this.crimetype = route.snapshot.params['crimeType'];
  }

  ngOnInit(): void {
    if (this.crimetype != null) {
      this.sh_service.getAllCrimesBytype(this.crimetype).subscribe(
        (result) => {
          this.crimes = result;
          this.parseCrimeData();
        },
        () => {},
        () => {}
      );
    } else {
      this.sh_service.getAllCrimes().subscribe(
        (result) => {
          this.crimes = result;
          this.parseCrimeData();
        },
        () => {},
        () => {}
      );
    }
  }

  parseCrimeData() {
    this.data = [];
    this.crimes.forEach((sample: any) => {
      this.data.push({
        ReportID: sample.report_number,
        Date: sample.report_datetime,
        Area:
          sample.mcpp +
          ': ' +
          (sample._100_block_address == null ? '' : sample._100_block_address),
        Offense: sample.offense_parent_group + ': ' + sample.offense,
      });
    });
    this.isDataAvailable = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.filter = changes.filter.currentValue;
    this.filter != undefined
      ? this.sh_service
          .getCrimeByFilter(
            this.filter[0],
            this.filter[1],
            this.filter[2],
            this.filter[3]
          )
          .subscribe(
            (result) => {
              this.crimes = result;
              this.parseCrimeData();
            },
            () => {},
            () => {}
          )
      : {};
    console.log(this.crimes);
  }
}
