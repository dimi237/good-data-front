import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestsComponent } from './requests.component';
import { NewRequestComponent } from './new-request/new-request.component';
import { DetailRequestComponent } from './detail-request/detail-request.component';

const routes: Routes = [
  { path: '', component: RequestsComponent },
  { path: 'new', component: NewRequestComponent },
  { path: 'detail/:code', component: DetailRequestComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestsRoutingModule { }
