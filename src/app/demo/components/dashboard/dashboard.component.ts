import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { RequestsService } from '../../service/requests.service';
import { InscriptionService } from '../../service/inscription.service';
import { UserService } from '../../service/users.service';
import { AuthService } from '../../service/auth.service';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

    items!: MenuItem[];


    data: any;
    
    chart: any;
    
    options : any;

    subscription!: Subscription;
    isAdmin: boolean;
    requests: number = 0;
    inscriptions: number= 0;
    users: number= 0;

    constructor( public layoutService: LayoutService,
        private requestService: RequestsService,
        private inscriptionService: InscriptionService,
        private userServices: UserService,
        private authService: AuthService
    ) {
        this.subscription = this.layoutService.configUpdate$
        .pipe(debounceTime(25))
        .subscribe((config) => {
            this.initChart();
        });
    }

    ngOnInit() {
       
        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' }
        ];
        this.requestService.count().then((count)=> this.requests = count?.count);
        this.inscriptionService.count().then((count)=> this.inscriptions = count?.count);
        this.userServices.count().then((count)=> this.users = count?.count);
        this.isAdmin = this.authService.isAdmin()
        this.initChart();
        
    }
    
    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        
        this.requestService.getRequestChart().then((chart)=> {
            this.chart = chart
        this.data = {
            labels: ['En cours', 'Terminés', 'Annulés'],
            datasets: [
                {
                    data: this.chart || [0,0,0],
                    backgroundColor: [ documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500'),documentStyle.getPropertyValue('--red-600')],
                    hoverBackgroundColor: [documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400'), documentStyle.getPropertyValue('--red-400')]
                }
            ]
        };
        this.options = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            }
        };

    });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
