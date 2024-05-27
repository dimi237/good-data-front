import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/demo/service/auth.service';
import { RequestsService } from 'src/app/demo/service/requests.service';


@Component({
  selector: 'app-detail-request',
  templateUrl: './detail-request.component.html',
  providers: [ConfirmationService, MessageService, DialogService]
})
export class DetailRequestComponent implements OnInit {
  request: any
  file: any
  viewDialog: boolean;
  loading: boolean;
  edition: boolean = false;
  confirmLoading: boolean;
  isAdmin: any;
  actions: any[] = [];
  confirmDialog: boolean = false;
  types = [
    "Statistiques",
    "Data Mining",
    "Visualisation"

  ];
  outputs = [
    "Rapport",
    "Graphiques",
    "Tableaux",
    "Texte"
  ];
  statusDialog: boolean = false;
  uploadedFiles: any[] = [];
  date: Date | undefined;
  minDate: Date | undefined;
  canEdit: boolean;
  action: any;
  updateData: any = {};
  link: string;
  linkDialog: boolean;
  linkSubmitted: boolean;
  isUpdating: boolean = false;
  constructor(
    public requestsService: RequestsService,
    private authService: AuthService,
    private messageService: MessageService,
    private confirmServiece: ConfirmationService,
    private route: ActivatedRoute,
    private router: Router,
    public dialogService: DialogService
  ) { }
  ngOnInit(): void {
    this.getRequest();
    this.isAdmin = this.authService.isAdmin();
    this.minDate = new Date();
  }

  getRequest() {
    this.requestsService.findOne({ code: this.route.snapshot.params["code"] }).then((data) => {
      this.request = data;
      this.actions = this.requestsService.getActualsStatus(this.request.status);
      this.canEdit = !this.isAdmin && [100, 400].includes(this.request.status);
    }).catch(()=> {
      this.messageService.add({ severity: 'error', summary: 'La récupération des information a échoué', detail: 'Opération échouée' });
      this.router.navigate(['/requests']);
    }).finally(() => this.loading = false);
  }



  openView(file: any) {
    this.file = file;
    this.viewDialog = true;
  }

  getPath(file: any) {
    // return `${environment.apiUrl}${environment.basePath}${environment.publicPath}/${file.fileName}`
    return `${file.path}`
  }

  updateRequestStatus(index: number) {
    this.action = this.actions[index];
    if (this.action.comand) {
      this.requestsService.data = this.request;
      return this.action.comand(this.dialogService);
    }
    if (this.action.required) { return this.statusDialog = true }
    this.confirmServiece.confirm({
      acceptLabel: 'Oui',
      rejectLabel: 'Non',
      acceptButtonStyleClass: `p-button-success`,
      message: this.action.confirm || 'êtes vous sure de vouloir continuer?',
      header: 'Confirmation de mise à jour',
      icon: `pi ${this.requestsService.statusTable[this.action?.code || 100].icon}` || 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-danger",
      accept: async () => this.handaleUpdateStatus()
    });

  }

  async handaleUpdateStatus() {
    try {
      this.confirmLoading = true;
      await this.requestsService.updateRequestStatus(this.request?.code, this.action.code, this.updateData);
      this.getRequest();
      this.messageService.add({ severity: 'success', summary: 'Mise à jour réussi', detail: 'Opération réussi' });
      this.statusDialog = false;
    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'Mise à jour échoué', detail: error?.error.message || error?.error || 'Opération échouée' });
    } finally {
      this.confirmLoading = false;
    }
  }




  async updateRequest() {
    try {
      this.confirmLoading = true;
      await this.requestsService.updateRequestByAdmin(this.request.code, this.requestsService.generateFormDataWithFiles({}, this.uploadedFiles, this.request.deliverables?.links || [], this.request.deliverables?.attachements || []));
      this.messageService.add({ severity: 'success', summary: 'Mise à jour réussi', detail: 'Opération réussi' });
      this.isUpdating = false;
      this.uploadedFiles = [];
      this.getRequest()
    } catch (error) {
      console.log(error);
      this.messageService.add({ severity: 'error', summary: 'Mise à jour échoué', detail: error?.error?.message || error?.error || 'Opération échouée' });
    } finally {
      this.confirmLoading = false;
    }
  }


  onInputChange(event: any) {
    this.updateData[event.target.name] = event.target.value;
  }

  onUpload(event: any) {
    this.isUpdating = true;
    this.uploadedFiles.push(...event.files);
    this.messageService.add({ severity: 'info', summary: 'Succès', detail: 'Fichier ajouté' });
  }

  onRemove(event: any) {
    this.isUpdating = true;
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
    this.isUpdating = true;
    this.request.deliverables = this.request.deliverables ? this.request.deliverables : { links: [] };
    this.request.deliverables.links = this.request.deliverables.links ? this.request.deliverables.links : [];
    this.request.deliverables.links.push(this.link);
    this.linkDialog = false;
    this.linkSubmitted = false;
    this.messageService.add({ severity: 'info', summary: 'Succès', detail: 'Lien ajouté' })
  }

  removeLink(index: number) {
    this.isUpdating = true;
    this.request.deliverables.links = this.request.deliverables.links.filter((val, i) => i !== index);
    this.messageService.add({ severity: 'info', summary: 'Succès', detail: 'Lien supprimé' })
  }

  removeAttachements(index: number) {
    this.isUpdating = true;
    this.request.deliverables.attachements = this.request.deliverables.attachements.filter((val, i) => i !== index);
    this.messageService.add({ severity: 'info', summary: 'Succès', detail: 'Pièce jointes supprimé' })
  }

}