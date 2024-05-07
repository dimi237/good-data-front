import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { AuthService } from 'src/app/demo/service/auth.service';
import { InscriptionService } from 'src/app/demo/service/inscription.service';
import { ProgramsService } from 'src/app/demo/service/programs.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    DropdownModule,
    ButtonModule,
    CommonModule,
    FormsModule,
    ToastModule,
    InputTextModule
  ],
  providers: [InscriptionService, ProgramsService, AuthService, MessageService],
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  programs: any[];
  inscription: any = {
    fname: '',
    lname: '',
    tel: '',
    email: '',
    level: '',
    situation: '',
  };

  levels = [
    'BEP CAP',
    'BAC',
    'BAC +2',
    'BAC +3',
    'BAC +4',
    'BAC +5',
    '> BAC +5',
  ]

  situations = [
    "Étudiant",
    "Salarié en poste",
    "Demandeur d'emploi",
    "Entreprise",
  ]
  loading: boolean;
  submitted: boolean;
  constructor(
    private inscriptionSrv: InscriptionService,
    private programSrv: ProgramsService,
    private messageService: MessageService,
    private authService: AuthService
  ) { }
  ngOnInit() {
    this.getPrograms()
  }

  getPrograms() {
    this.programSrv.findAll().then((data) => {
      this.programs = data?.data;
    });
  }
  validate(): boolean {
    return (this.inscription.tel && this.inscription.lname && this.inscription.fname && this.inscription.email && this.inscription.level && this.inscription.situation) && (this.authService.validateEmail(this.inscription.email));
  }
  async saveInscription() {
    try {
      console.log(this.inscription);

      this.loading = true;
      this.submitted = true;
      if (!this.validate()) { return }
      await this.inscriptionSrv.create(this.inscription);
      this.inscription = {
        fname: '',
        lname: '',
        tel: '',
        email: '',
        level: '',
        situation: '',
      };
      this.messageService.add({ severity: 'success', summary: 'Opération réussie', detail: 'Inscription Effectué', life: 3000 })
    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'Opération échouée', detail: error?.error.message || error?.error || 'Inscription échouée veuillez réessayer', life: 3000 })
    } finally {
      this.loading = false;
    }
  }

}
