import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledTransakcijaComponent } from './pregled-transakcija.component';

describe('PregledTransakcijaComponent', () => {
  let component: PregledTransakcijaComponent;
  let fixture: ComponentFixture<PregledTransakcijaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PregledTransakcijaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PregledTransakcijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
