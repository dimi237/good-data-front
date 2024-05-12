import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { AuthService } from 'src/app/demo/service/auth.service';
import { RequestsService } from 'src/app/demo/service/requests.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
})
export class RequestsComponent implements OnInit {



  loading: boolean;
  requests: any[] = [];

  count: number = 0;


  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  isAdmin: boolean;
  selectedStatus: any



  constructor(public requestService: RequestsService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.getRequests();
    this.isAdmin = this.authService.isAdmin()
  }

  getRequests(options?:any) { this.requestService.findAll(options).then(data => this.requests = data?.data).finally(() => this.loading = false); }



  detailRequest(request: any) {
    this.router.navigate([`requests/detail/${request.code}`]);
  }


  selectStatus(status: any) {
    this.getRequests({status})
  }



  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.requests.length; i++) {
      if (this.requests[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  onSelectStatus( event: any) {
    console.log(event);
    
  }

}
