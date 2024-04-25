import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/demo/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  providers: [MessageService]
})
export class RegisterComponent {

  constructor(private authService: AuthService,
    private messageService: MessageService,
    private router: Router) { }
  isLoading = false;
  password: any = "";
  message: any = "";
  user: any = {
    username: "",
    fname: "",
    lname: "",
    email: "",
    tel: "",
    password: "",
    profile: {
      profession: "",
      field: ""
    }
  }

  dropdownItems = ['Etudiant', 'Entreprise', 'Particulier'];

  validate(): boolean {
    return !(this.user.username && this.user.lname && this.user.fname && this.user.email && this.user.tel && this.user.password && this.user.profile.profession && this.user.profile.field && (this.user.password === this.password) && (this.authService.validateEmail(this.user.email)));
  }

  async register(): Promise<any> {
    try {
      this.isLoading = true;
      await this.authService.register(this.user);
      this.messageService.add({ severity: 'success', summary: 'Création réussi', detail: 'Opération réussi' });
      this.router.navigate(['auth/register/success']);
    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'Création échoué', detail: error?.error.message || error?.error || 'Opération échouée' });
    } finally {
      this.isLoading = false;
    }
  }
}
