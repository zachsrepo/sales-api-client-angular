import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../employee.class';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent {
  employee!: Employee; // | null = null;
  pageTitle = "Employee Detail";
  showVerifyRemove: boolean = false;
  constructor(
    private emplsvc: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ){}
  delete(): void {
    this.showVerifyRemove = !this.showVerifyRemove;
  }
  deleteVerified(): void {
    this.emplsvc.remove(this.employee.id).subscribe({
      next: (res) => {
        console.debug("Deleted!");
        this.router.navigateByUrl("/employee/list");
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
  ngOnInit(): void{
    let id = Number(this.route.snapshot.params["id"]); // adding a plus + sign before this will do the same thing.
    this.emplsvc.get(id).subscribe({
      next: (res) => {
          console.debug("Employee:", res);
          this.employee = res;
      },
      error: (err) => {
          console.error(err);
      }
    })
  }
}
