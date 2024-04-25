import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestsRoutingModule } from './requests-routing.module';
import { NewRequestComponent } from './new-request/new-request.component';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { ChipsModule } from 'primeng/chips';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { RequestsComponent } from './requests.component';
import { DetailRequestComponent } from './detail-request/detail-request.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SkeletonModule } from 'primeng/skeleton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FieldsetModule } from 'primeng/fieldset';

@NgModule({
  declarations: [NewRequestComponent, RequestsComponent, DetailRequestComponent],
  imports: [
    CommonModule,
    FormsModule,
    AutoCompleteModule,
    InputTextModule,
    CalendarModule,
    InputNumberModule,
    ChipsModule,
    DropdownModule,
    InputTextareaModule,
    FileUploadModule,
    ToastModule,
    ToolbarModule,
    TableModule,
    DialogModule,
    SharedModule,
    NgxDocViewerModule,
    ConfirmDialogModule,
    SkeletonModule,
    FieldsetModule,
    InputSwitchModule,
    RequestsRoutingModule
  ]
})
export class RequestsModule { }
