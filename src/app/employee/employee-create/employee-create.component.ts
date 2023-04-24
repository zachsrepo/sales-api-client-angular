import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { Employee } from '../employee.class';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent {
    employee: Employee = new Employee();
    pageTitle = "Employee Create";
    constructor(
      private emplsvc: EmployeeService,
      private router: Router
    ) {}
    save():void {
      this.emplsvc.create(this.employee).subscribe({
        next: (res) => {
          console.debug("Employee Created!");
          this.router.navigateByUrl("/employee/list");
        },
        error: (err) => {
          console.error(err);
        }
      })
      
    }

    ngOnInit():void {

    }

}
