import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { RequestsService } from 'src/app/demo/service/requests.service';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
})
export class NewRequestComponent implements OnInit {

  request: any
  uploadedFiles: any[] = [];
  links: string[] = [];
  linkDialog: boolean;
  link: string;
  linkSubmitted: boolean;
  submitted: boolean;
  loading: boolean;
  date: Date | undefined;
  minDate: Date | undefined;

  constructor(
    private messageService: MessageService,
    private requestsService: RequestsService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.request = {
      name: '',
      desc: '',
      type: '',
      preferences: '',
      field: '',
      delay: 0,
      attachements: [],
      links: []
    }
    this.minDate = new Date();
  }


  onUpload(event: any) {
    this.uploadedFiles.push(...event.files);
    this.messageService.add({ severity: 'info', summary: 'Succès', detail: 'Fichier ajouté' });
  }

  onRemove(event: any) {
    this.uploadedFiles = this.uploadedFiles.filter((file => !(file.name === event.file.name && file.size === event.file.size)))
  }

  openNewLink() {
    this.link = '';
    this.linkDialog = true;
  }

  hideDialog(dialog: boolean) {
    dialog = false;
    this.linkSubmitted = false;
  }

  addLink() {
    this.links.push(this.link);
    this.linkDialog = false;
    this.linkSubmitted = false;
    this.messageService.add({ severity: 'info', summary: 'Succès', detail: 'Lien ajouté' })
  }


  removeLink(index: number) {
    this.links = this.links.filter((val, i) => i !== index);
    this.messageService.add({ severity: 'info', summary: 'Succès', detail: 'Lien supprimé' })
  }

  validate(): boolean {
    return this.request.name && this.request.desc && this.request.type;
  }

  async saveRequest() {
    try {
      this.submitted = true;
      this.loading = true;
      if (!this.validate()) { return }
      this.request.attachements = this.uploadedFiles || null;
      this.request.delay = moment(this.date).valueOf();
      await this.requestsService.create(this.requestsService.generateFormDataWithFiles(this.request, this.uploadedFiles, this.links));
      this.messageService.add({ severity: 'success', summary: 'Création réussi', detail: 'Opération réussi' });
      this.router.navigate(['requests']);
    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'Création échoué', detail: error?.error.message || error?.error || 'Opération échouée' });
    } finally {
      this.loading = false;
    }
  }

}

