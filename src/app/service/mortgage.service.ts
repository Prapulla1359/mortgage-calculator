import { Injectable } from '@angular/core';
import {Mortgage} from '../model/mortgage.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MortgageService{
    chartUpdated = new Subject<any[]>();
    headerUpdated = new Subject<any[]>();
    tableUpdated = new Subject<any[]>();
    datapie: any;
    getPayments: any;
    headerPayment: any;
    mortgageDetails: Mortgage = {
    amortizationPeriod: 0,
    depositAmount: 0,
    interestRate: 0,
    loanAmount: 0,
    mortgageAmount: 0,
    paymentFrequency: ''
  };

  calculateMortgage(): void{
    this.datapie = [];
    this.datapie = {
      labels: ['Mortgage Amount', 'Total Interest Paid'],
      datasets: [
        {
          //data: [this.mortgageDetails.mortgageAmount, this.periodPaymentAmount().toFixed(2)],
          data: [this.mortgageDetails.mortgageAmount, this.loanAmountfunc()],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }]
    };
    this.getPayments = this.calcPayments();
    this.headerPayment = Math.round(Number(this.periodPaymentAmount()));
    this.mortgageDetails.loanAmount = this.loanAmountfunc();
    this.chartUpdated.next(this.datapie);
    this.headerUpdated.next(this.headerPayment);
    this.tableUpdated.next(this.getPayments);
  }

  getChartData(): any {
    return this.datapie;
  }

  loanAmountfunc(): number {
    {
      let loanAmount: number;
      loanAmount = this.mortgageDetails.mortgageAmount - this.mortgageDetails.depositAmount;
      return (loanAmount > 0) ? loanAmount : 0;
    }
  }

  depositPercent(): number {
    return this.mortgageDetails.depositAmount / this.mortgageDetails.mortgageAmount* 100;
  }

  monthlyInterestRate(frequency:string): number {
    if (this.mortgageDetails.paymentFrequency === undefined) {
      this.mortgageDetails.paymentFrequency = 'Monthly';
    }

    let powerB = 0;
    const freq:string = this.mortgageDetails.paymentFrequency;

    switch (freq) {
      case 'Monthly':
        powerB = (1 / 12);
        break;
      case 'Weekly':
        powerB = (7 / 365);
        break;
      case 'Bi-weekly':
        powerB = (14 / 365);
        break;
    }

    // formula for calculating periodic interest rate
    // ((1+(iR÷2))^2)^(1÷12)−1
    const iR = this.mortgageDetails.interestRate / 100;
    const powerA = 1 + (iR / 2);
    return Math.pow(Math.pow(powerA, 2), powerB) - 1;
  }

  periodPaymentAmount(): any {
    var amount = this.monthlyPaymentAmount();
    const freq:string = this.mortgageDetails.paymentFrequency;
    switch (freq) {
      case 'Monthly':
        return amount;
      case 'Weekly':
        return amount/4;
      case 'Bi-weekly':
        return amount/2;
    }
  }

  monthlyPaymentAmount(): number {
    /*
        formula for calculating monthly payments
        Ip: initial principal
        Pir: period interest rate
        m: ammortizaiton period in months
        (Ip*Pir)/(1-(1+Pir)^(-m))
    */
    var Ip  = this.mortgageDetails.mortgageAmount - this.mortgageDetails.depositAmount;
    var Pir = this.monthlyInterestRate('Monthly');
    var m   = this.mortgageDetails.amortizationPeriod * 12;

    return (Ip*Pir)/(1-Math.pow(1+Pir, m*-1));
  }


  calcPayments():any {
    let payments      = [];
    let frequency     = this.mortgageDetails.paymentFrequency;
    let principal     = this.loanAmountfunc();
    let payment       = Number(this.periodPaymentAmount().toFixed(2));
    let interestRate  = Number(this.monthlyInterestRate(frequency));
    let key  = 0;
    let pi = null;
    let pp = null;
    let index = 1;
    while(principal > 0)
    {
      key++;
      pi      = Number((principal * interestRate).toFixed(2));
      payment = (payment > principal + pi) ? principal + pi : payment;
      pp      = payment - pi;
      principal = principal - pp;

      payments.push({
        index: index++,
        payment:   payment,
        interest:  pi,
        principal: pp,
        balance:   principal
      });

      // fail safe
      if (key > 5000)
      {
        break;
      }
    }

    return payments;
  }

  paymentsChart():number[] {
    var data = [];
    var loanAmount = this.loanAmountfunc();
    var paymentAmount = this.periodPaymentAmount();

    data.push(loanAmount);
    while (loanAmount > 0) {
      loanAmount -= (paymentAmount * 12);
      loanAmount = (loanAmount < 0) ? 0 : loanAmount;
      data.push(Math.round(loanAmount));
    }
    return data;
  }

}
