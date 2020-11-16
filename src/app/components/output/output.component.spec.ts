import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { OutputComponent } from './output.component';
import {MortgageService} from '../../service/mortgage.service';

describe('OutputComponent', () => {
  let component: OutputComponent;
  let fixture: ComponentFixture<OutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('shoul not fetch data successfully if not called asynchronously', () => {
    expect(component).toBeTruthy();
    fixture = TestBed.createComponent(OutputComponent);
    component = fixture.componentInstance;
    const mortgageService = fixture.debugElement.injector.get(MortgageService);
    let spy = spyOn(mortgageService, 'getPayments')
    .and.returnValue(Promise.resolve('getPayments'));
    fixture.detectChanges();
    expect(component.getPayments).toBe(undefined);
  });

  it('shoul fetch data successfully if not called asynchronously', fakeAsync(() => {
    expect(component).toBeTruthy();
    fixture = TestBed.createComponent(OutputComponent);
    component = fixture.componentInstance;
    const mortgageService = fixture.debugElement.injector.get(MortgageService);
    let spy = spyOn(mortgageService, 'getChartData')
      .and.returnValue(Promise.resolve('chartData'));
    fixture.detectChanges();
    tick();
    expect(component.chartData).toBe('chartData');
  }));

});
