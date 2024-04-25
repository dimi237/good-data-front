import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AuthService } from 'src/app/demo/service/auth.service';
import { UserService } from 'src/app/demo/service/users.service';

@Component({
  selector: 'app-administrators',
  templateUrl: './administrators.component.html',
})
export class AdministratorsComponent implements OnInit {
  userDialog: boolean = false;

  deleteUserDialog: boolean = false;

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

  getUsers() { this.userService.findAll({ category: 100 }).then(data => this.users = data?.data).finally(() => this.loading = false); }

  openNew() {
    this.user = {};
    this.submitted = false;
    this.userDialog = true;
  }

  editUser(user: any) {
    this.user = { ...user };
    this.userDialog = true;
  }


  detailUser(user: any) {
    this.user = { ...user };
    this.userDetailDialog = true;
  }

  deleteUser(user: any) {
    this.deleteUserDialog = true;
    this.user = { ...user };
  }


  async confirmDelete() {
    try {
      this.loading = true;
      await this.userService.deleteById(this.user._id);
      this.messageService.add({ severity: 'success', summary: 'Opération réussie', detail: 'Administrateur Supprimé', life: 3000 });
      this.getUsers();
      this.deleteUserDialog = false;
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

  async saveUser() {
    try {
      this.loading = true;
      this.submitted = true;

      if (!this.validate()) { return }
      if (this.user?._id) {
        await this.userService.update(this.user._id, this.user);
        this.messageService.add({ severity: 'success', summary: 'Opération réussie', detail: 'Administrateur Mis à jour', life: 3000 });
      } else {
        await this.userService.create(this.user);
        this.messageService.add({ severity: 'success', summary: 'Opération réussie', detail: 'Administrateur Ajouté', life: 3000 })
      }

      const data = await this.userService.findAll();
      this.users = data?.data
      this.userDialog = false;
      this.user = {};
    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'Opération échouée', detail: error?.error.message || error?.error || 'Opération échouée', life: 3000 })
    } finally {
      this.loading = false;
    }


  }
  validate(): boolean {
    return (this.user.username && this.user.lname && this.user.fname && this.user.email) && (this.authService.validateEmail(this.user.email));
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

  createId(): string {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
