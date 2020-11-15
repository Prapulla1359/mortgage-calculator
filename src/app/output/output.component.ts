import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {MortgageService} from '../service/mortgage.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css']
})
export class OutputComponent implements OnInit, AfterViewInit{
  // Define table columns
  displayedColumns: string[] = ['Payment #', 'Principal Payment', 'Interest Payment', 'Total Payment', 'Ending Balance'];

  // Define matTableDataSource for pagination
  dataSource = new MatTableDataSource<any>();
  datapie: any;
  getPayments: any;
  private isChangeSub: Subscription = new Subscription();
  private dataArray: any;

  constructor(private mortgageService: MortgageService) {
  }
  // using MatPaginator for pagination
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.datapie = this.mortgageService.getChartData();
    this.calMortgage();
    this.isChangeSub =  this.mortgageService.chartUpdated.subscribe((datapie: any) => {
      this.datapie = datapie;
    });
    this.getPayments = this.mortgageService.calcPayments();
    this.isChangeSub =  this.mortgageService.tableUpdated.subscribe((tableData: any) => {
      this.getPayments = tableData;
    });
    // use the data setter in ngOninit
    this.dataSource.data = this.getPayments;
  }

  // As the data is loading asynchronously,
  // set the datasource paginator after view initialization
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  calMortgage(): void {
    this.mortgageService.calculateMortgage();
  }
}


