import { Component, OnInit } from '@angular/core';
import {MortgageService} from '../service/mortgage.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css']
})
export class OutputComponent implements OnInit {
  datapie: any;
  getPayments: any;
  private isChangeSub: Subscription = new Subscription();
  constructor(private mortgageService: MortgageService ) { }

  ngOnInit(): void {
    this.datapie = this.mortgageService.getChartData();
    this.calMortgage();
    this.getPayments = this.mortgageService.calcPayments();
    this.isChangeSub =  this.mortgageService.chartUpdated.subscribe((datapie: any) => {
      this.datapie = datapie;
    });
    this.isChangeSub =  this.mortgageService.tableUpdated.subscribe((tableData: any) => {
      this.getPayments = tableData;
    });
  }
  calMortgage(): void {
    this.mortgageService.calculateMortgage();
  }

}
