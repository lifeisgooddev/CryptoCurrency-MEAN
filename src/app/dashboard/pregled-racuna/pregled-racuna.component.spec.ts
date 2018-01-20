import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledRacunaComponent } from './pregled-racuna.component';

describe('PregledRacunaComponent', () => {
  let component: PregledRacunaComponent;
  let fixture: ComponentFixture<PregledRacunaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PregledRacunaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PregledRacunaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
