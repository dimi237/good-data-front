import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProgramsService } from 'src/app/demo/service/programs.service';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
})
export class ProgramsComponent {
  programDialog: boolean = false;

  deleteProgramDialog: boolean = false;

  loading: boolean;
  programs: any[] = [];

  program: any = {};
  count: number = 0;


  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(private programService: ProgramsService, private messageService: MessageService) { }

  ngOnInit() {
    this.loading = true;
    this.getPrograms();

  }

  getPrograms() { this.programService.findAll().then(data => this.programs = data?.data).finally(() => this.loading = false); }

  openNew() {
    this.program = {};
    this.submitted = false;
    this.programDialog = true;
  }

  editProgram(program: any) {
    this.program = { ...program };
    this.programDialog = true;
  }


  deleteProgram(program: any) {
    this.deleteProgramDialog = true;
    this.program = { ...program };
  }


  async confirmDelete() {
    try {
      this.loading = true;
      await this.programService.deleteById(this.program._id);
      this.messageService.add({ severity: 'success', summary: 'Opération réussie', detail: 'Programme Supprimé', life: 3000 });
      this.getPrograms();
      this.deleteProgramDialog = false;
      this.program = {};
    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'Opération échouée', detail: error?.error.message || error?.error || 'Opération échouée', life: 3000 })
    } finally {
      this.loading = false;
    }
  }

  hideDialog() {
    this.programDialog = false;
    this.submitted = false;
  }

  async saveProgram() {
    try {
      this.loading = true;
      this.submitted = true;

      if (!this.validate()) { return }
      if (this.program?._id) {
        await this.programService.update(this.program._id, this.program);
        this.messageService.add({ severity: 'success', summary: 'Opération réussie', detail: 'Programme Mis à jour', life: 3000 });
      } else {
        await this.programService.create(this.program);
        this.messageService.add({ severity: 'success', summary: 'Opération réussie', detail: 'Programme Ajouté', life: 3000 })
      }

      const data = await this.programService.findAll();
      this.programs = data?.data
      this.programDialog = false;
      this.program = {};
    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'Opération échouée', detail: error?.error.message || error?.error || 'Opération échouée', life: 3000 })
    } finally {
      this.loading = false;
    }


  }
  validate(): boolean {
    return (this.program.label && this.program.description);
  }
  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.programs.length; i++) {
      if (this.programs[i].id === id) {
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
