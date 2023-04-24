import { Component } from '@angular/core';
import { OrderService } from '../order.service';
import { Order } from '../order.class';
import { Customer } from 'src/app/customer/customer.class';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent {
  pageTitle = "Order List";
  orders: Order[] = [];
  
  constructor(
    private ordsvc: OrderService

  ) {}

  ngOnInit(): void {
    this.ordsvc.list().subscribe({
      next: (res) => {
        console.log("Orders:", res)
        this.orders = res;        
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
}
