import { Component, OnInit } from '@angular/core';
import {MortgageService} from '../service/mortgage.service';
import {Mortgage} from '../model/mortgage.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  private isChangeSub: Subscription = new Subscription();
  mortgageObj: Mortgage = {
    amortizationPeriod: 0,
    depositAmount: 0,
    interestRate: 0,
    loanAmount: 0,
    mortgageAmount: 0,
    paymentFrequency: ''
  };
  isValidAmount: boolean = false;
  constructor(private mortgageService: MortgageService) { }

  ngOnInit(): void{
    this.mortgageObj = this.mortgageService.mortgageDetails;
    this.mortgageService.mortgageDetails.mortgageAmount = 200000;
    this.mortgageService.mortgageDetails.depositAmount = 100000;
    this.mortgageService.mortgageDetails.amortizationPeriod = 25;
    this.mortgageService.mortgageDetails.interestRate = 6.0;
    this.mortgageService.mortgageDetails.paymentFrequency = 'Monthly';
    this.mortgageService.mortgageDetails.loanAmount = this.mortgageService.loanAmountfunc();
    this.calMortgage();
  }

  calMortgage(): void {
    this.mortgageService.calculateMortgage();
  }
  isValid(): void{
    this.mortgageObj = this.mortgageService.mortgageDetails;
    if (this.mortgageObj.depositAmount > this.mortgageObj.mortgageAmount)
    {
      this.isValidAmount = true;
    } else {
      this.isValidAmount = false;
    }
  }

}
