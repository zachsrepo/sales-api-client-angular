import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { SystemService } from 'src/app/system/system.service';

@Component({
  selector: 'app-employee-login',
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.css']
})
export class EmployeeLoginComponent {
  pageTitle = "Employee Login";
  email: string = "";
  password: string = "";
  message: string = "";
  constructor(
    private emplsvc: EmployeeService,
    private router: Router,
    private sys: SystemService
  ) {}
  login() : void {
    this.emplsvc.login(this.email, this.password).subscribe({
      next: (res) => {
        console.debug("Login Successful");
        this.message = "Login Successful!";
        this.sys.loggedInEmployee = res;
        this.router.navigateByUrl("/employee/list");
        
      },
      error: (err) => {
        console.error(err);
        if(err.status === 404){
          this.message = "Login Failed / Email or Password Incorrect!"
        }
      }
    })
  }
  ngOnInit(): void {
    
    this.sys.loggedInEmployee = null;
  }
}
