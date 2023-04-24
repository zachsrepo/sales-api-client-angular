import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.class';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-change',
  templateUrl: './employee-change.component.html',
  styleUrls: ['./employee-change.component.css']
})
export class EmployeeChangeComponent {
  employee!: Employee;
  pageTitle = "Employee Update";
  constructor(
    private emplsvc: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ){}
  save():void {
    this.emplsvc.change(this.employee).subscribe({
      next: (res) => {
        console.log("Employee Saved!");
        this.router.navigateByUrl("/employee/list");
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
  ngOnInit(): void{
    let id = this.route.snapshot.params["id"];
    this.emplsvc.get(id).subscribe({
      next: (res) => {
        console.debug(res);
        this.employee = res;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

}
