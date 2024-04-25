import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { TabMenuModule } from 'primeng/tabmenu';
import { PayService } from 'src/app/demo/service/pay.service';
import { RequestsService } from 'src/app/demo/service/requests.service';

@Component({
  selector: 'app-payment-dialog',
  standalone: true,
  imports: [
     TabMenuModule
  ],
  providers: [DynamicDialogRef],
  templateUrl: './payment-dialog.component.html',
})
export class PaymentDialogComponent implements OnInit {
  products: any[] = [];
  activeItem: any;
  product: any;

  constructor(private payService: PayService,
    public requestsService: RequestsService
  ) { }
  ngOnInit(): void {

    this.payService.findAll().then((result) => {
      this.products = result.data;
      this.product = this.products[0]
    });
  }

  activeItemChange(event: any) {
    this.product = { ...event };
  }
}
