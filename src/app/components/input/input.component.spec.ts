import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';
import {MortgageService} from '../../service/mortgage.service';
import {OutputComponent} from '../output/output.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use the mortgage amount from the service', () => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    const mortgageService = fixture.debugElement.injector.get(MortgageService);
    fixture.detectChanges();
    expect(mortgageService.mortgageDetails.mortgageAmount).toEqual(component.mortgageObj.mortgageAmount);
  });

  it('should use the mortgage amount from the service', () => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    let compiled = fixture.nativeElement;
    expect(compiled.querySelector('p')).toEqual(component.mortgageObj.mortgageAmount);
  });

  it('should calculate loan amount', () => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    let loanAmt = component.mortgageObj.mortgageAmount - component.mortgageObj.loanAmount;
    expect(component.mortgageObj.loanAmount).toBe(loanAmt);
  });

  it('should not display payment frequency', () => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const compiled = fixture.nativeElement.paymentFrequency;
    expect(component.mortgageObj.paymentFrequency).toBe(compiled);
  });

});
