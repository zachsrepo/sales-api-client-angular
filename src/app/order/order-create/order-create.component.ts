import { Component } from '@angular/core';
import { OrderService } from '../order.service';
import { Order } from '../order.class';
import { Router } from '@angular/router';
import { Customer } from 'src/app/customer/customer.class';
import { CustomerService } from 'src/app/customer/customer.service';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent {
  order: Order = new Order();
  customers!: Customer[];
  pageTitle = "Order Create";
  constructor (
    private ordersvc: OrderService,
    private router: Router,
    private custsvc: CustomerService
  ){}
  save():void {
    this.order.customerId = Number(this.order.customerId);
    this.ordersvc.create(this.order).subscribe({
      next: (res) => {
        console.debug("Order Created!");
        this.router.navigateByUrl("/order/list");
      },
      error: (err) => {
        console.error(err);
      }
    })
    
  }

  ngOnInit():void {
    this.custsvc.list().subscribe({
      next: (res) => {
        console.debug(res);
        this.customers = res;
      },
      error: (err) => {
        console.error(err);
      }

    })
  }
}
