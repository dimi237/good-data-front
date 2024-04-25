import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { InscriptionService } from 'src/app/demo/service/inscription.service';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
})
export class InscriptionsComponent {

  loading: boolean;
  inscriptions: any[] = [];
  count: number = 0;


  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(private inscriptionService: InscriptionService, private messageService: MessageService) { }

  ngOnInit() {
    this.loading = true;
    this.getInscriptions();

  }

  getInscriptions() { this.inscriptionService.findAll().then(data => this.inscriptions = data?.data).finally(() => this.loading = false); }


  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.inscriptions.length; i++) {
      if (this.inscriptions[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
