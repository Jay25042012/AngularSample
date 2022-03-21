import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcalculatorComponent } from './pcalculator.component';

describe('PcalculatorComponent', () => {
  let component: PcalculatorComponent;
  let fixture: ComponentFixture<PcalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PcalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
