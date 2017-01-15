import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApitestComponent } from './apitest.component';
import { ApiviewComponent } from './apiview/apiview.component';
import { ApitestService } from './apitest.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ApitestComponent, ApiviewComponent],
  providers: [ApitestService]
})
export class ApitestModule { }
