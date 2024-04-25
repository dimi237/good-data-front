import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from './pipes/truncate.pipe';



@NgModule({
  declarations: [TruncatePipe],
  exports: [TruncatePipe],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
