import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { HttpClient } from '@angular/common/http';
import { BaseUrlService } from './base-url.service';
import { AuthService } from './auth.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaymentDialogComponent } from 'src/app/shared/components/payment-dialog/payment-dialog.component';
@Injectable({
  providedIn: 'root'
})
export class RequestsService extends CrudService<any> {
  statusTable = {
    100: { label: 'Initié', color: 'bluegray', icon: 'pi-info-circle' },
    200: { label: 'Validé', color: 'blue', icon: 'pi-check-circle' },
    300: { label: 'Annulé', color: 'orange', icon: 'pi-undo' },
    400: { label: 'Rejeté', color: 'red', icon: 'pi-times-circle' },
    500: { label: 'Payé', color: 'green', icon: 'pi-credit-card' },
    600: { label: 'Clôturé', color: 'primary', icon: 'pi-folder' }
  }
  statuslist = [
    { code: null, label: 'Aucun filtre', color: 'bluegray', icon: 'pi-info-circle' },
    { code: 100, label: 'Initié', color: 'bluegray', icon: 'pi-info-circle' },
    { code: 200, label: 'Validé', color: 'blue', icon: 'pi-check-circle' },
    { code: 300, label: 'Annulé', color: 'orange', icon: 'pi-undo' },
    { code: 400, label: 'Rejeté', color: 'red', icon: 'pi-times-circle' },
    { code: 500, label: 'Payé', color: 'green', icon: 'pi-credit-card' },
    { code: 600, label: 'Clôturé', color: 'primary', icon: 'pi-folder' }
  ]
  data: any;
  constructor(
    http: HttpClient,
    baseUrlSrv: BaseUrlService,
    private authSrv: AuthService,
  ) {
    super(http, baseUrlSrv, 'requests')
  }

  generateFormDataWithFiles(data: any, files: File[], links: string[], attachements?: any[]) {
    const formData = new FormData();
    console.log(attachements);

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    })

    files.forEach((file) => {
      formData.append('files', file, file.name);
    });

    formData.append('links', JSON.stringify(links));


    formData.append('attachements', JSON.stringify(attachements));

    return formData;
  }

  getActualsStatus(status: number): number[] {
    const mapping = {
      admin: {
        100: [{ label: 'Validez la demande', confirm: 'Confirmez la validation', code: 200, required: [{ name: 'amount', label: "Prix de l'analyse (XAF)", type: 'input' }] }, { label: 'Rejetez la demande', confirm: 'Confirmez le rejet', code: 400, required: [{ name: 'reason', label: "Raison du rejet", type: 'textarea' }] }],
        200: [{ label: 'Confirmez le paiement', confirm: "Confirmez le paiement", code: 500 },],
        300: [],
        400: [{ label: 'Validez la demande', confirm: 'Confirmez la validation', code: 200, required: [{ name: 'amount', label: "Prix de l'analyse (XAF)", type: 'input' }] }],
        500: [{ label: 'clôturez la demande', confirm: 'Confirmez la Clôture', code: 600 }],
        600: []
      },
      user: {
        100: [{ label: 'Annulez la demande', confirm: "Confirmez l'annulation", code: 300 }],
        200: [{ label: 'Annulez la demande', confirm: "Confirmez l'annulation", code: 300 }, { label: 'Procéder au paiement', comand: (service: DialogService) => this.openPaymentDialog(service) }],
        300: [{ label: 'Rétablir la demande', confirm: "Confirmez le rétablissement", code: 100 }],
        // 400: [{ label: 'Modifier la demande', confirm: "Confirmez la modification", code: 100 }],
        400: [],
        500: [],
        600: []
      }
    }

    const profile = this.authSrv.isAdmin() ? 'admin' : 'user';

    return mapping[profile][status];
  }


  async updateRequestStatus(code: string, status: number, data?: any): Promise<any> {
    return await this.request('PUT', `${code}/status`, { status, ...data });
  }


  async updateRequestByAdmin(code: string, data?: any): Promise<any> {
    return await this.request('PUT', `${code}/admin`, data);
  }

  async getRequestChart(): Promise<any> {
    return await this.request('GET', `charts/count`, {});
  }

  openPaymentDialog(service: DialogService) {
    service.open(PaymentDialogComponent, {
      header: 'Selectionnez la méthode de paiement',
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    },);
  }

}
