import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { AuthService } from '../demo/service/auth.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit {

    items: MenuItem[];
    user: any;
    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService,
        private authSrv: AuthService
    ) { }
    ngOnInit(): void {

        this.items = [
            {
                label: 'Profile',
                icon: 'pi pi-fw pi-user',
                routerLink: ['/home']
            },
            {
                label: 'Paramètres',
                icon: 'pi pi-fw pi-sliders-h',
                routerLink: ['/about']
            },
            {
                label: 'Se deconnecter',
                icon: 'pi pi-fw pi-sign-out',
                command: () => this.authSrv.signout(),


            }
        ];

        this.user = this.authSrv.getUser();
    }

    getAvatar(): string {
        return this.user?.username.charAt(0).toUpperCase() || 'U';
    }


}
