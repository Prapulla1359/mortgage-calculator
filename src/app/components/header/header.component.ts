import { Component, OnInit } from '@angular/core';
import {MortgageService} from '../../service/mortgage.service';
import {Subscription} from 'rxjs';

// Header Component - displays the title and Mortgage Monthly Payment
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // To keep track of updated data
  private isChangeSub: Subscription = new Subscription();

  // Holds Mortgage Monthly Payment to display in header section
  headerPayment: any;

  constructor(private mortgageService: MortgageService) { }

  // Life cycle hook - signals angular that it has finished initializing and setting up component
  ngOnInit(): void {
    // Holds Mortgage Monthly Payment to display in header section
    this.headerPayment = Math.round(Number(this.mortgageService.periodPaymentAmount()));
    // To keep track of updated data - Subscribe the data
    this.isChangeSub =  this.mortgageService.headerUpdated.subscribe((headerPayment: any) => {
      this.headerPayment = headerPayment;
    });
  }

}
