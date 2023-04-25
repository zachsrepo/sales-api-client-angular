import { Component } from '@angular/core';
import { OrderService } from '../order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/customer/customer.service';
import { Order } from '../order.class';
import { Customer } from 'src/app/customer/customer.class';

@Component({
  selector: 'app-order-change',
  templateUrl: './order-change.component.html',
  styleUrls: ['./order-change.component.css']
})
export class OrderChangeComponent {
  order: Order = new Order();
  customers!: Customer[];
  pageTitle = "Order Update";
  constructor (
    private ordersvc: OrderService,
    private router: Router,
    private route: ActivatedRoute,
    private custsvc: CustomerService
  ){}

  save():void {
    this.order.customerId = Number(this.order.customerId);
    this.ordersvc.change(this.order, this.order.id).subscribe({
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
    let id = this.route.snapshot.params["id"];
    this.ordersvc.get(id).subscribe({
      next: (res) => {
        this.order = res;
        this.order.date = this.order.date.substring(0, 10);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

}
