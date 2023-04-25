import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.class';
import { SystemService } from 'src/app/system/system.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {
  pageTitle = "Employee List";

  employees: Employee[] = [];

  constructor(
    private emplsvc: EmployeeService,
    private sys: SystemService
  ){}

  ngOnInit(): void {
    this.sys.chkLogin();
    if(this.sys.loggedInEmployee !== null){
      console.log("someone is logged in");
    }
    else{
      console.log("no one is logged in.")
    }
    this.emplsvc.list().subscribe({
      next: (res) => {
        console.log("Employees:", res)
        this.employees = res;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
}
