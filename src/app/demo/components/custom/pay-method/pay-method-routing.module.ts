import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayMethodComponent } from './pay-method.component';

const routes: Routes = [{ path: '', component: PayMethodComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayMethodRoutingModule { }
