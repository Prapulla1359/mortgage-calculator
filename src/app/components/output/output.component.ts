import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {MortgageService} from '../../service/mortgage.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css']
})
// Output Component - to display the output in the form of Pie Chart, Material Responsive Table with pagination support
export class OutputComponent implements OnInit, AfterViewInit{
  // Define table columns
  displayedColumns: string[] = ['Payment #', 'Principal Payment', 'Interest Payment', 'Total Payment', 'Ending Balance'];

  // Define matTableDataSource for pagination
  dataSource = new MatTableDataSource<any>();
  // Variable that holds chart data
  chartData: any;
  // Variable that holds table data
  getPayments: any;
  // To keep track of updated/new changes
  private isChangeSub: Subscription = new Subscription();
  private dataArray: any;

  // Inject the service
  constructor(private mortgageService: MortgageService) {
  }
  // using MatPaginator for pagination
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // Life cycle hook - signals angular that it has finished initializing and setting up component
  ngOnInit(): void {
    // Holds chart data
    this.chartData = this.mortgageService.getChartData();
    // Calculate mortgage payment
    this.calMortgage();
    // To keep track of updated/new changes for the chart
    this.isChangeSub =  this.mortgageService.chartUpdated.subscribe((pieChartData: any) => {
      this.chartData = pieChartData;
    });

    // Holds Table data
    this.getPayments = this.mortgageService.calcPayments();
    // To keep track of updated/new changes for the table
    this.isChangeSub =  this.mortgageService.tableUpdated.subscribe((tableData: any) => {
      this.getPayments = tableData;

    });
    // use the data setter in ngOninit to set the table data to mat table data source
    this.dataSource.data = this.getPayments;
    // Refresh the table to get the updated data
    this.refresh();
 }

  // As the data is loading asynchronously,
  // set the datasource paginator after view initialization
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // Method to perform mortgage calculation
  calMortgage(): void {
    this.mortgageService.calculateMortgage();
  }

  // Refersh the table for new updated data
   refresh() {
    this.mortgageService.tableUpdated.subscribe((tableData: any) => {
      this.getPayments = tableData;
      this.dataSource.data = this.getPayments;
    });
  }
}
