import { Component } from '@angular/core';
import { OrderService } from '../order.service';
import { Order } from '../order.class';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/customer/customer.class';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent {
  pageTitle = "Order Detail";
  showVerifyRemove: boolean = false;
  order!: Order;
 
  constructor(
    private ordsvc: OrderService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  delete(): void {
    this.showVerifyRemove = !this.showVerifyRemove;
  }
  deleteVerified(): void {
    this.ordsvc.remove(this.order.id).subscribe({
      next: (res) => {
        console.debug("Deleted!");
        this.router.navigateByUrl("/order/list");
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
  ngOnInit(): void{
    let id = Number(this.route.snapshot.params["id"]); // adding a plus + sign before this will do the same thing.
    this.ordsvc.get(id).subscribe({
      next: (res) => {
          console.debug("Order:", res);
          this.order = res;
          
      },
      error: (err) => {
          console.error(err);
      }
    })
  }
}
