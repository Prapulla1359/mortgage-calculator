import { Component, OnInit } from '@angular/core';
import {MortgageService} from '../service/mortgage.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private isChangeSub: Subscription = new Subscription();
  headerPayment: any;
  constructor(private mortgageService: MortgageService) { }

  ngOnInit(): void {
    this.headerPayment = Math.round(Number(this.mortgageService.periodPaymentAmount()));
    this.isChangeSub =  this.mortgageService.headerUpdated.subscribe((headerPayment: any) => {
      this.headerPayment = headerPayment;
      console.log("updatedVal"+this.headerPayment);
    });
  }

}
