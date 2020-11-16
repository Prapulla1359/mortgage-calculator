# Mortgage Payment Calculator

## Intro

Below you should find a brief description about the application and it's functionalities, how to install and run as well as some extra information on the project files.

## Brief Description

This Single Page Application is designed with the functionality of Mortgage Payment Calculator in Angular. This calculator determines your mortgage payment and provides you with a mortgage payment schedule. 
It displays the Mortgage Payment Schedule in table format with pagination support and Mortgage Pie chart to present the data in a visual way. Mortgage Monthly Payment is displayed in the header section.

Hosted Solution Link can be accessible though internet at https://prapulla-smp.web.app/

## Getting Started

### Installing and Running

1. Open Command/Terminal

2. run *npm install -g @angular/cli*

3. *ng new mortgage-calculator* 

4. cd mortgage-calculator

5. npm install --save bootstrap@3

## User Functionality

### Mortgage Payment Calculator

Using the Mortgage Payment Calculator, the user shoulb be able to:

1. Fill in the Mortgage Amount, Deposit Amount, Interest Rate in % of Mortage Calulator form.

2. Select the Amortization Period and Payment Frequency from dropdown menu of the form. (the Deposit Amount field is DISABLED - i.e. It calculates (Mortgage Amount minus Deposit Amount).

3. On change of any input data (tab out of fields), the calculator calculates the mortgage payment and displays the mortgage Monthly Payment in the header section (highlighted).

4. Need to input the Deposit Amount lower than Mortgage Amount. Otherwise, Validation error will be displayed stating "Please enter a valid Deposit Amount".

4. It displays the Mortgage Payment Schedule in table format with pagination support on tab out of fields.

5. It displays the Mortgage Pie chart to present the data in a visual way.

## Project Development

### File Structure

```
/mortgage-calculator

	-/src
		-/app
			-/components
				-/header
				-/input
				-/output
			
			-/model
				-/mortgage.model.ts

			-/pagination
				-/pagination.module.ts

			-/service
				-mortgage.service.ts

			-app.component.html
			-app.component.ts
			-app.module.ts
			-app-routing.module.ts

		-/assets
			-question-circle-solid.svg
```

### Assets
*consists of*: question-circle-solid.svg (used for tooltip)

### Components Model
	  	      
	  	      Root: App Component - app/app.component.html

						 App Component
					    	/     |       \
					   Header   Input     Output
							       /   \    						
					 displays -->  [PieChart]  [Table] 
								      |
					 displays -->              [Pagination]       
				  				

#### Service Communication: MortgageService

*Injected Component*: Input, Output and Header
*Data*: Mortgage Payment Calculations are performed here.

### Mobile Support

App designed to support multiple devices like mobile/tablet/laptop. Uses Bootstrap and @media tag to shift elements when needed.

### Implementation

In reacting to the design, modifications were made to it's living component.

#### 1.Template Driven Approach to build the template as there are only few fields present to perform calculation.

#### 2.Formulas used for Calculation

	a) LoanAmount = Mortgage Amount - Deposit Amount
	b) Monthly Interest Rate based on Payment Frequency
		If Monthly   -->  1/12
		If Weekly    -->  7/365
		If Bi-Weekly -->  14/365
	c) To calculate periodic interest rate
		((1+(iR÷2))^2)^(1÷12)−1
	d) To calculate monthly payment amount
		(Ip*Pir)/(1-(1+Pir)^(-m)) where 
					Ip : initial principal 		        -->  Mortgage Amount - Deposit Amount
					Pir: period interest rate	        -->  Monthly Interest Rate(Payment Frequency)
					m  : amortizaiton period in months  -->  amortizationPeriod * 12
        e) To calculate PeriodicPaymentAmount based on Payment Frequency
		If Monthly   -->  monthly payment amount
		If Weekly    -->  monthly payment amount / 4
		If Bi-Weekly -->  monthly payment amount / 2
    

#### 3.Deposit Amount should be lower than Mortgage Amount. Otherwise, Validation error will be displayed stating "Please enter a valid Deposit Amount".

#### 4.On change of every input, it does the mortgage calculation and displays the mortgage Monthly Payment in the header section (highlighted).

#### 5.Used Pie Chart to present the data in a visual way. Datasets used in the chart are Monthly Payment and Monthly Interest Paid.

#### 6.Used material table : <mat-table> to display the responsive data for Mortgage Payment Schedule. Pagination Support available for the table.
   Below are the data to be displayed in the table:
	a) Payment #          -->  Payment Number
	b) Principal Payment  -->  (payment > principal + interestPayment) ? principal + pi : payment
	c) Interest Payment   -->  principal * interestRate
	d) Total Payment      -->  payment - interestPayment
Iterate though the data until principal > 0. Iteration breaks at 5000 (fail-safe condition).	

#### Mobile capability

#### Used Karma V5.1.1 and Jasmine 3.6.0.

### Additional Info

Below dependencies are added to support responsive material table, responsive chart, touch gestures and bootstrap functionalities to the webapp.
```
1. npm install primeng --save

2. npm install primeicons --save

3. npm install --save hammerjs

4. npm install --save @angular/material @angular/animations @angular/cdk

5. npm install --save bootstrap@3

6. In angular.json, below changes are required.

 	    "styles": ["node_modules/bootstrap/dist/css/bootstrap.min.css"],
            "scripts": ["./node_modules/hammerjs/hammer.min.js"]

	css:
	    -bootstrap.min.css
            -font-awesome-4.7.0
	    -styles.css

##Development server
Used Firebase hosting to host the solution.

##Commands to host the solution
```
    1. ng build
    2. firebase login
    3. firebase init
    4. firebase deploy

Run ng serve for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

##Code scaffolding
Run ng generate component component-name to generate a new component. You can also use ng generate directive|pipe|service|class|module.

##Build
Run ng build to build the project. The build artifacts will be stored in the dist/ directory. Use the -prod flag for a production build.

##Running unit tests
Run ng test to execute the unit tests via Karma.

##Running end-to-end tests
Run ng e2e to execute the end-to-end tests via Protractor. Before running the tests make sure you are serving the app via ng serve.

##Further help
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
	
