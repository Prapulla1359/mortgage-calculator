import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OutputComponent } from './components/output/output.component';
import { InputComponent } from './components/input/input.component';
import {MortgageService} from './service/mortgage.service';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  // Declare the generated components here
  declarations: [
    AppComponent,
    OutputComponent,
    InputComponent,
    HeaderComponent
  ],
  // Import all the modules used in th application
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ChartModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatPaginatorModule
  ],
  // Injecting Service
  providers: [MortgageService],
  // bootstrap the root component here
  bootstrap: [AppComponent]
})
export class AppModule { }
