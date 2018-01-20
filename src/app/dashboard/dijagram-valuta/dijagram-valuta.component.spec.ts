import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DijagramValutaComponent } from './dijagram-valuta.component';

describe('DijagramValutaComponent', () => {
  let component: DijagramValutaComponent;
  let fixture: ComponentFixture<DijagramValutaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DijagramValutaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DijagramValutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
