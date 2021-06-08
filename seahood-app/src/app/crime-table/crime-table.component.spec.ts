import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrimeTableComponent } from './crime-table.component';

describe('CrimeTableComponent', () => {
  let component: CrimeTableComponent;
  let fixture: ComponentFixture<CrimeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrimeTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrimeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
