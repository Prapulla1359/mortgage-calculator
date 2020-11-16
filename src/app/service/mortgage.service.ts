import { Injectable } from '@angular/core';
import {Mortgage} from '../model/mortgage.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// Service Layer - holds methods to perform all the payment calculations
export class MortgageService{
    mortgageDetails: Mortgage = {
      amortizationPeriod: 0,
      depositAmount: 0,
      interestRate: 0,
      loanAmount: 0,
      mortgageAmount: 0,
      paymentFrequency: ''
    };
    chartUpdated = new Subject<any[]>();
    headerUpdated = new Subject<any[]>();
    tableUpdated = new Subject<any[]>();
    chartData: any;
    getPayments: any;
    headerPayment: any;

      /* calculateMortgage
    @params: none
    @return: void
    description: To perform all the calculations
    */
    calculateMortgage(): void{
      this.chartData = [];
      // Used Pie Chart : Datasets used are Monthly Payment and Monthly Interest Paid.
      this.chartData = {
      labels: ['Monthly Payment', 'Monthly Interest Paid'],
      datasets: [
        {
          // Map the datasets
          data: [this.periodPaymentAmount(), this.loanAmountfunc() * this.monthlyInterestRate(this.mortgageDetails.paymentFrequency)],
          backgroundColor: [
            "#87aedb",
            "#db8799",
            "#FFCE56"
          ],
          hoverBackgroundColor: [
            "#87aedb",
            "#db8799",
            "#FFCE56"
          ]
        }]
    };

      // holds table data
      this.getPayments = this.calcPayments();
      // holds header data
      this.headerPayment = Math.round(Number(this.periodPaymentAmount()));
      // LoanAmount = Mortgage Amount - Deposit Amount
      this.mortgageDetails.loanAmount = this.loanAmountfunc();
      // To keep track of all th updates/ new additions
      this.chartUpdated.next(this.chartData);
      this.headerUpdated.next(this.headerPayment);
      this.tableUpdated.next(this.getPayments);
  }

  /* getChartData
 @params: value:string
 @return: chartData[]
 description: to get the chart data
 */
  getChartData(): any {
    return this.chartData;
  }

  /* getPay
 @params: none
 @return: tableData[]
 description: to get the table data
 */
  getPay(): any{
    return this.getPayments;
  }

  /* loanAmountfunc
 @params: none
 @return: number
 description: to calculate LoanAmount = Mortgage Amount - Deposit Amount
 */
  loanAmountfunc(): number {
    {
      let loanAmount: number;
      loanAmount = this.mortgageDetails.mortgageAmount - this.mortgageDetails.depositAmount;
      return (loanAmount > 0) ? loanAmount : 0;
    }
  }

    /* monthlyInterestRate
  @params: frequency:string
  @return: number
  description: Monthly Interest Rate based on Payment Frequency
		If Monthly   -->  1/12
		If Weekly    -->  7/365
		If Bi-Weekly -->  14/365
  */
  monthlyInterestRate(frequency:string): number {
    if (this.mortgageDetails.paymentFrequency === undefined) {
      this.mortgageDetails.paymentFrequency = 'Monthly';
    }

    let powerB = 0;
    const freq: string = this.mortgageDetails.paymentFrequency;

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

  /* periodPaymentAmount
 @params: none
 @return: number
 description: To calculate PeriodicPaymentAmount based on Payment Frequency
		If Monthly   -->  monthly payment amount
		If Weekly    -->  monthly payment amount / 4
		If Bi-Weekly -->  monthly payment amount / 2
 */
  periodPaymentAmount(): any {
    const amount = this.monthlyPaymentAmount();
    const freq: string = this.mortgageDetails.paymentFrequency;
    switch (freq) {
      case 'Monthly':
        return amount;
      case 'Weekly':
        return amount / 4;
      case 'Bi-weekly':
        return amount / 2;
    }
  }

  /* monthlyPaymentAmount
 @params: none
 @return: number
 description: To calculate monthly payment amount
		          (Ip*Pir)/(1-(1+Pir)^(-m)) where
					    Ip : initial principal 		         -->  Mortgage Amount - Deposit Amount
					    Pir: period interest rate	         -->  Monthly Interest Rate(Payment Frequency)
					    m  : amortizaiton period in months -->  amortizationPeriod * 12
 */
  monthlyPaymentAmount(): number {
    const Ip  = this.mortgageDetails.mortgageAmount - this.mortgageDetails.depositAmount;
    const Pir = this.monthlyInterestRate('Monthly');
    const m   = this.mortgageDetails.amortizationPeriod * 12;

    return (Ip * Pir) / (1 - Math.pow(1 + Pir, m * -1));
  }

  /* calcPayments : to get the table data
  @params: none
  @return: payments[]
  description: Below are the data to be displayed in the table:
                  a) Payment #          -->  Payment Number
                  b) Principal Payment  -->  (payment > principal + interestPayment) ? principal + pi : payment
                  c) Interest Payment   -->  principal * interestRate
                  d) Total Payment      -->  payment - interestPayment
  */
  calcPayments():any {
    const payments      = [];
    const frequency     = this.mortgageDetails.paymentFrequency;
    let principal       = this.loanAmountfunc();
    let payment         = Number(this.periodPaymentAmount().toFixed(2));
    const interestRate  = Number(this.monthlyInterestRate(frequency));
    let key  = 0;
    let pi = null;
    let pp = null;
    let index = 1;
    while (principal > 0)
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
}
