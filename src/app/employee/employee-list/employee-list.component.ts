import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.class';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {
  pageTitle = "Employee List";

  employees: Employee[] = [];

  constructor(
    private emplsvc: EmployeeService
  ){}

  ngOnInit(): void {
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
