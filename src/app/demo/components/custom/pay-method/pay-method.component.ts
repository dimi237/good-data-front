import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule, UploadEvent } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { OrderListModule } from 'primeng/orderlist';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { SkeletonModule } from 'primeng/skeleton';
import { Table, TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { AuthService } from 'src/app/demo/service/auth.service';
import { PayService } from 'src/app/demo/service/pay.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pay-method',
  standalone: true,
  imports: [
    TableModule,
    FileUploadModule,
    FormsModule,
    ButtonModule,
    DialogModule,
    RippleModule,
    ToastModule,
    ToolbarModule,
    RatingModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    RadioButtonModule,
    InputNumberModule,
    SkeletonModule,
    OrderListModule,
  ],
  templateUrl: './pay-method.component.html',
})
export class PayMethodComponent implements OnInit {
  payDialog: boolean = false;

  statusPayDialog: boolean = false;


  loading: boolean;
  pays: any[] = [];

  pay: any = {};
  count: number = 0;


  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];
  file: any;

  constructor(private payService: PayService, private messageService: MessageService, public authService: AuthService) { }

  ngOnInit() {
    this.loading = true;
    this.getPays();
  }

  getPays() {
    this.payService.findAll().then((data) => {
      this.pays = data?.data;
      console.log(this.pays);
    }).finally(() => this.loading = false);
  }


  editPay(pay: any) {
    this.pay = { ...pay };
    this.payDialog = true;
  }
  statusPay(pay: any) {
    this.pay = { ...pay };
    this.statusPayDialog = true;
  }
  getPath(file: any) {
    return `/assets/images/logo/${file}.png`
  }



  hideDialog() {
    this.payDialog = false;
    this.submitted = false;
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.pays.length; i++) {
      if (this.pays[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  onUpload(event: any) {
    this.file = event.files[0];
  }

  async savePay() {
    try {
      this.submitted = true;
      this.loading = true;
      const { value, description } = this.pay;      
      await this.payService.update(this.pay._id, { value, description });
      this.getPays();
      this.payDialog = false;
      this.messageService.add({ severity: 'success', summary: 'Mise à jour réussi', detail: 'Opération réussi' });
    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'Mise à jour échoué', detail: error?.error.message || error?.error || 'Opération échouée' });
    } finally {
      this.loading = false;
    }
  }
  async confirmStatus() {
    try {
      this.loading = true;
      await this.pay?.enabled ? this.payService.disable(this.pay._id) : this.payService.enable(this.pay._id);
      this.messageService.add({ severity: 'success', summary: 'Opération réussie', detail: 'Mise à jour du statut réussie', life: 3000 });
      this.getPays();
      this.statusPayDialog = false;
      this.pay = {};
    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'Opération échouée', detail: error?.error.message || error?.error || 'Opération échouée', life: 3000 })
    } finally {
      this.loading = false;
    }
  }

}
