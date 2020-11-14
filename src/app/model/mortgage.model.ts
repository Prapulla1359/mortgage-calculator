export class Mortgage {

  public mortgageAmount: number;
  public depositAmount: number;
  public loanAmount: number;
  public interestRate: number;
  public amortizationPeriod: number;
  public paymentFrequency: string;

  constructor(mortgageAmount: number, depositAmount: number, loanAmount: number, interestRate: number,
              amortizationPeriod: number, paymentFrequency: string) {
    this.mortgageAmount = mortgageAmount;
    this.depositAmount = depositAmount;
    this.loanAmount = loanAmount;
    this.interestRate = interestRate;
    this.amortizationPeriod = amortizationPeriod;
    this.paymentFrequency = paymentFrequency;
  }

}
