import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AuthService } from 'src/app/demo/service/auth.service';
import { UserService } from 'src/app/demo/service/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent {
  userDialog: boolean = false;

  statusUserDialog: boolean = false;

  userDetailDialog: boolean = false;


  loading: boolean;
  users: any[] = [];

  user: any = {};
  count: number = 0;


  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(private userService: UserService, private messageService: MessageService, public authService: AuthService) { }

  ngOnInit() {
    this.loading = true;
    this.getUsers();
  }

  getUsers() { this.userService.findAll({ category: 200 }).then(data => this.users = data?.data).finally(() => this.loading = false); }



  editUser(user: any) {
    this.user = { ...user };
    this.userDialog = true;
  }


  detailUser(user: any) {
    this.user = { ...user };
    this.userDetailDialog = true;
  }

  statusUser(user: any) {
    this.statusUserDialog = true;
    this.user = { ...user };
  }


  async confirmStatus() {
    try {
      this.loading = true;
      await this.user?.enabled ? this.userService.disable(this.user._id) : this.userService.enable(this.user._id);
      this.messageService.add({ severity: 'success', summary: 'Opération réussie', detail: 'Mise à jour du statut réussie', life: 3000 });
      this.getUsers();
      this.statusUserDialog = false;
      this.user = {};
    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'Opération échouée', detail: error?.error.message || error?.error || 'Opération échouée', life: 3000 })
    } finally {
      this.loading = false;
    }
  }

  hideDialog() {
    this.userDialog = false;
    this.submitted = false;
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === id) {
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
