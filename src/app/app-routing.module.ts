import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: 'home', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
                    { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
                    { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                    { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) },
                    { path: 'administrators', loadChildren: () => import('./demo/components/custom/administrators/administrators.module').then(m => m.AdministratorsModule), canActivate: [AdminGuard], },
                    { path: 'users', loadChildren: () => import('./demo/components/custom/users/users.module').then(m => m.UsersModule), canActivate: [AdminGuard], },
                    { path: 'requests', loadChildren: () => import('./demo/components/custom/requests/requests.module').then(m => m.RequestsModule) },
                    { path: 'payment-method', loadChildren: () => import('./demo/components/custom/pay-method/pay-method.module').then(m => m.PayMethodModule) },
                    { path: 'programs', loadChildren: () => import('./demo/components/custom/programs/programs.module').then(m => m.ProgramsModule) },
                    { path: 'inscriptions', loadChildren: () => import('./demo/components/custom/inscriptions/inscriptions.module').then(m => m.InscriptionsModule) },
                ],
                // canActivate: [AuthGuard],

            },
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: 'formations', loadChildren: () => import('./demo/components/custom/form/form.module').then(m => m.FormModule) },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    providers: [AuthGuard],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
