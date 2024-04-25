import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/demo/service/auth.service';
import { StorageService } from 'src/app/demo/service/storage.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent implements OnInit {

    valCheck: string[] = ['remember'];

    credentials = {
        password: "",
        email: "",
    }
    isLoading: boolean;

    constructor(public layoutService: LayoutService,
        private authService: AuthService,
        private messageService: MessageService,
        private storageSrv: StorageService,
        private router: Router) { }
    ngOnInit(): void {
        if (this.authService.isUserConnected()) { this.router.navigate(['/']); }
    }

    async login(): Promise<any> {
        try {
            this.isLoading = true;
            const { user, token }: any = await this.authService.signin(this.credentials);
            this.storageSrv.setObject('oauth', token);
            this.storageSrv.setObject('user', user);
            this.messageService.add({ severity: 'success', summary: 'Authentification réussi', detail: 'Connexion réussi' });
            this.router.navigate(['/']);
        } catch (error) {
            this.messageService.add({ severity: 'error', summary: 'Authentification échoué', detail: error?.error?.message || 'Connexion non réussi' });
        } finally {
            this.isLoading = false;
        }
    }

    validate(): boolean {
        return !((this.credentials.email && this.credentials.password) && (this.authService.validateEmail(this.credentials.email)));
    }

}
