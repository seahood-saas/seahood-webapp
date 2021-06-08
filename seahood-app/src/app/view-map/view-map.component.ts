import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-view-map',
  templateUrl: './view-map.component.html',
  styleUrls: ['./view-map.component.css']
})
export class ViewMapComponent implements OnInit {
  @Input() viewMapData:any;
 
  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges){
    this.viewMapData = changes.viewMapData.currentValue;

  }
  
}
