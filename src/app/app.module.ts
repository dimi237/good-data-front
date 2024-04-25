import { NgModule } from '@angular/core';
import { PathLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { httpInterceptorProviders } from './interceptors';
import { StorageService } from './demo/service/storage.service';
import { AuthService } from './demo/service/auth.service';
import { BaseUrlService } from './demo/service/base-url.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { NgxDocViewerModule } from 'ngx-doc-viewer';

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [AppRoutingModule, AppLayoutModule, ToastModule, NgxDocViewerModule],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        CountryService,
        CustomerService,
        EventService,
        IconService,
        NodeService,
        PhotoService,
        ProductService,
        StorageService,
        AuthService,
        BaseUrlService,
        MessageService,
        httpInterceptorProviders,
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
