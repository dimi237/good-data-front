import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministratorsRoutingModule } from './administrators-routing.module';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { AdministratorsComponent } from './administrators.component';
import { SkeletonModule } from 'primeng/skeleton';
import { OrderListModule } from 'primeng/orderlist';
import { PasswordModule } from 'primeng/password';


@NgModule({
  declarations: [AdministratorsComponent],
  imports: [
    CommonModule,
    AdministratorsRoutingModule,
    TableModule,
    FileUploadModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    ToolbarModule,
    RatingModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    RadioButtonModule,
    InputNumberModule,
    SkeletonModule,
    OrderListModule,
    PasswordModule,
    DialogModule
  ]
})
export class AdministratorsModule { }
